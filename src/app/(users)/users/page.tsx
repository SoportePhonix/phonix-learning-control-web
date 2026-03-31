'use client';

import { CreateButton } from '@/components/CreateButton';
import { SectionTitle } from '@/components/section-title';
import { tableColumns } from '@/features/users/config/tableColumns';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useTranslation } from '@/i18n';
import { Breadcrumb, DataTable } from '@/lib/phonix-ui';
import { useGetAllUsersQuery } from '@/lib/services/api/usersApi/usersApi';
import { useSessionContext } from '@/utils/context/sessionContext';

export default function Page() {
  const { t } = useTranslation();
  const { session } = useSessionContext();
  const { crumbRoutes, isNavigating } = useBreadcrumbs([{ label: 'Usuarios' }], { withLoader: true });

  const { data: usersData, isLoading, isFetching, error, status, isSuccess, isError } = useGetAllUsersQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  return (
    <div className="mb-8 px-2 flex flex-col">
      <Breadcrumb items={crumbRoutes} />
      <div className="flex justify-between items-center pt-4 pb-8">
        <SectionTitle title={t('u.users')} />
        <CreateButton href="/users/add" label={t('a.addUsers')} align="right" />
      </div>

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
