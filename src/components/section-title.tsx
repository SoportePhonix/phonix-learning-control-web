'use client';

import { Button, Typography } from '@/lib/phonix-ui';
import { SectionTitleProps } from '@/types/components';
import { useRouter } from 'next/navigation';

import { Separator } from './ui';

export const SectionTitle = ({ title, buttonLabel, buttonHref }: SectionTitleProps) => {
  const router = useRouter();

  return (
    <div className="px-2 py-8">
      <div className="flex justify-between items-center">
        <Typography variant="subheading_large" font="light" color="verde-oscuro">
          {title}
        </Typography>
        {buttonLabel && buttonHref && (
          <Button variant="secondary" onClick={() => router.push(buttonHref)}>
            {buttonLabel}
          </Button>
        )}
      </div>
      <Separator />
    </div>
  );
};
