import React from 'react';
import { CTAButton } from '@/components/ui/CTAButton/CTAButton';
import styles from './OtherRights.module.css';

const RIGHTS = [
  {
    title: 'Gravidez de risco',
    text: 'Afastada por ordem médica pode ter direito a auxílio do INSS.',
  },
  {
    title: 'Filho com deficiência',
    text: 'Famílias de baixa renda podem ter direito ao BPC.',
  },
  {
    title: 'Perdeu o companheiro',
    text: 'A pensão por morte pode ser sua e dos filhos.',
  },
  {
    title: 'Trabalhou a vida toda na roça',
    text: 'A mulher rural pode se aposentar aos 55 anos.',
  },
];

export const OtherRights: React.FC = () => {
  return (
    <section id="outros-direitos" className={styles.section} aria-labelledby="other-rights-heading">
      <div className="container">
        <div className={styles.header}>
          <h2 id="other-rights-heading" className={styles.title}>
            Não é só a maternidade.
          </h2>
          <p className={styles.subtitle}>Outros direitos da mulher no INSS que a Dra. Josimara também analisa.</p>
        </div>

        <div className={styles.grid}>
          {RIGHTS.map((right) => (
            <article key={right.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{right.title}</h3>
              <p className={styles.cardText}>{right.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.action}>
          <CTAButton origin="other_rights" variant="outline" size="md">
            Quero saber dos meus direitos
          </CTAButton>
        </div>
      </div>
    </section>
  );
};
