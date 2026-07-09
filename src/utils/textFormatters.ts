/**
 * Capitaliza la primera letra de cada palabra en un string
 * Convierte todo el texto a minúsculas primero y luego capitaliza la primera letra de cada palabra
 * @param value - El valor a capitalizar (puede ser de cualquier tipo)
 * @returns String con la primera letra de cada palabra en mayúscula
 */
export const capitalizeFirst = (value: unknown): string => {
  if (value == null || value === '') return '';
  const str = String(value).toLowerCase();
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function capitalize(str: string): string {
  if (!str) return '';
  const s = String(str).toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Traduce los tipos de documento de identificación al español
 */
const DOCUMENT_TYPE_TRANSLATIONS: Record<string, string> = {
  Passport: 'Pasaporte',
  DNI: 'DNI',
  CI: 'Cédula de Identidad',
  NIE: 'NIE',
  'Driver License': 'Licencia de Conducir',
  'Driver\\sLicense': 'Licencia de Conducir',
  'Identity Card': 'Tarjeta de Identidad',
  'Tax ID': 'Identificación Fiscal',
  'Social Security': 'Seguro Social',
  'National ID': 'Identificación Nacional',
};

export const translateDocumentType = (type: string): string => {
  if (!type) return '';
  // Check exact match first
  if (DOCUMENT_TYPE_TRANSLATIONS[type]) {
    return DOCUMENT_TYPE_TRANSLATIONS[type];
  }
  // Check case-insensitive match
  const lowerType = type.toLowerCase();
  for (const [key, value] of Object.entries(DOCUMENT_TYPE_TRANSLATIONS)) {
    if (lowerType === key.toLowerCase()) {
      return value;
    }
  }
  // If no translation found, return original capitalized
  return capitalize(type);
};
