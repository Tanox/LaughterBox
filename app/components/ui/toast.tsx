'use client'

// app/components/ui/toast.tsx v6.2.0

import * as React from 'react'
import { Check, X, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastVariant = 'success' | 'error' | 'info'

interface ToastItem {
  id: string
  title: string
  variant?: ToastVariant
  duration?: number
}

interface ToastContextValue {
  items: ToastItem[]
  add: (t: Omit<ToastItem, 'id'>) => string
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([])
  const timeoutsRef = React.useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const dismiss = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id))
    const timer = timeoutsRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timeoutsRef.current.delete(id)
    }
  }, [])

  const add = React.useCallback(
    (t: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).slice(2, 10)
      const item: ToastItem = { id, duration: 2500, variant: 'info', ...t }
      setItems((prev) => [...prev, item])
      if (item.duration && item.duration > 0) {
        const timer = setTimeout(() => dismiss(id), item.duration)
        timeoutsRef.current.set(id, timer)
      }
      return id
    },
    [dismiss]
  )

  React.useEffect(() => {
    const timeouts = timeoutsRef.current
    return () => {
      timeouts.forEach((timer) => clearTimeout(timer))
      timeouts.clear()
    }
  }, [])

  const value = React.useMemo<ToastContextValue>(
    () => ({ items, add, dismiss }),
    [items, add, dismiss]
  )

  return (
    <ToastContext value={value}>
      {children}
      <ToastViewport items={items} />
    </ToastContext>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) {
    return {
      toast: (_t: Omit<ToastItem, 'id'>) => '',
      dismiss: (_id?: string) => {},
    }
  }
  return {
    toast: ctx.add,
    dismiss: (id?: string) => (id ? ctx.dismiss(id) : undefined),
  }
}

function ToastViewport({ items }: { items: ToastItem[] }) {
  if (!items.length) return null
  return (
    <div
      role="region"
      aria-label="通知"
      className="pointer-events-none fixed left-1/2 top-8 z-[100] flex w-fit -translate-x-1/2 flex-col items-center gap-2"
    >
      {items.map((t) => (
        <ToastItemView key={t.id} toast={t} />
      ))}
    </div>
  )
}

function ToastItemView({ toast }: { toast: ToastItem }) {
  const variantConfig: Record<ToastVariant, { icon: React.ReactNode; style: string }> = {
    success: {
      icon: <Check className="h-4 w-4" strokeWidth={2.5} />,
      style: 'bg-green-500 text-white shadow-[0_8px_24px_rgba(34,197,94,0.4)]',
    },
    error: {
      icon: <X className="h-4 w-4" strokeWidth={2.5} />,
      style: 'bg-red-500 text-white shadow-[0_8px_24px_rgba(239,68,68,0.4)]',
    },
    info: {
      icon: <Info className="h-4 w-4" strokeWidth={2.5} />,
      style:
        'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.2)]',
    },
  }
  const config = variantConfig[toast.variant ?? 'info']
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'pointer-events-auto flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium',
        config.style
      )}
    >
      {config.icon}
      <span>{toast.title}</span>
    </div>
  )
}
