import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { sanitizeString, normalizePhone, isValidPhoneBR } from '@/lib/leads/validation';
import { SERVICE_OPTIONS } from '@/config/services';
import { SITE_CONFIG } from '@/config/site';

// Rate limiter in-memory simples (IP -> { count, resetAt })
const ipLimiter = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS_PER_MINUTE = 5;
const WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipLimiter.get(ip);

  if (!record || now > record.resetAt) {
    ipLimiter.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_MINUTE) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting por IP
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'anonymous';

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { success: false, error: 'Muitas tentativas. Por favor, aguarde um momento.' },
        { status: 429 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Formato de requisição inválido (JSON malformado).' },
        { status: 400 }
      );
    }

    // 2. Proteção Anti-Bot 1: Honeypot (campo invisível 'honeypot' ou 'website')
    const honeypotVal = typeof body.honeypot === 'string' ? body.honeypot.trim() : '';
    if (honeypotVal !== '') {
      // Retorna 200 falso para desestimular tentativas repetidas de bot
      return NextResponse.json({ success: true, lead_id: randomUUID() }, { status: 200 });
    }

    // 3. Proteção Anti-Bot 2: Tempo mínimo de preenchimento (3 segundos)
    const openedAt = Number(body.form_opened_at);
    if (openedAt && Date.now() - openedAt < 3000) {
      // Se submeteu em menos de 3 segundos, provável script automatizado
      return NextResponse.json({ success: true, lead_id: randomUUID() }, { status: 200 });
    }

    // 4. Validação e Sanitização
    const nome = sanitizeString(typeof body.nome === 'string' ? body.nome : '');
    const telefoneRaw = typeof body.telefone === 'string' ? body.telefone : '';
    const servico = typeof body.servico === 'string' ? body.servico : '';
    const cta_origin = sanitizeString(typeof body.cta_origin === 'string' ? body.cta_origin : 'desconhecido');

    const errors: Record<string, string> = {};

    if (!nome || nome.length < 2) {
      errors.nome = 'Por favor, informe seu nome.';
    }

    if (!isValidPhoneBR(telefoneRaw)) {
      errors.telefone = 'Informe um número de WhatsApp válido com DDD.';
    }

    const serviceMatch = SERVICE_OPTIONS.find((opt) => opt.value === servico);
    if (!servico || !serviceMatch) {
      errors.servico = 'Selecione um serviço válido.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, error: 'Dados inválidos.', fields: errors },
        { status: 400 }
      );
    }

    // 5. Montagem do Lead Estruturado
    const leadId = randomUUID();
    const normalizedPhone = normalizePhone(telefoneRaw);
    const destinationWhatsappNumber = SITE_CONFIG.contact.whatsappNumber.replace(/\D/g, '');
    const timestamp = new Date().toISOString();

    const getString = (val: unknown) => (typeof val === 'string' ? val : '');

    const leadPayload = {
      lead_id: leadId,
      nome,
      telefone: normalizedPhone,
      origem: 'Landing Page',
      origem_formulario: 'LP Dra. Josimara Lima',
      whatsapp_destino: destinationWhatsappNumber,
      situacao: serviceMatch?.label || servico,
      situacao_id: servico,
      servico: serviceMatch?.label || servico,
      servico_id: servico,
      cta_origin,
      utm_source: sanitizeString(getString(body.utm_source)),
      utm_medium: sanitizeString(getString(body.utm_medium)),
      utm_campaign: sanitizeString(getString(body.utm_campaign)),
      utm_content: sanitizeString(getString(body.utm_content)),
      utm_term: sanitizeString(getString(body.utm_term)),
      gclid: sanitizeString(getString(body.gclid)),
      gbraid: sanitizeString(getString(body.gbraid)),
      wbraid: sanitizeString(getString(body.wbraid)),
      landing_page: sanitizeString(getString(body.landing_page)),
      referrer: sanitizeString(getString(body.referrer)),
      timestamp,
      status: 'novo',
    };

    // 6. Despacho para Make Webhook (se configurado)
    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (!makeWebhookUrl || !makeWebhookUrl.trim().startsWith('http')) {
      console.error('[Webhook Make Missing]', {
        lead_id: leadId,
        has_make_webhook_url: Boolean(makeWebhookUrl),
      });

      return NextResponse.json(
        { success: false, error: 'Integração de atendimento indisponível. Verifique a configuração do webhook.' },
        { status: 500 }
      );
    }

    if (makeWebhookUrl && makeWebhookUrl.trim().startsWith('http')) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout

        const webhookResponse = await fetch(makeWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(leadPayload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!webhookResponse.ok) {
          console.error(
            `[Webhook Make Error] Status: ${webhookResponse.status} - ${webhookResponse.statusText}`
          );

          return NextResponse.json(
            { success: false, error: 'Não foi possível registrar seus dados no atendimento. Tente novamente.' },
            { status: 502 }
          );
        }

        console.log('[Webhook Make Success]', {
          lead_id: leadId,
          status: webhookResponse.status,
        });
      } catch (webhookErr) {
        console.error('[Webhook Make Exception]', webhookErr);

        return NextResponse.json(
          { success: false, error: 'Não foi possível conectar ao atendimento. Tente novamente.' },
          { status: 502 }
        );
      }
    } else {
      // Modo de desenvolvimento sem webhook configurado: loga no servidor
      console.log('⚡ [Lead Registrado Localmente - MAKE_WEBHOOK_URL vazia]:', leadPayload);
    }

    return NextResponse.json({
      success: true,
      lead_id: leadId,
    });
  } catch (error) {
    console.error('[Lead API Route Error]', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno ao processar seu contato. Tente novamente.' },
      { status: 500 }
    );
  }
}
