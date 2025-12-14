'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/i18n';
import { useGetAllRolesQuery } from '@/lib/services/api/rolesApi/rolesApi';
import { useGetAllTypeOfIdentificationDocumentQuery } from '@/lib/services/api/typeOfIdentificationDocumentApi/typeOfIdentificationDocumentApi';
import { AddUserRequest } from '@/lib/services/api/usersApi/interface';
import { useAddUsersMutation } from '@/lib/services/api/usersApi/usersApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type FormValues = {
  name: string;
  lastName: string;
  typeOfIdentificationDocument: string;
  identificationDocument: string;
  email: string;
  password: string;
  roleId: string;
};

export function AddForm() {
  const { t } = useTranslation();
  const { data: roles } = useGetAllRolesQuery();
  const { data: typesId } = useGetAllTypeOfIdentificationDocumentQuery();
  const router = useRouter();

  const [addUser, { isLoading, isSuccess, isError, error }] = useAddUsersMutation();

  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      lastName: '',
      typeOfIdentificationDocument: '',
      identificationDocument: '',
      email: '',
      password: '',
      roleId: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    const payload: AddUserRequest = {
      name: values.name,
      lastName: values.lastName,
      typeOfIdentificationDocument: Number(values.typeOfIdentificationDocument),
      identificationDocument: values.identificationDocument,
      email: values.email,
      password: values.password,
      role: [{ id: Number(values.roleId) }],
    };

    addUser(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/users');
    }
  }, [isSuccess, router]);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: `
        linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.1)),
        url('/images/bg-pattern.svg')
      `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="px-1 pt-10 pb-2">
        <h1 className="text-xl font-normal mb-10"> {t('u.userCreation')} </h1>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-md shadow-sm">
        <p className="text-center text-sm py-6 border-b">{t('t.toCreateAUserPleaseFillInTheFields')}</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full grid grid-cols-2 md:grid-cols-2 gap-x-12 gap-y-6 px-12 py-10"
          >
            {/* Nombre */}
            <FormField
              control={form.control}
              name="name"
              rules={{ required: 'El nombre es requerido' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('n.name')}</FormLabel>
                  <FormControl>
                    <Input className="h-10" {...field} placeholder="Ingrese un valor" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Apellidos */}
            <FormField
              control={form.control}
              name="lastName"
              rules={{ required: 'Los apellidos son requeridos' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('l.lastName')}</FormLabel>
                  <FormControl>
                    <Input className="h-10" {...field} placeholder="Ingrese un valor" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tipo identificación */}
            <FormField
              control={form.control}
              name="typeOfIdentificationDocument"
              rules={{ required: 'El tipo de identificación es requerido' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('t.typeOfIdentificationDocument')}</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Seleccione una opción" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typesId?.data?.map((t: any) => (
                        <SelectItem key={t.id} value={String(t.id)}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Documento */}
            <FormField
              control={form.control}
              name="identificationDocument"
              rules={{ required: 'El documento de identidad es requerido' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('i.identificationDocument')}</FormLabel>
                  <FormControl>
                    <Input className="h-10" {...field} placeholder="Ingrese un valor" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              rules={{ required: 'El correo electrónico es requerido' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('e.email')}</FormLabel>
                  <FormControl>
                    <Input className="h-10" type="email" {...field} placeholder="Ingrese un valor" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              rules={{ required: 'La contraseña es requerida' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('p.password')}</FormLabel>
                  <FormControl>
                    <Input className="h-10" type="password" {...field} placeholder="Ingrese un valor" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rol */}
            <FormField
              control={form.control}
              name="roleId"
              rules={{ required: 'Seleccione una opción' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('r.role')}</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Seleccione una opción" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles?.data?.map((r: any) => (
                        <SelectItem key={r.id} value={String(r.id)}>
                          {r.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Botones */}
            <div className="col-span-2 flex justify-end gap-4 pt-8">
              <Link href="/users">
                <Button type="button" variant="outline">
                  {t('c.cancel')}
                </Button>
              </Link>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? t('c.creating') : t('a.add')}
              </Button>
            </div>

            {isError && <p className="col-span-2 text-red-500 text-sm">Ocurrió un error al crear el usuario</p>}
          </form>
        </Form>
      </div>
    </div>
  );
}
