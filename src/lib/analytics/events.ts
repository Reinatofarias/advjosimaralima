export type CtaOrigin =
  | 'header'
  | 'hero'
  | 'service_mae_rural'
  | 'service_autonoma_mei'
  | 'service_desempregada'
  | 'service_carteira_assinada'
  | 'service_adocao'
  | 'service_beneficio_negado'
  | 'maternity_reality'
  | 'other_rights'
  | 'why_analysis'
  | 'about'
  | 'faq_final'
  | 'sticky_mobile';

export interface FormOpenEvent {
  event: 'form_open';
  cta_origin: CtaOrigin | string;
  service?: string;
}

export interface FormStartEvent {
  event: 'form_start';
  cta_origin: CtaOrigin | string;
}

export interface FormSubmitEvent {
  event: 'form_submit';
  cta_origin: CtaOrigin | string;
  service: string;
}

export interface LeadCreatedEvent {
  event: 'lead_created';
  lead_id: string;
  service: string;
  cta_origin: CtaOrigin | string;
}

export interface WhatsAppRedirectEvent {
  event: 'whatsapp_redirect';
  lead_id: string;
  service: string;
}

export type TrackingEvent =
  | FormOpenEvent
  | FormStartEvent
  | FormSubmitEvent
  | LeadCreatedEvent
  | WhatsAppRedirectEvent;
