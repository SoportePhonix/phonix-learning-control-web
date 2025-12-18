'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TranslationKey } from '@/i18n';
import Link from 'next/link';
import { Controller, UseFormReturn } from 'react-hook-form';

import { UserFormValues } from './types';

type Props = {
  form: UseFormReturn<UserFormValues>;
  onSubmit: (values: UserFormValues) => void;
  roles: any[];
  typesId: any[];
  isLoading?: boolean;
  apiError?: number | null;
  t: (key: TranslationKey) => string;
};

export function UserForm({ form, onSubmit, roles, typesId, isLoading, apiError, t }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const selectStyle =
    'h-10 w-full rounded-none border-0 border-b border-b-gray-400 bg-white px-3 text-sm text-gray-500';

  const errorMessages: Record<number, string> = {
    400: t('r.required'),
    409: t('e.existingIdentificationDocument'),
    500: t('i.internalServerErrorPleaseTryAgainLater'),
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-2 gap-x-12 gap-y-6 px-12 py-10">
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
          <label className="text-sm font-medium">{t('l.lastName')}</label>
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
            control={control}
            name="typeOfIdentificationDocument"
            rules={{ required: t('t.typeOfIdentificationDocumentRequired') }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={selectStyle}>
                  <SelectValue placeholder={t('s.selectAnOption')} />
                </SelectTrigger>
                <SelectContent>
                  {typesId?.map((item: any) => (
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
          <label className="text-sm font-medium">{t('i.identificationDocument')}</label>
          <Input
            {...register('identificationDocument', {
              required: t('t.theIdentityDocumentIsRequired'),
            })}
            error={errors.identificationDocument?.message}
            placeholder={t('e.enterAValue')}
          />

          {apiError && Object.keys(errors).length === 0 && (
            <p className="text-sm text-var--red-error">{errorMessages[apiError] || t('a.anUnknownErrorOccurred')}</p>
          )}
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">{t('e.email')}</label>
          <Input
            {...register('email', { required: t('e.emailAddressRequired') })}
            error={errors.email?.message}
            placeholder={t('e.enterAValue')}
          />
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">{t('p.password')}</label>
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
            control={control}
            name="roleId"
            rules={{ required: t('t.theRolesAreRequired') }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={selectStyle}>
                  <SelectValue placeholder={t('s.selectAnOption')} />
                </SelectTrigger>
                <SelectContent>
                  {roles?.map((item: any) => (
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
  );
}
