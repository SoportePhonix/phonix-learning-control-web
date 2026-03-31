'use client';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PageHeader } from '@/components/page-header';
import { PositionsFormValues } from '@/components/positions/types';
import { useCreatePositions } from '@/features/positions/hooks/useCreatePositions';
import { usePositionForm } from '@/features/positions/hooks/usePositionForm';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@soportephonix/phx-breadcrumb';
import { useForm } from 'react-hook-form';

interface PositionAddPageProps {
  baseRoute?: string;
}

export default function PositionAddPage({ baseRoute = '/manage-companies/positions' }: PositionAddPageProps) {
  const { t } = useTranslation();
  const { crumbRoutes, isNavigating } = useBreadcrumbs(
    [{ label: t('p.positions'), path: baseRoute }, { label: t('a.addPosition') }],
    { withLoader: true }
  );

  const form = useForm<PositionsFormValues>({
    defaultValues: {
      name: '',
      description: '',
      companyId: '',
      status: '',
    },
  });

  const { createPosition, isLoading, apiError, apiErrorMessage } = useCreatePositions(form);

  const { formConfig } = usePositionForm({
    mode: 'create',
    form,
  });

  return (
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader title={t('a.addPosition')} />
      <FormPageLayout description={t('t.toCreateAPositionPleaseFillInTheFields')}>
        <DynamicForm
          config={formConfig}
          mode="create"
          form={form}
          onSubmit={createPosition}
          isLoading={isLoading}
          apiError={apiError}
          apiErrorMessage={apiErrorMessage}
          cancelUrl={baseRoute}
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
