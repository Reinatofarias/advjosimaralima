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
            <div className={styles.portraitFrame} role="img" aria-label="Retrato profissional da Dra. Josimara Lima, advogada previdenciária">
              <div className={styles.innerMat}>
                <div className={styles.photoCanvas}>
                  <div className={styles.monogram}>
                    <Image
                      src="/brand/logo-symbol-blue-transparent.png"
                      alt=""
                      width={112}
                      height={112}
                      className={styles.symbolImage}
                    />
                  </div>
                  <div className={styles.portraitText}>
                    <span className={styles.portraitTitle}>{SITE_CONFIG.name}</span>
                    <span className={styles.portraitSub}>Advogada Previdenciária</span>
                    <span className={styles.portraitOab}>OAB/PE {SITE_CONFIG.oab}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.captionBadge}>
              <div className={styles.captionIcon} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className={styles.captionInfo}>
                <span className={styles.captionMain}>Atendimento Individualizado</span>
                <span className={styles.captionDesc}>Atenção respeitosa a cada caso</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
