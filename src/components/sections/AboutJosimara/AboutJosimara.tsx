import React from 'react';
import { SITE_CONFIG } from '@/config/site';
import { CTAButton } from '@/components/ui/CTAButton/CTAButton';
import styles from './AboutJosimara.module.css';

export const AboutJosimara: React.FC = () => {
  return (
    <section className={styles.section} aria-labelledby="about-heading">
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.imageCol}>
            <div className={styles.portraitCard}>
              <div className={styles.portraitPlaceholder} role="img" aria-label="Foto profissional da Dra. Josimara Lima">
                <div className={styles.silhouette}>
                  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className={styles.captionBox}>
                  <span className={styles.captionName}>{SITE_CONFIG.name}</span>
                  <span className={styles.captionOab}>OAB/PE: {SITE_CONFIG.oab}</span>
                </div>
                <span className={styles.placeholderTag}>[Foto Dra. Josimara Lima]</span>
              </div>
            </div>
          </div>

          <div className={styles.infoCol}>
            <span className={styles.eyebrow}>Atuação Especializada</span>
            <h2 id="about-heading" className={styles.name}>
              {SITE_CONFIG.name}
            </h2>
            <div className={styles.roleTag}>
              {SITE_CONFIG.role} • {SITE_CONFIG.specialization}
            </div>

            <p className={styles.bioParagraph}>
              Com {SITE_CONFIG.experienceYears.toLowerCase()} de atuação direcionados às questões previdenciárias e benefícios do INSS, a Dra. Josimara Lima dedica seu trabalho ao esclarecimento de direitos de trabalhadores rurais e urbanos.
            </p>

            <p className={styles.bioParagraph}>
              Com escritório sediado em Araripina, no Sertão do Araripe (PE), e suporte online estruturado para atender trabalhadores de diversas regiões, sua condução profissional prioriza a transparência, a verificação documental rigorosa e o respeito à trajetória de cada segurado.
            </p>

            <blockquote className={styles.quoteBox}>
              <p className={styles.quoteText}>
                &ldquo;Cada pessoa que busca orientação tem uma história de trabalho e esforço. Nosso compromisso é ouvir atentamente, analisar a documentação com rigor técnico e explicar as reais possibilidades em linguagem simples e acessível.&rdquo;
              </p>
            </blockquote>

            <div className={styles.featuresRow}>
              <div className={styles.featureItem}>
                <span className={styles.featureCheck}>✓</span>
                <span>Atendimento presencial em Araripina/PE</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureCheck}>✓</span>
                <span>Atendimento online seguro em todo o Brasil</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureCheck}>✓</span>
                <span>Linguagem acessível e sem complicação</span>
              </div>
            </div>

            <div className={styles.ctaWrapper}>
              <CTAButton origin="about" variant="primary" size="lg">
                Falar sobre minha situação
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
