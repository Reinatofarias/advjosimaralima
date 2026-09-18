# ADR 0003: Funil de Conversão Centralizado em Modal de Baixa Fricção

* **Status:** Aceito
* **Data:** 2026-09-18
* **Decisores:** Especialista em CRO & Arquiteto de Software

### Contexto
Em muitas landing pages jurídicas amadoras, os botões enviam o usuário diretamente para uma URL `api.whatsapp.com/send`. Isso acarreta 3 falhas graves:
1. **Perda de rastreamento:** O clique no botão não garante que a conversa foi iniciada, inflando falsamente métricas de tráfego.
2. **Perda de dados de atribuição:** UTMs, palavras-chave e GCLIDs se perdem antes da conversa.
3. **Falta de qualificação:** A equipe de atendimento recebe mensagens genéricas sem saber de onde o lead veio ou qual a sua necessidade imediata.

### Decisão
**Nenhum CTA da Landing Page enviará o visitante diretamente para o WhatsApp sem antes passar pelo `LeadModal`.**
* Todos os botões compartilham a chamada unificada `openLeadModal(service?, origin)`.
* O formulário coleta exclusivamente 3 campos essenciais: Nome, Telefone/WhatsApp e Assunto de interesse.
* O redirecionamento ao WhatsApp ocorre somente após resposta de sucesso HTTP 200 do backend próprio (`POST /api/lead`).

### Consequências
* Garantia de 100% dos leads registrados no Google Sheets / Make com atribuição completa.
* Qualificação imediata do atendimento humano no WhatsApp com mensagem contextualizada.
* Fricção mínima controlada (formulário de 3 campos, tempo médio de preenchimento de 15 a 20 segundos).
