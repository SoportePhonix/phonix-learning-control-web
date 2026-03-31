'use client';

import { CreateButton } from '@/components/CreateButton';
import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/ui/data-table';
import { tableColumnsInstance } from '@/features/instance/config/tableColumnsInstance';
import { useTranslation } from '@/i18n';
import { useGetInstancesQuery } from '@/lib/services/api/instanceApi/instanceApi';
import { useSessionContext } from '@/utils/context/sessionContext';
import { HousePlus } from 'lucide-react';

export default function Page() {
  const { t } = useTranslation();
  const { session } = useSessionContext();

  const { data: instancesData, isLoading, isFetching, error, status, isSuccess, isError } = useGetInstancesQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <PageHeader title={t('i.instance')} />

      <CreateButton href="/instances/add" label={t('a.addInstance')} icon={<HousePlus />} align="right" />

      <DataTable data={instancesData?.data ?? []} columns={tableColumnsInstance(t, currentUserId)} />
    </div>
  );
}
