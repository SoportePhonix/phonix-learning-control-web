'use client';

import { Button } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { useGetAllRolesQuery } from '@/lib/services/api/rolesApi/rolesApi';
import { useGetAllTypeOfIdentificationDocumentQuery } from '@/lib/services/api/typeOfIdentificationDocumentApi/typeOfIdentificationDocumentApi';
import { AddUserRequest } from '@/lib/services/api/usersApi/interface';
import { useAddUsersMutation } from '@/lib/services/api/usersApi/usersApi';

export default function Page() {
  const { t } = useTranslation();
  const { data: rolesData } = useGetAllRolesQuery();

  const [addUser, { data: dataResponse, isLoading, error, status, isSuccess, isError }] = useAddUsersMutation();

  const handlePostData = async (data: AddUserRequest) => {
    console.log('Enviando:', data);
    addUser(data);
  };

  const data = {
    name: 'Sofia',
    lastName: 'Doe',
    typeOfIdentificationDocument: 1,
    identificationDocument: '1234555855267800896',
    password: 'SecurePass123!',
    email: 'john.doe@example.com',
    role: [{ id: 1 }],
  } as AddUserRequest;

  console.log('error', error);
  console.log('status', status);
  console.log('isSuccess', isSuccess);
  console.log('isError', isError);
  console.log('dataResponse', dataResponse?.data.name);

  return (
    <div>
      <h1>{t('a.addUsers')}</h1>
      <div>
        <Button onClick={() => handlePostData(data)} disabled={isLoading} type="submit">
          {isLoading ? 'Creando...' : 'Crear Usuario'}
        </Button>
      </div>
    </div>
  );
}
