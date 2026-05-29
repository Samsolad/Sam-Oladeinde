import { cn } from '@/lib/utils'

export function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      className={cn(
        'border-input placeholder:text-muted-foreground h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-[color,box-shadow]',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        className
      )}
      {...props}
    />
  )
}
