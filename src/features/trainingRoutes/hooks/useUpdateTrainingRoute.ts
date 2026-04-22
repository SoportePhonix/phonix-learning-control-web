'use client';

import { useState } from 'react';

import { TrainingRouteFormValues } from '@/components/trainingRoutes/types';
import { TranslationKey, useTranslation } from '@/i18n';
import { UpdateTrainingRouteRequest } from '@/lib/services/api/trainingRoutesApi/interface';
import { useUpdateTrainingRouteMutation } from '@/lib/services/api/trainingRoutesApi/trainingRoutesApi';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export function useUpdateTrainingRoute(id: string, form: UseFormReturn<TrainingRouteFormValues>) {
  const { t } = useTranslation();
  const router = useRouter();
  const [updateTrainingRoute, { isLoading }] = useUpdateTrainingRouteMutation();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const updateTrainingRouteData = async (values: TrainingRouteFormValues) => {
    try {
      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      const payload: UpdateTrainingRouteRequest = {
        id: Number(id),
        name: values.name,
        ...(values.description && { description: values.description }),
        ...(values.areaId && { areaId: Number(values.areaId) }),
        ...(values.positionId && { positionId: Number(values.positionId) }),
      };

      await updateTrainingRoute(payload).unwrap();

      toast.success(`${values.name} ${t('u.updatedSuccessfully')}`);
      const query = values.companyId ? `?companyId=${values.companyId}` : '';
      router.push(`/manage-companies/training-routes${query}`);
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
      setApiErrorMessage('t.trainingRouteUpdateFailed');
      toast.error(t('t.trainingRouteUpdateFailed'));
    }
  };

  return {
    updateTrainingRouteData,
    isLoading,
    apiError,
  };
}
