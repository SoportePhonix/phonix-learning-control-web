'use client';

import { useMemo } from 'react';

import { useGetInstancesByUserQuery } from '@/lib/services/api/adminInstanceApi/adminInstanceApi';
import { useGetInstancesQuery } from '@/lib/services/api/instanceApi/instanceApi';
import { Role, normalizeRoleName } from '@/rbac/config/roles';
import { useSessionContext } from '@/utils/context/sessionContext';

export function useGetInstancesSelect() {
  const { session } = useSessionContext();
  const userId = session?.user?.id ? Number(session.user.id) : null;
  const roles = session?.user?.role || [];
  const isSuperAdmin = Array.isArray(roles) && roles.some((r: any) => normalizeRoleName(r.name) === Role.SUPERADMIN);

  // DEBUG LOGS

  const allInstancesQuery = useGetInstancesQuery(undefined, { skip: !isSuperAdmin });
  const userInstancesQuery = useGetInstancesByUserQuery({ userId: userId ?? 0 }, { skip: isSuperAdmin || !userId });

  const queryResult = isSuperAdmin ? allInstancesQuery : userInstancesQuery;
  const { data, isLoading, isError, error, refetch } = queryResult;

  const selectData = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((item: any) => {
      // Ajuste porque admin-instance / user-instance suele devolver { instance: { id, name, nit } }
      const instanceObj = item.instance || item; // Fallback por si devuelve la instancia plana (como en getAll)
      return {
        label: instanceObj.name,
        value: (instanceObj.id ?? item.instanceId)?.toString() || instanceObj.nit?.toString(),
      };
    });
  }, [data]);

  return {
    data: selectData,
    isLoading,
    isError,
    error,
    refetch,
  };
}
