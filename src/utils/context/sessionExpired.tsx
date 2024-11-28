'use client';

import React, { ReactNode, createContext, useEffect } from 'react';

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

  useEffect(() => {
    const expirationTime = Number(session?.data?.user?.expiresAt);
    const interval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime > expirationTime) {
        router.push('/logout');
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [session, router]);

  return <SessionExpired.Provider value={{ socket: null }}>{children}</SessionExpired.Provider>;
};
