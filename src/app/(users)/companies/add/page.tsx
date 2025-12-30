'use client';

import { CompaniesFormValues } from '@/components/companies/types';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { SectionTitle } from '@/components/section-title';
import { useCompaniesForm } from '@/features/companies/hooks/useCompaniesForm';
import { useCreateCompanies } from '@/features/companies/hooks/useCreateCompanies';
import { useTranslation } from '@/i18n';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { t } = useTranslation();
  const { createCompany, isLoading, apiError, apiErrorMessage } = useCreateCompanies();

  const form = useForm<CompaniesFormValues>({
    defaultValues: {
      name: '',
      nit: '',
      email: '',
      status: undefined,
    },
  });

  const { formConfig } = useCompaniesForm({ form });

  return (
    <div className="p-8">
      <SectionTitle title={t('a.addCompany')} />
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
