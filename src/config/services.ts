export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  ctaText: string;
  /** Valor de SERVICE_OPTIONS pré-selecionado no formulário */
  service: ServiceOptionValue;
  badge?: string;
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'mae_rural',
    title: 'Mãe da roça',
    shortDescription:
      'Planta, cria, trabalha no sítio da família? Mesmo sem nunca ter pago INSS, você pode ter direito.',
    ctaText: 'Sou da roça',
    service: 'salario_maternidade',
    badge: 'Trabalho Rural',
  },
  {
    id: 'autonoma_mei',
    title: 'Autônoma ou MEI',
    shortDescription:
      'Vende, faz unha, costura, tem CNPJ? Se contribuiu, o benefício pode ser seu.',
    ctaText: 'Trabalho por conta',
    service: 'salario_maternidade',
    badge: 'Por conta própria',
  },
  {
    id: 'desempregada',
    title: 'Desempregada',
    shortDescription:
      'Saiu do emprego e engravidou depois? Dependendo de quando, o direito continua valendo.',
    ctaText: 'Estou sem emprego',
    service: 'salario_maternidade',
    badge: 'Sem emprego',
  },
  {
    id: 'carteira_assinada',
    title: 'Carteira assinada',
    shortDescription:
      'A empresa não pagou ou te mandou embora? Tem caminho.',
    ctaText: 'Tenho carteira',
    service: 'salario_maternidade',
    badge: 'CLT',
  },
  {
    id: 'adocao',
    title: 'Mãe por adoção',
    shortDescription:
      'Adotou ou tem a guarda para adoção? Você também pode receber.',
    ctaText: 'Adotei',
    service: 'salario_maternidade',
    badge: 'Adoção',
  },
  {
    id: 'beneficio_negado',
    title: 'O INSS negou',
    shortDescription:
      'Pediu e veio "indeferido"? Uma negativa não é o fim.',
    ctaText: 'Meu pedido foi negado',
    service: 'beneficio_negado',
    badge: 'Reanálise de Negativa',
  },
];

export const SERVICE_OPTIONS = [
  { value: 'salario_maternidade', label: 'Salário-maternidade' },
  { value: 'beneficio_negado', label: 'O INSS negou meu pedido' },
  { value: 'gravidez_risco', label: 'Afastamento por gravidez de risco' },
  { value: 'bpc_loas', label: 'BPC para filho com deficiência' },
  { value: 'pensao_morte', label: 'Pensão por morte' },
  { value: 'aposentadoria_rural', label: 'Aposentadoria rural da mulher' },
  { value: 'outro', label: 'Outro assunto no INSS' },
] as const;

export type ServiceOptionValue = typeof SERVICE_OPTIONS[number]['value'];
