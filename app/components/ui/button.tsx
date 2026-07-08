// app/components/ui/button.tsx v6.2.0

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90 active:scale-95',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground',
        link:
          'text-primary underline-offset-4 hover:underline',
        'icon-round':
          'bg-card text-card-foreground shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_8px_20px_rgb(0,0,0,0.10)] active:scale-95 active:translate-y-0 dark:shadow-[0_8px_30px_rgb(0,0,0,0.20)] dark:hover:bg-neutral-800 dark:hover:shadow-[0_8px_20px_rgb(0,0,0,0.35)]',
        'icon-ghost':
          'text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-6',
        icon: 'h-10 w-10',
        'icon-sm': 'h-14 w-14 md:h-16 md:w-16',
        'icon-lg': 'h-16 w-16 md:h-20 md:w-20',
        'icon-xs': 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
)
Button.displayName = 'Button'

export { Button, buttonVariants }
