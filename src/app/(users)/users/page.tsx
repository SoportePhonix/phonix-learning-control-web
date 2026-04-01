'use client';

import { PageHeader } from '@/components/page-header';
import { tableColumns } from '@/features/users/config/tableColumns';
import { useTranslation } from '@/i18n';
import { DataTable } from '@/lib/phonix-ui';
import { useGetAllUsersQuery } from '@/lib/services/api/usersApi/usersApi';
import { useSessionContext } from '@/utils/context/sessionContext';

export default function Page() {
  const { t } = useTranslation();
  const { session } = useSessionContext();

  const { data: usersData, isLoading, isFetching, error, status, isSuccess, isError } = useGetAllUsersQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  return (
    <div className="mb-8 -mt-1 px-2 flex flex-col">
      <PageHeader title={t('u.users')} buttonLabel={t('a.addUsers')} buttonHref="/users/add" />
      <DataTable
        striped
        data={usersData?.data ?? []}
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
