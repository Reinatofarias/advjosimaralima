# 09 — SEO

## Contexto

Embora o tráfego principal seja proveniente de Google Ads, implementamos SEO corretamente para:
- Melhor Quality Score nos anúncios
- Possível tráfego orgânico futuro
- Indexação correta
- Experiência do usuário

---

## Title Tag

```
Advogada Previdenciária em Araripina/PE — Dra. Josimara Lima
```

## Meta Description

```
Análise individual de questões previdenciárias: aposentadoria rural, salário-maternidade, auxílio-acidente e benefícios negados pelo INSS. Atendimento presencial em Araripina/PE e online.
```

## Canonical

```html
<link rel="canonical" href="https://[INSERIR DOMÍNIO]/" />
```

---

## Open Graph

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Advogada Previdenciária em Araripina/PE — Dra. Josimara Lima" />
<meta property="og:description" content="Análise individual de questões previdenciárias: aposentadoria rural, salário-maternidade, auxílio-acidente e benefícios negados pelo INSS." />
<meta property="og:image" content="https://[INSERIR DOMÍNIO]/og-image.jpg" />
<meta property="og:url" content="https://[INSERIR DOMÍNIO]/" />
<meta property="og:locale" content="pt_BR" />
<meta property="og:site_name" content="Dra. Josimara Lima" />
```

---

## Estrutura de Headings

```
<h1> Sua situação com o INSS merece uma análise cuidadosa
  <h2> Em qual dessas situações você se encontra?
    <h3> Aposentadoria Rural
    <h3> Salário-Maternidade
    <h3> Auxílio-Acidente
    <h3> Benefício Negado
    <h3> Outros Benefícios
  <h2> Por que cada situação precisa de uma análise individual?
    <h3> Documentação específica
    <h3> Requisitos que variam
    <h3> Seu histórico importa
  <h2> Quem vai analisar sua situação
  <h2> Perguntas frequentes
    <h3> [Cada pergunta como h3]
```

Apenas um `<h1>` por página. Hierarquia sequencial sem pular níveis.

---

## HTML Semântico

| Elemento | Tag |
|----------|-----|
| Header | `<header>` |
| Navegação | `<nav>` |
| Hero | `<section>` |
| Serviços | `<section>` |
| Análise | `<section>` |
| Sobre | `<section>` |
| FAQ | `<section>` |
| Footer | `<footer>` |
| Cards | `<article>` ou `<div>` com role |
| FAQ Questions | `<details>` / `<summary>` ou custom com ARIA |

---

## Alt Text para Imagens

- **Hero:** "Dra. Josimara Lima, advogada previdenciária em Araripina/PE"
- **Sobre:** "Dra. Josimara Lima em seu escritório em Araripina, Pernambuco"

---

## Favicon

Formato: `.ico` + `.png` (múltiplos tamanhos via `next/metadata`)

---

## Robots

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://[INSERIR DOMÍNIO]/sitemap.xml
```

---

## Sitemap

Gerado automaticamente pelo Next.js via `app/sitemap.ts`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://[INSERIR DOMÍNIO]/</loc>
    <lastmod>2026-09-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://[INSERIR DOMÍNIO]/politica-de-privacidade</loc>
    <lastmod>2026-09-18</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

---

## Schema.org (JSON-LD)

### Attorney

```json
{
  "@context": "https://schema.org",
  "@type": "Attorney",
  "name": "Dra. Josimara Lima",
  "description": "Advogada especializada em Direito Previdenciário com aproximadamente 10 anos de atuação.",
  "url": "https://[INSERIR DOMÍNIO]/",
  "telephone": "[INSERIR TELEFONE]",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Araripina",
    "addressRegion": "PE",
    "addressCountry": "BR"
  },
  "areaServed": {
    "@type": "State",
    "name": "Pernambuco"
  },
  "knowsAbout": [
    "Direito Previdenciário",
    "Aposentadoria Rural",
    "Salário-Maternidade",
    "Auxílio-Acidente",
    "INSS"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços Previdenciários",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Aposentadoria Rural"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Salário-Maternidade"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Auxílio-Acidente"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Benefício Negado pelo INSS"
        }
      }
    ]
  }
}
```

### FAQ

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quem trabalhou na zona rural pode solicitar aposentadoria rural?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

---

## Palavras-Chave (uso natural)

Termos a serem trabalhados naturalmente no conteúdo:
- Direito Previdenciário
- advogada previdenciária
- INSS
- aposentadoria rural
- salário-maternidade
- auxílio-acidente
- benefício negado
- Araripina
- Pernambuco
- atendimento online
- análise previdenciária

**Sem keyword stuffing.** O conteúdo deve fluir naturalmente.

---

## Performance & SEO

| Item | Implementação |
|------|--------------|
| LCP < 2.5s | `next/image` com priority no hero |
| CLS < 0.1 | Dimensões fixas para imagens, font-display swap |
| HTTPS | Obrigatório no deploy |
| Mobile-friendly | Design mobile-first |
| Velocidade | Server Components, CSS Modules, fontes otimizadas |
