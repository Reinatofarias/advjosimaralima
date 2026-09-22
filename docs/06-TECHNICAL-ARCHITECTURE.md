# 06 — Arquitetura Técnica

## Stack

| Tecnologia | Versão | Motivo |
|-----------|--------|--------|
| **Next.js** | 14+ (App Router) | SSR/SSG, SEO, API Routes, performance |
| **TypeScript** | 5+ | Tipagem, manutenibilidade |
| **React** | 18+ | Componentização |
| **CSS Modules** | (nativo) | Escopo, zero runtime, controle total |
| **ESLint** | 8+ | Qualidade de código |

### Decisão: CSS Modules vs Tailwind
Optamos por **CSS Modules (vanilla CSS)** para:
- Máximo controle sobre o design system
- Zero runtime CSS-in-JS
- Menor bundle size
- Melhor para projeto com design system customizado
- Sem dependência de build tools adicionais

---

## Estrutura de Diretórios

```
e:\Origo\Desenvolvimento\Dra Josimara\
├── docs/                          # Documentação do projeto
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
├── public/
│   ├── images/
│   │   ├── dra-josimara-hero.webp     # [PLACEHOLDER]
│   │   └── dra-josimara-about.webp    # [PLACEHOLDER]
│   ├── favicon.ico
│   └── og-image.jpg                   # [PLACEHOLDER]
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── lead/
│   │   │       └── route.ts           # POST /api/lead
│   │   ├── politica-de-privacidade/
│   │   │   ├── page.tsx
│   │   │   └── page.module.css
│   │   ├── globals.css                # Design tokens + reset + base
│   │   ├── layout.tsx                 # Root layout (fonts, GTM, meta)
│   │   ├── page.tsx                   # Landing Page principal
│   │   └── page.module.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Header.module.css
│   │   │   └── Footer/
│   │   │       ├── Footer.tsx
│   │   │       └── Footer.module.css
│   │   ├── sections/
│   │   │   ├── Hero/
│   │   │   │   ├── Hero.tsx
│   │   │   │   └── Hero.module.css
│   │   │   ├── Services/
│   │   │   │   ├── Services.tsx
│   │   │   │   └── Services.module.css
│   │   │   ├── WhyAnalysis/
│   │   │   │   ├── WhyAnalysis.tsx
│   │   │   │   └── WhyAnalysis.module.css
│   │   │   ├── AboutJosimara/
│   │   │   │   ├── AboutJosimara.tsx
│   │   │   │   └── AboutJosimara.module.css
│   │   │   └── FAQ/
│   │   │       ├── FAQ.tsx
│   │   │       └── FAQ.module.css
│   │   ├── lead/
│   │   │   ├── LeadModal/
│   │   │   │   ├── LeadModal.tsx
│   │   │   │   └── LeadModal.module.css
│   │   │   └── LeadForm/
│   │   │       ├── LeadForm.tsx
│   │   │       └── LeadForm.module.css
│   │   └── ui/
│   │       ├── CTAButton/
│   │       │   ├── CTAButton.tsx
│   │       │   └── CTAButton.module.css
│   │       └── StickyMobileCTA/
│   │           ├── StickyMobileCTA.tsx
│   │           └── StickyMobileCTA.module.css
│   ├── lib/
│   │   ├── analytics/
│   │   │   ├── dataLayer.ts           # Push events to dataLayer
│   │   │   └── events.ts             # Event type definitions
│   │   ├── leads/
│   │   │   ├── submitLead.ts          # Client-side submit function
│   │   │   └── validation.ts         # Field validation
│   │   ├── utm/
│   │   │   ├── useUtmParams.ts        # React hook for UTM
│   │   │   └── storage.ts            # sessionStorage helpers
│   │   └── whatsapp/
│   │       └── buildUrl.ts           # WhatsApp URL generator
│   └── config/
│       ├── site.ts                    # Site-wide config
│       └── services.ts               # Services list
├── .env.example
├── .env.local                         # (gitignored)
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
├── eslint.config.mjs
└── README.md
```

---

## Componentes — Server vs Client

### Server Components (renderizados no servidor)
- `Header` (parte estática)
- `Hero` (conteúdo estático)
- `Services` (conteúdo estático)
- `WhyAnalysis` (conteúdo estático)
- `AboutJosimara` (conteúdo estático)
- `Footer` (conteúdo estático)

