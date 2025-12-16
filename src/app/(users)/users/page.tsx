'use client';

import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui';
import { DataTable } from '@/components/ui/data-table';
import { Typography } from '@/components/ui/typography';
import { useTranslation } from '@/i18n';
import { useGetAllUsersQuery } from '@/lib/services/api/usersApi/usersApi';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { columns } from '../../../hooks/users/columns';

export default function Page() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasShownToast = useRef(false);
  const { data: usersData, isLoading, isFetching, error, status, isSuccess, isError } = useGetAllUsersQuery();

  useEffect(() => {
    const created = searchParams.get('created');

    if (created === 'true' && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.success(t('u.userCreatedSuccessfully'));
      router.replace('/users');
    }
  }, [searchParams, router]);

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <Typography variant="titulo_medio" className="text-var--negro font-light mb-4">
        {t('u.users')}
      </Typography>

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
