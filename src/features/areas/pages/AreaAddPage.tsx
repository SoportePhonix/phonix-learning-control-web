'use client';

import { AreasFormValues } from '@/components/areas/types';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { SectionTitle } from '@/components/section-title';
import { useAreaForm } from '@/features/areas/hooks/useAreaForm';
import { useCreateAreas } from '@/features/areas/hooks/useCreateAreas';
import { useTranslation } from '@/i18n';
import { useForm } from 'react-hook-form';

interface AreaAddPageProps {
  baseRoute?: string;
}

export default function AreaAddPage({ baseRoute = '/manage-companies/areas' }: AreaAddPageProps) {
  const { t } = useTranslation();

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
    <div className="p-8">
      <SectionTitle title={t('a.addArea')} />
      <FormPageLayout description={t('t.toCreateAnAreaPleaseFillInTheFields')}>
        <DynamicForm
          config={formConfig}
          mode="create"
          form={form}
          onSubmit={createArea}
          isLoading={isLoading}
          apiError={apiError}
          apiErrorMessage={apiErrorMessage}
          cancelUrl={baseRoute}
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
