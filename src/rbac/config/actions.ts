import type { RoleName } from './types';

/**
 * Global actions supported by the RBAC system.
 * Adding a new action here automatically affects permission generation.
 *
 * Cada acción se combina con cada módulo para generar permisos:
 *   module + action → 'users.view', 'courses.create', etc.
 */
export const ACTIONS = ['view', 'create', 'edit', 'delete', 'manage'] as const;

/**
 * Tipo derivado del array ACTIONS.
 */
export type Action = (typeof ACTIONS)[number];

/**
 * Capacidades de un rol: qué acciones puede realizar y excepciones.
 */
export interface RoleCapability {
  /** Acciones que el rol puede realizar en todos los módulos */
  actions: readonly Action[];
  /** Permisos específicos a excluir (opcional) */
  exclude?: readonly `${string}.${string}`[];
}

/**
 * Capacidades por rol.
 *
 * Define las reglas generales de cada rol.
 * Los permisos se generan automáticamente a partir de estas reglas.
 *
 * - SUPERADMIN → todas las acciones en todos los módulos
 * - ADMIN → todas las acciones, excepto users.delete, companies e instances
 * - MANAGER → gestión completa de students, courses y lms (matrículas)
 *             de su propia empresa. Sin acceso a otros módulos.
 */
export const ROLE_CAPABILITIES: Record<RoleName, RoleCapability> = {
  superadmin: {
    actions: ACTIONS,
  },
  admin: {
    actions: ACTIONS,
  },
  manager: {
    actions: ACTIONS,
  },
};
