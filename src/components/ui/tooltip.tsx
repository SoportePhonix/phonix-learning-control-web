'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & { variant?: 'top' | 'bottom' | 'left' | 'right' }
>(({ className, sideOffset = 8, variant = 'top', ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      side={variant}
      sideOffset={sideOffset}
      className={cn(
        'z-50 bg-var--primary-100/80 text-white font-base text-base rounded-lg py-2 px-4 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        {
          'data-[side=top]:slide-in-from-bottom-2': variant === 'top',
          'data-[side=bottom]:slide-in-from-top-2': variant === 'bottom',
          'data-[side=left]:slide-in-from-right-2': variant === 'left',
          'data-[side=right]:slide-in-from-left-2': variant === 'right',
        },
        className
      )}
      {...props}
    >
      <TooltipPrimitive.Arrow className="fill-var--primary-100/80" />
      {props.children}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
