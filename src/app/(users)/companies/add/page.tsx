'use client';

import { CompaniesFormValues } from '@/components/companies/types';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PageHeader } from '@/components/page-header';
import { useCompaniesForm } from '@/features/companies/hooks/useCompanyForm';
import { useCreateCompanies } from '@/features/companies/hooks/useCreateCompanies';
import { useBreadcrumbs } from '@/hooks';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@/lib/phonix-ui';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { t } = useTranslation();
  const { crumbRoutes, isNavigating } = useBreadcrumbs(
    [{ label: t('c.companies'), path: '/companies' }, { label: t('a.addCompany') }],
    { withLoader: true }
  );

  const form = useForm<CompaniesFormValues>({
    defaultValues: {
      name: '',
      nit: '',
      email: '',
      status: '',
    },
  });

  const { createCompany, isLoading, apiError, apiErrorMessage } = useCreateCompanies(form);

  const { formConfig } = useCompaniesForm({
    mode: 'create',
    form,
  });

  return (
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} className="mt-2" />
      <PageHeader title={t('a.addCompany')} />
      <FormPageLayout description={t('t.toCreateACompanyPleaseFillInTheFields')}>
        <DynamicForm
          config={formConfig}
          mode="create"
          form={form}
          onSubmit={createCompany}
          isLoading={isLoading}
          apiError={apiError}
          apiErrorMessage={apiErrorMessage}
          cancelUrl="/companies"
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
