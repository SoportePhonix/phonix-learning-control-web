'use client';

import { useEffect } from 'react';

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

  // Sincronizar URL con contexto
  useEffect(() => {
    if (companyIdFromUrl) {
      const parsedId = parseInt(companyIdFromUrl, 10);
      if (!isNaN(parsedId) && (!selectedCompany || selectedCompany.id !== parsedId)) {
        setSelectedCompany({ id: parsedId });
      }
    }
  }, [companyIdFromUrl, selectedCompany, setSelectedCompany]);

  // Determinar el companyId final:
  // 1. URL manda (Admin que cambia de vista o entra por link)
  // 2. Sesión manda (Manager que entra a sus rutas)
  // 3. Fallback a memoria local (Admin ya habiendo ingresado antes sin ref refrescada en URL)
  const parsedCompanyId = Number(companyIdFromUrl);

  const isValidCompanyId = companyIdFromUrl && Number.isInteger(parsedCompanyId) && parsedCompanyId > 0;

  // 🔥 manager usa companies[0].id (sujeto a cambios)
  const validCompanyIdFromSession = session?.user?.companies?.[0]?.id ?? session?.user?.companyId;
  const companyId = isValidCompanyId ? parsedCompanyId : (validCompanyIdFromSession ?? selectedCompany?.id ?? null);

  // Obtener el nombre de la empresa
  let resolvedCompanyName = selectedCompany?.name;
  if (isManager && session?.user?.companies?.[0]?.name) {
    resolvedCompanyName = session.user.companies[0].name;
  }

  const companyName = resolvedCompanyName || 'Mi Empresa';

  // isLoading es true hasta que el contexto esté inicializado
  // Si hay companyId en la URL, no necesitamos esperar
  const isLoading = (!companyIdFromUrl && !isInitialized) || isRbacLoading || isSessionLoading;

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
