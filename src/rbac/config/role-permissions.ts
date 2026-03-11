import { ROLE_CAPABILITIES } from './actions';
import { PERMISSIONS } from './permissions';
import type { Action, Permission, RolePermissionMap } from './types';

// ─── Generador automático de permisos por rol ───────────────────────
//
// Los permisos de cada rol se derivan automáticamente de:
//   1. Las capacidades definidas en ROLE_CAPABILITIES (actions.ts)
//   2. Todos los permisos registrados en PERMISSIONS
//
// Al agregar un módulo nuevo, los roles obtienen sus permisos
// automáticamente según sus capacidades. No hay que editar este archivo.

function buildRolePermissions(): RolePermissionMap {
  const allPermissions = Object.values(PERMISSIONS) as Permission[];

  const result = {} as Record<string, readonly Permission[]>;

  for (const [role, capability] of Object.entries(ROLE_CAPABILITIES)) {
    const allowed = allPermissions.filter((perm) => {
      const action = perm.split('.')[1] as Action;
      return capability.actions.includes(action);
    });

    result[role] = capability.exclude
      ? allowed.filter((p) => !(capability.exclude as readonly string[]).includes(p))
      : allowed;
  }

  return result as RolePermissionMap;
}

export const ROLE_PERMISSIONS: RolePermissionMap = buildRolePermissions();

/**
 * Dado un array de nombres de rol, devuelve el set combinado
 * de permisos (unión de todos los roles).
 */
export function getPermissionsForRoles(roleNames: string[]): Set<Permission> {
  const permissions = new Set<Permission>();

  for (const roleName of roleNames) {
    const rolePerms = ROLE_PERMISSIONS[roleName as keyof RolePermissionMap];
    if (rolePerms) {
      for (const perm of rolePerms) {
        permissions.add(perm);
      }
    }
  }

  return permissions;
}
