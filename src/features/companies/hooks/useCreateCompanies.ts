'use client';

import { useState } from 'react';

import { CompaniesFormValues } from '@/components/companies/types';
import { TranslationKey, useTranslation } from '@/i18n';
import { useAddCompaniesMutation } from '@/lib/services/api/companiesApi/companiesApi';
import { AddCompaniesRequest } from '@/lib/services/api/companiesApi/interface';
import { Role, normalizeRoleName } from '@/rbac/config/roles';
import { useSessionContext } from '@/utils/context/sessionContext';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export function useCreateCompanies(form: UseFormReturn<CompaniesFormValues>) {
  const { t } = useTranslation();
  const router = useRouter();
  const { session } = useSessionContext();
  const [addCompany, { isLoading }] = useAddCompaniesMutation();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const createCompany = async (values: CompaniesFormValues) => {
    const roles = session?.user?.role || [];
    const isSuperAdmin = Array.isArray(roles) && roles.some((r: any) => normalizeRoleName(r.name) === Role.SUPERADMIN);

    const payload: AddCompaniesRequest = {
      name: values.name,
      nit: values.nit,
      email: values.email,
      status: values.status,
    };

    if (isSuperAdmin) {
      if (values.instanceId) {
        payload.instanceId = Number(values.instanceId);
      }
    } else {
      if (session?.user?.instanceId) {
        payload.instanceId = Number(session.user.instanceId);
      } else {
        toast.error(t('s.sessionMissingInstanceId') || 'Instance ID missing in session');
        return;
      }
    }

    try {
      setApiError(null);
      setApiErrorMessage(undefined);

      const companyResponse = await addCompany(payload).unwrap();

      toast.success(`${values.name} ${t('a.addedSuccessfully')}`);
      router.push('/companies');
    } catch (err: any) {
      const status = err?.status ?? 500;
      const errorMessage = err?.data?.message || '';

      if (status === 409) {
        if (
          errorMessage.toLowerCase().includes('nit') ||
          errorMessage.toLowerCase().includes('company nit already exists')
        ) {
          form.setError('nit', {
            type: 'manual',
            message: t('e.existingNit'),
          });
          return;
        }
      }

      if (status === 500) {
        toast.error(t('u.unexpectedErrorIfTheErrorPersistsContactTheAdministrator'));
        return;
      }

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
