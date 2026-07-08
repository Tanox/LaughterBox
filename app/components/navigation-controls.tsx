'use client'

// app/components/navigation-controls.tsx v6.2.0

import {
  Shuffle,
  Heart,
  Share2,
  Copy,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Check,
} from 'lucide-react'
import React, { useCallback, useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { useClipboard } from '@/hooks/use-clipboard'

interface NavigationControlsProps {
  onRandom: () => void
  onPrev: () => void
  onNext: () => void
  onToggleFavorite: () => void
  isFavorite: boolean
  jokeText: string
  autoPlay: boolean
  onToggleAutoPlay: () => void
  registerCopy?: (fn: () => void) => void
}

export const NavigationControls = React.memo(function NavigationControls({
  onRandom,
  onPrev,
  onNext,
  onToggleFavorite,
  isFavorite,
  jokeText,
  autoPlay,
  onToggleAutoPlay,
  registerCopy,
}: NavigationControlsProps) {
  const [heartAnimating, setHeartAnimating] = useState(false)
  const { toast } = useToast()
  const { copied, copy } = useClipboard()
  const heartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCopy = useCallback(() => {
    copy(jokeText)
  }, [jokeText, copy])

  useEffect(() => {
    if (registerCopy) {
      registerCopy(handleCopy)
    }
  }, [registerCopy, handleCopy])

  useEffect(() => {
    return () => {
      if (heartTimeoutRef.current) clearTimeout(heartTimeoutRef.current)
    }
  }, [])

  const handleToggleFavorite = useCallback(() => {
    if (!isFavorite) {
      setHeartAnimating(true)
      if (heartTimeoutRef.current) clearTimeout(heartTimeoutRef.current)
      heartTimeoutRef.current = setTimeout(() => setHeartAnimating(false), 500)
      toast({ title: '已加入收藏', variant: 'success', duration: 1800 })
    } else {
      toast({ title: '已取消收藏', variant: 'success', duration: 1500 })
    }
    onToggleFavorite()
  }, [isFavorite, onToggleFavorite, toast])

  const handleShare = useCallback(async () => {
    try {
      if (navigator?.share) {
        await navigator.share({
          title: 'LaughterBox',
          text: jokeText,
          url: window.location.href,
        })
      } else {
        handleCopy()
      }
    } catch {
      // User cancelled or failed - silent
    }
  }, [jokeText, handleCopy])

  const handleAutoPlay = useCallback(() => {
    if (autoPlay) {
      toast({ title: '已停止自动播放', variant: 'info', duration: 1500 })
    } else {
      toast({ title: '已开启自动播放', variant: 'info', duration: 1500 })
    }
    onToggleAutoPlay()
  }, [autoPlay, onToggleAutoPlay, toast])

  return (
    <div role="toolbar" aria-label="导航控件" className="mt-10 flex flex-col items-center gap-5 md:mt-12">
      <div className="flex items-center gap-4">
        <Button
          onClick={onPrev}
          variant="icon-round"
          size="icon-sm"
          aria-label="上一个笑话"
        >
          <ChevronLeft
            className="h-6 w-6 md:h-7 md:w-7"
            strokeWidth={2.25}
          />
        </Button>

        <Button
          onClick={onRandom}
          variant="icon-round"
          size="icon-lg"
          aria-label="随机笑话"
        >
          <Shuffle
            className="h-6 w-6 md:h-7 md:w-7"
            strokeWidth={2.25}
          />
        </Button>

        <Button
          onClick={onNext}
          variant="icon-round"
          size="icon-sm"
          aria-label="下一个笑话"
        >
          <ChevronRight
            className="h-6 w-6 md:h-7 md:w-7"
            strokeWidth={2.25}
          />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={handleAutoPlay}
          variant="icon-ghost"
          size="icon-xs"
          aria-label={autoPlay ? '停止自动播放' : '开始自动播放'}
          className={autoPlay ? 'text-blue-500' : undefined}
        >
          {autoPlay ? (
            <Pause className="h-5 w-5" strokeWidth={2.25} />
          ) : (
            <Play className="h-5 w-5" strokeWidth={2.25} />
          )}
        </Button>

        <Button
          onClick={handleToggleFavorite}
          variant="icon-ghost"
          size="icon-xs"
          aria-label={isFavorite ? '取消收藏' : '收藏'}
          className={isFavorite ? 'text-red-500' : undefined}
        >
          <Heart
            className={[
              'h-5 w-5',
              isFavorite ? 'fill-current' : '',
              heartAnimating ? 'animate-heartBeat' : '',
            ].join(' ')}
            strokeWidth={2.25}
          />
        </Button>

        <Button
          onClick={handleCopy}
          variant="icon-ghost"
          size="icon-xs"
          aria-label="复制到剪贴板"
        >
          {copied ? (
            <Check className="h-5 w-5 text-green-500" strokeWidth={2.25} />
          ) : (
            <Copy className="h-5 w-5" strokeWidth={2.25} />
          )}
        </Button>

        <Button
          onClick={handleShare}
          variant="icon-ghost"
          size="icon-xs"
          aria-label="分享"
        >
          <Share2 className="h-5 w-5" strokeWidth={2.25} />
        </Button>
      </div>

      <div className="text-xs tracking-[0.15em] text-muted-foreground opacity-60">
        v6.2.0
      </div>
    </div>
  )
})
