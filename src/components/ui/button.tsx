import * as React from 'react';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { IconHome } from './icons';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-70 disabled:bg-bg_blue disabled:cursor-not-allowed disabled:text-blue_gray_medium [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'rounded-t-lg text-normal font-medio border-0 border-b-[1.5px] border-gray_medium bg-base-white text-blue_gray_medium hover:bg-verde_base hover:text-white text-gray-medium',
        secondary:
          'rounded-t-lg text-normal font-medio border-0 border-b-[1.5px] border-gray_medium bg-secondary text-white hover:bg-secondary/80',
        tertiary:
          'rounded-t-lg text-normal font-medio border-0 border-b-[1.5px] border-gray_medium bg-verde_base text-white hover:bg-base-white hover:text-blue_gray_medium',
        contour:
          'rounded-[4px] text-normal font-medio border-[1.5px] bg-base-white/80 border-gray_medium text-verde_base hover:bg-base-white',

        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-8',
        sm: 'h-8 rounded-md px-3 text-xs px-8',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-7 w-7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  hasIcon?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, hasIcon = false, icon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const defaultIcon = <IconHome />;

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {hasIcon && (icon || defaultIcon)}
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
