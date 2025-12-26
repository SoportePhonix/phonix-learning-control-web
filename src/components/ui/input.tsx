import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
  errorTooltip?: boolean;
  errorTooltipTrigger?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, errorTooltip, errorTooltipTrigger, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1 relative mb-6">
        {label && <label className="text-sm font-light text-label">{label}</label>}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-t-lg border-gray_medium border-0 border-b-[1.5px] bg-base-white px-3 py-1 text-base font-light shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-placeholder hover:border-primary-100 focus:border-blue_cta outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            error,
            className
          )}
          ref={ref}
          {...props}
        />
        {error && !errorTooltip && (
          <span className="absolute top-full left-0 text-sm text-error whitespace-pre-line ">{error}</span>
        )}
        {error && errorTooltip && (
          <div className="absolute top-full left-0 flex items-center gap-1 text-sm text-error group cursor-help">
            <span>{errorTooltipTrigger || 'Review field'}</span>
            <div className="relative inline-block">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="invisible group-hover:visible absolute left-0 top-6 z-50 w-72 p-3 text-sm bg-base-white border border-gray-200 rounded-md shadow-lg text-gray-700 whitespace-normal">
                {error}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
