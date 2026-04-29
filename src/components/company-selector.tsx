'use client';

import React, { useMemo } from 'react';

import { SelectSearch } from '@/components/ui/SelectSearch';
import { useCompanyNavigation } from '@/features/students/hooks/useCompanyNavigation';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useRBAC } from '@/rbac';
import { Role } from '@/rbac/config/roles';
import { useSelectedCompany } from '@/utils/context/selectedCompanyContext';
import { useSessionContext } from '@/utils/context/sessionContext';
import { usePathname } from 'next/navigation';

/**
 * Selector de empresas para la navbar.
 * Solo visible para Super Admin y Admin.
 *
 * @example
 * ```tsx
 * <CompanySelector />
 * ```
 */
export function CompanySelector() {
  // ✅ ALL hooks MUST be called unconditionally and in the same order on every render
  const pathname = usePathname();
  const companyNav = useCompanyNavigation();
  const { selectedCompany } = useSelectedCompany();
  const { session, loading: isSessionLoading } = useSessionContext();
  const { hasRole, loading: isRbacLoading } = useRBAC();

  // Fetch todas las empresas (para Super Admin)
  // RTK query hook is always called (skip parameter is fine)
  const { data: allCompaniesData, isLoading: isLoadingAllCompanies } = useGetCompaniesQuery(undefined, {
    skip: isSessionLoading || isRbacLoading,
  });

  // Determinar si el usuario es Super Admin o Admin
  const isSuperAdmin = hasRole(Role.SUPERADMIN);
  const isAdmin = hasRole(Role.ADMIN);
  const isAdminLike = isSuperAdmin || isAdmin;

  // useMemo is ALWAYS called (with condition inside the callback)
  const companies = useMemo(() => {
    if (isSuperAdmin && allCompaniesData?.data) {
      return allCompaniesData.data;
    }
    if (isAdmin && session?.user?.companies) {
      return session.user.companies;
    }
    return [];
  }, [isSuperAdmin, isAdmin, allCompaniesData, session?.user?.companies]);

  // Manejar el cambio de empresa
  const handleChangeCompany = (companyId: string) => {
    companyNav.replace(pathname, companyId);
  };

  const isLoading = isSessionLoading || isRbacLoading || isLoadingAllCompanies;
  const selectedCompanyId = selectedCompany?.id ? String(selectedCompany.id) : '';

  // ✅ Use condition ONLY in JSX rendering, not around hooks
  if (!isAdminLike) {
    return null;
  }

  return (
    <div className="w-90 h-12 flex items-center">
      <SelectSearch<any>
        data={companies}
        valueKey="id"
        labelKey="name"
        selectedValue={selectedCompanyId}
        onSelect={handleChangeCompany}
        placeholder={isLoading ? 'Cargando...' : 'Seleccionar empresa'}
      />
    </div>
  );
}
