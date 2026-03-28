/**
 * Acciones posibles sobre un módulo.
 * Derivado del array ACTIONS en actions.ts.
 */
import type { Action } from './actions';

/**
 * Tipos específicos del negocio para el sistema RBAC.
 *
 * Para adaptar el RBAC a otro proyecto, modificar este archivo
 * y los demás archivos de config/.
 */

/**
 * Nombres de rol del sistema.
 * Extender este union type al agregar nuevos roles.
 */
export type RoleName = 'superadmin' | 'admin' | 'manager';

/**
 * Módulos del sistema sobre los que se definen permisos.
 */
export type Module =
  | 'users'
  | 'companies'
  | 'instances'
  | 'lms'
  | 'courses'
  | 'students'
  | 'trainingPathways'
  | 'trainingRoutes'
  | 'areas'
  | 'positions'
  | 'manageCompanies'
  | 'dashboard';

export type { Action };

/**
 * Permiso con formato "modulo.accion" (e.g. "users.create").
 * Template literal type para autocompletado completo.
 */
export type Permission = `${Module}.${Action}`;

/**
 * Mapa que asocia cada rol con su lista de permisos.
 */
export type RolePermissionMap = Record<RoleName, readonly Permission[]>;
