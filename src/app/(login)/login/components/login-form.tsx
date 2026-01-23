'use client';

import { useState } from 'react';

import { ExpandedLogoLight } from '@/components';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import { Typography } from '@/components/ui/typography';
import { TranslationKey, useTranslation } from '@/i18n';
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
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

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
      setApiErrorMessage(undefined);

      const res = await signIn('credentials', {
        ...data,
        redirect: false,
        callbackUrl: '/users',
      });

      if (res && res.error) {
        setLoginError(res.status || 401);
        setApiErrorMessage('c.correctEmailAndOrPassword');
        return;
      }

      router.push('/users');
    } catch (err) {
      console.error(err);
      setLoginError(500);
      setApiErrorMessage('c.correctEmailAndOrPassword');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full tablet:w-125.25">
      {isLoading && <Loader />}
      <div className="px-10 mb-8 flex justify-between items-center">
        <ExpandedLogoLight />
      </div>

      <div className="bg-background-primary rounded-lg -mt-6">
        <Typography variant="titulo_pequeno" className="text-center text-primary font-medium pt-6">
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
            apiErrorMessage={apiErrorMessage}
            t={t}
            submitLabel="e.enter"
            showCancelButton={false}
          />
        </div>
      </div>
    </div>
  );
}
