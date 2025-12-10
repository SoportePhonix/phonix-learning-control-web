'use client';

import { useGetAllTypeOfIdentificationDocumentQuery } from '@/lib/services/api/typeOfIdentificationDocumentApi/typeOfIdentificationDocumentApi';

export default function Page() {
  const { data: typeOfIdentificationDocumentData, isLoading } = useGetAllTypeOfIdentificationDocumentQuery();
  console.log(typeOfIdentificationDocumentData);

  return (
    <div>
      <h1>Agregar Usuario</h1>
    </div>
  );
}
