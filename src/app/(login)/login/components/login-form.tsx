'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { Typography } from '@/components/ui/typography';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Inputs } from '../types';
import { InputPassword } from './input-password';

const errorMessages: Record<number, string> = {
  401: 'Correo y/o contraseña incorrectos',
  403: 'Acceso denegado',
  500: 'Error interno del servidor. Intenta más tarde',
  404: 'Servicio no encontrado',
};

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<number>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
        callbackUrl: '/dashboard',
      });

      if (res && res.error) {
        setLoginError(res.status);
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-96">
      {isLoading && <Loader />}
      <Card className="mx-auto w-auto px-4 py-8 min-h-[25rem] rounded-lg bg-gray-400">
        <CardHeader>
          <Typography variant="titulo_medio" className="text-var--negro font-medium -mt-6">
            Iniciar sesión
          </Typography>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-8">
              <div className="grid gap-2">
                <Typography variant="parrafo" className="text-var--negro -mb-1">
                  Correo electrónico
                </Typography>
                <Input
                  id="email"
                  type="email"
                  autoComplete="current-password"
                  placeholder="Ingresa el correo electronico"
                  {...register('email', { required: 'La correo electronico es requerido' })}
                />
                {errors.email && (
                  <Typography variant="parrafo" className="text-var--red-error">
                    {errors.email.message}
                  </Typography>
                )}
              </div>
              <div className="grid gap-2">
                <InputPassword
                  label="Contraseña"
                  placeholder="Ingresa la contraseña"
                  id="password"
                  error={errors.password && errors.password?.message}
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'La contraseña es requerida',
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&+\-=/])[A-Za-z\d@$!%*?&+\-=/]{8,}$/,
                      message:
                        'La contraseña debe tener mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.',
                    },
                  })}
                />
                {errors.password && (
                  <Typography variant="parrafo" className="text-var--red-error  -mt-6">
                    {errors.password.message}
                  </Typography>
                )}
                {loginError && !errors.password && (
                  <Typography variant="parrafo" className="text-var--red-error -mt-6">
                    {errorMessages[loginError] || 'Ocurrió un error desconocido'}
                  </Typography>
                )}
              </div>
              <Button type="submit" className="w-full font-bold bg-var--blue_cta">
                {isLoading ? 'Ingresando...' : 'Ingresar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
