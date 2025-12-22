'use client';

import { forwardRef, useState } from 'react';

import { ImEye, ImEyeBlocked } from 'react-icons/im';

import { Input, InputProps } from './input';

export const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  ({ errorTooltip, errorTooltipTrigger, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          errorTooltip={errorTooltip}
          errorTooltipTrigger={errorTooltipTrigger}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2.5 top-4.5 -translate-y-1/2 text-slate-600 hover:text-slate-800 transition-colors z-10"
          tabIndex={-1}
        >
          {showPassword ? <ImEyeBlocked size={18} /> : <ImEye size={18} />}
        </button>
      </div>
    );
  }
);

InputPassword.displayName = 'InputPassword';
