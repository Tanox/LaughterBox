'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full border border-border bg-card md:h-11 md:w-11" />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      id="btn-theme-toggle"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      variant="icon-round"
      size="icon"
      aria-label={isDark ? '切换到浅色模式' : '切换到深色模式'}
      className={cn('md:h-11 md:w-11')}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all md:h-5 md:w-5 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all md:h-5 md:w-5 dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
