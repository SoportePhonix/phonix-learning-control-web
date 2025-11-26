import { SectionTitleProps } from '@/types/components';

import { Separator } from './ui';
import { Typography } from './ui/typography';

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div className="px-2 py-8">
      <Typography variant="titulo_medio" bold="light">
        {title}
      </Typography>
      <Separator />
    </div>
  );
};
