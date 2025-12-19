'use client';

import { Loader } from '@/components/ui';

type FormPageLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  isLoading?: boolean;
};

export function FormPageLayout({ title, description, children, isLoading = false }: FormPageLayoutProps) {
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <div className="px-1 pt-10 pb-2">
        <h1 className="text-xl font-normal mb-10">{title}</h1>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-md shadow-sm">
        {description && <p className="text-center text-sm py-6 border-b">{description}</p>}
        {children}
      </div>
    </div>
  );
}
