'use client';

import { use } from 'react';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { LmsFormValues } from '@/components/lms/types';
import { PageHeader } from '@/components/page-header';
import { useLmsForm } from '@/features/lms/hooks/useLmsForm';
import { useUpdateLms } from '@/features/lms/hooks/useUpdateLms';
import { useBreadcrumbs } from '@/hooks';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@/lib/phonix-ui';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ lmsId: string }> }) {
  const { lmsId } = use(params);
  const { t } = useTranslation();
  const { crumbRoutes, isNavigating } = useBreadcrumbs(
    [{ label: t('l.lms'), path: '/lms' }, { label: t('u.updateLms') }],
    { withLoader: true }
  );

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
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader title={t('u.updateLms')} />
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
