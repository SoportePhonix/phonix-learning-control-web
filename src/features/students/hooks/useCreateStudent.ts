'use client';

import { useState } from 'react';

import { useCompanyNavigation } from '@/hooks';
import { TranslationKey, useTranslation } from '@/i18n';
import { useAddStudentMutation } from '@/lib/services/api/studentsApi/studentsApi';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export function useCreateStudent(form: UseFormReturn<Record<string, any>>) {
  const { t } = useTranslation();
  const companyNavigation = useCompanyNavigation();
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
        companyId: Number(values.companyId),
        ...(values.username && { username: values.username }),
        ...(values.password && { password: values.password }),
        ...(values.documentTypeId && { documentTypeId: Number(values.documentTypeId) }),
        ...(values.documentNumber && { documentNumber: values.documentNumber }),
        ...(values.description && { description: values.description }),
        ...(values.city && { city: values.city }),
        ...(values.country && { country: values.country }),
        ...(values.institution && { institution: values.institution }),
        ...(values.department && { department: values.department }),
        ...(values.phone && { phone: values.phone }),
        ...(values.address && { address: values.address }),
        ...(values.status && { status: values.status }),
        ...(values.areaId && { areaId: Number(values.areaId) }),
        ...(values.positionId && { positionId: Number(values.positionId) }),
      };

      const response = await addStudent(payload).unwrap();

      toast.success(`${values.firstname} ${values.lastname} ${t('a.addedSuccessfully')}`);

      // If sync with LMS failed, show additional error notification
      if (response.syncError || response.syncedWithLms === false) {
        toast.error(
          response.syncError?.message ||
            'No fue posible sincronizar el estudiante con el LMS. Por favor, comuníquese con su administrador.'
        );
      }

      companyNavigation.push('/manage-companies/students');
    } catch (err: any) {
      const status = err?.status ?? 500;
      const errorMessage = (err?.data?.message || '').toString();

      if (status === 404) {
        if (errorMessage.toLowerCase().includes('area') || errorMessage.toLowerCase().includes('position')) {
          toast.error('El área o posición seleccionada no pertenece a la compañía elegida');
          return;
        }
      }

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

      if (status === 400) {
        toast.error(errorMessage || t('u.unexpectedErrorIfTheErrorPersistsContactTheAdministrator'));
        return;
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
