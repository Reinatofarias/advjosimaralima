import { SITE_CONFIG } from '@/config/site';

/**
 * Constrói a URL do WhatsApp com mensagem pré-preenchida contextualizada
 */
export function buildWhatsAppUrl(nome: string, servicoLabel: string): string {
  const cleanPhone = SITE_CONFIG.contact.whatsappNumber.replace(/\D/g, '');

  const message = `Olá, Dra. Josimara.

Acabei de preencher o formulário do site.

Nome: ${nome.trim()}
Assunto: ${servicoLabel}

Gostaria de entender melhor minha situação.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
