import React from 'react';
import { CTAButton } from '@/components/ui/CTAButton/CTAButton';
import styles from './WhyAnalysis.module.css';

export const WhyAnalysis: React.FC = () => {
  return (
    <section id="analise" className={styles.section} aria-labelledby="why-analysis-heading">
      <div className="container">
        <div className={styles.header}>
          <h2 id="why-analysis-heading" className={styles.title}>
            Você manda uma mensagem. O resto é com a gente.
          </h2>
          <p className={styles.subtitle}>
            Sem fila, sem ir ao INSS, sem formulário complicado. Você só segue se achar que vale a pena.
          </p>
        </div>

        <div className={styles.pillarsGrid}>
          {/* Passo 1 */}
          <div className={styles.pillarCard}>
            <div className={styles.pillarNumber}>01</div>
            <h3 className={styles.pillarTitle}>Você conta sua situação</h3>
            <p className={styles.pillarText}>
              Pelo WhatsApp, em poucas linhas. Não precisa saber termo jurídico nem ter tudo em mãos.
            </p>
          </div>

          {/* Passo 2 */}
          <div className={styles.pillarCard}>
            <div className={styles.pillarNumber}>02</div>
            <h3 className={styles.pillarTitle}>A Dra. Josimara analisa</h3>
            <p className={styles.pillarText}>
              Ela olha seus documentos e te diz com sinceridade se vale a pena pedir. Você fotografa e manda pelo celular.
            </p>
          </div>

          {/* Passo 3 */}
          <div className={styles.pillarCard}>
            <div className={styles.pillarNumber}>03</div>
            <h3 className={styles.pillarTitle}>Ela cuida do pedido</h3>
            <p className={styles.pillarText}>
              Se fizer sentido, a Dra. faz o pedido no INSS e te avisa de cada passo até a resposta.
            </p>
          </div>
        </div>

        <div className={styles.calloutBox}>
          <div className={styles.calloutText}>
            <h3 className={styles.calloutHeading}>Você não precisa saber se tem direito. Só precisa perguntar.</h3>
            <p className={styles.calloutDesc}>
              Conte sua situação agora e descubra em poucos minutos qual é o seu caminho.
            </p>
          </div>
          <div className={styles.calloutAction}>
            <CTAButton origin="why_analysis" variant="primary" size="md">
              Quero começar agora
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};
