import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export default function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.08 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
      }}
    >
      {children}
    </div>
  )
}
