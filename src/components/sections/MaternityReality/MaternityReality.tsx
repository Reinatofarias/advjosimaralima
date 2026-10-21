import React from 'react';
import { CTAButton } from '@/components/ui/CTAButton/CTAButton';
import styles from './MaternityReality.module.css';

const REASONS = [
  'Acha que só quem tem carteira assinada recebe.',
  'Acha que, como o bebê já nasceu, perdeu o prazo.',
  'Pediu sozinha, o INSS negou e ela desistiu.',
  'Não sabe quais documentos provam o trabalho na roça.',
];

export const MaternityReality: React.FC = () => {
  return (
    <section id="direito" className={styles.section} aria-labelledby="reality-heading">
      <div className="container">
        <div className={styles.band} role="note">
          <strong className={styles.bandStrong}>Não é Bolsa Família.</strong>{' '}
          É um direito do INSS da mãe que trabalha ou já trabalhou, inclusive na roça e sem carteira assinada. Uma coisa não substitui a outra.
        </div>

        <div className={styles.content}>
          <h2 id="reality-heading" className={styles.title}>
            O direito existe. O que falta é alguém pedir do jeito certo.
          </h2>
          <p className={styles.lead}>A maioria das mães perde o salário-maternidade por um destes motivos:</p>

          <ul className={styles.list}>
            {REASONS.map((reason) => (
              <li key={reason} className={styles.item}>
                <span className={styles.mark} aria-hidden="true">✕</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>

          <p className={styles.closing}>
            Nenhum desses é motivo para ficar sem. É motivo para olhar o seu caso com cuidado.
          </p>

          <CTAButton origin="maternity_reality" service="salario_maternidade" size="md">
            Quero que olhem o meu caso
          </CTAButton>
        </div>
      </div>
    </section>
  );
};
