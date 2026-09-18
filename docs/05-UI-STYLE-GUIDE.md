# 05 — UI Style Guide

## Direção Visual

**Profissional • Moderno • Humano • Acolhedor • Limpo • Acessível • Confiável**

A identidade visual evita clichês jurídicos (martelo, balança, mármore, dourado) e aparência excessivamente luxuosa. O design prioriza fotografia real, bom espaço em branco, tipografia excelente e sofisticação discreta.

---

## Paleta de Cores

### Cores Primárias

| Token | Cor | Hex | Uso |
|-------|-----|-----|-----|
| `--color-primary` | Azul Profundo | `#1a365d` | Headlines, elementos de destaque |
| `--color-primary-light` | Azul Médio | `#2a4a7f` | Hover states, variações |
| `--color-primary-dark` | Azul Escuro | `#0f2341` | Textos de ênfase |

### Cores de Acento

| Token | Cor | Hex | Uso |
|-------|-----|-----|-----|
| `--color-accent` | Verde-Azulado | `#2b6777` | CTAs, links, elementos interativos |
| `--color-accent-light` | Verde Claro | `#3d8b9e` | Hover de CTAs |
| `--color-accent-dark` | Verde Escuro | `#1e4d5a` | Active states |

### Neutros

| Token | Cor | Hex | Uso |
|-------|-----|-----|-----|
| `--color-neutral-900` | Quase Preto | `#1a1a2e` | Texto principal |
| `--color-neutral-700` | Cinza Escuro | `#3d3d56` | Texto secundário |
| `--color-neutral-500` | Cinza Médio | `#6b7280` | Texto auxiliar, placeholders |
| `--color-neutral-300` | Cinza Claro | `#d1d5db` | Bordas, dividers |
| `--color-neutral-100` | Cinza Muito Claro | `#f3f4f6` | Backgrounds alternativos |
| `--color-neutral-50` | Off-White | `#f9fafb` | Background principal |
| `--color-white` | Branco | `#ffffff` | Cards, modal |

### Cores Funcionais

| Token | Cor | Hex | Uso |
|-------|-----|-----|-----|
| `--color-success` | Verde | `#059669` | Sucesso, confirmação |
| `--color-error` | Vermelho | `#dc2626` | Erros, validação |
| `--color-warning` | Âmbar | `#d97706` | Avisos |

### Cores de Superfície

| Token | Cor | Hex | Uso |
|-------|-----|-----|-----|
| `--color-surface` | Branco | `#ffffff` | Cards, modal |
| `--color-surface-alt` | Off-White | `#f9fafb` | Seções alternadas |
| `--color-backdrop` | Preto 60% | `rgba(0,0,0,0.6)` | Overlay do modal |

---

## Tipografia

### Fontes

| Uso | Fonte | Fallback |
|-----|-------|----------|
| Headings | **Outfit** | system-ui, sans-serif |
| Body | **Inter** | system-ui, sans-serif |

Ambas disponíveis via `next/font/google` (otimização automática, sem CLS).

### Escala Tipográfica

| Token | Tamanho (Desktop) | Tamanho (Mobile) | Peso | Linha | Uso |
|-------|--------------------|-------------------|------|-------|-----|
| `--text-hero` | 3rem (48px) | 2rem (32px) | 700 | 1.15 | Headline do Hero |
| `--text-h2` | 2.25rem (36px) | 1.75rem (28px) | 600 | 1.2 | Headlines de seção |
| `--text-h3` | 1.5rem (24px) | 1.25rem (20px) | 600 | 1.3 | Subtítulos, cards |
| `--text-h4` | 1.25rem (20px) | 1.125rem (18px) | 600 | 1.3 | Labels de destaque |
| `--text-body` | 1.0625rem (17px) | 1rem (16px) | 400 | 1.6 | Texto corrido |
| `--text-body-sm` | 0.9375rem (15px) | 0.875rem (14px) | 400 | 1.5 | Texto auxiliar |
| `--text-caption` | 0.8125rem (13px) | 0.75rem (12px) | 400 | 1.4 | Captions, disclaimers |
| `--text-cta` | 1.0625rem (17px) | 1rem (16px) | 600 | 1 | Texto de botões |

---

## Espaçamento

