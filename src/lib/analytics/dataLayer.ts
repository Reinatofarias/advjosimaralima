import { TrackingEvent } from './events';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Dispara eventos padronizados no dataLayer do Google Tag Manager.
 * ATENÇÃO LGPD: Jamais incluir nome, telefone ou qualquer dado de identificação pessoal aqui.
 */
export function pushDataLayer(data: TrackingEvent): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ...data });

  if (process.env.NODE_ENV === 'development') {
    // Log amigável para debug local em console
    console.log('[dataLayer Event]', data);
  }
}
