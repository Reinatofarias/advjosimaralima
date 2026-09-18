'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SERVICE_OPTIONS } from '@/config/services';
import { maskPhoneBR, validateLeadForm } from '@/lib/leads/validation';
import { submitLead } from '@/lib/leads/submitLead';
import { getSavedUtm } from '@/lib/utm/storage';
import { pushDataLayer } from '@/lib/analytics/dataLayer';
import { buildWhatsAppUrl } from '@/lib/whatsapp/buildUrl';
import styles from './LeadForm.module.css';

interface LeadFormProps {
  initialService?: string;
  ctaOrigin: string;
  formOpenedAt: number;
  onSuccess: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  initialService,
  ctaOrigin,
  formOpenedAt,
  onSuccess,
}) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [servico, setServico] = useState(initialService || '');
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<{ nome?: string; telefone?: string; servico?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const hasFiredFormStart = useRef(false);
  const nomeInputRef = useRef<HTMLInputElement>(null);

  // Auto-foco no primeiro campo ao carregar
  useEffect(() => {
    nomeInputRef.current?.focus();
  }, []);

  // Atualiza serviço se o modal for aberto com serviço pré-selecionado
  useEffect(() => {
    if (initialService) {
      setServico(initialService);
    }
  }, [initialService]);

  const handleFirstInteraction = () => {
    if (!hasFiredFormStart.current) {
      hasFiredFormStart.current = true;
      pushDataLayer({
        event: 'form_start',
        cta_origin: ctaOrigin,
      });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFirstInteraction();
    const masked = maskPhoneBR(e.target.value);
    setTelefone(masked);
    if (errors.telefone) {
      setErrors((prev) => ({ ...prev, telefone: undefined }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFirstInteraction();
    setNome(e.target.value);
    if (errors.nome) {
      setErrors((prev) => ({ ...prev, nome: undefined }));
    }
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleFirstInteraction();
    setServico(e.target.value);
    if (errors.servico) {
      setErrors((prev) => ({ ...prev, servico: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validação client-side
    const validation = validateLeadForm({ nome, telefone, servico });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Evento form_submit no dataLayer
    pushDataLayer({
      event: 'form_submit',
      cta_origin: ctaOrigin,
      service: servico,
    });

    try {
      const utm = getSavedUtm();
      const result = await submitLead({
        nome,
        telefone,
        servico,
        cta_origin: ctaOrigin,
        utm,
        honeypot,
        form_opened_at: formOpenedAt || Date.now(),
      });

      if (!result.success) {
        setServerError(result.error || 'Não foi possível enviar no momento. Tente novamente.');
        if (result.fields) {
          setErrors(result.fields);
        }
        setIsSubmitting(false);
        return;
      }

      // SUCESSO:
      const leadId = result.lead_id || 'generated';

      // 1. Dispara o evento de conversão principal (sem dados sensíveis)
      pushDataLayer({
        event: 'lead_created',
        lead_id: leadId,
        service: servico,
        cta_origin: ctaOrigin,
      });

      // 2. Dispara evento de redirecionamento WhatsApp
      pushDataLayer({
        event: 'whatsapp_redirect',
        lead_id: leadId,
        service: servico,
      });

      setIsSuccessMessage(true);

      // 3. Monta o link contextualizado do WhatsApp
      const selectedOption = SERVICE_OPTIONS.find((opt) => opt.value === servico);
      const servicoLabel = selectedOption?.label || servico;
      const waUrl = buildWhatsAppUrl(nome, servicoLabel);

      // 4. Aguarda pequeno delay para garantir envio do hit e feedback visual
      setTimeout(() => {
        window.location.href = waUrl;
        onSuccess();
      }, 700);
    } catch (err) {
      console.error('Erro ao submeter lead:', err);
      setServerError('Ocorreu um erro de conexão. Por favor, tente novamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Campo Honeypot Oculto (Anti-bot) */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input
          type="text"
          id="website"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {serverError && (
        <div className={styles.errorMessage} role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{serverError}</span>
        </div>
      )}

      {isSuccessMessage && (
        <div className={styles.successMessage} role="status">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Dados registrados! Abrindo WhatsApp da Dra. Josimara...</span>
        </div>
      )}

      {/* Campo Nome */}
      <div className={styles.fieldGroup}>
        <label htmlFor="lead-nome" className={styles.label}>
          Seu nome completo <span className={styles.required}>*</span>
        </label>
        <input
          ref={nomeInputRef}
          type="text"
          id="lead-nome"
          name="nome"
          className={`${styles.input} ${errors.nome ? styles.inputError : ''}`}
          placeholder="Ex: Maria da Silva"
          value={nome}
          onChange={handleNameChange}
          disabled={isSubmitting || isSuccessMessage}
          autoComplete="name"
          aria-required="true"
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? 'error-nome' : undefined}
        />
        {errors.nome && (
          <span id="error-nome" className={styles.fieldError}>
            {errors.nome}
          </span>
        )}
      </div>

      {/* Campo WhatsApp */}
      <div className={styles.fieldGroup}>
        <label htmlFor="lead-telefone" className={styles.label}>
          Seu WhatsApp com DDD <span className={styles.required}>*</span>
        </label>
        <input
          type="tel"
          id="lead-telefone"
          name="telefone"
          className={`${styles.input} ${errors.telefone ? styles.inputError : ''}`}
          placeholder="(87) 99999-9999"
          value={telefone}
          onChange={handlePhoneChange}
          disabled={isSubmitting || isSuccessMessage}
          autoComplete="tel"
          aria-required="true"
          aria-invalid={!!errors.telefone}
          aria-describedby={errors.telefone ? 'error-telefone' : undefined}
        />
        {errors.telefone && (
          <span id="error-telefone" className={styles.fieldError}>
            {errors.telefone}
          </span>
        )}
      </div>

      {/* Campo Tipo de Serviço */}
      <div className={styles.fieldGroup}>
        <label htmlFor="lead-servico" className={styles.label}>
          Qual assunto deseja analisar? <span className={styles.required}>*</span>
        </label>
        <div className={styles.selectWrapper}>
          <select
            id="lead-servico"
            name="servico"
            className={`${styles.select} ${errors.servico ? styles.inputError : ''}`}
            value={servico}
            onChange={handleServiceChange}
            disabled={isSubmitting || isSuccessMessage}
            aria-required="true"
            aria-invalid={!!errors.servico}
            aria-describedby={errors.servico ? 'error-servico' : undefined}
          >
            <option value="" disabled>
              Selecione sua situação
            </option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className={styles.selectArrow} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        {errors.servico && (
          <span id="error-servico" className={styles.fieldError}>
            {errors.servico}
          </span>
        )}
      </div>

      {/* Botão de Envio */}
      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isSubmitting || isSuccessMessage}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <span className={styles.loadingWrapper}>
            <span className={styles.spinner} aria-hidden="true" />
            <span>Processando...</span>
          </span>
        ) : (
          <span className={styles.btnContent}>
            <span>Continuar no WhatsApp</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </button>

      {/* Aviso de Privacidade LGPD */}
      <p className={styles.privacyText}>
        Seus dados são confidenciais e utilizados estritamente para o contato profissional inicial.{' '}
        <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className={styles.privacyLink}>
          Política de Privacidade
        </a>.
      </p>
    </form>
  );
};
