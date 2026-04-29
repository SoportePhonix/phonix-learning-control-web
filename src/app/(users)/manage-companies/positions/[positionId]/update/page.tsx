'use client';

import { use } from 'react';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PageHeader } from '@/components/page-header';
import { PositionsFormValues } from '@/components/positions/types';
import { usePositionForm } from '@/features/positions/hooks/usePositionForm';
import { useUpdatePosition } from '@/features/positions/hooks/useUpdatePosition';
import { useCompanyNavigation } from '@/features/students/hooks/useCompanyNavigation';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@/lib/phonix-ui';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ positionId: string }> }) {
  const { positionId } = use(params);
  const { t } = useTranslation();
  const companyNav = useCompanyNavigation();
  const { crumbRoutes, isNavigating } = useBreadcrumbs(
    [
      { label: t('p.positions'), path: companyNav.href('/manage-companies/positions') },
      { label: t('u.updatePosition') },
    ],
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

  const { updatePositionData, isLoading, apiError, apiErrorMessage } = useUpdatePosition(positionId, form);

  const { formConfig, isLoadingData, currentStatus } = usePositionForm({
    mode: 'edit',
    positionId,
    form,
  });

  const handleSubmit = (values: PositionsFormValues) => {
    updatePositionData({
      ...values,
      status: values.status || currentStatus || 'active',
    });
  };

  return (
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader title={t('u.updatePosition')} />
      <FormPageLayout description={t('t.toUpdateAPositionCompleteTheFields')} isLoading={isLoadingData}>
        <DynamicForm
          config={formConfig}
          mode="edit"
          form={form}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          apiError={apiError}
          apiErrorMessage={apiErrorMessage}
          cancelUrl={companyNav.href('/manage-companies/positions')}
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
