'use client';

import { Loader } from '@/components/ui';
import { FormPageLayoutProps } from '@/types/components/formPageLayout';
import { Typography } from '@soportephonix/phx-typography';

export function FormPageLayout({ description, children, isLoading = false }: FormPageLayoutProps) {
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <div className="bg-base-white/70 backdrop-blur-sm rounded-md shadow-sm">
        {description && (
          <Typography
            variant="paragraph"
            className="text-center text-sm py-6 border-b font-prompt font-semibold leading-none tracking-normal text-verde_base"
          >
            {description}
          </Typography>
        )}
        {children}
      </div>
    </div>
  );
}
