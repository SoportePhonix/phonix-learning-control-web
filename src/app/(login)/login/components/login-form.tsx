'use client';

import { useState } from 'react';

import { ExpandedLogoLight } from '@/components';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { Typography } from '@/components/ui/typography';
import { useTranslation } from '@/i18n';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Inputs } from '../types';
import { InputPassword } from './input-password';

export function LoginForm() {
  const { t, currentLanguage } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<number>();

  const errorMessages: Record<number, string> = {
    401: currentLanguage === 'es' ? 'Correo y/o contraseña incorrectos' : 'Incorrect email and/or password',
    403: t('a.accessDenied'),
    500:
      currentLanguage === 'es'
        ? 'Error interno del servidor. Intenta más tarde'
        : 'Internal server error. Try again later',
    404: currentLanguage === 'es' ? 'Servicio no encontrado' : 'Service not found',
  };

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
        callbackUrl: '/users',
      });

      if (res && res.error) {
        setLoginError(res.status);
        return;
      }

      router.push('/users');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-96">
      {isLoading && <Loader />}
      <div className="ml-14 mb-8 flex justify-between items-center">
        <ExpandedLogoLight />
        {/* <LanguageSwitcher /> */}
      </div>
      <Card className="mx-auto w-auto px-4 py-8 min-h-[22rem] rounded-lg bg-var--gray_login">
        <CardHeader>
          <Typography variant="titulo_pequeno" className="text-center text-var--negro font-medium -mt-6">
            {t('l.login')}
          </Typography>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-8">
              <div className="grid gap-2">
                <Input
                  id="email"
                  label={t('u.user')}
                  autoComplete="current-password"
                  placeholder={t('e.emailAddress')}
                  error={errors.email && errors.email?.message}
                  {...register('email', {
                    required: t('r.required'),
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: t('i.invalid'),
                    },
                  })}
                />
              </div>
              <div className="grid gap-2">
                <InputPassword
                  label={t('p.password')}
                  placeholder={t('p.password')}
                  id="password"
                  error={errors.password && errors.password?.message}
                  {...register('password', {
                    required: {
                      value: true,
                      message: t('r.required'),
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&+\-=/])[A-Za-z\d@$!%*?&+\-=/]{8,}$/,
                      message:
                        currentLanguage === 'es'
                          ? 'La contraseña debe tener mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.'
                          : 'Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character.',
                    },
                  })}
                />
                {loginError && !errors.password && (
                  <Typography variant="parrafo-pequeno" className="text-var--red-error">
                    {errorMessages[loginError] ||
                      (currentLanguage === 'es' ? 'Ocurrió un error desconocido' : 'An unknown error occurred')}
                  </Typography>
                )}
              </div>
              <Button type="submit" variant="secondary">
                {isLoading ? t('l.loading') : t('e.enter')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
