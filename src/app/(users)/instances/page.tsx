'use client';

import { PageHeader } from '@/components/page-header';
import { tableColumnsInstance } from '@/features/instance/config/tableColumnsInstance';
import { useTranslation } from '@/i18n';
import { DataTable } from '@/lib/phonix-ui';
import { useGetInstancesQuery } from '@/lib/services/api/instanceApi/instanceApi';
import { useSessionContext } from '@/utils/context/sessionContext';

export default function Page() {
  const { t } = useTranslation();
  const { session } = useSessionContext();

  const { data: instancesData, isLoading, isFetching, error, status, isSuccess, isError } = useGetInstancesQuery();
  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  return (
    <div className="mb-8 -mt-1 px-2 flex flex-col">
      <PageHeader title={t('i.instance')} buttonLabel={t('a.addInstance')} buttonHref="/instances/add" />
      <DataTable
        striped
        data={instancesData?.data ?? []}
        variant="primary"
        columns={tableColumnsInstance(t, currentUserId)}
        isLoading={isLoading || isFetching}
        storageKey="datatable-instances"
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
