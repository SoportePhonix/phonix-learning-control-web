'use client';

import { useGetAdminsByInstanceQuery } from '@/lib/services/api/adminInstanceApi/adminInstanceApi';

export function useGetAdminsByInstance(instanceId: number, options?: { skip?: boolean }) {
  const { data, isLoading, isError, error, refetch, isFetching } = useGetAdminsByInstanceQuery({ instanceId }, options);

  return {
    admins: data?.data ?? [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  };
}
