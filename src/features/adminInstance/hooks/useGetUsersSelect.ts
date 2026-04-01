'use client';

import { useMemo } from 'react';

import { useGetAllUsersQuery } from '@/lib/services/api/usersApi/usersApi';

export function useGetUsersSelect() {
  const { data, isLoading, isError, error, refetch } = useGetAllUsersQuery();

  const selectData = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((user) => ({
      label: `${user.name} ${user.lastName}`,
      value: user.id.toString(),
    }));
  }, [data]);

  return {
    data: selectData,
    isLoading,
    isError,
    error,
    refetch,
  };
}
