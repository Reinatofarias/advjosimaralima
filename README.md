# Landing Page — Dra. Josimara Lima (Direito Previdenciário)

Landing Page de alta conversão para tráfego pago (Google Ads) desenvolvida com **Next.js 14 (App Router)**, **TypeScript** e **CSS Modules**, focada em máxima conversão de leads qualificados para atendimento em Direito Previdenciário em Araripina/PE e atendimento online em todo o Brasil.

---

## 🎯 Arquitetura de Conversão

```
Google Ads
    │
    ▼
Landing Page (5 Seções de Alta Conversão)
    │
    ▼ Clique em qualquer CTA
LeadModal (Nome, WhatsApp com máscara BR, Serviço de interesse)
    │
    ▼ Submissão protegida (Honeypot + Rate Limit + Tempo Mínimo)
POST /api/lead (Validação server-side, normalização E.164, UUID v4)
    │
    ▼ Dispatch assíncrono
Make Webhook ──► Google Sheets (Registro estruturado de CRM)
    │
    ▼ Confirmação 200 OK
dataLayer Event (`lead_created`) ──► GTM / GA4 / Google Ads Conversion
    │
    ▼ Redirecionamento automático
WhatsApp da Dra. Josimara (com mensagem contextualizada preenchida)
```

---

## 🚀 Tecnologias

* **Framework:** [Next.js 14+](https://nextjs.org/) (App Router, Server Components + Client Islands)
* **Linguagem:** [TypeScript 5](https://www.typescriptlang.org/)
* **Estilização:** CSS Modules nativo com Design Tokens (zero runtime CSS, carregamento instantâneo)
* **Tipografia:** `next/font` com Google Fonts (*Outfit* para títulos e *Inter* para corpo de texto)
* **Validação:** Validação customizada e tipada (sem libs pesadas)
* **Qualidade de Código:** ESLint com regras `next/core-web-vitals`

---

## 📂 Estrutura do Projeto

```text
├── docs/                             # Documentação Técnica e de Negócio
│   ├── PRD.md                        # Product Requirements Document
│   ├── SPEC.md                       # Especificação Técnica Spec-Driven
│   ├── adr/                          # Architecture Decision Records
│   ├── 01-PROJECT-BRIEF.md
│   ├── 02-CONVERSION-STRATEGY.md
│   ├── 03-INFORMATION-ARCHITECTURE.md
│   ├── 04-COPY.md
│   ├── 05-UI-STYLE-GUIDE.md
│   ├── 06-TECHNICAL-ARCHITECTURE.md
│   ├── 07-LEAD-INTEGRATION.md
│   ├── 08-TRACKING-PLAN.md
│   ├── 09-SEO.md
│   ├── 10-LGPD.md
│   └── 11-QA-CHECKLIST.md
├── public/                           # Arquivos estáticos e imagens
│   └── images/
├── src/
│   ├── app/
│   │   ├── api/lead/route.ts         # Endpoint seguro de captura e despacho
│   │   ├── politica-de-privacidade/  # Página LGPD em conformidade
│   │   ├── globals.css               # Design tokens, reset e utilitários
│   │   ├── layout.tsx                # Layout raiz (SEO, fontes, GTM)
│   │   ├── page.tsx                  # Landing Page (5 seções enxutas)
│   │   └── sitemap.ts / robots.ts    # SEO técnico
│   ├── components/
│   │   ├── layout/                   # Header e Footer
│   │   ├── sections/                 # Hero, Services, WhyAnalysis, About, FAQ
│   │   ├── lead/                     # LeadModal e LeadForm acessíveis
│   │   └── ui/                       # CTAButton e StickyMobileCTA
│   ├── config/                       # Constantes de site, serviços e contatos
│   └── lib/
│       ├── analytics/                # dataLayer push e eventos tipados
│       ├── leads/                    # Submissão e validação
│       ├── utm/                      # Captura e persistência em sessionStorage
│       └── whatsapp/                 # Construtor de link formatado
```

---

## 🛠️ Instalação e Execução

### 1. Pré-requisitos
* Node.js 18.17+ ou Node.js 20+ instalado
* NPM ou Yarn

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Copie o arquivo `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```

Preencha as variáveis:
```env
# URL do Webhook criado no Make (deixe vazio em dev para modo log)
MAKE_WEBHOOK_URL=https://hook.us1.make.com/sua-chave-webhook

# WhatsApp oficial de atendimento (apenas números com DDI 55)
NEXT_PUBLIC_WHATSAPP_NUMBER=5587999999999

# ID do Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# URL do site publicado
NEXT_PUBLIC_SITE_URL=https://drajosimara.com.br
```

### 4. Executar em Modo de Desenvolvimento
```bash
npm run dev
```
Acesse em seu navegador: [http://localhost:3000](http://localhost:3000)

### 5. Compilar para Produção (Build)
```bash
npm run build
npm run start
```

---

## 🔌 Configuração das Integrações

### 1. Make + Google Sheets
1. No Make.com, crie um novo cenário.
2. Adicione o módulo **Webhooks → Custom Webhook**.
3. Copie a URL gerada e cole na variável `MAKE_WEBHOOK_URL` no `.env.local` ou nas variáveis do provedor de hospedagem (Vercel, etc.).
4. Conecte o módulo **Google Sheets → Add a Row**.
5. Mapeie as colunas detalhadas em [`docs/07-LEAD-INTEGRATION.md`](./docs/07-LEAD-INTEGRATION.md).
6. Adicione o módulo **Webhook Response** retornando status 200: `{"status": "ok"}`.

### 2. Google Tag Manager & Google Ads
1. Insira o ID do contêiner em `NEXT_PUBLIC_GTM_ID`.
2. No GTM, crie a Tag de Conversão do Google Ads acionada pelo evento personalizado `lead_created`.
3. Certifique-se de que nenhum dado pessoal trafega no dataLayer (veja [`docs/08-TRACKING-PLAN.md`](./docs/08-TRACKING-PLAN.md)).

---

## 🧪 Verificação e QA
Consulte o checklist detalhado de validação técnica, visual e jurídica em [`docs/11-QA-CHECKLIST.md`](./docs/11-QA-CHECKLIST.md).
