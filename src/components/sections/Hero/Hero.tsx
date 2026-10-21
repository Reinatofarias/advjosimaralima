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
            Teve bebê nos últimos 5 anos? O INSS pode estar te devendo o salário-maternidade.
          </h1>

          <p className={styles.subheadline}>
            Trabalhou na roça, por conta própria, como MEI ou ficou desempregada? Muita mãe tem esse direito e nunca pediu. Você manda uma mensagem, a Dra. Josimara olha seu caso e te diz com clareza se dá ou não dá.
          </p>

          <div className={styles.metaRow}>
            <span className={styles.metaItem}>{SITE_CONFIG.experienceYears}</span>
            <span className={styles.metaSep} aria-hidden="true">•</span>
            <span className={styles.metaItem}>{SITE_CONFIG.specialization}</span>
            <span className={styles.metaSep} aria-hidden="true">•</span>
            <span className={styles.metaItem}>Pernambuco e atendimento online</span>
          </div>

          <div className={styles.ctaWrapper}>
            <CTAButton origin="hero" size="lg" className={styles.mainCta}>
              Quero saber se eu tenho direito
            </CTAButton>
            <span className={styles.ctaSubtext}>
              Leva 2 minutos • Tudo pelo WhatsApp, sem sair de casa
            </span>
          </div>
        </div>

        <div className={styles.mediaCol}>
          <div className={styles.frameContainer}>
            <div className={styles.portraitFrame}>
              <div className={styles.innerMat}>
                <Image
                  src="/pictures/7.png"
                  alt="Dra. Josimara Lima, advogada previdenciária"
                  width={1080}
                  height={1350}
                  className={styles.photoImage}
                  priority
                  sizes="(max-width: 992px) 520px, 620px"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
