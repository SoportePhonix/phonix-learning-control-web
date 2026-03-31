'use client';

import { use } from 'react';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { InstanceFormValues } from '@/components/instance/types';
import { PageHeader } from '@/components/page-header';
import { useInstanceForm } from '@/features/instance/hooks/useInstanceForm';
import { useUpdateInstance } from '@/features/instance/hooks/useUpdateInstance';
import { useTranslation } from '@/i18n';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ instanceId: string }> }) {
  const { instanceId } = use(params);
  const { t } = useTranslation();

  const form = useForm<InstanceFormValues>({
    defaultValues: {
      nit: '',
      name: '',
      description: '',
      status: '',
    },
  });

  const { updateInstanceData, isLoading, apiError, apiErrorMessage } = useUpdateInstance(instanceId, form);

  const { formConfig, isLoadingData, currentStatus } = useInstanceForm({
    mode: 'edit',
    instanceId,
    form,
  });

  const handleSubmit = (values: InstanceFormValues) => {
    updateInstanceData({
      ...values,
      status: values.status || currentStatus || 'active',
    });
  };

  return (
    <div className="p-8">
      <PageHeader title={t('u.updateInstance')} />

      <FormPageLayout description={t('t.toUpdateAnInstanceCompleteTheFields')} isLoading={isLoadingData}>
        <DynamicForm
          config={formConfig}
          mode="edit"
          form={form}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          apiError={apiError}
          apiErrorMessage={apiErrorMessage}
          cancelUrl="/instances"
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
