# 03 — Arquitetura da Informação

## Estrutura da Landing Page

A Landing Page possui exatamente **5 seções principais**, precedidas por Header e seguidas por Footer.

```
┌──────────────────────────┐
│  Header                  │
├──────────────────────────┤
│  SEÇÃO 01 — Hero         │
├──────────────────────────┤
│  SEÇÃO 02 — Serviços     │
├──────────────────────────┤
│  SEÇÃO 03 — Análise      │
├──────────────────────────┤
│  SEÇÃO 04 — Dra. Josimara│
├──────────────────────────┤
│  SEÇÃO 05 — FAQ + CTA    │
├──────────────────────────┤
│  Footer                  │
└──────────────────────────┘
│  Modal de Lead (overlay) │
│  Sticky CTA (mobile)     │
```

---

## Header

**Tipo:** Fixo no topo (sticky)

### Elementos
- Nome/Logo: "Dra. Josimara Lima"
- Subtítulo: "Advogada Previdenciária"
- CTA: "Falar com a Dra. Josimara" → abre modal (`origin: header`)

### Comportamento
- Background transparente no topo, sólido ao scrollar
- Compacto em mobile
- Não inclui menu de navegação complexo (é uma LP, não um site)

---

## Seção 01 — Hero

**Objetivo:** Compreensão imediata da área de atuação, problema atendido, credibilidade e próximo passo.

### Elementos
1. **Tag/Badge:** "Direito Previdenciário"
2. **Headline:** Frase forte sobre o problema/solução
3. **Subheadline:** Complemento que aprofunda a headline
4. **Credenciais (badges):**
   - ~10 anos de atuação
   - Pós-graduação em Direito Previdenciário
   - Atendimento presencial e online
5. **Foto profissional** da Dra. Josimara `[INSERIR FOTO]`
6. **CTA principal:** "Quero explicar minha situação" → modal (`origin: hero`)

### Layout
- Desktop: texto à esquerda, foto à direita
- Mobile: texto primeiro, foto depois, CTA em destaque

### Responde às perguntas
- ✅ Essa profissional trabalha com o meu problema?
- ✅ Parece que ela consegue me orientar?
- ✅ Como posso explicar minha situação?

---

## Seção 02 — Situações / Serviços

**Objetivo:** Permitir ao usuário identificar especificamente sua situação.

### Headline
"Em qual dessas situações você se encontra?"

### Cards (5 no total)

#### Card 1 — Aposentadoria Rural
- **Título:** Aposentadoria Rural
- **Descrição:** Breve explicação da situação atendida
- **CTA:** "Entender minha situação" → modal (`origin: service_aposentadoria_rural`, `service: aposentadoria_rural`)

#### Card 2 — Salário-Maternidade
- **Título:** Salário-Maternidade
- **Descrição:** Breve explicação da situação atendida
- **CTA:** "Entender minha situação" → modal (`origin: service_salario_maternidade`, `service: salario_maternidade`)

#### Card 3 — Auxílio-Acidente
- **Título:** Auxílio-Acidente
- **Descrição:** Breve explicação da situação atendida
- **CTA:** "Entender minha situação" → modal (`origin: service_auxilio_acidente`, `service: auxilio_acidente`)

#### Card 4 — Benefício Negado pelo INSS
- **Título:** Benefício Negado
- **Descrição:** Breve explicação da situação atendida
- **CTA:** "Entender minha situação" → modal (`origin: service_beneficio_negado`, `service: beneficio_negado`)

#### Card 5 — Outros Assuntos Previdenciários
- **Título:** Outros Benefícios
- **Descrição:** BPC/LOAS e demais questões
- **CTA:** "Entender minha situação" → modal (`origin: service_outros`, `service: outro`)

### Layout
- Desktop: grid 3+2 ou 2+3
- Mobile: scroll vertical, 1 card por linha

---

## Seção 03 — Por Que Uma Análise Individual É Importante

**Objetivo:** Mostrar que situações previdenciárias dependem de informações específicas, sem criar terrorismo ou medo.

### Headline
"Por que cada situação precisa de uma análise individual?"

### Três Pontos

#### 1. Documentação
Cada tipo de benefício exige documentos específicos que precisam ser organizados e analisados.

#### 2. Requisitos
Os requisitos variam de acordo com o benefício solicitado e o histórico do trabalhador.

#### 3. Histórico Previdenciário
O tempo de contribuição, a atividade exercida e outros fatores influenciam diretamente a análise.

