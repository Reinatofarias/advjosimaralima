import React from 'react';
import { CTAButton } from '@/components/ui/CTAButton/CTAButton';
import { SITE_CONFIG } from '@/config/site';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <section className={styles.heroSection} aria-labelledby="hero-heading">
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.contentCol}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            <span>Direito Previdenciário</span>
          </div>

          <h1 id="hero-heading" className={styles.headline}>
            Sua situação com o INSS merece uma análise cuidadosa
          </h1>

          <p className={styles.subheadline}>
            Aposentadoria rural, salário-maternidade, auxílio-acidente ou benefício negado — cada história de trabalho tem detalhes decisivos. Apresente seu caso para entender como proceder.
          </p>

          <div className={styles.credentialsList}>
            <div className={styles.credItem}>
              <span className={styles.credIcon} aria-hidden="true">⏱</span>
              <span>{SITE_CONFIG.experienceYears} de atuação</span>
            </div>
            <div className={styles.credItem}>
              <span className={styles.credIcon} aria-hidden="true">🎓</span>
              <span>{SITE_CONFIG.specialization}</span>
            </div>
            <div className={styles.credItem}>
              <span className={styles.credIcon} aria-hidden="true">📍</span>
              <span>Araripina/PE e atendimento online</span>
            </div>
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
          <div className={styles.imageCard}>
            {/* Placeholder profissional estilizado para fotografia real da Dra. Josimara */}
            <div className={styles.photoPlaceholder} role="img" aria-label="Fotografia profissional da Dra. Josimara Lima, advogada previdenciária">
              <div className={styles.photoSilhouette}>
                <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className={styles.photoBadge}>
                <span className={styles.photoName}>{SITE_CONFIG.name}</span>
                <span className={styles.photoRole}>{SITE_CONFIG.role} • OAB/PE {SITE_CONFIG.oab}</span>
              </div>
              <div className={styles.photoNotice}>[Foto Profissional da Dra. Josimara Lima]</div>
            </div>

            {/* Card de destaque flutuante */}
            <div className={styles.floatingCard}>
              <div className={styles.floatingIcon} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className={styles.floatingInfo}>
                <span className={styles.floatingTitle}>Análise Individualizada</span>
                <span className={styles.floatingDesc}>Atenção respeitosa a cada caso</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
