'use client';

import React, { useState } from 'react';
import { CTAButton } from '@/components/ui/CTAButton/CTAButton';
import styles from './FAQ.module.css';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Quem trabalhou na zona rural pode solicitar aposentadoria rural?',
    answer:
      'A aposentadoria rural é destinada aos trabalhadores que exerceram atividade no campo (como segurado especial em regime de economia familiar, empregado rural ou diarista). É necessário atingir a idade exigida por lei e comprovar o tempo de efetivo trabalho rural por meio de documentação correspondente. Cada trajetória precisa ser examinada individualmente para conferência dos requisitos.',
  },
  {
    question: 'Quais documentos podem ajudar na comprovação da atividade rural?',
    answer:
      'Diversos registros da época podem servir como início de prova material, tais como: contratos de parceria ou arrendamento, declarações de sindicato rural homologadas, notas fiscais de produtor, certidões de casamento ou nascimento constando a profissão de agricultor, fichas de matrícula escolar dos filhos e registros em cooperativas. Uma avaliação detalhada identifica quais documentos do seu acervo são válidos perante as exigências do INSS.',
  },
  {
    question: 'Quem teve benefício negado pode buscar uma nova análise?',
    answer:
      'Sim. O indeferimento administrativo pelo INSS não é definitivo. Em muitos casos, a negativa ocorre por ausência de um documento formal ou erro de cômputo de períodos. É possível apresentar recurso administrativo ou, se cabível, ingressar com ação judicial para reexame do pedido por um juiz federal.',
  },
  {
    question: 'Como funciona o atendimento online?',
    answer:
      'O atendimento online é realizado por meio de canais seguros (WhatsApp, videochamada ou e-mail). Você pode digitalizar ou fotografar seus documentos com o próprio celular e enviá-los para conferência. A análise técnica e as orientações são prestadas com a mesma proximidade, cuidado e sigilo do atendimento presencial no escritório.',
  },
  {
    question: 'Preciso morar em Araripina para ser atendida(o)?',
    answer:
      'Não. Embora o escritório físico esteja sediado em Araripina/PE, atendendo presencialmente todo o Sertão do Araripe e municípios vizinhos, a atuação online permite orientar trabalhadores rurais e segurados residentes em qualquer localidade do Brasil.',
  },
  {
    question: 'Como saber qual benefício pode se aplicar à minha situação?',
    answer:
      'O caminho mais prudente é apresentar seu caso para uma análise preliminar. Ao examinar sua idade, tempo de contribuição ou trabalho no campo, carnês e laudos médicos (no caso de benefícios por incapacidade), é possível apontar com clareza quais modalidades podem ser requeridas.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <div className="container">
        <div className={styles.header}>
          <h2 id="faq-heading" className={styles.title}>
            Perguntas Frequentes
          </h2>
          <p className={styles.subtitle}>
            Esclarecimentos sobre requerimentos, comprovações e modalidades de benefícios previdenciários.
          </p>
        </div>

        <div className={styles.accordionList}>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-head-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div key={index} className={`${styles.accordionItem} ${isOpen ? styles.itemOpen : ''}`}>
                <button
                  type="button"
                  id={headingId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className={styles.questionBtn}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className={styles.questionText}>{item.question}</span>
                  <span className={styles.chevron} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  className={`${styles.answerPanel} ${isOpen ? styles.panelVisible : ''}`}
                >
                  <p className={styles.answerText}>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bloco Final de Fechamento Editorial */}
        <div className={styles.finalBox}>
          <div className={styles.finalContent}>
            <h3 className={styles.finalTitle}>Ainda tem dúvidas sobre sua situação?</h3>
            <p className={styles.finalText}>
              O primeiro passo é explicar o que está acontecendo. Apresente seu caso para conversar diretamente com a assessoria da Dra. Josimara Lima pelo WhatsApp.
            </p>
          </div>
          <div className={styles.finalAction}>
            <CTAButton origin="faq_final" variant="primary" size="lg">
              Explicar minha situação
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};
