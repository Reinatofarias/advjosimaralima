import React from 'react';
import Image from 'next/image';
import { CTAButton } from '@/components/ui/CTAButton/CTAButton';
import { SITE_CONFIG } from '@/config/site';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className={styles.heroSection} aria-labelledby="hero-heading">
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.contentCol}>
          <h1 id="hero-heading" className={styles.headline}>
            Sua situação com o INSS merece uma análise cuidadosa
          </h1>

          <p className={styles.subheadline}>
            Aposentadoria rural, salário-maternidade, auxílio-acidente ou benefício negado. Cada história de trabalho tem detalhes decisivos que precisam ser compreendidos individualmente antes de qualquer requerimento.
          </p>

          <div className={styles.metaRow}>
            <span className={styles.metaItem}>{SITE_CONFIG.experienceYears} de atuação</span>
            <span className={styles.metaSep} aria-hidden="true">•</span>
            <span className={styles.metaItem}>{SITE_CONFIG.specialization}</span>
            <span className={styles.metaSep} aria-hidden="true">•</span>
            <span className={styles.metaItem}>Araripina/PE e atendimento online</span>
          </div>

          <div className={styles.ctaWrapper}>
            <CTAButton origin="hero" size="lg" className={styles.mainCta}>
              Quero explicar minha situação
            </CTAButton>
            <span className={styles.ctaSubtext}>
              Atendimento inicial humanizado • Resposta rápida pelo WhatsApp
            </span>
          </div>
        </div>

        <div className={styles.mediaCol}>
          <div className={styles.frameContainer}>
            <div className={styles.portraitFrame}>
              <div className={styles.innerMat}>
                <Image
                  src="/pictures/3.png"
                  alt="Dra. Josimara Lima, advogada previdenciária"
                  width={1080}
                  height={1350}
                  className={styles.photoImage}
                  priority
                  sizes="(max-width: 992px) 520px, 680px"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
