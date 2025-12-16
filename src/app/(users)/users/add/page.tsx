'use client';

import { useState } from 'react';

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
import { Controller, useForm } from 'react-hook-form';

type FormValues = {
  name: string;
  lastName: string;
  typeOfIdentificationDocument: string;
  identificationDocument: string;
  email: string;
  password: string;
  roleId: string;
};

export default function Page() {
  const { t } = useTranslation();
  const { data: roles } = useGetAllRolesQuery();
  const { data: typesId } = useGetAllTypeOfIdentificationDocumentQuery();
  const router = useRouter();

  const [addUser, { isLoading }] = useAddUsersMutation();
  const [apiError, setApiError] = useState<number | null>(null);

  const errorMessages: Record<number, string> = {
    400: t('r.required'),
    409: t('u.user'),
    500: t('i.internalServerErrorPleaseTryAgainLater'),
  };

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

  const selectStyle =
    'h-10 w-full rounded-none border-0 border-b border-b-gray-400 ' +
    'bg-white px-3 text-sm font-normal text-gray-500 ' +
    'focus:outline-none focus:ring-0 focus:border-b-gray-400 ' +
    'data-[placeholder-shown]:text-gray-400';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (values: FormValues) => {
    const payload: AddUserRequest = {
      name: values.name,
      lastName: values.lastName,
      typeOfIdentificationDocument: Number(values.typeOfIdentificationDocument),
      identificationDocument: values.identificationDocument,
      email: values.email,
      password: values.password,
      role: [{ id: Number(values.roleId) }],
    };
    setApiError(null);
    try {
      await addUser(payload).unwrap();
      router.push('/users');
    } catch (err: any) {
      setApiError(err?.status ?? 500);
    }
  };

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
            <div className="grid gap-2">
              <label className="text-sm font-medium">{t('n.name')}</label>
              <Input
                {...register('name', { required: t('n.nameIsRequerid') })}
                error={errors.name?.message}
                placeholder={t('e.enterAValue')}
              />
            </div>

            {/* Apellidos */}

            <div className="grid gap-2">
              <label className="text-sm font-medium"> {t('l.lastName')} </label>
              <Input
                {...register('lastName', { required: t('l.lastNameRequired') })}
                error={errors.lastName?.message}
                placeholder={t('e.enterAValue')}
              />
            </div>

            {/* Tipo identificación */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">{t('t.typeOfIdentificationDocument')}</label>

              <Controller
                control={form.control}
                name="typeOfIdentificationDocument"
                rules={{ required: t('t.typeOfIdentificationDocumentRequired') }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={selectStyle}>
                      <SelectValue placeholder={t('s.selectAnOption')} className="font-normal text-muted-foreground" />
                    </SelectTrigger>

                    <SelectContent className="bg-white border border-gray-300 shadow-md rounded-none p-0">
                      {typesId?.data?.map((item: any) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.typeOfIdentificationDocument && (
                <p className="text-sm text-var--red-error">{errors.typeOfIdentificationDocument.message}</p>
              )}
            </div>

            {/* Documento */}
            <div className="grid gap-2">
              <label className="text-sm font-medium"> {t('i.identificationDocument')} </label>
              <Input
                {...register('identificationDocument', { required: t('t.theIdentityDocumentIsRequired') })}
                error={errors.identificationDocument?.message}
                placeholder={t('e.enterAValue')}
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <label className="text-sm font-medium"> {t('e.email')} </label>
              <Input
                {...register('email', { required: t('e.emailAddressRequired') })}
                error={errors.email?.message}
                placeholder={t('e.enterAValue')}
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <label className="text-sm font-medium"> {t('p.password')} </label>
              <Input
                type="password"
                {...register('password', { required: t('p.passwordRequired') })}
                error={errors.password?.message}
                placeholder={t('e.enterAValue')}
              />
            </div>

            {/* Rol */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">{t('r.role')}</label>

              <Controller
                control={form.control}
                name="roleId"
                rules={{ required: t('t.theRolesAreRequired') }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={selectStyle}>
                      <SelectValue placeholder={t('s.selectAnOption')} />
                    </SelectTrigger>
                    <SelectContent>
                      {roles?.data?.map((item: any) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.roleId && <p className="text-sm text-var--red-error">{errors.roleId.message}</p>}
            </div>

            {/*Error backend */}
            {apiError && Object.keys(errors).length === 0 && (
              <p className="col-span-2 text-var--red-error text-sm text-center">
                {errorMessages[apiError] || t('a.anUnknownErrorOccurred')}
              </p>
            )}

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
          </form>
        </Form>
      </div>
    </div>
  );
}
