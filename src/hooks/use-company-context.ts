'use client';

import { useEffect } from 'react';

import { useSelectedCompany } from '@/utils/context/selectedCompanyContext';
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

  // Determinar el companyId final (priorizar URL, luego contexto)
  const companyId = companyIdFromUrl ? parseInt(companyIdFromUrl, 10) : (selectedCompany?.id ?? null);

  const companyName = selectedCompany?.name;

  // isLoading es true hasta que el contexto esté inicializado
  // Si hay companyId en la URL, no necesitamos esperar
  const isLoading = !companyIdFromUrl && !isInitialized;

  // Redirigir si no hay empresa seleccionada (solo después de inicializar)
  useEffect(() => {
    if (redirectOnMissing && isInitialized && !companyId) {
      router.push(redirectPath);
    }
  }, [companyId, redirectOnMissing, redirectPath, router, isInitialized]);

  return {
    companyId,
    companyName,
    isCompanySelected: companyId !== null,
    isLoading,
  };
};
