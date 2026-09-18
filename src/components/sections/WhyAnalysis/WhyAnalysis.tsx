import React from 'react';
import { CTAButton } from '@/components/ui/CTAButton/CTAButton';
import styles from './WhyAnalysis.module.css';

export const WhyAnalysis: React.FC = () => {
  return (
    <section className={styles.section} aria-labelledby="why-analysis-heading">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>Critérios Técnicos</span>
          <h2 id="why-analysis-heading" className={styles.title}>
            Por que cada situação precisa de uma análise individual?
          </h2>
          <p className={styles.subtitle}>
            Não existe uma fórmula única para solicitações previdenciárias. Cada trabalhador possui uma trajetória singular perante o INSS.
          </p>
        </div>

        <div className={styles.pillarsGrid}>
          {/* Ponto 1: Documentação */}
          <div className={styles.pillarCard}>
            <div className={styles.iconBox} aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h3 className={styles.pillarTitle}>Documentação específica</h3>
            <p className={styles.pillarText}>
              Cada benefício exige provas documentais distintas. Na atividade rural, por exemplo, contratos, notas e declarações do período precisam ser organizados e validados com atenção aos detalhes temporais.
            </p>
          </div>

          {/* Ponto 2: Requisitos */}
          <div className={styles.pillarCard}>
            <div className={styles.iconBox} aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <h3 className={styles.pillarTitle}>Requisitos que variam</h3>
            <p className={styles.pillarText}>
              Idade, tempo de carência, períodos de contribuição e condições de saúde mudam conforme a modalidade requerida. É fundamental avaliar quais regras de transição ou diretrizes vigentes se aplicam ao seu caso.
            </p>
          </div>

          {/* Ponto 3: Histórico */}
          <div className={styles.pillarCard}>
            <div className={styles.iconBox} aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className={styles.pillarTitle}>Seu histórico importa</h3>
            <p className={styles.pillarText}>
              Períodos trabalhados em lavoura, trabalho autônomo, registros formais em carteira ou carnês recolhidos compõem um histórico único que precisa ser examinado de forma integrada e prudente.
            </p>
          </div>
        </div>

        <div className={styles.bannerBox}>
          <div className={styles.bannerContent}>
            <h3 className={styles.bannerHeading}>Quer entender o que a legislação prevê para o seu caso?</h3>
            <p className={styles.bannerText}>
              Uma orientação jurídica transparente esclarece suas reais condições antes de dar entrada ou recorrer de qualquer pedido junto ao INSS.
            </p>
          </div>
          <div className={styles.bannerCta}>
            <CTAButton origin="why_analysis" variant="primary" size="md">
              Quero entender meu caso
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};
