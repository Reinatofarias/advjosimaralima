export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  referrer?: string;
  landing_page?: string;
}

const STORAGE_KEY = 'dra_josimara_utm_data_v1';

/**
 * Captura parâmetros de UTM e Google Ads da URL e armazena em sessionStorage.
 * Sobrevive a navegações internas sem contaminar outras abas.
 */
export function captureAndPersistUtm(): UtmParams {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    // Recupera dados já salvos anteriormente na sessão
    const savedDataStr = window.sessionStorage.getItem(STORAGE_KEY);
    const savedData: UtmParams = savedDataStr ? JSON.parse(savedDataStr) : {};

    const incomingData: UtmParams = {
      utm_source: searchParams.get('utm_source') || savedData.utm_source || undefined,
      utm_medium: searchParams.get('utm_medium') || savedData.utm_medium || undefined,
      utm_campaign: searchParams.get('utm_campaign') || savedData.utm_campaign || undefined,
      utm_content: searchParams.get('utm_content') || savedData.utm_content || undefined,
      utm_term: searchParams.get('utm_term') || savedData.utm_term || undefined,
      gclid: searchParams.get('gclid') || savedData.gclid || undefined,
      gbraid: searchParams.get('gbraid') || savedData.gbraid || undefined,
      wbraid: searchParams.get('wbraid') || savedData.wbraid || undefined,
      referrer: document.referrer || savedData.referrer || undefined,
      landing_page: savedData.landing_page || window.location.href,
    };

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(incomingData));
    return incomingData;
  } catch (error) {
    console.error('Erro ao manipular UTM storage:', error);
    return {};
  }
}

/**
 * Retorna os parâmetros de UTM atualmente salvos
 */
export function getSavedUtm(): UtmParams {
  if (typeof window === 'undefined') {
    return {};
  }
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : captureAndPersistUtm();
  } catch {
    return {};
  }
}
