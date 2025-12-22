'use client';

import { useState } from 'react';

import { ExpandedLogoLight } from '@/components';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import { Typography } from '@/components/ui/typography';
import { useTranslation } from '@/i18n';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { loginFormConfig } from '../config/login-form.config';
import { Inputs } from '../types';

export function LoginForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<number | null>(null);

  const form = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: Inputs) => {
    try {
      setIsLoading(true);
      setLoginError(null);
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
        callbackUrl: '/users',
      });

      if (res && res.error) {
        setLoginError(res.status || 401);
        return;
      }

      router.push('/users');
    } catch (err) {
      console.error(err);
      setLoginError(500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-96">
      {isLoading && <Loader />}
      <div className="px-10 mb-8 flex justify-between items-center">
        <ExpandedLogoLight />
      </div>

      <div className="bg-gray_login rounded-lg -mt-6">
        <Typography variant="titulo_pequeno" className="text-center text-negro font-medium pt-6">
          {t('l.login')}
        </Typography>

        <div className="w-full">
          <DynamicForm
            config={loginFormConfig}
            mode="create"
            form={form}
            onSubmit={onSubmit}
            isLoading={isLoading}
            apiError={loginError}
            t={t}
            submitLabel="e.enter"
            showCancelButton={false}
            apiErrorMessage={t('c.correctEmailAndOrPassword')}
          />
        </div>
      </div>
    </div>
  );
}
