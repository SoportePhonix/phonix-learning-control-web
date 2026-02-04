'use client';

import { use } from 'react';

import { AreasFormValues } from '@/components/areas/types';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { SectionTitle } from '@/components/section-title';
import { useAreaForm } from '@/features/areas/hooks/useAreaForm';
import { useUpdateArea } from '@/features/areas/hooks/useUpdateArea';
import { useTranslation } from '@/i18n';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ areaId: string }> }) {
  const { areaId } = use(params);
  const { t } = useTranslation();

  const form = useForm<AreasFormValues>({
    defaultValues: {
      name: '',
      description: '',
      companyId: '',
      status: '',
    },
  });

  const { updateAreaData, isLoading, apiError, apiErrorMessage } = useUpdateArea(areaId, form);

  const { formConfig, isLoadingData, currentStatus } = useAreaForm({
    mode: 'edit',
    areaId,
    form,
  });

  const handleSubmit = (values: AreasFormValues) => {
    updateAreaData({
      ...values,
      status: values.status || currentStatus || 'active',
    });
  };

  return (
    <div className="p-8">
      <SectionTitle title={t('u.updateArea')} />

      <FormPageLayout description={t('t.toUpdateAnAreaCompleteTheFields')} isLoading={isLoadingData}>
        <DynamicForm
          config={formConfig}
          mode="edit"
          form={form}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          apiError={apiError}
          apiErrorMessage={apiErrorMessage}
          cancelUrl="/areas"
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
