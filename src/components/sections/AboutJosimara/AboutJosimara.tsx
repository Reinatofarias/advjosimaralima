import React from 'react';
import Image from 'next/image';
import { SITE_CONFIG } from '@/config/site';
import { CTAButton } from '@/components/ui/CTAButton/CTAButton';
import styles from './AboutJosimara.module.css';

export const AboutJosimara: React.FC = () => {
  return (
    <section id="sobre" className={styles.section} aria-labelledby="about-heading">
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.imageCol}>
            <div className={styles.frameWrapper}>
              <div className={styles.portraitFrame}>
                <div className={styles.innerMat}>
                  <Image
                    src="/pictures/6.png"
                    alt="Dra. Josimara Lima em atendimento profissional"
                    width={1080}
                    height={1350}
                    className={styles.aboutPhoto}
                    sizes="(max-width: 992px) 540px, 650px"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.infoCol}>
            <h2 id="about-heading" className={styles.name}>
              {SITE_CONFIG.name}
            </h2>
            <div className={styles.roleTitle}>
              {SITE_CONFIG.role} • {SITE_CONFIG.specialization}
            </div>

            <p className={styles.bioParagraph}>
              Há quase 10 anos a Dra. Josimara Lima ajuda mães do Sertão e de todo o Brasil a entender o que o INSS deve a elas.
            </p>

            <p className={styles.bioParagraph}>
              Ela explica tudo sem juridiquês e te fala a verdade: se o seu caso tem chance, ela diz. Se não tem, ela também diz.
            </p>

            <blockquote className={styles.quoteBox}>
              <p className={styles.quoteText}>
                &ldquo;Toda mãe merece saber o que é dela. Meu trabalho é olhar o seu caso com cuidado e te mostrar o caminho, sem enrolação.&rdquo;
              </p>
            </blockquote>

            <div className={styles.bulletList}>
              <div className={styles.bulletItem}>
                <span className={styles.bulletMark}>✓</span>
                <span>Atendimento presencial em Araripina/PE</span>
              </div>
              <div className={styles.bulletItem}>
                <span className={styles.bulletMark}>✓</span>
                <span>Atendimento online para todo o Brasil</span>
              </div>
              <div className={styles.bulletItem}>
                <span className={styles.bulletMark}>✓</span>
                <span>Documentos enviados pelo celular, sem sair de casa</span>
              </div>
            </div>

            <div className={styles.ctaWrapper}>
              <CTAButton origin="about" variant="primary" size="lg">
                Quero falar com a Dra. Josimara
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
