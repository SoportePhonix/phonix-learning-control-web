'use client';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { InstanceFormValues } from '@/components/instance/types';
import { PageHeader } from '@/components/page-header';
import { useCreateInstance } from '@/features/instance/hooks/useCreateInstance';
import { useInstanceForm } from '@/features/instance/hooks/useInstanceForm';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@/lib/phonix-ui';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { t } = useTranslation();
  const { crumbRoutes, isNavigating } = useBreadcrumbs(
    [{ label: t('i.instances'), path: '/instances' }, { label: t('a.addInstance') }],
    { withLoader: true }
  );

  const form = useForm<InstanceFormValues>({
    defaultValues: {
      nit: '',
      name: '',
      description: '',
      status: '',
    },
  });

  const { createInstance, isLoading, apiError, apiErrorMessage } = useCreateInstance(form);

  const { formConfig } = useInstanceForm({
    mode: 'create',
    form,
  });

  return (
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader title={t('a.addInstance')} />
      <FormPageLayout description={t('t.toCreateAnInstancePleaseFillInTheFields')}>
        <DynamicForm
          config={formConfig}
          mode="create"
          form={form}
          onSubmit={createInstance}
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
