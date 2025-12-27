import React from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Edit3, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface EditButtonProps {
  href: string;
  icon?: LucideIcon;
  iconClassName?: string;
  tooltipText?: string;
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
  buttonClassName?: string;
}

export function EditButton({
  href,
  icon: Icon = Edit3,
  iconClassName = 'h-4 w-4',
  tooltipText = 'Editar',
  buttonVariant = 'ghost',
  buttonSize = 'sm',
  buttonClassName = 'h-8 w-8 p-0',
}: EditButtonProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href}>
            <Button variant={buttonVariant} size={buttonSize} className={buttonClassName}>
              <Icon className={iconClassName} />
              <span className="sr-only">{tooltipText}</span>
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
