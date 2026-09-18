export type CtaOrigin =
  | 'header'
  | 'hero'
  | 'service_aposentadoria_rural'
  | 'service_salario_maternidade'
  | 'service_auxilio_acidente'
  | 'service_beneficio_negado'
  | 'service_outros'
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