### Mensagem Central
"Cada pedido ou situação relacionada ao INSS possui características específicas que precisam ser analisadas individualmente."

### CTA
"Quero entender meu caso" → modal (`origin: why_analysis`)

### Layout
- 3 itens lado a lado (desktop) / empilhados (mobile)
- Ícones discretos para cada ponto
- Visual limpo, sem ilustrações pesadas

---

## Seção 04 — Dra. Josimara Lima

**Objetivo:** Construir autoridade sem autoengrandecimento. Transmitir proximidade e profissionalismo.

### Elementos
1. **Foto profissional** `[INSERIR FOTO]`
2. **Nome:** Dra. Josimara Lima
3. **Título:** Advogada Previdenciária
4. **OAB:** `[INSERIR OAB/PE]`
5. **Experiência:** ~10 anos de atuação em Direito Previdenciário
6. **Formação:** Pós-graduação em Direito Previdenciário
7. **Localização:** Araripina, Pernambuco
8. **Atendimento:** Presencial e online
9. **Filosofia:** Texto sobre proximidade, linguagem simples, atenção individual

### Tom
- Proximidade (não distância)
- Linguagem simples (não rebuscada)
- Profissionalismo (não amadorismo)
- Atenção individual (não massificada)
- Clareza (não complexidade)

### CTA
"Falar sobre minha situação" → modal (`origin: about`)

### Layout
- Desktop: foto à esquerda, texto à direita
- Mobile: foto acima, texto abaixo

---

## Seção 05 — FAQ + CTA Final

**Objetivo:** Resolver dúvidas restantes e fazer último chamado à ação.

### Perguntas (accordion expandível)

1. **Quem trabalhou na zona rural pode solicitar aposentadoria rural?**
2. **Quais documentos podem ajudar na comprovação da atividade rural?**
3. **Quem teve benefício negado pode buscar uma nova análise?**
4. **Como funciona o atendimento online?**
5. **Preciso morar em Araripina para ser atendida(o)?**
6. **Como saber qual benefício pode se aplicar à minha situação?**

### Regras das Respostas
- Educativas e informativas
- Nunca afirmar que alguém tem direito sem análise
- Linguagem simples
- Incentivar o contato para análise individual

### CTA Final
**Headline:** "Ainda tem dúvidas sobre sua situação?"
**Botão:** "Explicar minha situação" → modal (`origin: faq_final`)

---

## Footer

### Elementos
- Nome: Dra. Josimara Lima
- OAB: `[INSERIR OAB/PE]`
- Localização: Araripina, PE
- Link: Política de Privacidade
- Disclaimer: Conforme regulamentação da OAB
- Copyright

### Não Incluir
- Links de redes sociais (a menos que especificado)
- Menu de navegação extenso
- Blog ou notícias

---

## Modal de Lead (Overlay)

**O componente mais importante da Landing Page.**

### Elementos
1. **Título:** "Conte qual é a sua situação"
2. **Descrição:** "Preencha os dados abaixo para continuar o atendimento pelo WhatsApp."
3. **Campo: Nome** (text, obrigatório)
4. **Campo: WhatsApp** (tel, obrigatório, máscara brasileira)
5. **Campo: Tipo de serviço** (select, obrigatório)
6. **Botão:** "Continuar no WhatsApp"
7. **Texto de privacidade** (discreto, link para política)
8. **Botão de fechar** (X)

### Opções do Select
- Aposentadoria Rural
- Salário-Maternidade
- Auxílio-Acidente
- Benefício negado pelo INSS
- BPC/LOAS
- Outro assunto previdenciário

### Acessibilidade
- Focus trap ativo
- Fechamento por ESC
- Fechamento por clique no backdrop
- Retorno de foco ao CTA que abriu
- Labels em todos os campos
- Aria-labels apropriados

### Comportamento
- Abre via `openLeadModal(service?, origin)`
- Se `service` fornecido, pré-seleciona no select
- Registra `form_open` ao abrir
- Registra `form_start` ao primeiro input
- Botão desabilitado durante submit
- Loading state durante submit
- Impede duplo envio

---

## Sticky Mobile CTA

### Elementos
- Botão: "Falar sobre minha situação"
- CTA origin: `sticky_mobile`

### Comportamento
- Visível apenas em mobile (< 768px)
- Fixo na parte inferior da tela
- Não deve atrapalhar leitura, campos ou acessibilidade
- Oculto quando o modal estiver aberto
- Oculto quando o usuário estiver no footer
- Respeitoso com área de safe-area em iOS
