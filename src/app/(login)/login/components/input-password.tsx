'use client';

import { forwardRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { ImEye, ImEyeBlocked } from 'react-icons/im';

import { InputProps } from '../types';

export const InputPassword = forwardRef<HTMLInputElement, InputProps>(({ error, label, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col space-y-1 relative">
      <div className="relative">
        <Input
          {...props}
          autoComplete="current-password"
          ref={ref}
          label={label}
          type={showPassword ? 'text' : 'password'}
          error={error}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2.5 top-[2.2rem] text-slate-600"
        >
          {showPassword ? <ImEyeBlocked /> : <ImEye />}
        </button>
      </div>
    </div>
  );
});

InputPassword.displayName = 'InputPassword';
