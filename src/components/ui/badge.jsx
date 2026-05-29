import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary/10 text-primary',
        accent: 'border-transparent bg-accent text-accent-foreground',
        secondary: 'border-transparent bg-secondary/20 text-secondary-foreground',
        outline: 'text-foreground border-border',
        live: 'border-primary/30 bg-primary/10 text-primary',
        building: 'border-accent/30 bg-accent/10 text-accent',
        coming: 'border-border bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
