'use client';

import { useTranslation } from '@/i18n';
import { useGetAllTypeOfIdentificationDocumentQuery } from '@/lib/services/api/typeOfIdentificationDocumentApi/typeOfIdentificationDocumentApi';

export default function Page() {
  const { t } = useTranslation();
  const { data: typeOfIdentificationDocumentData, isLoading } = useGetAllTypeOfIdentificationDocumentQuery();
  console.log(typeOfIdentificationDocumentData);

  return (
    <div>
      <h1>{t('a.addUsers')}</h1>
    </div>
  );
}
