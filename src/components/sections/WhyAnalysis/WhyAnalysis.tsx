import React from 'react';
import { CTAButton } from '@/components/ui/CTAButton/CTAButton';
import styles from './WhyAnalysis.module.css';

export const WhyAnalysis: React.FC = () => {
  return (
    <section id="analise" className={styles.section} aria-labelledby="why-analysis-heading">
      <div className="container">
        <div className={styles.header}>
          <h2 id="why-analysis-heading" className={styles.title}>
            Por que cada situação precisa de uma análise individual?
          </h2>
          <p className={styles.subtitle}>
            Não existe uma fórmula padrão para solicitações previdenciárias. Cada segurado construiu uma trajetória única de vida e trabalho perante o INSS.
          </p>
        </div>

        <div className={styles.pillarsGrid}>
          {/* Ponto 1: Documentação */}
          <div className={styles.pillarCard}>
            <div className={styles.pillarNumber}>01</div>
            <h3 className={styles.pillarTitle}>Documentação específica</h3>
            <p className={styles.pillarText}>
              Cada modalidade de benefício exige documentos próprios. Na atividade rural, contratos, notas fiscais e declarações do período precisam ser organizados com rigor para comprovar o efetivo exercício de trabalho.
            </p>
          </div>

          {/* Ponto 2: Requisitos */}
          <div className={styles.pillarCard}>
            <div className={styles.pillarNumber}>02</div>
            <h3 className={styles.pillarTitle}>Requisitos que variam</h3>
            <p className={styles.pillarText}>
              Idade, tempo de carência, períodos de contribuição e condições de saúde variam segundo a regra aplicável. Entender quais diretrizes e regras de transição atendem ao seu histórico evita pedidos indeferidos.
            </p>
          </div>

          {/* Ponto 3: Histórico */}
          <div className={styles.pillarCard}>
            <div className={styles.pillarNumber}>03</div>
            <h3 className={styles.pillarTitle}>Seu histórico importa</h3>
            <p className={styles.pillarText}>
              Períodos em lavoura, trabalho informal, vínculos em carteira ou recolhimentos em carnê compõem um histórico único que precisa ser analisado em conjunto, com cuidado e responsabilidade.
            </p>
          </div>
        </div>

        <div className={styles.calloutBox}>
          <div className={styles.calloutText}>
            <h3 className={styles.calloutHeading}>Deseja compreender as possibilidades do seu caso?</h3>
            <p className={styles.calloutDesc}>
              Apresente sua situação para que a documentação e os requisitos sejam examinados com clareza antes de qualquer requerimento.
            </p>
          </div>
          <div className={styles.calloutAction}>
            <CTAButton origin="why_analysis" variant="primary" size="md">
              Quero entender meu caso
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};
