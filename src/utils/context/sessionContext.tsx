'use client';

import { ReactNode, createContext, useContext } from 'react';

import type { Session } from '@/utils/session';
import { useSession } from 'next-auth/react';

export type { Session };

interface SessionContextProps {
  session: Session | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, status } = useSession();

  const session: Session | null = data ? (data as unknown as Session) : null;

  const loading = status === 'loading';

  return <SessionContext.Provider value={{ session, loading }}>{children}</SessionContext.Provider>;
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessionContext debe usarse dentro de SessionProvider');
  }
  return context;
};
