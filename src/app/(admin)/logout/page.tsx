'use client';

import { useEffect, useState } from 'react';

import { Loader } from '@/components/ui/loader';
import { useLogoutMutation } from '@/lib/services/api';
import { useSessionContext } from '@/utils/context/sessionContext';
import { signOut } from 'next-auth/react';

export default function Logout() {
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const [logout, { isLoading, isError }] = useLogoutMutation();
  const { session, loading } = useSessionContext();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        if (!session) {
          console.warn('Session is null or expired. Logging out...');
          await signOut({ callbackUrl: '/login' });
          return;
        }
        const logoutRequest = await logout({ studentId: Number(session.user.id) }).unwrap();
        if (logoutRequest.status === 'success') {
          await signOut({ callbackUrl: '/login' });
        }
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        setIsLoggingOut(false);
      }
    };

    logoutUser();
  }, [logout, session]);

  if (isLoggingOut || isLoading || loading) {
    return <Loader message="Cerrando sesión..." />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center fixed inset-0 bg-red-500 bg-opacity-50 z-50">
        <p className="text-white">Error logging out. Please try again.</p>
      </div>
    );
  }

  return null;
}
