import { UserFormValues } from '@/components/users/types';
import { useTranslation } from '@/i18n';
import { useGetAllRolesQuery } from '@/lib/services/api/rolesApi/rolesApi';
import { useUpdateUserMutation } from '@/lib/services/api/usersApi/usersApi';
import { Role, canAssignRole, normalizeRoleName } from '@/rbac/config/roles';
import { useSessionContext } from '@/utils/context/sessionContext';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useUpdateUser(userId: string) {
  const { t } = useTranslation();
  const router = useRouter();
  const { session } = useSessionContext();
  const currentInstanceId = session?.user?.instanceId || (session?.user as any)?.instance?.id;
  const currentRoles = session?.user?.role || [];
  const { data: rolesData } = useGetAllRolesQuery();
  const [updateUserMutation, { isLoading, error }] = useUpdateUserMutation();

  const updateUser = async (values: UserFormValues) => {
    const selectedRole = rolesData?.data?.find((r: any) => String(r.id) === String(values.roleId));
    const normalizedRole = normalizeRoleName(selectedRole?.name);

    if (normalizedRole === Role.MANAGER && !values.companyId) {
      toast.error('Debes seleccionar una empresa para crear un Manager');
      return;
    }

    if (selectedRole && !canAssignRole(currentRoles, selectedRole.name)) {
      toast.error('No tienes permisos para asignar este rol');
      return;
    }

    const finalInstanceId = currentInstanceId || values.instanceId;

    const payload = {
      name: values.name,
      lastName: values.lastName,
      typeOfIdentificationDocument: Number(values.typeOfIdentificationDocument),
      identificationDocument: values.identificationDocument,
      email: values.email,
      role: [{ id: Number(values.roleId) }] as [{ id: number }],
      password: values.password,
      ...(values.companyId !== '' && values.companyId != null ? { companyId: Number(values.companyId) } : {}),
      ...(finalInstanceId !== '' && finalInstanceId != null ? { instanceId: Number(finalInstanceId) } : {}),
      status: values.status ?? 'active',
    };

    try {
      await updateUserMutation({
        id: Number(userId),
        ...payload,
      }).unwrap();

      const currentUserId = session?.user?.id ? Number(session.user.id) : null;
      const updatedUserId = Number(userId);
      const isOwnProfile = currentUserId === updatedUserId;

      toast.success(`${values.name} ${values.lastName} ${t('u.updatedSuccessfully')}`, {
        id: 'user-updated-success',
      });

      if (isOwnProfile) {
        toast.info(t('f.forSecurityYouMustLogInAgain'), {
          id: 'session-logout-info',
          duration: 3000,
        });

        setTimeout(async () => {
          await signOut({ redirect: false });
          router.push('/login');
        }, 2000);
      } else {
        router.push('/users');
      }
    } catch (err) {
      toast.error(t('u.userUpdateFailed'));
    }
  };

  return {
    updateUser,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
