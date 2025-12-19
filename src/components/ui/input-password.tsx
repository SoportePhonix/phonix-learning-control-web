'use client';

import { forwardRef, useState } from 'react';

import { ImEye, ImEyeBlocked } from 'react-icons/im';

import { Input, InputProps } from './input';

export const InputPassword = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input {...props} ref={ref} type={showPassword ? 'text' : 'password'} />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-800 transition-colors"
        tabIndex={-1}
      >
        {showPassword ? <ImEyeBlocked size={18} /> : <ImEye size={18} />}
      </button>
    </div>
  );
});

InputPassword.displayName = 'InputPassword';
