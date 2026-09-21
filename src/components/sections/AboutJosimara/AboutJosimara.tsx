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
                    src="/pictures/2.png"
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
              Há quase 10 anos na prática previdenciária, a Dra. Josimara Lima atua na análise de benefícios do INSS com atenção aos documentos, ao histórico de contribuições e à realidade de cada pessoa atendida.
            </p>

            <p className={styles.bioParagraph}>
              Com atendimento em Pernambuco e estrutura online para todo o país, seu trabalho é pautado pela escuta atenta, análise minuciosa da documentação e explicação transparente de cada etapa, sempre com linguagem simples e acolhedora.
            </p>

            <blockquote className={styles.quoteBox}>
              <p className={styles.quoteText}>
                &ldquo;Cada pessoa que nos procura traz uma trajetória de trabalho e esforço. Nosso dever é escutar com respeito, examinar a documentação com rigor técnico e apontar com clareza os caminhos viáveis.&rdquo;
              </p>
            </blockquote>

            <div className={styles.bulletList}>
              <div className={styles.bulletItem}>
                <span className={styles.bulletMark}>✓</span>
                <span>Atendimento presencial em Pernambuco</span>
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
