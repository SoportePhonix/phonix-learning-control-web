import { UserFormValues } from '@/components/users/types';
import { useTranslation } from '@/i18n';
import { useUpdateUserMutation } from '@/lib/services/api/usersApi/usersApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useUpdateUser(userId: string) {
  const { t } = useTranslation();
  const router = useRouter();
  const [updateUserMutation, { isLoading, error }] = useUpdateUserMutation();

  const updateUser = async (values: UserFormValues) => {
    const payload = {
      name: values.name,
      lastName: values.lastName,
      typeOfIdentificationDocument: Number(values.typeOfIdentificationDocument),
      identificationDocument: values.identificationDocument,
      email: values.email,
      role: [{ id: Number(values.roleId) }],
      ...(values.password ? { password: values.password } : {}),
    };

    try {
      await updateUserMutation({
        id: Number(userId),
        ...payload,
      } as Parameters<typeof updateUserMutation>[0]).unwrap();

      toast.success(`${values.name} ${values.lastName} ${t('u.updatedSuccessfully')}`, {
        id: 'user-updated-success',
      });
      router.push('/users');
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
