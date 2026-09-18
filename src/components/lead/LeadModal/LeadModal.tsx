'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { useLeadModal } from '@/context/LeadModalContext';
import { LeadForm } from '../LeadForm/LeadForm';
import styles from './LeadModal.module.css';

export const LeadModal: React.FC = () => {
  const { isOpen, closeModal, selectedService, ctaOrigin, formOpenedAt } = useLeadModal();
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Fecha ao pressionar ESC
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }

      // Focus Trap Acessível
      if (e.key === 'Tab' && modalContainerRef.current) {
        const focusableElements = modalContainerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    },
    [closeModal]
  );

  // Previne scroll do body enquanto o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
      aria-hidden={!isOpen}
    >
      <div
        ref={modalContainerRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={closeModal}
          aria-label="Fechar janela de contato"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
            <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
          </svg>
        </button>

        <div className={styles.header}>
          <div className={styles.badge}>Atendimento Previdenciário</div>
          <h2 id="modal-title" className={styles.title}>
            Conte qual é a sua situação
          </h2>
          <p id="modal-desc" className={styles.subtitle}>
            Preencha os dados abaixo para continuar o atendimento diretamente pelo WhatsApp da Dra. Josimara Lima.
          </p>
        </div>

        <div className={styles.content}>
          <LeadForm
            initialService={selectedService}
            ctaOrigin={ctaOrigin}
            formOpenedAt={formOpenedAt}
            onSuccess={closeModal}
          />
        </div>
      </div>
    </div>
  );
};