### Escala de Espaçamento

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-1` | 4px | Micro espaçamentos |
| `--space-2` | 8px | Gaps internos pequenos |
| `--space-3` | 12px | Padding interno de badges |
| `--space-4` | 16px | Padding interno de cards, gaps |
| `--space-5` | 20px | — |
| `--space-6` | 24px | Gaps entre elementos |
| `--space-8` | 32px | Margin entre grupos |
| `--space-10` | 40px | — |
| `--space-12` | 48px | Padding de seções (mobile) |
| `--space-16` | 64px | Padding de seções (desktop) |
| `--space-20` | 80px | Seções maiores |
| `--space-24` | 96px | Hero padding |

---

## Layout & Grid

### Container

| Token | Valor |
|-------|-------|
| `--container-max` | 1200px |
| `--container-narrow` | 800px |
| `--container-padding` | 20px (mobile) / 40px (desktop) |

### Breakpoints

| Token | Valor | Descrição |
|-------|-------|-----------|
| `--bp-sm` | 480px | Mobile large |
| `--bp-md` | 768px | Tablet |
| `--bp-lg` | 1024px | Desktop small |
| `--bp-xl` | 1280px | Desktop |

**Abordagem: Mobile First**

---

## Componentes

### Botões

#### CTA Principal
```css
background: var(--color-accent);
color: var(--color-white);
padding: 16px 32px;
border-radius: 8px;
font-family: var(--font-heading);
font-size: var(--text-cta);
font-weight: 600;
border: none;
cursor: pointer;
transition: background 0.2s ease, transform 0.1s ease;
```

**Hover:**
```css
background: var(--color-accent-light);
transform: translateY(-1px);
```

**Active:**
```css
background: var(--color-accent-dark);
transform: translateY(0);
```

**Disabled/Loading:**
```css
opacity: 0.7;
cursor: not-allowed;
```

#### CTA Header (menor)
```css
padding: 10px 20px;
font-size: 0.9375rem;
```

### Cards

```css
background: var(--color-white);
border: 1px solid var(--color-neutral-300);
border-radius: 12px;
padding: 24px;
transition: border-color 0.2s ease, box-shadow 0.2s ease;
```

**Hover:**
```css
border-color: var(--color-accent);
box-shadow: 0 4px 12px rgba(43, 103, 119, 0.1);
```

### Inputs

```css
width: 100%;
padding: 14px 16px;
border: 1.5px solid var(--color-neutral-300);
border-radius: 8px;
font-size: var(--text-body);
font-family: var(--font-body);
color: var(--color-neutral-900);
background: var(--color-white);
transition: border-color 0.2s ease;
```

**Focus:**
```css
border-color: var(--color-accent);
outline: 2px solid rgba(43, 103, 119, 0.2);
outline-offset: 2px;
```

**Error:**
```css
border-color: var(--color-error);
```

### Select
Mesmos estilos do input, com chevron customizado.

### Modal

```css
/* Backdrop */
background: var(--color-backdrop);
position: fixed;
inset: 0;
z-index: 1000;

/* Modal Container */
background: var(--color-white);
border-radius: 16px;
padding: 32px;
max-width: 480px;
width: calc(100% - 40px);
max-height: calc(100vh - 40px);
overflow-y: auto;
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
```

**Mobile:**
```css
border-radius: 16px 16px 0 0;
max-width: 100%;
width: 100%;
position: fixed;
bottom: 0;
max-height: 90vh;
padding-bottom: calc(32px + env(safe-area-inset-bottom));
```

### Badge/Tag

```css
display: inline-block;
padding: 6px 16px;
background: rgba(43, 103, 119, 0.1);
color: var(--color-accent);
border-radius: 100px;
font-size: var(--text-body-sm);
font-weight: 500;
```

### FAQ Accordion Item

```css
border-bottom: 1px solid var(--color-neutral-300);
padding: 20px 0;
```

**Question:**
```css
font-weight: 600;
font-size: var(--text-h4);
cursor: pointer;
display: flex;
justify-content: space-between;
align-items: center;
```

**Answer:**
```css
padding-top: 12px;
font-size: var(--text-body);
color: var(--color-neutral-700);
line-height: 1.6;
```

### Sticky Mobile CTA

```css
position: fixed;
bottom: 0;
left: 0;
right: 0;
padding: 12px 20px calc(12px + env(safe-area-inset-bottom));
background: var(--color-white);
border-top: 1px solid var(--color-neutral-300);
box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
z-index: 900;
```

---

## Shadows

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | Sutil, cards |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.1)` | Cards hover |
| `--shadow-lg` | `0 12px 40px rgba(0,0,0,0.15)` | Modal |
| `--shadow-xl` | `0 20px 60px rgba(0,0,0,0.2)` | Modal destaque |

---

## Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | 6px | Badges pequenos |
| `--radius-md` | 8px | Inputs, botões |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Modal |
| `--radius-full` | 100px | Pills, tags |

---

## Transições

| Token | Valor |
|-------|-------|
| `--transition-fast` | `0.15s ease` |
| `--transition-base` | `0.2s ease` |
| `--transition-slow` | `0.3s ease` |

---

## Ícones

Usar ícones SVG inline para os 3 pontos da seção "Análise Individual":
- 📄 Documentação → ícone de documento/checklist
- ✅ Requisitos → ícone de lista/check
- 🕐 Histórico → ícone de relógio/timeline

Estilo: outline, stroke de 1.5-2px, cor `--color-accent`.

Não usar bibliotecas de ícones. SVGs inline são mais performáticos e controláveis.

---

## Imagens

### Fotografia da Dra. Josimara
- **Hero:** Retrato profissional, preferencialmente cortado do peito para cima
- **Sobre:** Retrato mais completo, possivelmente em ambiente de trabalho
- **Formato:** WebP com fallback JPG
- **Tamanhos:** Gerar variantes para responsive (400w, 600w, 800w)
- **Aspect Ratio:** Definir via CSS para evitar CLS

### Placeholder
Até que as fotos reais sejam fornecidas, usar área com background sólido e texto indicativo.

---

## Seções — Backgrounds Alternados

| Seção | Background |
|-------|-----------|
| Header | Transparente → `var(--color-white)` on scroll |
| Hero | `var(--color-white)` |
| Serviços | `var(--color-neutral-50)` |
| Análise | `var(--color-white)` |
| Sobre | `var(--color-primary)` com texto claro |
| FAQ | `var(--color-neutral-50)` |
| CTA Final | `var(--color-white)` |
| Footer | `var(--color-neutral-900)` com texto claro |
