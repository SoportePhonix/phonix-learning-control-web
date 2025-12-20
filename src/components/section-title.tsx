import { SectionTitleProps } from '@/types/components';

import { Separator } from './ui';
import { Typography } from './ui/typography';

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div className="pt-2">
      <Typography variant="titulo_medio">{title}</Typography>
      <Separator />
    </div>
  );
};
