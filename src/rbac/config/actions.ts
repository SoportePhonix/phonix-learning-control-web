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

  /** Permisos específicos a incluir explícitamente (opcional) */
  include?: readonly `${string}.${string}`[];
}

/**
 * Helper para generar exclusiones de CRUD completo para ciertos módulos.
 */
const excludeRestrictedModules = (modules: string[]): `${string}.${string}`[] => {
  return modules.flatMap((mod) => ACTIONS.map((action) => `${mod}.${action}` as `${string}.${string}`));
};

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
    exclude: ['instances.view', 'instances.create', 'instances.edit', 'instances.delete', 'instances.manage'],
  },
  manager: {
    actions: ACTIONS,
    // Se excluyen totalmente los módulos globales para el manager
    exclude: excludeRestrictedModules([
      'companies',
      'instances',
      'users',
      'trainingPathways',
      'config', // Por si se añade un módulo general de configuraciones
    ]),
    include: [
      'manageCompanies.view', // 🔥 ESTA LÍNEA ES LA CLAVE (Llave de la puerta)
    ],
  },
};
