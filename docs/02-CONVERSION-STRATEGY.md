# 02 — Estratégia de Conversão

## Visão Geral do Funil

```
┌─────────────────┐
│   Google Ads     │  Usuário pesquisa termo previdenciário
└────────┬────────┘
         ▼
┌─────────────────┐
│  Landing Page    │  Identifica problema → confiança → autoridade
└────────┬────────┘
         ▼
┌─────────────────┐
│  Clique no CTA   │  Qualquer CTA principal da página
└────────┬────────┘
         ▼
┌─────────────────┐
│  Modal de Lead   │  Formulário: nome, WhatsApp, serviço
└────────┬────────┘
         ▼
┌─────────────────┐
│  Submit          │  Validação client + server
└────────┬────────┘
         ▼
┌─────────────────┐
│  POST /api/lead  │  API interna processa o lead
└────────┬────────┘
         ▼
┌─────────────────┐
│  Make Webhook    │  Dados enviados para automação
└────────┬────────┘
         ▼
┌─────────────────┐
│  Google Sheets   │  Lead registrado na planilha
└────────┬────────┘
         ▼
┌─────────────────┐
│  Conversão       │  dataLayer: lead_created
└────────┬────────┘
         ▼
┌─────────────────┐
│  WhatsApp        │  Abre com mensagem pré-preenchida
└─────────────────┘
```

## Regra Fundamental

> **Nenhum CTA principal deve enviar diretamente para WhatsApp antes do preenchimento do formulário.**

Todos os CTAs abrem o mesmo modal de conversão (`LeadModal`).

## Jornada do Usuário

### 1. Chegada (Google Ads)
- Usuário pesquisa termos como: "aposentadoria rural advogado", "benefício INSS negado", "salário-maternidade rural"
- Clica no anúncio e chega à Landing Page
- UTM params e gclid são capturados e persistidos em `sessionStorage`

### 2. Reconhecimento (Hero)
- Vê headline que descreve exatamente sua situação
- Identifica que a profissional atua na área que precisa
- Vê credenciais que geram confiança rápida

### 3. Identificação (Serviços)
- Encontra card correspondente à sua situação específica
- Sente que o serviço é direcionado ao seu problema

### 4. Educação (Por Que Análise Individual)
- Entende que sua situação tem particularidades
- Compreende a importância de uma análise individualizada

### 5. Confiança (Sobre a Dra. Josimara)
- Conhece a profissional
- Sente proximidade e profissionalismo

### 6. Esclarecimento (FAQ)
- Tira dúvidas restantes
- Remove objeções finais

### 7. Ação (Modal)
- Preenche formulário simples (baixa fricção)
- Dados são registrados antes do contato

### 8. Contato (WhatsApp)
- WhatsApp abre automaticamente com mensagem pré-preenchida
- Lead já está registrado e rastreável

## CTAs — Mapeamento Completo

| Seção | Texto do CTA | `cta_origin` | `service` pré-selecionado |
|-------|--------------|--------------|--------------------------|
| Hero | Quero explicar minha situação | `hero` | — |
| Card: Aposentadoria Rural | Entender minha situação | `service_aposentadoria_rural` | `aposentadoria_rural` |
| Card: Salário-Maternidade | Entender minha situação | `service_salario_maternidade` | `salario_maternidade` |
| Card: Auxílio-Acidente | Entender minha situação | `service_auxilio_acidente` | `auxilio_acidente` |
| Card: Benefício Negado | Entender minha situação | `service_beneficio_negado` | `beneficio_negado` |
| Card: Outros | Entender minha situação | `service_outros` | `outro` |
| Análise Individual | Quero entender meu caso | `why_analysis` | — |
| Sobre Dra. Josimara | Falar sobre minha situação | `about` | — |
| FAQ Final | Explicar minha situação | `faq_final` | — |
| Sticky Mobile | Falar sobre minha situação | `sticky_mobile` | — |
| Header | Falar com a Dra. Josimara | `header` | — |

## Função Central

```typescript
openLeadModal(service?: ServiceType, origin: string)
```

Essa função:
1. Registra `form_open` no dataLayer com `origin`
2. Se `service` for fornecido, pré-seleciona no formulário
3. Abre o modal

## Dados Capturados por Lead

```json
{
  "lead_id": "uuid-v4",
  "nome": "string",
  "telefone": "string (normalizado)",
  "servico": "string (value do select)",
  "cta_origin": "string (origem do CTA)",
  "utm_source": "string | null",
  "utm_medium": "string | null",
  "utm_campaign": "string | null",
  "utm_content": "string | null",
  "utm_term": "string | null",
  "gclid": "string | null",
  "gbraid": "string | null",
  "wbraid": "string | null",
  "landing_page": "string (URL atual)",
  "referrer": "string | null",
  "timestamp": "string (ISO 8601)",
  "status": "novo"
}
```

## Métricas de Sucesso

| Métrica | Evento | Descrição |
|---------|--------|-----------|
| Abertura do modal | `form_open` | Indica interesse |
| Início do preenchimento | `form_start` | Indica engajamento |
| Submit do formulário | `form_submit` | Tentativa de conversão |
| Lead criado | `lead_created` | **Conversão principal** |
| Redirect WhatsApp | `whatsapp_redirect` | Contato iniciado |

### Conversão Principal

> **`lead_created`** é a conversão principal, NÃO o clique no WhatsApp.
> Motivo: `lead_created` garante que os dados foram efetivamente registrados no backend.

## Prevenção de Perdas

- Se o webhook falhar, o formulário mostra mensagem amigável e oferece retry
- WhatsApp só abre após confirmação do backend
- Rate limiting previne spam sem impactar conversão
- Honeypot invisível filtra bots
