import { UserFormValues } from '@/components/users/types';
import { useTranslation } from '@/i18n';
import { useUpdateUserMutation } from '@/lib/services/api/usersApi/usersApi';
import { useSessionContext } from '@/utils/context/sessionContext';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useUpdateUser(userId: string) {
  const { t } = useTranslation();
  const router = useRouter();
  const { session } = useSessionContext();
  const [updateUserMutation, { isLoading, error }] = useUpdateUserMutation();

  const updateUser = async (values: UserFormValues) => {
    const payload = {
      name: values.name,
      lastName: values.lastName,
      typeOfIdentificationDocument: Number(values.typeOfIdentificationDocument),
      identificationDocument: values.identificationDocument,
      email: values.email,
      role: [{ id: Number(values.roleId) }] as [{ id: number }],
      password: values.password,
    };

    try {
      await updateUserMutation({
        id: Number(userId),
        ...payload,
      }).unwrap();

      // Verificar si el usuario actualizado es el usuario actual
      const currentUserId = session?.user?.id ? Number(session.user.id) : null;
      const updatedUserId = Number(userId);
      const isOwnProfile = currentUserId === updatedUserId;

      toast.success(`${values.name} ${values.lastName} ${t('u.updatedSuccessfully')}`, {
        id: 'user-updated-success',
      });

      if (isOwnProfile) {
        // Si actualizó su propio perfil, cerrar sesión por seguridad
        toast.info(t('f.forSecurityYouMustLogInAgain'), {
          id: 'session-logout-info',
          duration: 3000,
        });

        // Esperar un momento para que el usuario vea el mensaje
        setTimeout(async () => {
          await signOut({ redirect: false });
          router.push('/login');
        }, 2000);
      } else {
        // Si actualizó otro usuario, redirigir a la lista
        router.push('/users');
      }
    } catch (err) {
      // El error ya está manejado por RTK Query en el estado 'error'
      toast.error(t('u.userUpdateFailed'));
    }
  };

  return {
    updateUser,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
