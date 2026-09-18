# ADR 0005: Rastreamento via dataLayer e Proteção Estrita de PII (LGPD)

* **Status:** Aceito
* **Data:** 2026-09-18
* **Decisores:** Especialista em Tracking/Analytics & DPO / Jurídico

### Contexto
Para otimização de campanhas no Google Ads e GA4, métricas de conversão confiáveis são indispensáveis. Simultaneamente, as diretrizes da LGPD e as políticas de privacidade das plataformas de anúncios proíbem terminantemente o envio de informações pessoais identificáveis (PII) em hits de analytics.

### Decisão
1. **dataLayer Padronizado:** Disparo estruturado de eventos de funil: `form_open`, `form_start`, `form_submit`, `lead_created` (conversão primária) e `whatsapp_redirect`.
2. **Restrição Absoluta de PII:** Nome, telefone e qualquer dado pessoal são estritamente excluídos dos eventos enviados para o GTM / GA4.
3. **Identificador Opaque:** Somente o `lead_id` (UUID pseudônimo sem significado intrínseco), `service` e `cta_origin` são transmitidos no dataLayer para correlacionamento de auditoria interna.

### Consequências
* 100% de conformidade com a LGPD e termos de serviço do Google Analytics / Google Ads.
* Risco zero de penalidades ou suspensão de conta de anúncios por vazamento de PII.
* Dados analíticos limpos e auditáveis.
