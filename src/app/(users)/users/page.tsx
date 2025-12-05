'use client';

import { Button } from '@/components/ui';
import { DataTable } from '@/components/ui/data-table';
import { Typography } from '@/components/ui/typography';
import { useTranslation } from '@/i18n';
import { useGetAllUsersQuery } from '@/lib/services/api/usersApi/usersApi';
// Configuración de las columnas que mostrará la tabla.
// Se le pasa el traductor para ajustar los nombres visibles.
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

import { columns } from '../../../hooks/users/columns';

export default function Page() {
  const { t } = useTranslation(); // t() devuelve un string traducido según la clave que se envíe.

  const { data: usersData, isLoading, isFetching, error, status, isSuccess, isError } = useGetAllUsersQuery();

  // Hook que llama a la API. Devuelve:
  // - data: información recibida
  // - isLoading: carga inicial
  // - isFetching: se está refrescando
  // - error: si la petición falló
  // - status: estado HTTP
  // - isSuccess: petición exitosa
  // - isError: ocurrió un error

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <Typography variant="titulo_medio" className="text-var--negro font-light mb-4">
        {t('l.login')}
      </Typography>

      {/* Para cuando este lsiat la parte de agregar usuarios
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/users">Users</Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}

      <div>
        <Link href={'/addusers'}>
          <Button variant="secondary">
            <UserPlus />
            Agregar usuario
          </Button>
        </Link>
      </div>

      {/* Tabla con los usuarios. 
          usersData?.data ?? [] asegura que siempre se envíe un arreglo. */}

      <DataTable data={usersData?.data ?? []} columns={columns(t)} />
    </div>
  );
}
