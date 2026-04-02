'use client';

import { useGetInstancesByUserQuery } from '@/lib/services/api/adminInstanceApi/adminInstanceApi';

export function useGetInstancesByUser(userId: number, options?: { skip?: boolean }) {
  const { data, isLoading, isError, error, refetch, isFetching } = useGetInstancesByUserQuery({ userId }, options);

  return {
    instances: data?.data ?? [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  };
}
