# 10 — LGPD

## Dados Coletados

### Formulário de Lead

| Dado | Finalidade | Base Legal |
|------|-----------|------------|
| Nome | Identificação no contato via WhatsApp | Consentimento |
| Telefone/WhatsApp | Contato para atendimento | Consentimento |
| Tipo de serviço | Direcionamento do atendimento | Consentimento |

### Dados Técnicos (não identificáveis)

| Dado | Finalidade | Base Legal |
|------|-----------|------------|
| UTM parameters | Análise de campanhas | Interesse legítimo |
| GCLID/GBRAID/WBRAID | Rastreamento de conversão Google Ads | Interesse legítimo |
| URL de origem | Análise de tráfego | Interesse legítimo |
| Referrer | Análise de tráfego | Interesse legítimo |

---

## Finalidade dos Dados

Os dados pessoais coletados (nome, telefone, tipo de serviço) são utilizados exclusivamente para:

1. **Contato:** Iniciar comunicação via WhatsApp
2. **Atendimento:** Direcionar a análise inicial da situação
3. **Registro:** Organizar o atendimento (Google Sheets)

Os dados **não são**:
- Vendidos a terceiros
- Compartilhados para fins de marketing de terceiros
- Utilizados para finalidades diferentes das informadas

---

## Consentimento

O consentimento é dado de forma ativa quando o usuário:
1. Preenche voluntariamente o formulário
2. Clica em "Continuar no WhatsApp"

O texto no formulário informa claramente:
> "Seus dados serão utilizados exclusivamente para contato e análise da sua solicitação. [Política de Privacidade]"

---

## Política de Privacidade

Disponível em: `/politica-de-privacidade`

### Conteúdo da Página

A política deve conter:

1. **Identificação do responsável**
   - Nome: Dra. Josimara Lima
   - OAB: `[INSERIR OAB/PE]`
   - Localização: Araripina, PE
   - Contato: `[INSERIR EMAIL]`

2. **Dados coletados**
   - Nome
   - Número de WhatsApp
   - Tipo de serviço de interesse

3. **Finalidade**
   - Contato para atendimento
   - Análise inicial da situação previdenciária
   - Organização do atendimento

4. **Base legal**
   - Consentimento do titular (Art. 7º, I, LGPD)

5. **Compartilhamento**
   - Dados são armazenados em Google Sheets (Google LLC)
   - Automação via Make (Celonis SE)
   - Não há compartilhamento com terceiros para fins de marketing

6. **Retenção**
   - Dados mantidos enquanto necessário para a finalidade informada
   - Titular pode solicitar exclusão a qualquer momento

7. **Direitos do titular**
   - Acesso aos dados
   - Correção
   - Exclusão
   - Portabilidade
   - Revogação do consentimento

8. **Contato para exercício de direitos**
   - E-mail: `[INSERIR EMAIL]`

9. **Cookies e tecnologias**
   - sessionStorage para UTM params (dados de sessão, não persistentes)
   - Google Tag Manager para analytics (sem PII)
   - Google Analytics 4 (sem PII)

10. **Atualizações**
    - A política pode ser atualizada a qualquer momento
    - A data da última atualização será indicada

---

## Minimização de Dados

A coleta é minimizada ao estritamente necessário:
- ✅ Nome (necessário para identificação)
- ✅ WhatsApp (necessário para contato)
- ✅ Tipo de serviço (necessário para direcionamento)
- ❌ CPF (não coletado)
- ❌ RG (não coletado)
- ❌ Renda (não coletado)
- ❌ E-mail (não coletado)
- ❌ Dados médicos (não coletados)
- ❌ Documentos (não coletados)

---

## Dados no dataLayer/Analytics

> **RESTRIÇÃO ABSOLUTA:** Dados pessoais identificáveis (nome, telefone) NUNCA são enviados para Google Analytics, Google Ads ou qualquer ferramenta de analytics.

O `lead_id` (UUID) é o único identificador enviado, e não é vinculável a dados pessoais sem acesso ao Google Sheets.

---

## Implementação Técnica

### No Formulário
- Texto informativo sobre uso dos dados
- Link para Política de Privacidade
- Sem checkbox obrigatório (o ato de preencher e enviar constitui consentimento)

### No Footer
- Link para Política de Privacidade

### Na API
- Dados sanitizados antes do armazenamento
- Sem logs de dados pessoais em ambientes de produção
