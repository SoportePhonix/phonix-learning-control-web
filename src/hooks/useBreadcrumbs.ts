import { useState } from 'react';

import { useCompanyNavigation } from '@/features/students/hooks/useCompanyNavigation';
import { useNextCrumbs } from '@/lib/phonix-ui';
import { useRouter } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface UseBreadcrumbsOptions {
  withLoader?: boolean;
}

interface UseBreadcrumbsReturn {
  crumbRoutes: any[];
  isNavigating: boolean;
}

/**
 * Hook personalizado que simplifica el uso de breadcrumbs
 * Maneja internamente el useRouter para evitar repetir código
 * Incluye manejo automático del loader durante navegación (solo para items con path)
 * PRESERVA AUTOMÁTICAMENTE el companyId en todos los breadcrumb links
 *
 * @param items - Array de items para el breadcrumb
 * @param options - Opciones del hook (withLoader para activar funcionalidad de loader)
 * @returns Array de items procesados (por defecto) o Object con items y estado de navegación
 *
 * @example
 * ```tsx
 * // Uso tradicional (mantiene compatibilidad)
 * const crumbRoutes = useBreadcrumbs([
 *   { label: 'Inicio', path: '/masterskills' },
 *   { label: 'Mapa de habilidades' }
 * ]);
 *
 * // Uso con loader (solo se activa en items con path)
 * const { crumbRoutes, isNavigating } = useBreadcrumbs([
 *   { label: 'Inicio', path: '/masterskills' }, // ✅ Activará loader
 *   { label: 'Mapa de habilidades' } // ❌ No activará loader (sin path)
 * ], { withLoader: true });
 *
 * return (
 *   <>
 *     <Loader isVisible={isNavigating} />
 *     <Breadcrumb items={crumbRoutes} />
 *   </>
 * );
 * ```
 */
export function useBreadcrumbs(items: BreadcrumbItem[]): any[];
export function useBreadcrumbs(items: BreadcrumbItem[], options: { withLoader: true }): UseBreadcrumbsReturn;
export function useBreadcrumbs(items: BreadcrumbItem[], options?: UseBreadcrumbsOptions): any[] | UseBreadcrumbsReturn {
  const router = useRouter();
  const companyNav = useCompanyNavigation();
  const [isNavigating, setIsNavigating] = useState(false);

  // Transformar items para preservar companyId en los paths
  const itemsWithCompanyId: BreadcrumbItem[] = items.map((item) => {
    if (!item.path) {
      return item;
    }
    return {
      ...item,
      path: companyNav.href(item.path),
    };
  });

  // Obtener los breadcrumbs originales con paths que ya incluyen companyId
  const originalCrumbRoutes = useNextCrumbs(itemsWithCompanyId, router);

  if (options?.withLoader) {
    // Interceptar los eventos onClick para activar el loader solo en items que tienen path
    const crumbRoutes = originalCrumbRoutes.map((item: any, index: number) => {
      const originalItem = items[index];

      return {
        ...item,
        onClick:
          item.onClick && originalItem.path
            ? (...args: any[]) => {
                setIsNavigating(true);
                return item.onClick(...args);
              }
            : item.onClick,
      };
    });

    return {
      crumbRoutes,
      isNavigating,
    };
  }

  // Comportamiento tradicional (compatibilidad hacia atrás)
  return originalCrumbRoutes;
}
