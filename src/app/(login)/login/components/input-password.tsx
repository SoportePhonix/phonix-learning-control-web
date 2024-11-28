'use client';

import { forwardRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { ImEye, ImEyeBlocked } from 'react-icons/im';

import { InputProps } from '../types';

export const InputPassword = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Typography variant="parrafo" className="text-var--negro mb-1">
        Contraseña
      </Typography>
      <Input {...props} autoComplete="current-password" ref={ref} type={showPassword ? 'text' : 'password'} />
      <button type="button" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? (
          <ImEyeBlocked className="absolute right-2.5 top-[2.4rem] text-slate-600" />
        ) : (
          <ImEye className="absolute right-2.5 top-[2.4rem] text-slate-600" />
        )}
      </button>
    </div>
  );
});

InputPassword.displayName = 'InputPassword';
