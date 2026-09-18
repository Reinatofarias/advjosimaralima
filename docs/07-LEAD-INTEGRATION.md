# 07 — Integração de Leads

## Visão Geral

```
Frontend (Browser)
    │
    ▼ POST /api/lead
API Route (Server)
    │
    ▼ POST webhook
Make (Automação)
    │
    ▼ Add Row
Google Sheets (Registro)
```

---

## Endpoint: POST `/api/lead`

### Request

**Content-Type:** `application/json`

```json
{
  "nome": "Maria da Silva",
  "telefone": "(87) 99999-8888",
  "servico": "aposentadoria_rural",
  "cta_origin": "service_aposentadoria_rural",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "aposentadoria-rural-araripina",
  "utm_content": "headline-v2",
  "utm_term": "aposentadoria rural advogado",
  "gclid": "CjwKCAjw...",
  "gbraid": null,
  "wbraid": null,
  "landing_page": "https://drajosimara.com.br/",
  "referrer": "https://www.google.com/",
  "honeypot": "",
  "form_opened_at": 1695830400000
}
```

### Campos Adicionados pelo Server

```json
{
  "lead_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "timestamp": "2026-09-18T13:00:00.000Z",
  "status": "novo"
}
```

### Response — Sucesso (200)

```json
{
  "success": true,
  "lead_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

### Response — Erro de Validação (400)

```json
{
  "success": false,
  "error": "Dados inválidos",
  "fields": {
    "nome": "Nome é obrigatório",
    "telefone": "Número de WhatsApp inválido"
  }
}
```

### Response — Erro do Servidor (500)

```json
{
  "success": false,
  "error": "Erro interno. Tente novamente."
}
```

---

## Validação Server-Side

### Campos Obrigatórios

| Campo | Tipo | Validação |
|-------|------|-----------|
| `nome` | string | Mín 2 caracteres, máx 100, sem HTML |
| `telefone` | string | Formato brasileiro válido (10 ou 11 dígitos) |
| `servico` | string | Deve ser um dos valores aceitos |

### Valores Aceitos para `servico`

```typescript
const VALID_SERVICES = [
  'aposentadoria_rural',
  'salario_maternidade',
  'auxilio_acidente',
  'beneficio_negado',
  'bpc_loas',
  'outro',
] as const;
```

### Sanitização

1. `trim()` em todos os campos string
2. Remover tags HTML
3. Normalizar telefone: remover `(`, `)`, `-`, espaços, manter apenas dígitos
4. Se telefone tiver 10 ou 11 dígitos, aceitar
5. Armazenar telefone no formato: `55XX9XXXXXXXX`

### Honeypot

Campo invisível `website` no formulário. Se preenchido → rejeitar silenciosamente (retornar 200 fake para não alertar bots).

### Rate Limiting

- Máximo 5 submits por IP por minuto
- Implementação in-memory via `Map<string, { count: number, resetAt: number }>`
- Em caso de excesso → retornar 429

### Tempo Mínimo

- `form_opened_at` é enviado pelo frontend (timestamp do momento em que o modal abriu)
- Se `Date.now() - form_opened_at < 3000ms` → rejeitar (bot preencheu muito rápido)

---

## Envio para Make Webhook

### Request para o Make

**Method:** `POST`
**URL:** `process.env.MAKE_WEBHOOK_URL`
**Content-Type:** `application/json`

```json
{
  "lead_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "nome": "Maria da Silva",
  "telefone": "5587999998888",
  "servico": "aposentadoria_rural",
  "cta_origin": "service_aposentadoria_rural",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "aposentadoria-rural-araripina",
  "utm_content": "headline-v2",
  "utm_term": "aposentadoria rural advogado",
  "gclid": "CjwKCAjw...",
  "gbraid": "",
  "wbraid": "",
  "landing_page": "https://drajosimara.com.br/",
  "referrer": "https://www.google.com/",
  "timestamp": "2026-09-18T13:00:00.000Z",
  "status": "novo"
}
```

### Timeout
- 10 segundos para resposta do webhook
- Se timeout → retornar erro 500 ao frontend

### Retry Strategy
- **Não** fazer retry automático no server (para não bloquear o usuário)
- Se o webhook falhar, retornar erro ao frontend
- Frontend oferece botão "Tentar novamente"
- Logs do erro no server console para debugging

### Fallback
- Se `MAKE_WEBHOOK_URL` não estiver configurada, logar o lead no console do server e retornar sucesso
- Isso permite desenvolvimento local sem webhook

---

## Make — Cenário Esperado

### Estrutura do Cenário

```
┌───────────────────┐
│  Custom Webhook    │  Trigger: Recebe POST do endpoint
│  (Trigger)         │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  JSON Parser       │  Parse do body recebido
│  (Transform)       │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Google Sheets     │  Add Row na planilha
│  (Action)          │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Webhook Response  │  Retorna { "status": "ok" }
│  (Response)        │
└───────────────────┘
```

### Configuração do Webhook no Make
1. Criar cenário → Add module → Webhooks → Custom Webhook
2. Copiar URL gerada
3. Adicionar a URL em `MAKE_WEBHOOK_URL` no `.env.local`
4. Conectar módulo Google Sheets → Add a Row
5. Mapear campos conforme tabela abaixo
6. Adicionar módulo Webhook Response → `{ "status": "ok" }`

---

## Google Sheets — Estrutura

### Nome da Planilha
`Leads - Dra. Josimara Lima`

### Nome da Aba
`Leads`

### Colunas

| Coluna | Campo | Exemplo |
|--------|-------|---------|
| A | Data | 18/09/2026 13:00 |
| B | Lead ID | a1b2c3d4-... |
| C | Nome | Maria da Silva |
| D | WhatsApp | 5587999998888 |
| E | Serviço | Aposentadoria Rural |
| F | Origem CTA | service_aposentadoria_rural |
| G | UTM Source | google |
| H | UTM Medium | cpc |
| I | Campaign | aposentadoria-rural-araripina |
| J | Content | headline-v2 |
| K | Keyword | aposentadoria rural advogado |
| L | GCLID | CjwKCAjw... |
| M | Página | https://drajosimara.com.br/ |
| N | Status | Novo |

### Mapeamento no Make (servico → label legível)

| Valor interno | Label na planilha |
|---------------|-------------------|
| `aposentadoria_rural` | Aposentadoria Rural |
| `salario_maternidade` | Salário-Maternidade |
| `auxilio_acidente` | Auxílio-Acidente |
| `beneficio_negado` | Benefício Negado |
| `bpc_loas` | BPC/LOAS |
| `outro` | Outro Assunto |

### Status — Valores Futuros

| Status | Descrição |
|--------|-----------|
| Novo | Lead recém-criado |
| Contato Iniciado | Primeiro contato realizado |
| Respondido | Lead respondeu |
| Em Análise | Caso em análise |
| Consulta | Consulta agendada |
| Cliente | Convertido em cliente |
| Sem Retorno | Sem resposta após tentativas |
| Não Qualificado | Lead não qualificado |

---

## Tratamento de Erros — Resumo

| Cenário | Comportamento Server | Comportamento Frontend |
|---------|---------------------|----------------------|
| Campos inválidos | 400 + detalhes | Mostrar erros por campo |
| Honeypot preenchido | 200 fake | "Sucesso" (para bots) |
| Rate limit excedido | 429 | "Muitas tentativas. Aguarde." |
| Tempo mínimo não atingido | 200 fake | "Sucesso" (para bots) |
| Webhook timeout | 500 | "Erro. Tente novamente." |
| Webhook erro | 500 | "Erro. Tente novamente." |
| Webhook não configurada | 200 (log local) | Sucesso normal |
| Erro inesperado | 500 | "Erro. Tente novamente." |
