'use client';

import { Role, normalizeRoleName } from '@/rbac/config/roles';
import { useSessionContext } from '@/utils/context/sessionContext';

import { useGetInstancesByUser } from './useGetInstancesByUser';

export function useCurrentInstance() {
  const { session, loading: sessionLoading } = useSessionContext();
  const userId = session?.user?.id ? Number(session.user.id) : null;

  const roles = session?.user?.role || [];
  const isSuperAdmin = Array.isArray(roles) && roles.some((r: any) => normalizeRoleName(r.name) === Role.SUPERADMIN);

  const { instances, isLoading: instancesLoading } = useGetInstancesByUser(userId ?? 0, {
    skip: !userId || isSuperAdmin,
  });

  if (isSuperAdmin) {
    return {
      instanceId: null,
      instanceName: null,
      isLoading: false,
    };
  }

  const currentInstance = instances?.[0];
  const instanceId = currentInstance?.instanceId;
  const instanceName = currentInstance?.instance?.name;

  return {
    instanceId,
    instanceName,
    isLoading: sessionLoading || instancesLoading,
  };
}
