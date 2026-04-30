'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function useCompanyNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyId = searchParams.get('companyId');

  const buildUrl = (pathname: string, overrideCompanyId?: string | number) => {
    const idToUse = overrideCompanyId ?? companyId;

    if (!idToUse) {
      return pathname;
    }

    const params = new URLSearchParams();
    params.set('companyId', String(idToUse));
    return `${pathname}?${params.toString()}`;
  };

  return {
    push: (pathname: string, companyIdOverride?: string | number) => router.push(buildUrl(pathname, companyIdOverride)),
    replace: (pathname: string, companyIdOverride?: string | number) =>
      router.replace(buildUrl(pathname, companyIdOverride)),
    href: (pathname: string, companyIdOverride?: string | number) => buildUrl(pathname, companyIdOverride),
  };
}
