'use client';

import { PageHeader } from '@/components/page-header';
import { tableColumnsLms } from '@/features/lms/config/tableColumnsLms';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useTranslation } from '@/i18n';
import { Breadcrumb, DataTable } from '@/lib/phonix-ui';
import { useGetLmsQuery } from '@/lib/services/api/lmsApi/lmsApi';

export default function Page() {
  const { t } = useTranslation();
  const { crumbRoutes } = useBreadcrumbs([{ label: 'LMS' }], { withLoader: true });

  const { data: lmsData, isLoading, isFetching } = useGetLmsQuery();

  return (
    <div className="mb-8 px-2 flex flex-col">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader title={t('l.lms')} buttonLabel={t('a.addLms')} buttonHref="/lms/add" />

      <DataTable
        striped
        data={lmsData?.data ?? []}
        variant="primary"
        columns={tableColumnsLms(t)}
        isLoading={isLoading || isFetching}
        storageKey="datatable-lms"
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
