# PRD — Product Requirements Document
## Landing Page de Alta Conversão — Dra. Josimara Lima (Direito Previdenciário)

---

### 1. Visão Geral do Produto
O produto é uma Landing Page de alta conversão voltada para captação de leads qualificados em Direito Previdenciário através de tráfego pago (Google Ads).
O fluxo central é:
**Google Ads → LP Enxuta (5 seções) → Modal de Baixa Fricção → Validação & Backend (`/api/lead`) → Make/Webhook → Google Sheets → Redirecionamento para WhatsApp com Mensagem Contextualizada.**

---

### 2. Objetivos de Negócio & Métricas-Chave (OKRs / KPIs)
* **Objetivo Primário:** Capturar e qualificar o contato de usuários com demandas previdenciárias reais em Araripina/PE e região (ou atendimento online nacional).
* **Taxa de Conversão da LP (Visita → Lead Criado):** Meta > 12% a 18% em tráfego qualificado de busca.
* **Integridade de Rastreamento:** 100% dos leads atribuídos com parâmetros de campanha (`utm_*`, `gclid`, `gbraid`, `wbraid`) e ID único de lead (`lead_id`).
* **Zero Fricção Jurídica:** 100% de conformidade com o Código de Ética e Disciplina da OAB (sem garantias, promessas ou mercantilização agressiva).

---

### 3. Personas & Público-Alvo
* **Trabalhador Rural / Familiar (Persona Principal):**
  * Perfil: Homens e mulheres de 40 a 65+ anos, agricultores familiares, segurados especiais.
  * Comportamento Digital: Navegação via smartphone, conectividade 3G/4G variável, baixa familiaridade com termos técnicos jurídicos.
  * Dores: Falta de documentos formais, medo de ter o benefício negado, dificuldade de ir até agências do INSS.
  * Linguagem necessária: Clara, acolhedora, humana, sem jargões rebuscados.
* **Trabalhadora Gestante / Mãe Recente:**
  * Demanda: Salário-Maternidade rural ou urbano.
* **Trabalhador Acidentado / Sequelado:**
  * Demanda: Auxílio-Acidente após consolidação de lesões.
* **Cidadão com Benefício Negado:**
  * Demanda: Reanálise de indeferimento recente do INSS.

---

### 4. Requisitos Funcionais (FR)

| ID | Requisito | Descrição | Prioridade |
|---|---|---|---|
| **FR-01** | Landing Page Enxuta | Exatamente 5 seções principais: Hero, Serviços/Situações, Análise Individual, Sobre Dra. Josimara, FAQ + CTA final. | P0 |
| **FR-02** | Centralização de CTAs | Todo e qualquer botão de ação na LP deve acionar o `LeadModal`, sem enviar direto para o WhatsApp desacompanhado de registro. | P0 |
| **FR-03** | Contextualização de Serviço | Se o clique partir de um card de serviço específico, o select do modal deve vir pré-preenchido com o serviço respectivo. | P0 |
| **FR-04** | Modal de Baixa Fricção | Apenas 3 campos essenciais: Nome (texto), WhatsApp (com máscara BR) e Serviço (select). Sem CPF, RG ou campos invasivos. | P0 |
| **FR-05** | Proteção Anti-Spam e Bot | Validação honeypot invisível, tempo mínimo de submissão (3s) e rate limiting por IP na API. | P0 |
| **FR-06** | Endpoint Próprio Backend | Rota `POST /api/lead` que normaliza telefone (E.164 nacional), gera UUID v4 (`lead_id`), carimba timestamp ISO e despacha para webhook do Make. | P0 |
| **FR-07** | Persistência de Atribuição | Captura imediata de `utm_*`, `gclid`, `gbraid`, `wbraid` e armazenamento em `sessionStorage` para garantir integridade durante navegação. | P0 |
| **FR-08** | Redirecionamento WhatsApp | Abertura do WhatsApp (Web ou App nativo) apenas após resposta HTTP 200 do backend com mensagem personalizada contendo Nome e Serviço. | P0 |
| **FR-09** | Sticky CTA Mobile | Botão flutuante inferior em dispositivos móveis, com ocultamento inteligente quando o modal está aberto ou ao atingir o rodapé. | P1 |
| **FR-10** | Página LGPD Dedicada | Rota `/politica-de-privacidade` informando claramente a finalidade de contato e direitos do titular. | P1 |

---

### 5. Requisitos Não Funcionais (NFR)

* **NFR-01 — Performance (Core Web Vitals):**
  * LCP (Largest Contentful Paint) < 2.0s em conexões 4G mobile.
  * CLS (Cumulative Layout Shift) < 0.05.
  * FID/INP responsivo e instantâneo.
* **NFR-02 — Acessibilidade (WCAG 2.1 AA):**
  * Contraste mínimo de texto 4.5:1.
  * Trap focus obrigatório no modal, suporte a ESC para fechar e retorno de foco para o elemento acionador.
  * Touch targets de no mínimo 48x48px no mobile.
* **NFR-03 — Compatibilidade Cross-Browser & Mobile First:**
  * Otimizado prioritariamente para telas de 360px a 414px (smartphones Android e iOS comuns no interior do Brasil).
* **NFR-04 — Privacidade & Segurança (LGPD / Dados Pessoais):**
  * NENHUM dado PII (nome, telefone) trafegará no `dataLayer` ou ferramentas analíticas externas (GA4/GTM/Google Ads).

---

### 6. Critérios de Aceite Globais
1. Submissão do formulário dispara evento `lead_created` no dataLayer somente após retorno de sucesso do backend.
2. Webhook do Make recebe payload completo com campos UTM e lead normalizado.
3. Se o webhook falhar ou estiver em timeout, o usuário recebe feedback amigável com opção de retry, sem travamento de tela.
