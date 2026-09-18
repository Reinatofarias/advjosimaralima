# ADR 0004: Processamento de Leads via API Interna e Make Webhook

* **Status:** Aceito
* **Data:** 2026-09-18
* **Decisores:** Arquiteto de Integrações & Desenvolvedor Sênior

### Contexto
Submeter formulários diretamente do navegador para webhooks de terceiros (Make, Zapier, Webhook direto) expõe a URL do webhook publicamente no código-fonte do cliente, viabiliza ataques de spam, injeção de payloads maliciosos e gera CORS issues ou vulnerabilidades de segurança.

### Decisão
Criar o endpoint de proxy interno `POST /api/lead`:
1. **Segurança:** O webhook do Make fica protegido em variável de ambiente do servidor (`MAKE_WEBHOOK_URL`).
2. **Sanitização e Normalização:** O backend limpa caracteres indesejados, normaliza o telefone brasileiro para padrão E.164 (com DDD e DDI 55) e valida o enum de serviços.
3. **Prevenção de Abuso:** Honeypot oculto, validação de tempo mínimo de preenchimento e rate limit in-memory por IP.
4. **Metadados:** Atribuição de UUID v4 (`lead_id`), timestamp ISO 8601 e status inicial `"novo"`.

### Consequências
* Nenhuma URL de serviço externo exposta no client-side.
* Resiliência a bots e envios duplicados.
* Facilidade para estender futuras integrações (ex.: envio simultâneo para CRM ou e-mail de alerta) sem alterar o código do cliente.
