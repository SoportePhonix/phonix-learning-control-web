'use client';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { LmsFormValues } from '@/components/lms/types';
import { PageHeader } from '@/components/page-header';
import { useCreateLms } from '@/features/lms/hooks/useCreateLms';
import { useLmsForm } from '@/features/lms/hooks/useLmsForm';
import { useTranslation } from '@/i18n';
import { useForm } from 'react-hook-form';

export default function Page() {
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

  const { createLms, isLoading, apiError, apiErrorMessage } = useCreateLms(form);

  const { formConfig } = useLmsForm({
    mode: 'create',
    form,
  });

  return (
    <div className="p-8">
      <PageHeader title={t('a.addLms')} />
      <FormPageLayout description={t('t.toCreateAnLmsPleaseFillInTheFields')}>
        <DynamicForm
          config={formConfig}
          mode="create"
          form={form}
          onSubmit={createLms}
          isLoading={isLoading}
          apiError={apiError}
          apiErrorMessage={apiErrorMessage}
          cancelUrl="/lms"
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
