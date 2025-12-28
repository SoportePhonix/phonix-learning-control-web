'use client';

import React, { ReactNode, createContext, useEffect, useRef } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface SessionExpiredValue {
  socket: WebSocket | null;
}

const SessionExpired = createContext<SessionExpiredValue | null>(null);

interface SessionExpiredProviderProps {
  children: ReactNode;
}

export const SessionExpiredProvider = ({ children }: SessionExpiredProviderProps) => {
  const session = useSession();
  const router = useRouter();
  const isLoggingOut = useRef(false);

  useEffect(() => {
    if (!session?.data?.user?.expiresAt) return;

    const expirationTime = Number(session.data.user.expiresAt);

    // Verificar inmediatamente si el token ya expiró
    const checkExpiration = () => {
      const currentTime = Date.now();
      const timeUntilExpiry = expirationTime - currentTime;

      // Si el token ya expiró o está por expirar en menos de 5 segundos
      if (timeUntilExpiry <= 5000 && !isLoggingOut.current) {
        isLoggingOut.current = true;
        console.warn('Token expirado. Redirigiendo al logout...');
        router.push('/logout');
        return true;
      }
      return false;
    };

    // Verificar inmediatamente
    if (checkExpiration()) return;

    // Verificar cada 10 segundos (más frecuente que antes)
    const interval = setInterval(() => {
      checkExpiration();
    }, 10000);

    // También verificar cuando la ventana recupera el foco (usuario regresa a la pestaña)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkExpiration();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [session, router]);

  return <SessionExpired.Provider value={{ socket: null }}>{children}</SessionExpired.Provider>;
};
