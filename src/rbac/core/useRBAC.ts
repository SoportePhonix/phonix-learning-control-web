'use client';

import { useMemo } from 'react';

import { useSessionContext } from '@/utils/context/sessionContext';

import { getPermissionsForRoles } from '../config/role-permissions';
import { normalizeRoleName } from '../config/roles';
import type { Permission, RoleName } from '../config/types';

/**
 * Hook principal de RBAC.
 *
 * Consume la sesión del usuario, extrae sus roles y calcula
 * los permisos efectivos (unión de todos los roles).
 *
 * @example
 * const { can, hasRole } = useRBAC();
 *
 * if (can('users.delete')) { ... }
 * if (hasRole('superadmin')) { ... }
 */
export function useRBAC() {
  const { session, loading } = useSessionContext();

  const roleNames = useMemo<string[]>(() => {
    return (
      session?.user?.role
        ?.map((r) => normalizeRoleName(r.name))
        .filter((name): name is RoleName => name !== undefined) ?? []
    );
  }, [session?.user?.role]);

  const permissions = useMemo(() => {
    return getPermissionsForRoles(roleNames);
  }, [roleNames]);

  /**
   * ¿El usuario tiene un permiso específico?
   */
  const can = (permission: Permission): boolean => {
    return permissions.has(permission);
  };

  /**
   * ¿El usuario tiene AL MENOS UNO de los permisos indicados?
   */
  const canAny = (perms: Permission[]): boolean => {
    return perms.some((p) => permissions.has(p));
  };

  /**
   * ¿El usuario tiene TODOS los permisos indicados?
   */
  const canAll = (perms: Permission[]): boolean => {
    return perms.every((p) => permissions.has(p));
  };

  /**
   * ¿El usuario tiene un rol específico?
   */
  const hasRole = (role: RoleName): boolean => {
    return roleNames.includes(role);
  };

  /**
   * ¿El usuario tiene al menos uno de los roles indicados?
   */
  const hasAnyRole = (roles: RoleName[]): boolean => {
    return roles.some((r) => roleNames.includes(r));
  };

  const isManager = hasRole('manager');

  const isReady = !loading && roleNames.length > 0;

  return {
    /** Permisos calculados del usuario (Set<Permission>) */
    permissions,
    /** Nombres de los roles del usuario */
    roleNames: roleNames as RoleName[],
    /** true mientras la sesión se está cargando */
    loading,
    /** true cuando la sesión cargó y los roles están disponibles */
    isReady,
    /** true si el usuario tiene el rol explícito de 'manager' */
    isManager,
    /** Verificar un permiso */
    can,
    /** Verificar si tiene al menos uno de varios permisos */
    canAny,
    /** Verificar si tiene todos los permisos indicados */
    canAll,
    /** Verificar un rol específico */
    hasRole,
    /** Verificar si tiene al menos uno de varios roles */
    hasAnyRole,
  };
}
