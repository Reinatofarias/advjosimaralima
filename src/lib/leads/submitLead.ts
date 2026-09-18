import { UtmParams } from '../utm/storage';

export interface SubmitLeadPayload {
  nome: string;
  telefone: string;
  servico: string;
  cta_origin: string;
  utm?: UtmParams;
  honeypot?: string;
  form_opened_at: number;
}

export interface SubmitLeadResponse {
  success: boolean;
  lead_id?: string;
  error?: string;
  fields?: Record<string, string>;
}

export async function submitLead(payload: SubmitLeadPayload): Promise<SubmitLeadResponse> {
  const requestBody = {
    nome: payload.nome,
    telefone: payload.telefone,
    servico: payload.servico,
    cta_origin: payload.cta_origin,
    utm_source: payload.utm?.utm_source || '',
    utm_medium: payload.utm?.utm_medium || '',
    utm_campaign: payload.utm?.utm_campaign || '',
    utm_content: payload.utm?.utm_content || '',
    utm_term: payload.utm?.utm_term || '',
    gclid: payload.utm?.gclid || '',
    gbraid: payload.utm?.gbraid || '',
    wbraid: payload.utm?.wbraid || '',
    landing_page: typeof window !== 'undefined' ? window.location.href : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    honeypot: payload.honeypot || '',
    form_opened_at: payload.form_opened_at,
  };

  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: data.error || 'Erro ao processar solicitação. Tente novamente.',
      fields: data.fields,
    };
  }

  return {
    success: true,
    lead_id: data.lead_id,
  };
}
