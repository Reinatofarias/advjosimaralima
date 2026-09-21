export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  ctaText: string;
  badge?: string;
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'aposentadoria_rural',
    title: 'Aposentadoria Rural',
    shortDescription:
      'Para quem trabalhou ou trabalha na agricultura e zona rural. Análise detalhada do tempo de atividade, documentação necessária e requisitos legais.',
    ctaText: 'Entender minha situação',
    badge: 'Trabalho Rural',
  },
  {
    id: 'salario_maternidade',
    title: 'Salário-Maternidade',
    shortDescription:
      'Orientação para trabalhadoras rurais, autônomas e seguradas do INSS antes ou após o parto, com verificação da qualidade de segurado e comprovação de atividade.',
    ctaText: 'Entender minha situação',
    badge: 'Maternidade',
  },
  {
    id: 'auxilio_acidente',
    title: 'Auxílio-Acidente',
    shortDescription:
      'Para quem sofreu acidente de qualquer natureza que reduziu a capacidade para o trabalho habitual, mesmo após a recuperação e retorno às atividades.',
    ctaText: 'Entender minha situação',
    badge: 'Acidente / Sequelas',
  },
  {
    id: 'beneficio_negado',
    title: 'Benefício Negado pelo INSS',
    shortDescription:
      'Teve seu pedido indeferido? Muitas negativas ocorrem por inconformidades em documentos ou análise automática. Avaliação dos caminhos para reanálise.',
    ctaText: 'Entender minha situação',
    badge: 'Reanálise de Negativa',
  },
  {
    id: 'outro',
    title: 'Outros Benefícios Previdenciários',
    shortDescription:
      'BPC/LOAS (idosos e pessoas com deficiência de baixa renda), pensão por morte, aposentadoria por invalidez e outras demandas junto à Previdência.',
    ctaText: 'Entender minha situação',
    badge: 'INSS Geral',
  },
];

export const SERVICE_OPTIONS = [
  { value: 'aposentadoria_rural', label: 'Aposentadoria Rural' },
  { value: 'salario_maternidade', label: 'Salário-Maternidade' },
  { value: 'auxilio_acidente', label: 'Auxílio-Acidente' },
  { value: 'beneficio_negado', label: 'Benefício negado pelo INSS' },
  { value: 'bpc_loas', label: 'BPC/LOAS (Benefício de Prestação Continuada)' },
  { value: 'outro', label: 'Outro assunto previdenciário' },
] as const;

export type ServiceOptionValue = typeof SERVICE_OPTIONS[number]['value'];
