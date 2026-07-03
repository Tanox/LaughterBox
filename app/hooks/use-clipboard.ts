'use client'

// app/hooks/use-clipboard.ts v6.1.0

import { useState, useCallback, useRef, useEffect } from 'react'
import { copyToClipboard } from '@/lib/clipboard'
import { useToast } from '@/components/ui/toast'

export function useClipboard() {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const copy = useCallback(
    async (text: string) => {
      const success = await copyToClipboard(text)
      if (success) {
        setCopied(true)
        toast({ title: '已复制到剪贴板', variant: 'success', duration: 2000 })
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setCopied(false), 2000)
      } else {
        toast({ title: '复制失败，请重试', variant: 'error', duration: 2000 })
      }
      return success
    },
    [toast]
  )

  return { copied, copy }
}
