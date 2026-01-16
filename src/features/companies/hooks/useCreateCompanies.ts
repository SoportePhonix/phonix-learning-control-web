'use client';

import { useState } from 'react';

import { TranslationKey, useTranslation } from '@/i18n';
import { useAddCompaniesMutation } from '@/lib/services/api/companiesApi/companiesApi';
import { AddCompaniesRequest } from '@/lib/services/api/companiesApi/interface';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

type FormValues = {
  name: string;
  nit: string;
  email: string;
  status: string;
};

export function useCreateCompanies(form: UseFormReturn<FormValues>) {
  const { t } = useTranslation();
  const router = useRouter();
  const [addCompany, { isLoading }] = useAddCompaniesMutation();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const createCompany = async (values: FormValues) => {
    const payload: AddCompaniesRequest = {
      name: values.name,
      nit: values.nit,
      email: values.email,
      status: values.status,
    };

    try {
      setApiError(null);
      setApiErrorMessage(undefined);

      await addCompany(payload).unwrap();

      (toast.success(t('c.companyCreatedSuccessfully')), router.push('/companies'));
    } catch (err: any) {
      const status = err?.status ?? 500;
      const errorMessage = err?.data?.message || '';

      // 409 → errores de campo
      if (status === 409) {
        if (errorMessage.toLowerCase().includes('nit')) {
          form.setError('nit', {
            type: 'manual',
            message: t('e.existingNit'),
          });
          return;
        }

        if (
          errorMessage.toLowerCase().includes('company NIT already exists') ||
          errorMessage.toLowerCase().includes('nit')
        ) {
          form.setError('nit', {
            type: 'manual',
            message: t('e.existingNit'),
          });
          return;
        }
      }

      // 500 → toast de error inesperado
      if (status === 500) {
        toast.error(t('u.unexpectedErrorIfTheErrorPersistsContactTheAdministrator'));
        return;
      }

      // Otros errores → mensaje global
      setApiError(status);
      setApiErrorMessage('c.companyCreationFailed');
    }
  };

  return {
    createCompany,
    isLoading,
    apiError,
    apiErrorMessage,
  };
}

/*   if (status === 409) {
    // 👇 ERROR DIRECTO EN EL CAMPO NIT
    form.setError('nit', {
      type: 'manual',
      message: 'e.existingNit',
    });
    return;
  }

  setApiError(status);
  setApiErrorMessage('c.companyCreationFailed'); */
