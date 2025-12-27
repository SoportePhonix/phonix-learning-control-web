'use client';

import { useEffect, useRef } from 'react';

import { SectionTitle } from '@/components/section-title';
import { Button } from '@/components/ui';
import { DataTable } from '@/components/ui/data-table';
import { Typography } from '@/components/ui/typography';
import { useTranslation } from '@/i18n';
import { useGetAllUsersQuery } from '@/lib/services/api/usersApi/usersApi';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

import { columns } from '../../../features/users/config/columns';

export default function Page() {
  const { t } = useTranslation();

  const { data: usersData, isLoading, isFetching, error, status, isSuccess, isError } = useGetAllUsersQuery();

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <SectionTitle title={t('u.users')} />
      <div className="flex justify-end mb-4">
        <Link href={'/users/add'}>
          <Button variant="secondary">
            <UserPlus />
            {t('a.addUsers')}
          </Button>
        </Link>
      </div>

      <DataTable data={usersData?.data ?? []} columns={columns(t)} />
    </div>
  );
}
