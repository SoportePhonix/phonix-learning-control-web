'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useTranslation } from '@/i18n';
import { SelectSearch } from '@/lib/phonix-ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreateAdminInstance } from '../hooks/useCreateAdminInstance';
import { useGetInstancesSelect } from '../hooks/useGetInstancesSelect';
import { useGetUsersSelect } from '../hooks/useGetUsersSelect';

const adminInstanceSchema = z.object({
  userId: z.string().min(1, 'El ID de usuario es requerido'),
  instanceId: z.string().min(1, 'El ID de la instancia es requerido'),
});

type AdminInstanceFormValues = z.infer<typeof adminInstanceSchema>;

export function AdminInstanceForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const { createAdminInstance, isLoading } = useCreateAdminInstance();

  const { data: userOptions, isLoading: isLoadingUsers } = useGetUsersSelect();
  const { data: instanceOptions, isLoading: isLoadingInstances } = useGetInstancesSelect();

  const form = useForm<AdminInstanceFormValues>({
    resolver: zodResolver(adminInstanceSchema),
    defaultValues: {
      userId: '',
      instanceId: '',
    },
  });

  const onSubmit = async (values: AdminInstanceFormValues) => {
    const success = await createAdminInstance({
      userId: Number(values.userId),
      instanceId: Number(values.instanceId),
    });

    if (success) {
      router.push('/admin-instances');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            control={form.control}
            name="userId"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormControl>
                  <SelectSearch
                    data={userOptions}
                    valueKey="value"
                    labelKey="label"
                    selectedValue={field.value}
                    onSelect={(value) => field.onChange(value)}
                    label={'Usuario'}
                    placeholder={'Seleccione un usuario'}
                    error={error?.message}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Controller
            control={form.control}
            name="instanceId"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormControl>
                  <SelectSearch
                    data={instanceOptions}
                    valueKey="value"
                    labelKey="label"
                    selectedValue={field.value}
                    onSelect={(value) => field.onChange(value)}
                    label={'Instancia'}
                    placeholder={'Seleccione una instancia'}
                    error={error?.message}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button type="button" variant="outline" onClick={() => router.push('/admin-instances')} disabled={isLoading}>
            {t('c.cancel') || 'Cancelar'}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('a.add') || 'Añadir'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
