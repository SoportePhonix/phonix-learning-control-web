import type { RoleName } from './types';

/**
 * Enum con los roles del sistema.
 * Usar estas constantes en lugar de strings sueltos.
 */
export const Role = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  MANAGER: 'manager',
} as const satisfies Record<string, RoleName>;

/**
 * Lista ordenada de roles (de mayor a menor privilegio).
 * Útil para validaciones de jerarquía si se necesitan en el futuro.
 */
export const ROLE_HIERARCHY: readonly RoleName[] = [Role.SUPERADMIN, Role.ADMIN, Role.MANAGER] as const;

/**
 * Mapa de normalización: nombre del backend (lowercase, sin espacios) → clave interna.
 *
 * El backend puede devolver nombres como "Super Admin", "Administrator", "Manager".
 * Este mapa los traduce a las claves internas usadas en ROLE_PERMISSIONS.
 *
 * Si el backend agrega un nuevo rol o cambia un nombre, solo hay que actualizar aquí.
 */
export const ROLE_NAME_MAP: Record<string, RoleName> = {
  superadmin: Role.SUPERADMIN,
  administrator: Role.ADMIN,
  admin: Role.ADMIN,
  manager: Role.MANAGER,
};

/**
 * Normaliza un nombre de rol del backend a la clave interna.
 * Retorna undefined si el rol no está mapeado.
 */
export function normalizeRoleName(backendName?: string): RoleName | string | undefined {
  if (!backendName) return undefined;

  const role = backendName.toLowerCase().replace(/\s+/g, '');

  if (role === 'administrator') return Role.ADMIN;
  if (role === 'superadmin') return Role.SUPERADMIN;

  return ROLE_NAME_MAP[role] || role;
}

/**
 * Verifica si un usuario con ciertos roles puede asignar un rol específico.
 */
export function canAssignRole(currentRoles: any[], targetRoleName: string): boolean {
  if (!Array.isArray(currentRoles)) return false;

  const isSuperAdmin = currentRoles.some((r: any) => normalizeRoleName(r.name) === Role.SUPERADMIN);

  // SuperAdmin puede todo
  if (isSuperAdmin) return true;

  // Admin solo NO puede asignar SuperAdmin
  if (normalizeRoleName(targetRoleName) === Role.SUPERADMIN) {
    return false;
  }

  // Todo lo demás permitido
  return true;
}
