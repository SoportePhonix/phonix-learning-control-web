'use client';

import { useEffect } from 'react';

import { useGetCompanyByIdQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useRBAC } from '@/rbac';
import { useSelectedCompany } from '@/utils/context/selectedCompanyContext';
import { useSessionContext } from '@/utils/context/sessionContext';
import { useRouter, useSearchParams } from 'next/navigation';

interface UseCompanyContextOptions {
  redirectOnMissing?: boolean;
  redirectPath?: string;
}

/**
 * Hook para obtener el companyId de la empresa seleccionada en el módulo manage-companies.
 *
 * Este hook prioriza:
 * 1. El companyId de los query params de la URL
 * 2. El companyId del contexto (guardado en localStorage)
 *
 * Si no hay empresa seleccionada y redirectOnMissing es true,
 * redirige al usuario a la página de empresas.
 *
 * @example
 * ```tsx
 * const { companyId, companyName, isLoading } = useCompanyContext();
 *
 * // Usar companyId para filtrar datos
 * const { data } = useGetStudentsByCompanyQuery(companyId);
 * ```
 */
export const useCompanyContext = (options: UseCompanyContextOptions = {}) => {
  const { redirectOnMissing = true, redirectPath = '/companies' } = options;
  const { selectedCompany, isCompanySelected, setSelectedCompany, isInitialized } = useSelectedCompany();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { isManager, loading: isRbacLoading } = useRBAC();
  const { session, loading: isSessionLoading } = useSessionContext();

  const companyIdFromUrl = searchParams.get('companyId');
  const parsedCompanyIdFromUrl = companyIdFromUrl ? parseInt(companyIdFromUrl, 10) : null;

  // Fetch company by ID from API (only when URL has companyId)
  const { data: companyData, isLoading: isCompanyLoading } = useGetCompanyByIdQuery(
    { companyId: companyIdFromUrl || '' },
    { skip: !companyIdFromUrl || isSessionLoading }
  );

  // Sincronizar URL con contexto: usar nombre de compañía del API
  useEffect(() => {
    if (
      parsedCompanyIdFromUrl &&
      companyData?.data?.name &&
      (!selectedCompany ||
        selectedCompany.id !== parsedCompanyIdFromUrl ||
        selectedCompany.name !== companyData.data.name)
    ) {
      // Actualizar solo cuando hay datos del API y algo ha cambiado
      setSelectedCompany({ id: parsedCompanyIdFromUrl, name: companyData.data.name });
    }
  }, [parsedCompanyIdFromUrl, companyData, selectedCompany, setSelectedCompany]);

  // Determinar el companyId final:
  // 1. URL manda (Admin que cambia de vista o entra por link)
  // 2. Sesión manda (Manager que entra a sus rutas)
  // 3. Fallback a memoria local (Admin ya habiendo ingresado antes sin ref refrescada en URL)
  const isValidCompanyId =
    parsedCompanyIdFromUrl && Number.isInteger(parsedCompanyIdFromUrl) && parsedCompanyIdFromUrl > 0;

  // 🔥 manager usa companies[0].id (sujeto a cambios)
  const validCompanyIdFromSession = session?.user?.companies?.[0]?.id ?? session?.user?.companyId;
  const companyId = isValidCompanyId
    ? parsedCompanyIdFromUrl
    : (validCompanyIdFromSession ?? selectedCompany?.id ?? null);

  // Obtener el nombre de la empresa con prioridad (IMMEDIATE resolution - no async wait):
  // 1. session.user.companies match (PRIMARY - already loaded, no async)
  // 2. API companyData (fallback if not in session)
  // 3. selectedCompany context (fallback if no API data)
  // 4. default: "Mi Empresa"

  let resolvedCompanyName: string | undefined;

  // PRIMARY: Search in session.user.companies first (immediate, synchronous)
  if (session?.user?.companies && companyId) {
    const company = session.user.companies.find((c: any) => c.id === companyId);
    resolvedCompanyName = company?.name;
  }

  // FALLBACK: Use API data if not found in session
  if (!resolvedCompanyName && companyData?.data?.name) {
    resolvedCompanyName = companyData.data.name;
  }

  // FALLBACK: Use context state
  if (!resolvedCompanyName && selectedCompany?.name) {
    resolvedCompanyName = selectedCompany.name;
  }

  // FALLBACK: For manager without companyId in URL (use first company from session)
  if (!resolvedCompanyName && isManager && session?.user?.companies?.[0]?.name) {
    resolvedCompanyName = session.user.companies[0].name;
  }

  const companyName = resolvedCompanyName || 'Mi Empresa';

  // isLoading es true hasta que:
  // 1. El contexto esté inicializado (si no hay companyId en URL)
  // 2. La sesión esté cargada
  // 3. La compañía del API esté cargada (si hay companyId en URL)
  const isLoading =
    (!companyIdFromUrl && !isInitialized) ||
    isRbacLoading ||
    isSessionLoading ||
    (companyIdFromUrl ? isCompanyLoading : false);

  // Redirigir si no hay empresa seleccionada (solo después de inicializar)
  useEffect(() => {
    if (redirectOnMissing && !isLoading && !companyId) {
      router.push(redirectPath);
    }
  }, [companyId, redirectOnMissing, redirectPath, router, isLoading]);

  return {
    companyId,
    companyName,
    isCompanySelected: companyId !== null,
    isLoading,
  };
};
