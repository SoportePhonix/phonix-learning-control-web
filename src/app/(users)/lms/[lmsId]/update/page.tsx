'use client';

import { use } from 'react';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { LmsFormValues } from '@/components/lms/types';
import { SectionTitle } from '@/components/section-title';
import { useLmsForm } from '@/features/lms/hooks/useLmsForm';
import { useUpdateLms } from '@/features/lms/hooks/useUpdateLms';
import { useTranslation } from '@/i18n';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ lmsId: string }> }) {
  const { lmsId } = use(params);
  const { t } = useTranslation();

  const form = useForm<LmsFormValues>({
    defaultValues: {
      name: '',
      type: '',
      url: '',
      token: '',
      lmsIdExternal: '',
      companyId: '',
      status: '',
    },
  });

  const { updateLmsData, isLoading, apiError } = useUpdateLms(lmsId, form);

  const { formConfig, isLoadingData, currentStatus } = useLmsForm({
    mode: 'edit',
    lmsId,
    form,
  });

  const handleSubmit = (values: LmsFormValues) => {
    updateLmsData({
      ...values,
      status: values.status || currentStatus!,
    });
  };

  return (
    <div className="p-8">
      <SectionTitle title={t('u.updateLms')} />

      <FormPageLayout description={t('t.toUpdateAnLmsCompleteTheFields')} isLoading={isLoadingData}>
        <DynamicForm
          config={formConfig}
          mode="edit"
          form={form}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          apiError={apiError}
          cancelUrl="/lms"
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
