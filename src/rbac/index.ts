// ─── Core (motor RBAC reutilizable) ─────────────────────────────────
export { useRBAC } from './core/useRBAC';
export { RouteGuard } from './core/RouteGuard';
export { RoleGuard } from './core/RoleGuard';
export type { SessionRole } from './core/rbac.types';

// ─── Config (configuración específica del proyecto) ─────────────────
export { ACTIONS, ROLE_CAPABILITIES } from './config/actions';
export { PERMISSIONS } from './config/permissions';
export { ROLE_PERMISSIONS, getPermissionsForRoles } from './config/role-permissions';
export { Role, ROLE_HIERARCHY, ROLE_NAME_MAP, normalizeRoleName } from './config/roles';
export { ROUTE_PERMISSIONS, getRequiredPermissions } from './config/route-permissions';
export type { RoleName, Module, Action, Permission, RolePermissionMap } from './config/types';
