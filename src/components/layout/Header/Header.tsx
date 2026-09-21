'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { SITE_CONFIG } from '@/config/site';
import { CTAButton } from '@/components/ui/CTAButton/CTAButton';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.brand}>
          <Image
            src="/brand/logo-symbol.png"
            alt=""
            width={44}
            height={44}
            className={styles.brandMark}
            priority
          />
          <div className={styles.brandText}>
            <span className={styles.name}>{SITE_CONFIG.name}</span>
            <span className={styles.role}>{SITE_CONFIG.role} • Araripina/PE</span>
          </div>
        </div>

        <div className={styles.ctaWrapper}>
          <CTAButton origin="header" variant="header" size="sm">
            Falar com a Dra. Josimara
          </CTAButton>
        </div>
      </div>
    </header>
  );
};
