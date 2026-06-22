'use client';

import React, { useEffect, useState } from 'react';

import { PageHeader } from '@/components/page-header';
import { Loader } from '@/components/ui/loader';
import { tableColumnsCompanies } from '@/features/companies/config/tableColumnsCompanies';
import { useTranslation } from '@/i18n';
import { DataTable } from '@/lib/phonix-ui';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useRBAC } from '@/rbac';
import { Role, normalizeRoleName } from '@/rbac/config/roles';
import { useSessionContext } from '@/utils/context/sessionContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Page() {
  const { t } = useTranslation();
  const router = useRouter();
  const { session, loading: isSessionLoading } = useSessionContext();
  const { isManager, hasRole, loading: isRbacLoading } = useRBAC();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const currentInstanceId = session?.user?.instanceId;
  const roles = session?.user?.role || [];
  const isSuperAdmin = Array.isArray(roles) && roles.some((r: any) => normalizeRoleName(r.name) === Role.SUPERADMIN);
  const isAdministrator = Array.isArray(roles) && roles.some((r: any) => normalizeRoleName(r.name) === Role.ADMIN);

  const { data: companiesData, isLoading: isCompaniesLoading } = useGetCompaniesQuery();

  const companies = companiesData?.data || [];

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

  const isAllowed = isSuperAdmin || (isAdministrator && !!currentInstanceId);
  if (!isAllowed) {
    toast.error('No tienes acceso a este apartado. Este usuario no pertenece a una instancia.');
    return null;
  }

  return (
    <div className="mb-8 -mt-1 px-2 flex flex-col">
      <PageHeader title={t('c.companies')} buttonLabel={t('a.addCompanies')} buttonHref="/companies/add" />

      <DataTable
        striped
        data={companies}
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
