'use client';

import { useState } from 'react';

import { UserFormValues } from '@/components/users/types';
import { useCreateAdminInstance } from '@/features/adminInstance/hooks/useCreateAdminInstance';
import { TranslationKey, useTranslation } from '@/i18n';
import { useGetAllRolesQuery } from '@/lib/services/api/rolesApi/rolesApi';
import { AddUserRequest } from '@/lib/services/api/usersApi/interface';
import { useAddUsersMutation } from '@/lib/services/api/usersApi/usersApi';
import { Role, canAssignRole, normalizeRoleName } from '@/rbac/config/roles';
import { useSessionContext } from '@/utils/context/sessionContext';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export function useCreateUser(form: UseFormReturn<UserFormValues>) {
  const { t } = useTranslation();
  const router = useRouter();
  const [addUser, { isLoading }] = useAddUsersMutation();
  const { createAdminInstance } = useCreateAdminInstance();

  const { session } = useSessionContext();
  const currentInstanceId = session?.user?.instanceId || (session?.user as any)?.instance?.id;
  const currentRoles = session?.user?.role || [];

  const { data: rolesData } = useGetAllRolesQuery();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const createUser = async (values: UserFormValues) => {
    try {
      const selectedRole = rolesData?.data?.find((r: any) => String(r.id) === String(values.roleId));
      if (selectedRole && !canAssignRole(currentRoles, selectedRole.name)) {
        toast.error('No tienes permisos para asignar este rol');
        return;
      }

      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      const finalInstanceId = currentInstanceId || values.instanceId;
      const normalizedRole = normalizeRoleName(selectedRole?.name);

      if (normalizedRole === Role.MANAGER && !values.companyId) {
        toast.error('Debes seleccionar una empresa para crear un Manager');
        return;
      }

      const payload: AddUserRequest = {
        name: values.name,
        lastName: values.lastName,
        typeOfIdentificationDocument: Number(values.typeOfIdentificationDocument),
        identificationDocument: values.identificationDocument,
        email: values.email,
        password: values.password,
        role: [{ id: Number(values.roleId) }],
        ...(normalizedRole === Role.MANAGER ? { companyId: Number(values.companyId) } : {}),
        ...(finalInstanceId ? { instanceId: Number(finalInstanceId) } : {}),
        status: 'active',
      };

      const newUserResponse = await addUser(payload).unwrap();

      // Obtenemos el ID del objeto creado (asegurando el casteo al any nativo de la response en caso de desincronización de interface)
      const newUserId = (newUserResponse?.data as any)?.id;

      // Flujo de unión: Si ingresó un instanceId (Signo de que es un admin en este formato) lo intentamos linkear a la instancia
      if (finalInstanceId && newUserId) {
        try {
          await createAdminInstance({
            userId: Number(newUserId),
            instanceId: Number(finalInstanceId),
          });
        } catch (instanceError) {
          // Si el usuario se creó pero falló al asignarle la instancia
          toast.error('El usuario se creó, pero no se pudo asociar a la instancia indicada.');
        }
      }

      toast.success(`${values.name} ${values.lastName} ${t('a.addedSuccessfully')}`);

      router.push('/users');
    } catch (err: any) {
      const status = err?.status ?? 500;
      const errorMessage = err?.data?.message || '';

      if (status === 409) {
        if (errorMessage.toLowerCase().includes('email')) {
          form.setError('email', {
            type: 'manual',
            message: t('e.existingEmail'),
          });
          return;
        }

        if (
          errorMessage.toLowerCase().includes('user already exists') ||
          errorMessage.toLowerCase().includes('identification') ||
          errorMessage.toLowerCase().includes('document')
        ) {
          form.setError('identificationDocument', {
            type: 'manual',
            message: t('e.existingIdentificationDocument'),
          });
          return;
        }
      }

      if (status === 500) {
        toast.error(t('u.unexpectedErrorIfTheErrorPersistsContactTheAdministrator'));
        return;
      }

      setApiError(status);
      setApiErrorMessage('u.userCreationFailed');
    }
  };

  return {
    createUser,
    isLoading,
    apiError,
    apiErrorMessage,
  };
}
