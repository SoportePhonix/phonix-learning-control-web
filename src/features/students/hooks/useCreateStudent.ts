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
        username: values.username,
        password: values.password,
        documentTypeId: Number(values.documentTypeId),
        documentNumber: values.documentNumber,
        description: values.description,
        city: values.city,
        country: values.country,
        institution: values.institution,
        department: values.department,
        phone: values.phone,
        address: values.address,
        status: values.status || 'active',
        ...(values.companies && { companyId: Number(values.companies) }),
        ...(values.areaId ? { areaId: Number(values.areaId) } : {}),
        ...(values.positionId ? { positionId: Number(values.positionId) } : {}),
      };

      await addStudent(payload).unwrap();

      toast.success(`${values.firstname} ${values.lastname} ${t('a.addedSuccessfully')}`);

      router.push('/students');
    } catch (err: any) {
      console.log('createStudent error:', err);
      console.log('status:', err?.status);
      console.log('error.data:', err?.data);
      console.log('error.data.message:', err?.data?.message);
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
          errorMessage.toLowerCase().includes('identification') ||
          errorMessage.toLowerCase().includes('area') ||
          errorMessage.toLowerCase().includes('documentnumber')
        ) {
          form.setError('documentNumber', {
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
    createStudent,
    isLoading,
    apiError,
    apiErrorMessage,
  };
}
