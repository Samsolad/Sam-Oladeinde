import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

export function Tabs({ className, ...props }) {
  return <TabsPrimitive.Root className={cn('flex flex-col gap-4', className)} {...props} />
}

export function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      className={cn(
        'bg-muted inline-flex h-auto w-full flex-wrap items-center justify-start gap-1 rounded-xl p-1.5',
        className
      )}
      {...props}
    />
  )
}

export function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm',
        'text-muted-foreground inline-flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-xs font-medium whitespace-nowrap transition-all',
        'focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none',
        className
      )}
      {...props}
    />
  )
}

export function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content className={cn('outline-none animate-fade-in-up', className)} {...props} />
  )
}
