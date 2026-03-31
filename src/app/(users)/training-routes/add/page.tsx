'use client';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PageHeader } from '@/components/page-header';
import { TrainingRouteFormValues } from '@/components/trainingRoutes/types';
import { useCreateTrainingRoute } from '@/features/trainingRoutes/hooks/useCreateTrainingRoute';
import { useTrainingRoutesForm } from '@/features/trainingRoutes/hooks/useTrainingRoutesForm';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@soportephonix/phx-breadcrumb';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { t } = useTranslation();
  const { crumbRoutes, isNavigating } = useBreadcrumbs(
    [{ label: t('t.trainingRoutes'), path: '/training-routes' }, { label: t('a.addTrainingRoute') }],
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

  const { createTrainingRoute, isLoading, apiError, apiErrorMessage } = useCreateTrainingRoute(form);

  const { formConfig } = useTrainingRoutesForm({
    mode: 'create',
    form,
  });

  return (
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader title={t('a.addTrainingRoute')} />
      <FormPageLayout description={t('t.toCreateATrainingRoutePleaseFillInTheFields')}>
        <DynamicForm
          config={formConfig}
          mode="create"
          form={form}
          onSubmit={createTrainingRoute}
          isLoading={isLoading}
          apiError={apiError}
          apiErrorMessage={apiErrorMessage}
          cancelUrl="/training-routes"
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
