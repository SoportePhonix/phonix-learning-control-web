'use client';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PositionsFormValues } from '@/components/positions/types';
import { SectionTitle } from '@/components/section-title';
import { useCreatePositions } from '@/features/positions/hooks/useCreatePositions';
import { usePositionForm } from '@/features/positions/hooks/usePositionForm';
import { useTranslation } from '@/i18n';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { t } = useTranslation();

  const form = useForm<PositionsFormValues>({
    defaultValues: {
      name: '',
      description: '',
      companyId: '',
      status: '',
    },
  });

  const { createPosition, isLoading, apiError, apiErrorMessage } = useCreatePositions(form);

  const { formConfig } = usePositionForm({
    mode: 'create',
    form,
  });

  return (
    <div className="p-8">
      <SectionTitle title={t('a.addPosition')} />
      <FormPageLayout description={t('t.toCreateAPositionPleaseFillInTheFields')}>
        <DynamicForm
          config={formConfig}
          mode="create"
          form={form}
          onSubmit={createPosition}
          isLoading={isLoading}
          apiError={apiError}
          apiErrorMessage={apiErrorMessage}
          cancelUrl="/manage-companies/positions"
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
