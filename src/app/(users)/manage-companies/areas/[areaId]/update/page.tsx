'use client';

import { use } from 'react';

import { AreasFormValues } from '@/components/areas/types';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PageHeader } from '@/components/page-header';
import { useAreaForm } from '@/features/areas/hooks/useAreaForm';
import { useUpdateArea } from '@/features/areas/hooks/useUpdateArea';
import { useCompanyNavigation } from '@/features/students/hooks/useCompanyNavigation';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@/lib/phonix-ui';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ areaId: string }> }) {
  const { areaId } = use(params);
  const { t } = useTranslation();
  const companyNav = useCompanyNavigation();
  const { crumbRoutes, isNavigating } = useBreadcrumbs(
    [{ label: t('a.areas'), path: companyNav.href('/manage-companies/areas') }, { label: t('u.updateArea') }],
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
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader title={t('u.updateArea')} />

      <FormPageLayout description={t('t.toUpdateAnAreaCompleteTheFields')} isLoading={isLoadingData}>
        <DynamicForm
          config={formConfig}
          mode="edit"
          form={form}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          apiError={apiError}
          apiErrorMessage={apiErrorMessage}
          cancelUrl={companyNav.href('/manage-companies/areas')}
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
