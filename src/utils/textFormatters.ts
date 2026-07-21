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
