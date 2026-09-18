# SPEC — Technical & Functional Specification (Spec-Driven Development)
## Landing Page Dra. Josimara Lima — Direito Previdenciário

---

### 1. Modelo de Domínio & Schemas de Dados

#### 1.1. Serviços Aceitos (Enum)
```typescript
export const SERVICES = [
  { id: 'aposentadoria_rural', label: 'Aposentadoria Rural' },
  { id: 'salario_maternidade', label: 'Salário-Maternidade' },
  { id: 'auxilio_acidente', label: 'Auxílio-Acidente' },
  { id: 'beneficio_negado', label: 'Benefício negado pelo INSS' },
  { id: 'bpc_loas', label: 'BPC/LOAS' },
  { id: 'outro', label: 'Outro assunto previdenciário' }
] as const;

export type ServiceId = typeof SERVICES[number]['id'];
```

#### 1.2. Origens de CTA Aceitas (Enum)
```typescript
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
```

#### 1.3. Contrato de Entrada do Cliente (`LeadClientPayload`)
```typescript
export interface LeadClientPayload {
  nome: string;              // min 2, max 100 caracteres
  telefone: string;          // máscara ou número limpo (10 ou 11 dígitos)
  servico: ServiceId;        // enum válido
  cta_origin: CtaOrigin;     // identificador de clique
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  landing_page: string;
  referrer?: string;
  honeypot?: string;         // se preenchido -> bot detectado
  form_opened_at: number;    // timestamp Unix em ms
}
```

#### 1.4. Contrato de Saída para o Make / Google Sheets (`LeadWebhookPayload`)
```typescript
export interface LeadWebhookPayload {
  lead_id: string;           // UUID v4
  nome: string;              // sanitizado
  telefone: string;          // formato normalizado DDI+DDD+Numero (ex: "5587999998888")
  servico: string;           // label amigável (ex: "Aposentadoria Rural")
  servico_id: ServiceId;     // id do enum
  cta_origin: CtaOrigin;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  landing_page: string;
  referrer: string;
  timestamp: string;         // ISO 8601 UTC
  status: 'novo';
}
```

---

### 2. Especificação da API (`POST /api/lead`)

* **Endpoint:** `/api/lead`
* **Método:** `POST`
* **Headers:** `Content-Type: application/json`

#### Matriz de Resposta HTTP:
* **200 OK:**
  ```json
  {
    "success": true,
    "lead_id": "8f8b05ad-323a-4462-817f-e25fcf958fce"
  }
  ```
* **400 Bad Request:**
  ```json
  {
    "success": false,
    "error": "Dados inválidos",
    "fields": {
      "nome": "Por favor, informe seu nome.",
      "telefone": "Informe um número de WhatsApp válido."
    }
  }
  ```
* **429 Too Many Requests:**
  ```json
  {
    "success": false,
    "error": "Muitas tentativas. Por favor, aguarde um momento."
  }
  ```
* **500 Internal Server Error:**
  ```json
  {
    "success": false,
    "error": "Não foi possível processar seu contato no momento. Tente novamente."
  }
  ```

---

### 3. Especificação do Modal & Comportamento de Interface

#### 3.1. Abertura do Modal
* Invocado através de hook central `useLeadModal` ou context:
  `openModal(serviceId?: ServiceId, origin: CtaOrigin)`
* Ao abrir:
  1. Define `form_opened_at = Date.now()`.
  2. Dispara no dataLayer:
     ```javascript
     window.dataLayer.push({
       event: 'form_open',
       cta_origin: origin,
       service: serviceId || 'nao_selecionado'
     });
     ```
  3. Preenche automaticamente o select caso `serviceId` tenha sido informado.
  4. Trava o scroll da página (`body.style.overflow = 'hidden'`).
  5. Foca automaticamente no primeiro input visível (`nome`).

#### 3.2. Acessibilidade (A11y)
* Atributos de diálogo: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`.
* Trap Focus: O pressionamento da tecla `Tab` deve ciclar exclusivamente entre elementos focáveis internos do modal.
* Fechamento com tecla `Escape` ou clique no backdrop.
* Ao fechar, retorna o foco do teclado para o elemento HTML exato que disparou a abertura.

#### 3.3. Submissão e Redirecionamento
1. Usuário clica em "Continuar no WhatsApp".
2. Validação client-side executa.
   * Se inválido: foca no primeiro campo com erro e exibe mensagem abaixo do campo.
3. Se válido:
   * Desabilita botão de envio e inputs.
   * Exibe spinner / indicador textual "Enviando...".
   * Dispara no dataLayer:
     ```javascript
     window.dataLayer.push({
       event: 'form_submit',
       cta_origin: origin,
       service: serviceId
     });
     ```
   * Envia requisição para `/api/lead`.
4. Resposta recebida:
   * **Se Sucesso (200):**
     * Dispara evento de conversão primária:
       ```javascript
       window.dataLayer.push({
         event: 'lead_created',
         lead_id: response.lead_id,
         service: serviceId,
         cta_origin: origin
       });
       ```
     * Dispara evento de redirect:
       ```javascript
       window.dataLayer.push({
         event: 'whatsapp_redirect',
         lead_id: response.lead_id,
         service: serviceId
       });
       ```
     * Monta URL do WhatsApp:
       `https://wa.me/{WHATSAPP_NUMBER}?text={ENCODED_MESSAGE}`
     * Abre a URL (em aba nova para desktop, ou redirecionamento direto para mobile).
   * **Se Erro:**
     * Reabilita botão.
     * Exibe alerta amigável de erro no modal sem resetar os campos já preenchidos.
