'use client';

import { useState } from 'react';

import { TranslationKey, useTranslation } from '@/i18n';
import { useAddStudentMutation } from '@/lib/services/api/studentsApi/studentsApi';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export function useCreateStudent(form: UseFormReturn<Record<string, any>>) {
  const { t } = useTranslation();
  const router = useRouter();
  const [addStudent, { isLoading }] = useAddStudentMutation();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const createStudent = async (values: Record<string, any>) => {
    try {
      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      const payload = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        ...(values.username && { username: values.username }),
        password: values.password,
        ...(values.documentTypeId && { documentTypeId: Number(values.documentTypeId) }),
        ...(values.documentNumber && { documentNumber: values.documentNumber }),
        ...(values.description && { description: values.description }),
        ...(values.city && { city: values.city }),
        ...(values.country && { country: values.country }),
        ...(values.institution && { institution: values.institution }),
        ...(values.department && { department: values.department }),
        ...(values.phone && { phone: values.phone }),
        ...(values.address && { address: values.address }),
        status: values.status || 'active',
        ...(values.company && { companyId: Number(values.company) }),
        ...(values.areaId && { areaId: Number(values.areaId) }),
        ...(values.positionId && { positionId: Number(values.positionId) }),
      };

      await addStudent(payload).unwrap();

      toast.success(`${values.firstname} ${values.lastname} ${t('a.addedSuccessfully')}`);

      router.push('/students');
    } catch (err: any) {
      const status = err?.status ?? 500;
      const errorMessage = (err?.data?.message || '').toString();

      if (status === 409) {
        if (errorMessage.toLowerCase().includes('email')) {
          form.setError('email', {
            type: 'manual',
            message: t('e.existingEmail'),
          });
          return;
        }

        if (
          errorMessage.toLowerCase().includes('Ya existe un estudiante con este correo en la empresa') ||
          errorMessage.toLowerCase().includes('email') ||
          errorMessage.toLowerCase().includes('documentnumber')
        ) {
          form.setError('email', {
            type: 'manual',
            message: t('e.existingEmail'),
          });
          return;
        }
      }

      if (status === 500) {
        toast.error(t('u.unexpectedErrorIfTheErrorPersistsContactTheAdministrator'));
        return;
      }

      setApiError(status);
      setApiErrorMessage('e.errorCreatingStudent');
    }
  };

  return {
    createStudent,
    isLoading,
    apiError,
    apiErrorMessage,
  };
}
