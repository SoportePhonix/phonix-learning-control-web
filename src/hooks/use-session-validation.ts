'use client';

import { useEffect, useRef } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

/**
 * Hook para validar automáticamente la sesión y redirigir si expira
 * @param checkIntervalMs - Intervalo de verificación en milisegundos (por defecto 10000 = 10 segundos)
 */
export function useSessionValidation(checkIntervalMs: number = 10000) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isRedirecting = useRef(false);

  useEffect(() => {
    // No verificar si no hay sesión o está cargando
    if (status !== 'authenticated' || !session?.user?.expiresAt) {
      return;
    }

    const checkTokenExpiration = () => {
      const expiresAt = Number(session.user.expiresAt);
      const now = Date.now();
      const timeUntilExpiry = expiresAt - now;

      // Si el token expiró o está por expirar en menos de 5 segundos
      if (timeUntilExpiry <= 5000 && !isRedirecting.current) {
        isRedirecting.current = true;
        console.warn('useSessionValidation: Token expirado, redirigiendo...');
        router.push('/logout');
      }
    };

    // Verificar inmediatamente
    checkTokenExpiration();

    // Configurar verificación periódica
    const interval = setInterval(checkTokenExpiration, checkIntervalMs);

    return () => clearInterval(interval);
  }, [session, status, router, checkIntervalMs]);

  return {
    session,
    status,
    isExpired: session?.user?.expiresAt ? Date.now() > Number(session.user.expiresAt) : false,
  };
}
