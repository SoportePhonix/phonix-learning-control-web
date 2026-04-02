'use client';

import { useGetAdminInstancesQuery } from '@/lib/services/api/adminInstanceApi/adminInstanceApi';

export function useGetAdminInstances() {
  const { data, isLoading, isError, error, refetch } = useGetAdminInstancesQuery();

  return {
    adminInstances: data?.data ?? [],
    isLoading,
    isError,
    error,
    refetch,
  };
}
