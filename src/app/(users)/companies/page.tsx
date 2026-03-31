'use client';

import { useEffect, useState } from 'react';

import { PageHeader } from '@/components/page-header';
import { Loader } from '@/components/ui/loader';
import { tableColumnsCompanies } from '@/features/companies/config/tableColumnsCompanies';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useTranslation } from '@/i18n';
import { Breadcrumb, DataTable } from '@/lib/phonix-ui';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useRBAC } from '@/rbac';
import { Role } from '@/rbac/config/roles';
import { useSessionContext } from '@/utils/context/sessionContext';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { t } = useTranslation();
  const router = useRouter();
  const { session, loading: isSessionLoading } = useSessionContext();
  const { isManager, hasRole, loading: isRbacLoading } = useRBAC();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { crumbRoutes } = useBreadcrumbs([{ label: 'Empresas' }], { withLoader: true });

  const isSuperAdmin = hasRole(Role.SUPERADMIN);

  const { data: companiesData, isLoading: isCompaniesLoading } = useGetCompaniesQuery(undefined, {
    skip: isManager && !isSuperAdmin, // Optimización: no hacer fetch si es estrictamente manager y no superadmin
  });

  const allowedCompanies = Array.isArray(session?.user?.companies) ? session.user.companies.map((c: any) => c.id) : [];

  const filteredCompanies = isSuperAdmin
    ? (companiesData?.data ?? [])
    : (companiesData?.data?.filter((c) => allowedCompanies.includes(c.id)) ?? []);

  useEffect(() => {
    if (isSessionLoading || isRbacLoading) return;

    if (session?.user && isManager && !isSuperAdmin) {
      setIsRedirecting(true);
      router.replace('/manage-companies/students');
    }
  }, [session, isSessionLoading, isRbacLoading, isManager, isSuperAdmin, router]);

  if (isSessionLoading || isRbacLoading || isRedirecting) {
    return <Loader message="Verificando acceso..." />;
  }

  // Previene el render de la tabla en caso de que el routing se retrase para managers puros
  if (isManager && !isSuperAdmin) {
    return null;
  }

  return (
    <div className="mb-8 px-2 flex flex-col">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader title={t('c.companies')} buttonLabel={t('a.addCompanies')} buttonHref="/companies/add" />

      <DataTable
        striped
        data={filteredCompanies}
        variant="primary"
        columns={tableColumnsCompanies(t)}
        isLoading={isCompaniesLoading}
        storageKey="datatable-companies"
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
