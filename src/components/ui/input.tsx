import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-light text-var--gray_medium">{label}</label>}
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-t-[4px] border-input border-0 border-b-[1.5px] border-var--gray_medium bg-var--white px-3 py-1 text-base font-light shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-var--primary-100 focus:border-var--blue_cta outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          error,
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <span className="text-sm text-var--red-error whitespace-pre-line mb-10">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
