import { Typography } from '@/lib/phonix-ui';
import { SectionTitleProps } from '@/types/components';

import { Separator } from './ui';

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div className="px-2 py-8">
      <Typography variant="subheading_large" font="light" color="verde-oscuro">
        {title}
      </Typography>
      <Separator />
    </div>
  );
};
