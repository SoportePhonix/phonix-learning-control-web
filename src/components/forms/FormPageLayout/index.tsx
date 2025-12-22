'use client';

import { Loader } from '@/components/ui';
import { FormPageLayoutProps } from '@/types/components/formPageLayout';

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
      <div className="bg-white/70 backdrop-blur-sm rounded-md shadow-sm">
        {description && <p className="text-center text-sm py-6 border-b">{description}</p>}
        {children}
      </div>
    </div>
  );
}
