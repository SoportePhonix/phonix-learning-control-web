'use client';

import { use } from 'react';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PageHeader } from '@/components/page-header';
import { TrainingRouteFormValues } from '@/components/trainingRoutes/types';
import { useTrainingRoutesForm } from '@/features/trainingRoutes/hooks/useTrainingRoutesForm';
import { useUpdateTrainingRoute } from '@/features/trainingRoutes/hooks/useUpdateTrainingRoute';
import { useBreadcrumbs, useCompanyNavigation } from '@/hooks';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@/lib/phonix-ui';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t } = useTranslation();
  const companyNav = useCompanyNavigation();
  const searchParams = useSearchParams();
  const companyId = searchParams.get('companyId');
  const { crumbRoutes, isNavigating } = useBreadcrumbs(
    [
      { label: t('t.trainingRoutes'), path: companyNav.href('/manage-companies/training-routes') },
      { label: t('a.addTrainingRoute') },
    ],
    { withLoader: true }
  );

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
    companyId,
  });

  return (
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader title={t('u.updateTrainingRoute')} />

      <FormPageLayout description={t('t.toUpdateATrainingRouteCompleteTheFields')} isLoading={isLoadingData}>
        <DynamicForm
          config={formConfig}
          mode="edit"
          form={form}
          onSubmit={updateTrainingRouteData}
          isLoading={isLoading}
          apiError={apiError}
          cancelUrl={companyNav.href('/manage-companies/training-routes')}
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
