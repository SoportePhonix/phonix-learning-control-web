'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/i18n';
import { useGetAllRolesQuery } from '@/lib/services/api/rolesApi/rolesApi';
import { useGetAllTypeOfIdentificationDocumentQuery } from '@/lib/services/api/typeOfIdentificationDocumentApi/typeOfIdentificationDocumentApi';
import { AddUserRequest } from '@/lib/services/api/usersApi/interface';
import { useAddUsersMutation } from '@/lib/services/api/usersApi/usersApi';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { t } = useTranslation();
  const { data: roles } = useGetAllRolesQuery();
  const { data: typesId } = useGetAllTypeOfIdentificationDocumentQuery();
  const [addUser, { isLoading }] = useAddUsersMutation();

  const form = useForm({
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

  const onSubmit = (values: any) => {
    // Validación mínima: verificar que todos los campos tengan valor
    for (const key in values) {
      if (!values[key]) {
        console.error('Falta completar:', key);
        return;
      }
    }

    const payload: AddUserRequest = {
      name: values.name,
      lastName: values.lastName,
      typeOfIdentificationDocument: Number(values.typeOfIdentificationDocument),
      identificationDocument: values.identificationDocument,
      email: values.email,
      password: values.password,
      role: [{ id: Number(values.roleId) }],
    };

    console.log('Enviando a backend:', payload);
    addUser(payload);
  };

  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-2xl font-semibold mb-8">Crear Usuario</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            rules={{ required: 'Campo obligatorio' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese un valor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Apellidos */}
          <FormField
            control={form.control}
            name="lastName"
            rules={{ required: 'Campo obligatorio' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese un valor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tipo de doc */}
          <FormField
            control={form.control}
            name="typeOfIdentificationDocument"
            rules={{ required: 'Campo obligatorio' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de identificación</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
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
            rules={{ required: 'Campo obligatorio' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documento de identidad</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese un valor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            rules={{ required: 'Campo obligatorio' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese un valor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            rules={{ required: 'Campo obligatorio' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Ingrese un valor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Roles */}
          <FormField
            control={form.control}
            name="roleId"
            rules={{ required: 'Campo obligatorio' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roles</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
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

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-4 mt-6">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creando...' : 'Agregar'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
