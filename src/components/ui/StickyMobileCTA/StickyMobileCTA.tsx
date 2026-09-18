'use client';

import React, { useState, useEffect } from 'react';
import { useLeadModal } from '@/context/LeadModalContext';
import styles from './StickyMobileCTA.module.css';

export const StickyMobileCTA: React.FC = () => {
  const { isOpen, openModal } = useLeadModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Exibe após pequeno scroll para não competir com o CTA do Hero imediatamente
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = 350;

      // Oculta ao atingir o final da página (Footer)
      const isNearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 250;

      if (scrollY > heroThreshold && !isNearBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Oculta totalmente quando o modal estiver aberto ou quando não atingir threshold
  if (isOpen || !isVisible) {
    return null;
  }

  return (
    <aside className={styles.stickyWrapper} aria-label="Ação rápida de contato móvel">
      <div className={styles.container}>
        <button
          type="button"
          className={styles.ctaBtn}
          onClick={() => openModal('sticky_mobile')}
        >
          <span className={styles.pulseDot} aria-hidden="true" />
          <span className={styles.text}>Falar sobre minha situação</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </aside>
  );
};
