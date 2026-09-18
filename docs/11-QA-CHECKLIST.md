# 11 — QA Checklist

## Desktop (1024px+)

- [ ] Layout correto em 1024px
- [ ] Layout correto em 1280px
- [ ] Layout correto em 1440px
- [ ] Layout correto em 1920px
- [ ] Header fixo funcionando
- [ ] Hero: texto + foto alinhados
- [ ] Services: grid de cards correto
- [ ] WhyAnalysis: 3 colunas
- [ ] AboutJosimara: foto + texto alinhados
- [ ] FAQ: accordion funcional
- [ ] Footer: layout correto
- [ ] Tipografia legível
- [ ] Espaçamentos consistentes
- [ ] Contraste adequado

## Mobile (< 768px)

- [ ] Layout correto em 320px
- [ ] Layout correto em 375px
- [ ] Layout correto em 414px
- [ ] Header compacto
- [ ] Hero: ordem correta (texto → foto)
- [ ] Services: cards empilhados
- [ ] WhyAnalysis: itens empilhados
- [ ] AboutJosimara: foto → texto
- [ ] FAQ: toque/tap funcional
- [ ] Sticky CTA visível
- [ ] Sticky CTA não atrapalha leitura
- [ ] Sticky CTA esconde quando modal aberto
- [ ] Conteúdo não ultrapassa viewport
- [ ] Touch targets ≥ 44x44px
- [ ] Sem scroll horizontal

## Tablet (768px - 1023px)

- [ ] Layout intermediário funcional
- [ ] Cards em grid adequado
- [ ] Modal responsivo

## Formulário / Modal

- [ ] Modal abre ao clicar CTA do Hero
- [ ] Modal abre ao clicar CTA de cada serviço
- [ ] Modal abre ao clicar CTA da análise
- [ ] Modal abre ao clicar CTA do sobre
- [ ] Modal abre ao clicar CTA do FAQ
- [ ] Modal abre ao clicar sticky CTA (mobile)
- [ ] Modal abre ao clicar CTA do header
- [ ] Serviço pré-selecionado quando CTA de serviço específico
- [ ] Campo nome: validação vazio
- [ ] Campo nome: aceita caracteres acentuados
- [ ] Campo WhatsApp: máscara funcional
- [ ] Campo WhatsApp: validação formato
- [ ] Campo serviço: todas as opções listadas
- [ ] Campo serviço: validação seleção
- [ ] Honeypot: campo invisível
- [ ] Botão desabilita durante submit
- [ ] Loading state durante submit
- [ ] Impede duplo envio
- [ ] Mensagem de erro amigável em falha
- [ ] Mensagem de sucesso breve
- [ ] WhatsApp abre após sucesso
- [ ] WhatsApp NÃO abre se houve erro

## Acessibilidade do Modal

- [ ] Focus trap ativo (Tab não sai do modal)
- [ ] Fecha com ESC
- [ ] Fecha ao clicar backdrop
- [ ] Foco retorna ao CTA que abriu
- [ ] Labels em todos os campos
- [ ] aria-modal="true"
- [ ] role="dialog"
- [ ] aria-labelledby no título
- [ ] Erros anunciados para leitores de tela

## CTAs

- [ ] Todos os CTAs abrem o modal (nenhum vai direto para WhatsApp)
- [ ] `cta_origin` registrado corretamente para cada CTA
- [ ] Serviço pré-selecionado em CTAs de serviço

## Tracking / dataLayer

- [ ] `form_open` disparado ao abrir modal
- [ ] `form_start` disparado ao primeiro input
- [ ] `form_submit` disparado ao clicar enviar
- [ ] `lead_created` disparado APÓS confirmação do backend
- [ ] `whatsapp_redirect` disparado ao abrir WhatsApp
- [ ] Nenhum PII (nome, telefone) no dataLayer
- [ ] `lead_id` presente nos eventos pós-submit
- [ ] `cta_origin` presente em todos os eventos
- [ ] `service` presente quando aplicável

## API / Webhook

- [ ] POST /api/lead aceita request válido
- [ ] POST /api/lead rejeita campos vazios (400)
- [ ] POST /api/lead rejeita telefone inválido (400)
- [ ] POST /api/lead rejeita serviço inválido (400)
- [ ] POST /api/lead verifica honeypot
- [ ] POST /api/lead aplica rate limiting
- [ ] POST /api/lead gera lead_id UUID
- [ ] POST /api/lead adiciona timestamp
- [ ] POST /api/lead sanitiza inputs
- [ ] POST /api/lead normaliza telefone
- [ ] Webhook recebe dados corretos
- [ ] Fallback funciona quando webhook não configurado
- [ ] Erro de webhook retorna mensagem amigável

## UTM / Google Ads

- [ ] UTM params capturados da URL
- [ ] UTM params persistidos em sessionStorage
- [ ] gclid capturado e persistido
- [ ] gbraid capturado e persistido
- [ ] wbraid capturado e persistido
- [ ] Params enviados no payload do lead
- [ ] Params sobrevivem durante navegação na LP

## WhatsApp

- [ ] URL gerada corretamente
- [ ] Mensagem pré-preenchida com nome e serviço
- [ ] Número correto configurado
- [ ] Abre somente após submit bem-sucedido
- [ ] Funciona em mobile (app nativo)
- [ ] Funciona em desktop (web.whatsapp.com)

## SEO

- [ ] Title tag presente e correto
- [ ] Meta description presente e correta
- [ ] Canonical URL configurada
- [ ] Open Graph tags presentes
- [ ] Apenas um h1 por página
- [ ] Hierarquia de headings correta
- [ ] Alt text nas imagens
- [ ] HTML semântico
- [ ] Schema.org JSON-LD presente
- [ ] Robots.txt configurado
- [ ] Sitemap.xml gerado

## Performance

- [ ] Build sem erros
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse SEO ≥ 90
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Lighthouse Best Practices ≥ 90
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Imagens otimizadas (WebP)
- [ ] Fontes otimizadas (next/font)
- [ ] Sem JS desnecessário
- [ ] Server Components por padrão

## Links

- [ ] Link para Política de Privacidade funcional
- [ ] Política de Privacidade carrega corretamente
- [ ] Nenhum link quebrado

## Copy

- [ ] Nenhuma promessa de resultado
- [ ] Nenhuma garantia
- [ ] Nenhuma urgência artificial
- [ ] Nenhum autoengrandecimento
- [ ] Nenhuma comparação com concorrentes
- [ ] Linguagem simples e acessível
- [ ] Informações verificáveis

## Variáveis de Ambiente

- [ ] `.env.example` documenta todas as variáveis
- [ ] Nenhum segredo no código-fonte
- [ ] Webhook URL server-side only
- [ ] WhatsApp number com prefixo NEXT_PUBLIC_
- [ ] GTM ID com prefixo NEXT_PUBLIC_

## Estados de Erro

- [ ] Formulário inválido: erros por campo
- [ ] Webhook indisponível: mensagem amigável
- [ ] Timeout: mensagem amigável
- [ ] Duplo clique: prevenido
- [ ] Conexão lenta: loading state visível
- [ ] Retry disponível após erro
