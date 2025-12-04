'use client';

import { Breadcrumb } from '@/components/ui';
import { BreadcrumbItem, BreadcrumbList } from '@/components/ui/breadcrumb';
import { DataTable } from '@/components/ui/data-table';
import { Typography } from '@/components/ui/typography';
import { useTranslation } from '@/i18n';
import { useGetAllUsersQuery } from '@/lib/services/api/usersApi/usersApi';
import Link from 'next/link';

import { columns } from './columns';

export default function Page() {
  const { t } = useTranslation();

  const { data: usersData, isLoading, isFetching, error } = useGetAllUsersQuery();

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <Typography variant="titulo_medio" className="text-var--negro font-light mb-4">
        {t('l.login')}
      </Typography>
      <div className="">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbList>
                <Link href="/users">Users</Link>
              </BreadcrumbList>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Typography variant="parrafo" className="text-var--negro font-light mb-4">
        <DataTable columns={columns(t)} data={usersData?.data ?? []} />
      </Typography>
    </div>
  );
}
