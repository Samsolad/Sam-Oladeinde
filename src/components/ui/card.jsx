import { cn } from '@/lib/utils'

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'bg-card text-card-foreground flex flex-col rounded-2xl border border-border/50 shadow-sm',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('flex flex-col gap-2 p-6 pb-0', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <div className={cn('font-display text-xl leading-none', className)} {...props} />
}

export function CardDescription({ className, ...props }) {
  return <div className={cn('text-muted-foreground text-sm font-serif', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-6', className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
}
