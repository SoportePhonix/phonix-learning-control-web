'use client';

import { useEffect, useState } from 'react';

import { CreateButton } from '@/components/CreateButton';
import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';
import { Loader } from '@/components/ui/loader';
import { tableColumnsCompanies } from '@/features/companies/config/tableColumnsCompanies';
import { useTranslation } from '@/i18n';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useRBAC } from '@/rbac';
import { useSessionContext } from '@/utils/context/sessionContext';
import { Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { t } = useTranslation();
  const router = useRouter();
  const { session, loading: isSessionLoading } = useSessionContext();
  const { isManager, loading: isRbacLoading } = useRBAC();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { data: companiesData, isLoading: isCompaniesLoading } = useGetCompaniesQuery(undefined, {
    skip: isManager, // Optimización: no hacer fecth de todas si es manager
  });

  const allowedCompanies = Array.isArray(session?.user?.companies) ? session.user.companies.map((c: any) => c.id) : [];

  const filteredCompanies = companiesData?.data?.filter((c) => allowedCompanies.includes(c.id)) ?? [];

  useEffect(() => {
    if (isSessionLoading || isRbacLoading) return;

    if (session?.user && isManager) {
      setIsRedirecting(true);
      router.replace('/manage-companies/students');
    }
  }, [session, isSessionLoading, isRbacLoading, isManager, router]);

  if (isSessionLoading || isRbacLoading || isRedirecting) {
    return <Loader message="Verificando acceso..." />;
  }

  // Previene el render de la tabla en caso de que el routing se retrase
  if (isManager) {
    return null;
  }

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <SectionTitle title={t('c.companies')} />

      <CreateButton href="/companies/add" label={t('a.addCompanies')} icon={<Building2 />} align="right" />

      <DataTable data={filteredCompanies} columns={tableColumnsCompanies(t)} />
    </div>
  );
}
