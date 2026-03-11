'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { getRequiredPermissions } from '../config/route-permissions';
import { useRBAC } from './useRBAC';

interface RouteGuardProps {
  children: ReactNode;
  /** Ruta a la que redirigir si no tiene acceso. Por defecto: '/unauthorized' */
  redirectTo?: string;
}

/**
 * Protege las páginas según los permisos del usuario.
 *
 * Lee el pathname actual, busca los permisos requeridos y valida con `canAll()`.
 * Si el usuario no tiene acceso, redirige a la ruta indicada.
 * Rutas sin permisos definidos son accesibles para cualquier usuario autenticado.
 *
 * @example
 * <RouteGuard>
 *   {children}
 * </RouteGuard>
 */
export function RouteGuard({ children, redirectTo = '/unauthorized' }: RouteGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { canAll, isReady } = useRBAC();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    const requiredPermissions = getRequiredPermissions(pathname);

    // Si la ruta no tiene permisos definidos, es accesible
    if (!requiredPermissions) {
      setAuthorized(true);
      return;
    }

    if (canAll(requiredPermissions)) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
      router.replace(redirectTo);
    }
  }, [pathname, isReady, canAll, router, redirectTo]);

  if (!isReady) {
    return null;
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
