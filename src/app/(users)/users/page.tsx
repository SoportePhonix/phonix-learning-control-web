'use client';

import { Button } from '@/components/ui';
import { DataTable } from '@/components/ui/data-table';
import { Typography } from '@/components/ui/typography';
import { useTranslation } from '@/i18n';
import { useGetAllUsersQuery } from '@/lib/services/api/usersApi/usersApi';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

import { columns } from '../../../hooks/users/columns';

export default function Page() {
  const { t } = useTranslation();

  const { data: usersData, isLoading, isFetching, error, status, isSuccess, isError } = useGetAllUsersQuery();

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <Typography variant="titulo_medio" className="text-var--negro font-light mb-4">
        {t('u.users')}
      </Typography>

      <div>
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
