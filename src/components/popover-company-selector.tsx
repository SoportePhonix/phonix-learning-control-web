'use client';

import React, { useMemo } from 'react';

import { CompanySearchSelectContent } from '@/components/company-search-select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCompanyNavigation } from '@/hooks';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useRBAC } from '@/rbac';
import { Role } from '@/rbac/config/roles';
import { useSessionContext } from '@/utils/context/sessionContext';
import { usePathname, useSearchParams } from 'next/navigation';

interface PopoverCompanySelectorProps {
  /**
   * Controls whether the popover is open
   */
  isOpen: boolean;
  /**
   * Callback when the popover open state should change
   */
  onOpenChange: (open: boolean) => void;
  /**
   * The trigger element (typically the "Gestionar Empresa" button)
   */
  children: React.ReactNode;
}

/**
 * Sidebar company selector using the exact same content from CompanySearchSelect.
 * Maintains visual consistency while keeping the popover overlay pattern.
 */
export function PopoverCompanySelector({ isOpen, onOpenChange, children }: PopoverCompanySelectorProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  const prevCompanyIdRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const companyNav = useCompanyNavigation();
  const { session, loading: isSessionLoading } = useSessionContext();
  const { hasRole, loading: isRbacLoading } = useRBAC();

  const { data: allCompaniesData, isLoading: isLoadingAllCompanies } = useGetCompaniesQuery(undefined, {
    skip: isSessionLoading || isRbacLoading,
  });

  const isSuperAdmin = hasRole(Role.SUPERADMIN);
  const isAdmin = hasRole(Role.ADMIN);
  const isAdminLike = isSuperAdmin || isAdmin;

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

  const companyIdFromUrl = isMounted ? searchParams.get('companyId') : null;

  const selectedCompanyValue = React.useMemo(() => {
    if (!companyIdFromUrl || companies.length === 0) return undefined;

    const selectedCompany = companies.find((c) => String(c.value) === String(companyIdFromUrl));
    return selectedCompany?.value;
  }, [companyIdFromUrl, companies]);

  React.useEffect(() => {
    if (!isMounted || !isOpen) return;

    if (prevCompanyIdRef.current !== null && prevCompanyIdRef.current !== companyIdFromUrl) {
      onOpenChange(false);
    }

    prevCompanyIdRef.current = companyIdFromUrl;
  }, [companyIdFromUrl, isOpen, onOpenChange, isMounted]);

  const handleSelectCompany = (companyId: string) => {
    onOpenChange(false);

    let targetUrl = pathname;

    if (!pathname.startsWith('/manage-companies')) {
      targetUrl = '/manage-companies/students';
    }

    companyNav.replace(targetUrl, companyId);
  };

  if (!isAdminLike) {
    return <>{children}</>;
  }

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side="right" align="start" sideOffset={12} className="w-auto p-0 border-none">
        <CompanySearchSelectContent
          data={companies}
          valueKey="value"
          labelKey="label"
          selectedValue={selectedCompanyValue}
          onSelect={handleSelectCompany}
          variant="secondary"
          autoFocusInput={isOpen}
        />
      </PopoverContent>
    </Popover>
  );
}
