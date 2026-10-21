'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CTAButton } from '@/components/ui/CTAButton/CTAButton';
import styles from './FAQ.module.css';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Recebo Bolsa Família. Posso pedir o salário-maternidade?',
    answer:
      'São coisas diferentes: o Bolsa Família é um programa social, e o salário-maternidade é um direito do INSS de quem trabalha ou já trabalhou. Receber um não impede de pedir o outro. A Dra. Josimara te explica como fica no seu caso.',
  },
  {
    question: 'Meu filho já nasceu. Ainda dá tempo?',
    answer:
      'Em regra, o pedido pode ser feito em até 5 anos depois do parto. Se o seu bebê nasceu nesse período, vale a pena olhar o seu caso.',
  },
  {
    question: 'Nunca paguei INSS. Tenho direito?',
    answer:
      'Se você trabalha na roça em regime de economia familiar, pode ter direito mesmo sem nunca ter contribuído. Nos outros casos, depende do seu histórico de trabalho e contribuições.',
  },
  {
    question: 'O INSS já negou meu pedido. E agora?',
    answer:
      'A negativa não é definitiva. Muitas acontecem por falta de um documento ou por análise automática, e podem ser revistas por recurso ou, quando cabível, na Justiça.',
  },
  {
    question: 'Preciso ir até o escritório?',
    answer:
      'Não. Você fotografa os documentos com o celular e manda pelo WhatsApp. O escritório fica em Araripina/PE, e o atendimento online vale para todo o Brasil.',
  },
  {
    question: 'Quanto custa?',
    answer:
      'Na primeira conversa a Dra. Josimara entende o seu caso e explica tudo, inclusive os honorários, antes de você decidir qualquer coisa.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="duvidas" className={styles.section} aria-labelledby="faq-heading">
      <div className="container">
        <div className={styles.header}>
          <h2 id="faq-heading" className={styles.title}>
            As dúvidas que toda mãe tem
          </h2>
          <p className={styles.subtitle}>
            Respostas diretas, sem juridiquês.
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
          <div className={styles.finalPortrait} aria-hidden="true">
            <Image
              src="/pictures/1.png"
              alt=""
              width={1080}
              height={1350}
              className={styles.finalPortraitImage}
              sizes="280px"
            />
          </div>
          <div className={styles.finalContent}>
            <h3 className={styles.finalTitle}>Cada mês que passa é um mês mais perto do prazo acabar.</h3>
            <p className={styles.finalText}>
              Você não precisa saber se tem direito. Só precisa perguntar. Mande sua mensagem agora e descubra em poucos minutos.
            </p>
          </div>
          <div className={styles.finalAction}>
            <CTAButton origin="faq_final" variant="primary" size="lg">
              Quero saber se eu tenho direito
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};
