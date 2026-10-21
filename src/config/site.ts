export const SITE_CONFIG = {
  name: 'Dra. Josimara Lima',
  title: 'Salário-Maternidade no INSS — Dra. Josimara Lima, Advogada em Araripina/PE',
  shortTitle: 'Dra. Josimara Lima — Salário-Maternidade',
  role: 'Advogada Previdenciária',
  oab: '57.835',
  experienceYears: 'Há quase 10 anos na prática previdenciária',
  specialization: 'Pós-graduada em Direito Previdenciário',
  location: {
    city: 'Araripina',
    state: 'PE',
    country: 'Brasil',
    address: '[INSERIR ENDEREÇO]',
    description: 'Atendimento presencial em Araripina/PE e atendimento online para todo o Brasil',
  },
  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5587991658434',
    email: '[INSERIR EMAIL]',
  },
  meta: {
    description:
      'Teve bebê nos últimos 5 anos? Mães da roça, autônomas, MEI e desempregadas podem ter direito ao salário-maternidade do INSS. Atendimento em Araripina/PE e online para todo o Brasil.',
    keywords: [
      'Salário-Maternidade',
      'Salário-Maternidade Rural',
      'Salário-Maternidade INSS',
      'Salário-Maternidade Desempregada',
      'Salário-Maternidade MEI',
      'Advogada Previdenciária Araripina',
      'Direitos da Mulher INSS',
      'Dra. Josimara Lima',
    ],
  },
  disclaimer:
    'Este site tem caráter estritamente informativo e não constitui promessa ou garantia de concessão de benefício. As atividades profissionais observam rigorosamente as disposições do Código de Ética e Disciplina da Ordem dos Advogados do Brasil (OAB).',
};
