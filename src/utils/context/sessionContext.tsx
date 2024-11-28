'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { getSession } from 'next-auth/react';

export interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    last_name: string;
    expiresAt: string;
  };
  expires: string;
  status: 'authenticated' | 'unauthenticated';
  update: () => Promise<void>;
}

interface SessionContextProps {
  session: Session | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const sessionData = await getSession();
      if (sessionData) {
        setSession(sessionData as unknown as Session);
      }
      setLoading(false);
    };

    loadSession();
  }, []);

  return <SessionContext.Provider value={{ session, loading }}>{children}</SessionContext.Provider>;
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessionContext debe usarse dentro de SessionProvider');
  }
  return context;
};
