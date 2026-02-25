'use client';

import { use } from 'react';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PositionsFormValues } from '@/components/positions/types';
import { SectionTitle } from '@/components/section-title';
import { usePositionForm } from '@/features/positions/hooks/usePositionForm';
import { useUpdatePosition } from '@/features/positions/hooks/useUpdatePosition';
import { useTranslation } from '@/i18n';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ positionId: string }> }) {
  const { positionId } = use(params);
  const { t } = useTranslation();

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
    <div className="p-8">
      <SectionTitle title={t('u.updatePosition')} />

      <FormPageLayout description={t('t.toUpdateAPositionCompleteTheFields')} isLoading={isLoadingData}>
        <DynamicForm
          config={formConfig}
          mode="edit"
          form={form}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          apiError={apiError}
          apiErrorMessage={apiErrorMessage}
          cancelUrl="/manage-companies/positions"
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
