import { cn } from '@/lib/utils'

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'border-input placeholder:text-muted-foreground min-h-24 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-[color,box-shadow] resize-y',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        className
      )}
      {...props}
    />
  )
}
