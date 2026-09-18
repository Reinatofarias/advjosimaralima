import { SERVICE_OPTIONS } from '@/config/services';

/**
 * Remove tags HTML e espaços excedentes
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>'"&]/g, '')
    .trim();
}

/**
 * Aplica máscara de telefone brasileiro: (00) 00000-0000 ou (00) 0000-0000
 */
export function maskPhoneBR(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 2) {
    return digits.length > 0 ? `(${digits}` : '';
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Normaliza número para envio ao WhatsApp e webhook: 55 + DDD + dígitos
 */
export function normalizePhone(value: string): string {
  let digits = value.replace(/\D/g, '');

  // Se o usuário digitou com 55 no início (12 ou 13 dígitos)
  if (digits.startsWith('55') && (digits.length === 12 || digits.length === 13)) {
    return digits;
  }

  // Se tem 10 ou 11 dígitos, adiciona DDI 55
  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }

  return digits;
}

/**
 * Valida se é um telefone brasileiro válido (10 ou 11 dígitos com DDD entre 11 e 99)
 */
export function isValidPhoneBR(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  const cleanDigits = digits.startsWith('55') && digits.length >= 12 ? digits.slice(2) : digits;

  if (cleanDigits.length !== 10 && cleanDigits.length !== 11) {
    return false;
  }

  const ddd = parseInt(cleanDigits.slice(0, 2), 10);
  if (ddd < 11 || ddd > 99) {
    return false;
  }

  // Impede sequências repetidas óbvias (ex: 00000000000, 99999999999)
  if (/^(\d)\1+$/.test(cleanDigits)) {
    return false;
  }

  return true;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: {
    nome?: string;
    telefone?: string;
    servico?: string;
  };
}

export function validateLeadForm(data: {
  nome: string;
  telefone: string;
  servico: string;
}): FormValidationResult {
  const errors: FormValidationResult['errors'] = {};

  const cleanName = sanitizeString(data.nome);
  if (!cleanName || cleanName.length < 2) {
    errors.nome = 'Por favor, informe seu nome.';
  } else if (cleanName.length > 100) {
    errors.nome = 'O nome não deve ultrapassar 100 caracteres.';
  }

  if (!data.telefone || !isValidPhoneBR(data.telefone)) {
    errors.telefone = 'Informe um número de WhatsApp válido com DDD.';
  }

  const validServiceValues = SERVICE_OPTIONS.map((opt) => opt.value as string);
  if (!data.servico || !validServiceValues.includes(data.servico)) {
    errors.servico = 'Por favor, selecione qual assunto deseja tratar.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
