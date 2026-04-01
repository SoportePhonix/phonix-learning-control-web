'use client';

import { useMemo } from 'react';

import { PageHeader } from '@/components/page-header';
import { tableColumns } from '@/features/users/config/tableColumns';
import { useTranslation } from '@/i18n';
import { DataTable } from '@/lib/phonix-ui';
import { useGetAllUsersQuery } from '@/lib/services/api/usersApi/usersApi';
import { Role, normalizeRoleName } from '@/rbac/config/roles';
import { useSessionContext } from '@/utils/context/sessionContext';

export default function Page() {
  const { t } = useTranslation();
  const { session } = useSessionContext();

  const { data: usersData, isLoading, isFetching, error, status, isSuccess, isError } = useGetAllUsersQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  const currentInstanceId = session?.user?.instanceId || (session?.user as any)?.instance?.id;
  const roles = session?.user?.role || [];

  const isSuperAdmin = Array.isArray(roles) && roles.some((r: any) => normalizeRoleName(r.name) === Role.SUPERADMIN);
  const isAdmin = Array.isArray(roles) && roles.some((r: any) => normalizeRoleName(r.name) === Role.ADMIN);

  const filteredUsers = useMemo(() => {
    const users = usersData?.data ?? [];

    if (isSuperAdmin) return users;

    if (isAdmin) {
      return users.filter((user: any) => {
        const rawRoleName = user.role?.[0]?.name;
        const normalized = normalizeRoleName(rawRoleName);

        return normalized === Role.ADMIN || normalized === Role.MANAGER;
      });
    }

    return [];
  }, [usersData?.data, isSuperAdmin, isAdmin]);

  return (
    <div className="mb-8 -mt-1 px-2 flex flex-col">
      <PageHeader title={t('u.users')} buttonLabel={t('a.addUsers')} buttonHref="/users/add" />
      <DataTable
        striped
        data={filteredUsers}
        variant="primary"
        columns={tableColumns(t, currentUserId)}
        isLoading={isLoading || isFetching}
        storageKey="datatable-users"
        searchable
        enableFilters={false}
        labels={{
          columnsButton: 'Columnas',
          rowsSuffix: 'filas',
          fallbackColumnName: 'Columna',
        }}
      />
    </div>
  );
}
