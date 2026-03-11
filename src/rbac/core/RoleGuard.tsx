'use client';

import type { ReactNode } from 'react';

import type { Permission, RoleName } from '../config/types';
import { useRBAC } from './useRBAC';

// ─── Props ──────────────────────────────────────────────────────────

interface BaseProps {
  /** Contenido a mostrar si el usuario tiene acceso */
  children: ReactNode;
  /** Contenido alternativo si NO tiene acceso (opcional) */
  fallback?: ReactNode;
}

interface PermissionProps extends BaseProps {
  /** Permiso requerido */
  permission: Permission;
  permissions?: never;
  role?: never;
  roles?: never;
  strategy?: never;
}

interface MultiPermissionProps extends BaseProps {
  permission?: never;
  /** Lista de permisos a verificar */
  permissions: Permission[];
  role?: never;
  roles?: never;
  /** 'any' = al menos uno (por defecto), 'all' = todos requeridos */
  strategy?: 'any' | 'all';
}

interface RoleProps extends BaseProps {
  permission?: never;
  permissions?: never;
  /** Rol requerido */
  role: RoleName;
  roles?: never;
  strategy?: never;
}

interface MultiRoleProps extends BaseProps {
  permission?: never;
  permissions?: never;
  role?: never;
  /** Lista de roles aceptados (basta con tener uno) */
  roles: RoleName[];
  strategy?: never;
}

type RoleGuardProps = PermissionProps | MultiPermissionProps | RoleProps | MultiRoleProps;

// ─── Componente ─────────────────────────────────────────────────────

/**
 * Muestra u oculta contenido según permisos o roles del usuario.
 *
 * @example
 * // Un permiso
 * <RoleGuard permission="users.create">
 *   <CreateButton />
 * </RoleGuard>
 *
 * // Varios permisos (al menos uno)
 * <RoleGuard permissions={['users.edit', 'users.manage']} strategy="any">
 *   <EditButton />
 * </RoleGuard>
 *
 * // Por rol
 * <RoleGuard role="superadmin">
 *   <DangerZone />
 * </RoleGuard>
 *
 * // Con fallback
 * <RoleGuard permission="users.delete" fallback={<span>Sin acceso</span>}>
 *   <DeleteButton />
 * </RoleGuard>
 */
export function RoleGuard(props: RoleGuardProps) {
  const { children, fallback = null } = props;
  const { can, canAny, canAll, hasRole, hasAnyRole, loading } = useRBAC();

  if (loading) {
    return null;
  }

  let hasAccess = false;

  if ('permission' in props && props.permission) {
    hasAccess = can(props.permission);
  } else if ('permissions' in props && props.permissions) {
    const strategy = props.strategy ?? 'any';
    hasAccess = strategy === 'all' ? canAll(props.permissions) : canAny(props.permissions);
  } else if ('role' in props && props.role) {
    hasAccess = hasRole(props.role);
  } else if ('roles' in props && props.roles) {
    hasAccess = hasAnyRole(props.roles);
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}
