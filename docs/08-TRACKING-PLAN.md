# 08 — Plano de Tracking

## Visão Geral

O tracking é implementado via **Google Tag Manager (GTM)** com eventos enviados para **Google Analytics 4 (GA4)** e **Google Ads**.

A comunicação entre a aplicação e o GTM é feita exclusivamente via **dataLayer**.

---

## Google Tag Manager

### Instalação

O GTM é carregado no `layout.tsx` usando a variável `NEXT_PUBLIC_GTM_ID`.

```html
<!-- GTM - Head -->
<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>

<!-- GTM - Body (noscript) -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
```

Se `NEXT_PUBLIC_GTM_ID` não estiver definida, o script não é renderizado.

---

## Eventos

### Tabela de Eventos

| Evento | Quando | Dados Enviados | Conversão? |
|--------|--------|----------------|------------|
| `form_open` | Modal de lead abre | `cta_origin`, `service` | Não |
| `form_start` | Primeiro campo preenchido | `cta_origin` | Não |
| `form_submit` | Formulário enviado (antes do resultado) | `cta_origin`, `service` | Não |
| `lead_created` | Backend confirma registro | `lead_id`, `service`, `cta_origin` | **SIM — Principal** |
| `whatsapp_redirect` | WhatsApp é aberto | `lead_id`, `service` | Secundária |

### Conversão Principal

> **`lead_created`** é a conversão principal para Google Ads.
>
> Motivo: Esse evento só é disparado APÓS o backend confirmar que o lead foi registrado com sucesso. Diferentemente de um clique em WhatsApp, garante que os dados do lead foram efetivamente capturados.

---

## dataLayer — Implementação

### Inicialização

```javascript
window.dataLayer = window.dataLayer || [];
```

### Event: `form_open`

```javascript
window.dataLayer.push({
  event: 'form_open',
  cta_origin: 'hero',           // origem do CTA
  service: 'aposentadoria_rural' // ou undefined se não especificado
});
```

### Event: `form_start`

```javascript
window.dataLayer.push({
  event: 'form_start',
  cta_origin: 'hero'
});
```

### Event: `form_submit`

```javascript
window.dataLayer.push({
  event: 'form_submit',
  cta_origin: 'hero',
  service: 'aposentadoria_rural'
});
```

### Event: `lead_created`

```javascript
window.dataLayer.push({
  event: 'lead_created',
  lead_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  service: 'aposentadoria_rural',
  cta_origin: 'hero'
});
```

### Event: `whatsapp_redirect`

```javascript
window.dataLayer.push({
  event: 'whatsapp_redirect',
  lead_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  service: 'aposentadoria_rural'
});
```

---

## Restrição de Privacidade — IMPORTANTE

> **NUNCA enviar para o dataLayer:**
> - Nome do usuário
> - Número de telefone/WhatsApp
> - CPF, RG ou qualquer documento
> - E-mail
> - Qualquer dado pessoal identificável (PII)

Os únicos identificadores permitidos são:
- `lead_id` (UUID gerado pelo sistema, não vinculável sem acesso ao backend)
- `service` (tipo de serviço)
- `cta_origin` (origem do CTA)

---

## Configuração no GTM

### Tags Recomendadas

#### 1. GA4 — Evento `form_open`
- **Tipo:** GA4 Event
- **Event Name:** `form_open`
- **Parameters:** `cta_origin`, `service`
- **Trigger:** Custom Event = `form_open`

#### 2. GA4 — Evento `form_start`
- **Tipo:** GA4 Event
- **Event Name:** `form_start`
- **Parameters:** `cta_origin`
- **Trigger:** Custom Event = `form_start`

#### 3. GA4 — Evento `lead_created`
- **Tipo:** GA4 Event
- **Event Name:** `lead_created`
- **Parameters:** `lead_id`, `service`, `cta_origin`
- **Trigger:** Custom Event = `lead_created`

#### 4. Google Ads — Conversão `lead_created`
- **Tipo:** Google Ads Conversion Tracking
- **Conversion ID:** `[INSERIR CONVERSION ID]`
- **Conversion Label:** `[INSERIR CONVERSION LABEL]`
- **Trigger:** Custom Event = `lead_created`

#### 5. GA4 — Evento `whatsapp_redirect`
- **Tipo:** GA4 Event
- **Event Name:** `whatsapp_redirect`
- **Parameters:** `lead_id`, `service`
- **Trigger:** Custom Event = `whatsapp_redirect`

### Variables (Data Layer Variables)

| Variable Name | Data Layer Variable |
|---------------|-------------------|
| `dlv - cta_origin` | `cta_origin` |
| `dlv - service` | `service` |
| `dlv - lead_id` | `lead_id` |

### Triggers (Custom Events)

| Trigger Name | Event Name |
|-------------|------------|
| `CE - form_open` | `form_open` |
| `CE - form_start` | `form_start` |
| `CE - form_submit` | `form_submit` |
| `CE - lead_created` | `lead_created` |
| `CE - whatsapp_redirect` | `whatsapp_redirect` |

---

## Ordem dos Eventos no Submit

```
1. Usuário preenche formulário
2. Clica em "Continuar no WhatsApp"
3. → form_submit (dataLayer)
4. → POST /api/lead
5. → Backend processa e confirma
6. → lead_created (dataLayer)    ← CONVERSÃO PRINCIPAL
7. → WhatsApp abre
8. → whatsapp_redirect (dataLayer)
```

> `lead_created` NÃO é disparado antes do backend confirmar o recebimento.

---

## Debug

Para debug local:
1. Abrir GTM Preview mode
2. Abrir Console do navegador
3. Digitar `dataLayer` para ver todos os eventos
4. Verificar que os eventos estão sendo disparados na ordem correta
5. Verificar que nenhum PII está sendo enviado

---

## Pendências Externas

| Item | Status |
|------|--------|
| GTM Container ID | `[INSERIR NEXT_PUBLIC_GTM_ID]` |
| GA4 Measurement ID | Configurar no GTM |
| Google Ads Conversion ID | Configurar no GTM |
| Google Ads Conversion Label | Configurar no GTM |
