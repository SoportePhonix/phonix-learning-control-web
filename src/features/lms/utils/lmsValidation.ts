import { LmsFormValues } from '@/components/lms/types';
import { TranslationKey } from '@/i18n';
import { UseFormReturn } from 'react-hook-form';

/**
 * Patrón de validación para URLs válidas
 * Acepta URLs con protocolo http o https, dominios válidos, localhost e IPs.
 */
const URL_PATTERN =
  /^https?:\/\/([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*|localhost|\d{1,3}(\.\d{1,3}){3})(:\d+)?(\/.*)?$/;

/**
 * Normaliza una URL agregando https:// si no tiene protocolo
 */
export function normalizeUrl(url: string): string {
  const trimmedUrl = url.trim();
  if (!trimmedUrl) return '';

  if (!/^https?:\/\//i.test(trimmedUrl)) {
    return `https://${trimmedUrl}`;
  }
  return trimmedUrl;
}

/**
 * Valida que una URL tenga formato válido
 */
export function isValidUrl(url: string): boolean {
  return URL_PATTERN.test(url);
}

/**
 * Valida la URL del formulario y establece error si es inválida
 * @returns URL normalizada si es válida, null si es inválida
 */
export function validateAndNormalizeUrl(
  url: string | undefined,
  form: UseFormReturn<LmsFormValues>,
  t: (key: TranslationKey) => string
): string | null {
  const normalizedUrl = normalizeUrl(url || '');

  if (!normalizedUrl) {
    form.setError('url', {
      type: 'manual',
      message: t('u.urlIsRequired'),
    });
    return null;
  }

  if (!isValidUrl(normalizedUrl)) {
    form.setError('url', {
      type: 'manual',
      message: t('u.urlMustBeValid'),
    });
    return null;
  }

  return normalizedUrl;
}

/**
 * Maneja errores de la API y establece errores en el formulario según corresponda
 * @returns true si el error fue manejado, false si necesita manejo adicional
 */
export function handleLmsApiError(
  err: any,
  form: UseFormReturn<LmsFormValues>,
  t: (key: TranslationKey) => string
): boolean {
  const status = err?.status ?? 500;
  const errorMessage = err?.data?.message || '';

  if (status === 409) {
    const lowerMessage = errorMessage.toLowerCase();

    if (lowerMessage.includes('name') || (lowerMessage.includes('lms') && lowerMessage.includes('exists'))) {
      form.setError('name', {
        type: 'manual',
        message: t('e.existingLmsName'),
      });
      return true;
    }
  }

  return false;
}

/**
 * Traduce mensajes de error del servidor a mensajes amigables en el idioma actual
 * @param serverMessage - Mensaje de error original del servidor
 * @param t - Función de traducción
 * @returns Mensaje traducido
 */
export function translateServerError(serverMessage: string, t: (key: TranslationKey) => string): string {
  const lowerMessage = serverMessage.toLowerCase();

  // Mapeo de patrones de error a claves de traducción
  const errorPatterns: Array<{ pattern: RegExp | string; key: TranslationKey; field?: keyof LmsFormValues }> = [
    { pattern: /url must be a url/i, key: 'e.errorServerUrlInvalid', field: 'url' },
    { pattern: /name.*required|name.*empty/i, key: 'e.errorServerNameRequired', field: 'name' },
    { pattern: /token.*required|token.*empty/i, key: 'e.errorServerTokenRequired', field: 'token' },
    { pattern: /type.*invalid|type.*must be/i, key: 'e.errorServerTypeInvalid', field: 'type' },
    { pattern: /company.*required|companyids.*empty/i, key: 'e.errorServerCompanyRequired', field: 'companyIds' },
  ];

  for (const { pattern, key } of errorPatterns) {
    const regex = typeof pattern === 'string' ? new RegExp(pattern, 'i') : pattern;
    if (regex.test(serverMessage)) {
      return t(key);
    }
  }

  return t('e.errorServerGeneric');
}

/**
 * Maneja errores del servidor y establece errores en campos específicos del formulario
 * @returns El mensaje de error traducido
 */
export function handleServerValidationError(
  serverMessage: string,
  form: UseFormReturn<LmsFormValues>,
  t: (key: TranslationKey) => string
): string {
  const translatedMessage = translateServerError(serverMessage, t);

  // Mapeo de patrones a campos del formulario
  const fieldPatterns: Array<{ pattern: RegExp; field: keyof LmsFormValues }> = [
    { pattern: /url/i, field: 'url' },
    { pattern: /name/i, field: 'name' },
    { pattern: /token/i, field: 'token' },
    { pattern: /type/i, field: 'type' },
    { pattern: /company|companyids/i, field: 'companyIds' },
  ];

  for (const { pattern, field } of fieldPatterns) {
    if (pattern.test(serverMessage)) {
      form.setError(field, {
        type: 'manual',
        message: translatedMessage,
      });
      break;
    }
  }

  return translatedMessage;
}
