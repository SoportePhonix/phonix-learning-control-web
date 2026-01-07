'use client';

import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Align = 'left' | 'right';

interface CreateButtonProps {
  href: string;
  label: string;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'contour';
  align?: Align;
}

export const CreateButton = ({ href, label, icon, variant = 'secondary', align }: CreateButtonProps) => {
  return (
    <div
      className={cn(
        'flex mb-4',
        align === 'right' && 'justify-end',
        align === 'left' && 'justify-start',
        !align && 'w-full'
      )}
    >
      <Link href={href} className={!align ? 'w-full' : undefined}>
        <Button variant={variant} hasIcon={!!icon} icon={icon} className={!align ? 'w-full' : undefined}>
          {label}
        </Button>
      </Link>
    </div>
  );
};
