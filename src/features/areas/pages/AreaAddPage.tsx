'use client';

import { AreasFormValues } from '@/components/areas/types';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PageHeader } from '@/components/page-header';
import { useAreaForm } from '@/features/areas/hooks/useAreaForm';
import { useCreateAreas } from '@/features/areas/hooks/useCreateAreas';
import { useBreadcrumbs, useCompanyNavigation } from '@/hooks';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@/lib/phonix-ui';
import { useForm } from 'react-hook-form';

interface AreaAddPageProps {
  baseRoute?: string;
}

export default function AreaAddPage({ baseRoute = '/manage-companies/areas' }: AreaAddPageProps) {
  const { t } = useTranslation();
  const companyNav = useCompanyNavigation();
  const { crumbRoutes, isNavigating } = useBreadcrumbs(
    [{ label: t('a.areas'), path: baseRoute }, { label: t('a.addArea') }],
    { withLoader: true }
  );

  const form = useForm<AreasFormValues>({
    defaultValues: {
      name: '',
      description: '',
      companyId: '',
      status: '',
    },
  });

  const { createArea, isLoading, apiError, apiErrorMessage } = useCreateAreas(form);

  const { formConfig } = useAreaForm({
    mode: 'create',
    form,
  });

  return (
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader title={t('a.addArea')} />
      <FormPageLayout description={t('t.toCreateAnAreaPleaseFillInTheFields')}>
        <DynamicForm
          config={formConfig}
          mode="create"
          form={form}
          onSubmit={createArea}
          isLoading={isLoading}
          apiError={apiError}
          apiErrorMessage={apiErrorMessage}
          cancelUrl={companyNav.href(baseRoute)}
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
