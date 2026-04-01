import React, { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LucideIcon, Trash2 } from 'lucide-react';

import { Button } from './ui';

interface AlertConfirmDialogProps {
  icon?: LucideIcon;
  iconClassName?: string;
  tooltipText: string;
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  isLoading?: boolean;
  triggerButtonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  triggerButtonSize?: 'default' | 'sm' | 'lg' | 'icon';
  triggerButtonClassName?: string;
}

export function AlertConfirmDialogDestructive({
  icon: Icon = Trash2,
  iconClassName = 'h-4 w-4',
  tooltipText,
  title,
  description,
  onConfirm,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'destructive',
  isLoading = false,
  triggerButtonVariant = 'ghost',
  triggerButtonSize = 'sm',
  triggerButtonClassName = 'h-8 w-8 p-0 cursor-pointer hover:text-warning',
}: AlertConfirmDialogProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <AlertDialog>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button
                variant={triggerButtonVariant}
                size={triggerButtonSize}
                className={triggerButtonClassName}
                disabled={isLoading}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Icon className={iconClassName} strokeWidth={hovered ? 3 : 2} />
                <span className="sr-only">{tooltipText}</span>
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>{cancelText}</AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              type="button"
              variant="destructive"
              onClick={async () => {
                await onConfirm();
              }}
              disabled={isLoading}
            >
              {confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
