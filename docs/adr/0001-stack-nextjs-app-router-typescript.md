# ADR 0001: Adoção de Next.js (App Router) e TypeScript

* **Status:** Aceito
* **Data:** 2026-09-18
* **Decisores:** Time de Arquitetura & Engenharia Front-end

### Contexto
A Landing Page da Dra. Josimara Lima é a peça central de uma campanha de mídia de alta performance (Google Ads). Requer carregamento ultrarrápido (Core Web Vitals), excelente renderização inicial sem layout shifts (CLS zero), SEO técnico para qualidade de índice de anúncios, além de roteamento seguro para endpoints de backend (`/api/lead`).

### Decisão
Adotar **Next.js 14+ com App Router e TypeScript**.
* A arquitetura aproveita Server Components para entregar HTML pré-renderizado estático e sem overhead de Javascript nas seções institucionais da página (Hero, Serviços, Sobre, FAQ, Footer).
* Client Components são isolados exclusivamente para ilhas de interatividade (`LeadModal`, `LeadForm`, `CTAButton`, `StickyMobileCTA`).
* TypeScript fornece garantia de tipos para validação de payloads de leads, mapeamento de eventos do dataLayer e parâmetros de rastreamento UTM.

### Consequências
* **Positivas:**
  * Excelente pontuação de performance no mobile.
  * Capacidade de hospedar API routes seguras sem expor tokens ou webhooks externos no navegador.
  * Manutenibilidade e padronização sólida para continuidade por futuros desenvolvedores.
* **Negativas / Mitigações:**
  * Necessidade de ambiente Node.js ou plataforma edge (Vercel/Cloudflare/Node server) para hospedar a aplicação e API route.
