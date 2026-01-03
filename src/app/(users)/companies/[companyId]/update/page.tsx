'use client';

import { use } from 'react';

import { CompaniesFormValues } from '@/components/companies/types';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { SectionTitle } from '@/components/section-title';
import { useCompaniesForm } from '@/features/companies/hooks/useCompaniesForm';
import { useUpdateCompany } from '@/features/companies/hooks/useUpdateCompany';
import { useTranslation } from '@/i18n';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = use(params);
  const { t } = useTranslation();

  const { updateCompanies, isLoading, apiError } = useUpdateCompany(companyId);

  const form = useForm<CompaniesFormValues>({
    defaultValues: {
      name: '',
      nit: '',
      email: '',
      status: 'active',
    },
  });

  const { formConfig } = useCompaniesForm({
    form,
  });

  const handleSubmit = (values: CompaniesFormValues) => {
    updateCompanies(values);
  };

  return (
    <div className="p-8">
      <SectionTitle title={t('c.updateCompany')} />

      <FormPageLayout description={t('t.toUpdateACompanyCompleteTheFields')} isLoading={false}>
        <DynamicForm
          config={formConfig}
          mode="edit"
          form={form}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          apiError={apiError}
          cancelUrl="/companies"
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
