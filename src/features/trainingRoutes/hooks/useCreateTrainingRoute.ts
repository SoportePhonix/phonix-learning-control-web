'use client';

import { useState } from 'react';

import { TrainingRouteFormValues } from '@/components/trainingRoutes/types';
import { TranslationKey, useTranslation } from '@/i18n';
import { AddTrainingRouteRequest } from '@/lib/services/api/trainingRoutesApi/interface';
import { useAddTrainingRouteMutation } from '@/lib/services/api/trainingRoutesApi/trainingRoutesApi';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export function useCreateTrainingRoute(form: UseFormReturn<TrainingRouteFormValues>) {
  const { t } = useTranslation();
  const router = useRouter();
  const [addTrainingRoute, { isLoading }] = useAddTrainingRouteMutation();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const createTrainingRoute = async (values: TrainingRouteFormValues) => {
    try {
      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      if (!values.companyId) {
        toast.error(t('p.pleaseSelectACompany'));
        return;
      }

      const payload: AddTrainingRouteRequest = {
        name: values.name,
        companyId: Number(values.companyId),
        ...(values.description && { description: values.description }),
        ...(values.areaId && { areaId: Number(values.areaId) }),
        ...(values.positionId && { positionId: Number(values.positionId) }),
      };

      await addTrainingRoute(payload).unwrap();

      toast.success(`${values.name} ${t('a.addedSuccessfully')}`);
      router.push('/manage-companies/training-routes');
    } catch (err: any) {
      const status = err?.status ?? 500;

      if (err?.data?.message) {
        toast.error(err.data.message);
        return;
      }

      if (status === 409) {
        form.setError('name', {
          type: 'manual',
          message: t('e.existingTrainingRouteName'),
        });
        return;
      }

      if (status === 500) {
        toast.error(t('u.unexpectedErrorIfTheErrorPersistsContactTheAdministrator'));
        return;
      }

      setApiError(status);
      setApiErrorMessage('t.trainingRouteCreationFailed');
      toast.error(t('t.trainingRouteCreationFailed'));
    }
  };

  return {
    createTrainingRoute,
    isLoading,
    apiError,
    apiErrorMessage,
  };
}
