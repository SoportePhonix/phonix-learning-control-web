'use client';

import { PageHeader } from '@/components/page-header';
import { tableColumnsAdminInstance } from '@/features/adminInstance/config/tableColumnsAdminInstance';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useTranslation } from '@/i18n';
import { Breadcrumb, DataTable } from '@/lib/phonix-ui';
import { useGetAdminInstancesQuery } from '@/lib/services/api/adminInstanceApi/adminInstanceApi';
import { useSessionContext } from '@/utils/context/sessionContext';

export default function AdminInstancesPage() {
  const { t } = useTranslation();
  const { session } = useSessionContext();
  const { crumbRoutes } = useBreadcrumbs([{ label: t('a.adminInstances') as string }], { withLoader: true });

  const { data: adminInstancesData, isLoading, isFetching } = useGetAdminInstancesQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  return (
    <div className="mb-8 px-2 flex flex-col">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader
        title={t('a.adminInstances') as string}
        buttonLabel={t('a.addAdminInstance') as string}
        buttonHref="/admin-instances/add"
      />

      <DataTable
        striped
        data={adminInstancesData?.data ?? []}
        variant="primary"
        columns={tableColumnsAdminInstance(t, currentUserId)}
        isLoading={isLoading || isFetching}
      />
    </div>
  );
}
