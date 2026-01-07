'use client';

import { CreateResourceButton } from '@/components/CreateResourceButton';
import { SectionTitle } from '@/components/section-title';
import { Button } from '@/components/ui';
import { DataTable } from '@/components/ui/data-table';
import { tableColumns } from '@/features/users/config/tableColumns';
import { useTranslation } from '@/i18n';
import { useGetAllUsersQuery } from '@/lib/services/api/usersApi/usersApi';
import { useSessionContext } from '@/utils/context/sessionContext';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const { t } = useTranslation();
  const { session } = useSessionContext();

  const { data: usersData, isLoading, isFetching, error, status, isSuccess, isError } = useGetAllUsersQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <SectionTitle title={t('u.users')} />
      <div className="flex justify-end mb-4">
        <CreateResourceButton href="/users/add" label={t('a.addUsers')} icon={<UserPlus />} />
      </div>

      <DataTable data={usersData?.data ?? []} columns={tableColumns(t, currentUserId)} />
    </div>
  );
}
