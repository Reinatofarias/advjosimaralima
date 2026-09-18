'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { pushDataLayer } from '@/lib/analytics/dataLayer';
import { CtaOrigin } from '@/lib/analytics/events';

interface LeadModalContextData {
  isOpen: boolean;
  selectedService: string | undefined;
  ctaOrigin: CtaOrigin | string;
  formOpenedAt: number;
  openModal: (origin: CtaOrigin | string, service?: string) => void;
  closeModal: () => void;
  triggerElementRef: React.MutableRefObject<HTMLElement | null>;
}

const LeadModalContext = createContext<LeadModalContextData>({} as LeadModalContextData);

export const LeadModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [ctaOrigin, setCtaOrigin] = useState<CtaOrigin | string>('hero');
  const [formOpenedAt, setFormOpenedAt] = useState<number>(0);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback((origin: CtaOrigin | string, service?: string) => {
    // Guarda o elemento ativo para devolver o foco após fechamento (A11y)
    if (typeof document !== 'undefined') {
      triggerElementRef.current = document.activeElement as HTMLElement;
    }

    const now = Date.now();
    setSelectedService(service);
    setCtaOrigin(origin);
    setFormOpenedAt(now);
    setIsOpen(true);

    // Dispara evento de abertura no dataLayer (sem PII)
    pushDataLayer({
      event: 'form_open',
      cta_origin: origin,
      service: service || 'geral',
    });
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Devolve o foco ao botão de origem
    if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
      setTimeout(() => {
        triggerElementRef.current?.focus();
      }, 50);
    }
  }, []);

  return (
    <LeadModalContext.Provider
      value={{
        isOpen,
        selectedService,
        ctaOrigin,
        formOpenedAt,
        openModal,
        closeModal,
        triggerElementRef,
      }}
    >
      {children}
    </LeadModalContext.Provider>
  );
};

export function useLeadModal() {
  const context = useContext(LeadModalContext);
  if (!context) {
    throw new Error('useLeadModal deve ser utilizado dentro de LeadModalProvider');
  }
  return context;
}
