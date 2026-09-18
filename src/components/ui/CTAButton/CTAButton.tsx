'use client';

import React from 'react';
import { useLeadModal } from '@/context/LeadModalContext';
import { CtaOrigin } from '@/lib/analytics/events';
import styles from './CTAButton.module.css';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  origin: CtaOrigin | string;
  service?: string;
  variant?: 'primary' | 'secondary' | 'header' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  origin,
  service,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  onClick,
  ...props
}) => {
  const { openModal } = useLeadModal();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    openModal(origin, service);
    if (onClick) {
      onClick(e);
    }
  };

  const buttonClasses = [
    styles.btn,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={buttonClasses} onClick={handleClick} {...props}>
      <span className={styles.btnText}>{children}</span>
      <svg
        className={styles.icon}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );
};
