'use client';

import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CreateResourceButtonProps {
  href: string;
  label: string;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'contour';
}

export const CreateResourceButton = ({ href, label, icon, variant = 'secondary' }: CreateResourceButtonProps) => {
  return (
    <div className="flex justify-end mb-4">
      <Link href={href}>
        <Button variant={variant} hasIcon={!!icon} icon={icon}>
          {label}
        </Button>
      </Link>
    </div>
  );
};
