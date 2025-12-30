'use client';

import { SectionTitle } from '@/components/section-title';
import { Button } from '@/components/ui';
import { DataTable } from '@/components/ui/data-table';
import { tableColumnsCompanies } from '@/features/companies/config/tableColumnsCompanies';
import { useTranslation } from '@/i18n';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useSessionContext } from '@/utils/context/sessionContext';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const { t } = useTranslation();
  const { session } = useSessionContext();

  const { data: companiesData, isLoading, isFetching, error, status, isSuccess, isError } = useGetCompaniesQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <SectionTitle title={t('c.companies')} />
      {/*       <div className="flex justify-end mb-4">
        <Link href={'/companies/add'}>
          <Button variant="secondary">
            <UserPlus />
            {t('a.addUsers')}
          </Button>
        </Link>
      </div> */}

      <DataTable data={companiesData?.data ?? []} columns={tableColumnsCompanies(t, currentUserId)} />
    </div>
  );
}
