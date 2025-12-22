'use client';

import { useConfig } from '@/utils/context';
import Image from 'next/image';

interface DynamicLogoProps {
  type: 'navbar' | 'login' | 'loginMobile';
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * Componente para renderizar logos dinámicos basados en configuración runtime
 *
 * @example
 * ```tsx
 * <DynamicLogo type="navbar" className="h-10" />
 * <DynamicLogo type="login" width={618} height={926} priority />
 * <DynamicLogo type="loginMobile" className="w-auto" />
 * ```
 */
export function DynamicLogo({ type, className = '', width, height, priority = false }: DynamicLogoProps) {
  const config = useConfig();

  const logoMap = {
    navbar: config.logoNavbar,
    login: config.logoLogin,
    loginMobile: config.logoLoginMobile,
  };

  const defaultSizes = {
    navbar: { width: 150, height: 40 },
    login: { width: 618, height: 926 },
    loginMobile: { width: 285, height: 36 },
  };

  const src = logoMap[type];
  const finalWidth = width || defaultSizes[type].width;
  const finalHeight = height || defaultSizes[type].height;

  if (!src) {
    return null;
  }

  return (
    <Image
      className={className}
      src={src}
      width={finalWidth}
      height={finalHeight}
      alt={`Logo ${type}`}
      priority={priority}
    />
  );
}
