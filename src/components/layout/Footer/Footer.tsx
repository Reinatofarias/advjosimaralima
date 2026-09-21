import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/config/site';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.topSection}>
          <div className={styles.brandCol}>
            <Image
              src="/brand/logo-signature.png"
              alt="Josimara Lima Advocacia Previdenciária"
              width={242}
              height={200}
              className={styles.footerLogo}
            />
            <div className={styles.title}>{SITE_CONFIG.name}</div>
            <div className={styles.subtitle}>
              {SITE_CONFIG.role} • OAB/PE: {SITE_CONFIG.oab}
            </div>
            <p className={styles.location}>
              Atendimento presencial em Araripina, Pernambuco, e assessoria online para trabalhadores em todo o território nacional.
            </p>
          </div>

          <div className={styles.linksCol}>
            <div className={styles.colHeading}>Informações e Legal</div>
            <ul className={styles.linkList}>
              <li>
                <Link href="/politica-de-privacidade" className={styles.link}>
                  Política de Privacidade (LGPD)
                </Link>
              </li>
              <li>
                <span className={styles.nonLink}>Atendimento: Segunda a Sexta</span>
              </li>
              <li>
                <span className={styles.nonLink}>Araripina - Sertão do Araripe, PE</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomSection}>
          <p className={styles.disclaimer}>{SITE_CONFIG.disclaimer}</p>
          <div className={styles.copyright}>
            © {currentYear} {SITE_CONFIG.name}. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
