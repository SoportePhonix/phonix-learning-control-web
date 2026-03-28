'use client';

import { use } from 'react';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { SectionTitle } from '@/components/section-title';
import { TrainingRouteFormValues } from '@/components/trainingRoutes/types';
import { useTrainingRoutesForm } from '@/features/trainingRoutes/hooks/useTrainingRoutesForm';
import { useUpdateTrainingRoute } from '@/features/trainingRoutes/hooks/useUpdateTrainingRoute';
import { useTranslation } from '@/i18n';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t } = useTranslation();

  const form = useForm<TrainingRouteFormValues>({
    defaultValues: {
      name: '',
      description: '',
      companyId: '',
      areaId: '',
      positionId: '',
    },
  });

  const { updateTrainingRouteData, isLoading, apiError } = useUpdateTrainingRoute(id, form);

  const { formConfig, isLoadingData } = useTrainingRoutesForm({
    mode: 'edit',
    id,
    form,
  });

  return (
    <div className="p-8">
      <SectionTitle title={t('u.updateTrainingRoute')} />

      <FormPageLayout description={t('t.toUpdateATrainingRouteCompleteTheFields')} isLoading={isLoadingData}>
        <DynamicForm
          config={formConfig}
          mode="edit"
          form={form}
          onSubmit={updateTrainingRouteData}
          isLoading={isLoading}
          apiError={apiError}
          cancelUrl="/training-routes"
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
