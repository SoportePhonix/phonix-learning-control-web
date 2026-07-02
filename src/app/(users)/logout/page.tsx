'use client';

import { useEffect, useState } from 'react';

import { Loader } from '@/components/ui/loader';
import { useLogoutMutation } from '@/lib/services/api';
import { invalidateSessionCache } from '@/lib/services/api/api';
import { useSessionContext } from '@/utils/context/sessionContext';
import { signOut } from 'next-auth/react';

export default function Logout() {
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [logout, { isLoading }] = useLogoutMutation();
  const { session, loading } = useSessionContext();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        invalidateSessionCache();

        if (!session) {
          await signOut({ redirect: false });
          window.location.href = '/login';
          return;
        }

        // const logoutRequest = await logout({ studentId: Number(session.user.id) }).unwrap();
        // if (logoutRequest.status === 'success') {
        //   await signOut({ redirect: false });
        //   window.location.href = '/login';
        // }
        //TODO pendiente implementar logout

        await signOut({ redirect: false });
        window.location.href = '/login';
      } catch (error) {
        console.error('Error during logout:', error);
        setLogoutError('Error al cerrar sesión. Intenta de nuevo.');
      }
    };

    logoutUser();
  }, [logout, session]);

  if (isLoading || loading) {
    return <Loader message="Cerrando sesión..." />;
  }

  if (logoutError) {
    return (
      <div className="flex items-center justify-center fixed inset-0 bg-red-500 bg-opacity-50 z-50">
        <p className="text-white">{logoutError}</p>
      </div>
    );
  }

  return null;
}
