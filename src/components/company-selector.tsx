'use client';

import React, { useMemo } from 'react';

import { useCompanyNavigation } from '@/hooks/useCompanyNavigation';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useRBAC } from '@/rbac';
import { Role } from '@/rbac/config/roles';
import { useSessionContext } from '@/utils/context/sessionContext';
import { SelectSearch } from '@soportephonix/phx-search-select';
import { usePathname, useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const companyNav = useCompanyNavigation();
  const { session, loading: isSessionLoading } = useSessionContext();
  const { hasRole, loading: isRbacLoading } = useRBAC();

  // Fetch todas las empresas
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
    const raw = (() => {
      if (isSuperAdmin) return allCompaniesData?.data ?? [];

      if (isAdmin) {
        return (allCompaniesData?.data ?? []).filter(
          (company: { id: number | string; name: string; instanceId?: number | string }) =>
            company.instanceId === session?.user?.instanceId
        );
      }

      return [];
    })();
    return raw.map((c: { id: number | string; name: string }) => ({
      value: String(c.id),
      label: c.name,
    }));
  }, [isSuperAdmin, isAdmin, allCompaniesData, session?.user?.instanceId]);

  // Manejar el cambio de empresa
  const handleChangeCompany = (companyId: string) => {
    companyNav.replace(pathname, companyId);
  };

  const isLoading = isSessionLoading || isRbacLoading || isLoadingAllCompanies;

  // ✅ URL es la única fuente de verdad
  const companyIdFromUrl = searchParams.get('companyId');
  const selectedCompanyId = companyIdFromUrl
    ? String(companyIdFromUrl)
    : companies.length > 0
      ? String(companies[0].value)
      : undefined;

  // ✅ Use condition ONLY in JSX rendering, not around hooks
  if (!isAdminLike) {
    return null;
  }

  return (
    <div className="w-90 ml-8 mt-4">
      <SelectSearch
        variant="secondary"
        data={companies}
        valueKey="value"
        labelKey="label"
        selectedValue={selectedCompanyId}
        onSelect={handleChangeCompany}
        placeholder={isLoading ? 'Cargando...' : 'Seleccionar empresa'}
      />
    </div>
  );
}