### Client Components (`'use client'`)
- `CTAButton` — handlers de click
- `StickyMobileCTA` — visibilidade dinâmica
- `LeadModal` — estado do modal, focus trap
- `LeadForm` — estado do formulário, validação, submit
- `FAQ` — accordion com estado

### Estratégia de Hidratação
Os Server Components renderizam o HTML estático completo. Os Client Components são ilhas interativas mínimas que hidratam no client. Isso maximiza performance e SEO.

Componentes como `Services` e `Hero` renderizam conteúdo estático mas contêm um `CTAButton` (Client Component) como filho. O Next.js lida com isso automaticamente via composição.

---

## API Route — `/api/lead`

### Método
`POST`

### Request Body
```typescript
interface LeadRequest {
  nome: string;
  telefone: string;
  servico: string;
  cta_origin: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  landing_page?: string;
  referrer?: string;
  // Campos gerados pelo server:
  // lead_id, timestamp, status
}
```

### Response
```typescript
// Sucesso (200)
interface LeadResponse {
  success: true;
  lead_id: string;
}

// Erro de validação (400)
interface LeadErrorResponse {
  success: false;
  error: string;
  fields?: Record<string, string>;
}

// Erro do servidor (500)
interface LeadServerError {
  success: false;
  error: string;
}
```

### Processamento
1. Validar campos obrigatórios (nome, telefone, servico)
2. Sanitizar inputs (trim, strip HTML)
3. Normalizar telefone (remover formatação, validar formato BR)
4. Gerar `lead_id` (UUID v4 via `crypto.randomUUID()`)
5. Adicionar `timestamp` (ISO 8601)
6. Adicionar `status: "novo"`
7. Verificar honeypot
8. Verificar rate limit
9. Enviar para Make webhook
10. Retornar resultado

### Segurança
- Webhook URL via `process.env.MAKE_WEBHOOK_URL` (nunca exposta ao client)
- Rate limiting in-memory (Map com IP + timestamp)
- Honeypot field
- Sanitização de todos os inputs

---

## Fluxo de Dados

```
┌──────────────────┐
│  Browser          │
│                   │
│  1. User fills    │
│     form          │
│  2. Client-side   │
│     validation    │
│  3. fetch POST    │──────────┐
│     /api/lead     │          │
│                   │          ▼
│                   │  ┌───────────────┐
│                   │  │  API Route     │
│                   │  │                │
│                   │  │  4. Validate   │
│                   │  │  5. Sanitize   │
│  8. Receive       │  │  6. Generate   │
│     response      │◄─│     lead_id    │
│  9. Push          │  │  7. POST to    │──────┐
│     dataLayer     │  │     Make       │      │
│  10. Open WA      │  └───────────────┘      ▼
└──────────────────┘               ┌──────────────────┐
                                   │  Make Webhook      │
                                   │                    │
                                   │  Parse → Validate  │
                                   │  → Google Sheets   │
                                   │  → Response        │
                                   └──────────────────┘
```

---

## Variáveis de Ambiente

### Server-side only (sem prefixo)
```
MAKE_WEBHOOK_URL=https://hook.make.com/xxx
```

### Client-side (prefixo NEXT_PUBLIC_)
```
NEXT_PUBLIC_WHATSAPP_NUMBER=5500000000000
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### Arquivo `.env.example`
```env
# Webhook do Make para registro de leads
MAKE_WEBHOOK_URL=

# Número do WhatsApp (com código do país, sem +)
NEXT_PUBLIC_WHATSAPP_NUMBER=

# Google Tag Manager ID
NEXT_PUBLIC_GTM_ID=
```

---

## Fontes — Carregamento Otimizado

```typescript
// layout.tsx
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});
```

Vantagens do `next/font`:
- Self-hosted (sem requests ao Google Fonts)
- Preload automático
- `font-display: swap` para evitar FOIT
- CSS variables para uso em CSS Modules

---

## Performance

### Core Web Vitals
- **LCP:** Hero com imagem otimizada via `next/image`, `priority` flag
- **CLS:** Dimensões fixas para imagens, font-display swap
- **INP:** Event handlers leves, sem bloqueio do main thread

### Otimizações
- Server Components por padrão (menos JS no client)
- CSS Modules (zero runtime)
- `next/image` com WebP automático e lazy loading
- Fontes self-hosted via `next/font`
- Componentes client-side mínimos
- Sem bibliotecas desnecessárias
