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
              <div className={styles.portraitFrame} role="img" aria-label="Fotografia profissional da Dra. Josimara Lima">
                <div className={styles.innerMat}>
                  <div className={styles.monogram}>
                    <Image
                      src="/brand/logo-symbol-blue-transparent.png"
                      alt=""
                      width={104}
                      height={104}
                      className={styles.symbolImage}
                    />
                  </div>
                  <div className={styles.portraitMeta}>
                    <span className={styles.metaName}>{SITE_CONFIG.name}</span>
                    <span className={styles.metaRole}>{SITE_CONFIG.role}</span>
                    <span className={styles.metaOab}>OAB/PE {SITE_CONFIG.oab}</span>
                  </div>
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
              Com {SITE_CONFIG.experienceYears.toLowerCase()} de dedicação contínua ao Direito Previdenciário, a Dra. Josimara Lima orienta trabalhadores rurais e urbanos que buscam compreender e requerer seus benefícios perante o INSS.
            </p>

            <p className={styles.bioParagraph}>
              Com sede em Araripina, no Sertão do Araripe pernambucano, e estrutura de atendimento online para todo o país, seu trabalho é pautado pela escuta atenta, análise minuciosa da documentação e explicação transparente de cada etapa, sempre com linguagem simples e acolhedora.
            </p>

            <blockquote className={styles.quoteBox}>
              <p className={styles.quoteText}>
                &ldquo;Cada pessoa que nos procura traz uma trajetória de trabalho e esforço. Nosso dever é escutar com respeito, examinar a documentação com rigor técnico e apontar com clareza os caminhos viáveis.&rdquo;
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
                <span>Linguagem acessível, clara e humanizada</span>
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
