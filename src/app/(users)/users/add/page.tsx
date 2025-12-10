'use client';

import { useTranslation } from '@/i18n';
import { useGetAllRolesQuery } from '@/lib/services/api/rolesApi/rolesApi';
import { useGetAllTypeOfIdentificationDocumentQuery } from '@/lib/services/api/typeOfIdentificationDocumentApi/typeOfIdentificationDocumentApi';

export default function Page() {
  const { t } = useTranslation();
  const { data: typeOfIdentificationDocumentData, isLoading } = useGetAllTypeOfIdentificationDocumentQuery();
  const { data: rolesData, isSuccess } = useGetAllRolesQuery();
  console.log(typeOfIdentificationDocumentData);
  console.log(rolesData);

  return (
    <div>
      <h1>{t('a.addUsers')}</h1>
    </div>
  );
}
