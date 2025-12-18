import { useState } from 'react';

import { UserFormValues } from '@/components/users/types';
import { useUpdateUserMutation } from '@/lib/services/api/usersApi/usersApi';

export function useUpdateUser(userId: string) {
  const [updateUserMutation, { isLoading }] = useUpdateUserMutation();
  const [apiError, setApiError] = useState<number | null>(null);

  const updateUser = async (values: UserFormValues) => {
    setApiError(null);

    try {
      const payload = {
        name: values.name,
        lastName: values.lastName,
        typeOfIdentificationDocument: Number(values.typeOfIdentificationDocument),
        identificationDocument: values.identificationDocument,
        email: values.email,
        role: [{ id: Number(values.roleId) }], // 🔑 AQUÍ ESTÁ LA CLAVE
        ...(values.password ? { password: values.password } : {}),
      };

      await updateUserMutation({
        id: Number(userId),
        ...payload,
      } as Parameters<typeof updateUserMutation>[0]).unwrap();
    } catch (error: any) {
      setApiError(error?.status ?? 500);
    }
  };

  return {
    updateUser,
    isLoading,
    apiError,
  };
}
