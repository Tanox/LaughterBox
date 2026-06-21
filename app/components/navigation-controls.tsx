'use client'

import { Shuffle, Heart, Share2, Copy, ChevronLeft, ChevronRight, Play, Pause, Check } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'

interface NavigationControlsProps {
  onRandom: () => void
  onPrev: () => void
  onNext: () => void
  onToggleFavorite: () => void
  isFavorite: boolean
  jokeText: string
  autoPlay: boolean
  onToggleAutoPlay: () => void
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
}: NavigationControlsProps) {
  const [copied, setCopied] = useState(false)
  const [heartAnimating, setHeartAnimating] = useState(false)
  const { toast } = useToast()

  const handleCopy = useCallback(() => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(jokeText).then(() => {
          setCopied(true)
          toast({ title: '已复制到剪贴板', variant: 'success', duration: 2000 })
          setTimeout(() => setCopied(false), 2000)
        }).catch(() => fallbackCopy(jokeText))
      } else {
        fallbackCopy(jokeText)
      }
    } catch {
      toast({ title: '复制失败，请重试', variant: 'error', duration: 2000 })
    }

    function fallbackCopy(text: string) {
      try {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.setAttribute('readonly', '')
        ta.style.position = 'absolute'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        setCopied(true)
        toast({ title: '已复制到剪贴板', variant: 'success', duration: 2000 })
        setTimeout(() => setCopied(false), 2000)
      } catch {
        toast({ title: '复制失败，请重试', variant: 'error', duration: 2000 })
      }
    }
  }, [jokeText, toast])

  const handleToggleFavorite = useCallback(() => {
    if (!isFavorite) {
      setHeartAnimating(true)
      setTimeout(() => setHeartAnimating(false), 500)
      toast({ title: '已加入收藏', variant: 'success', duration: 1800 })
    } else {
      toast({ title: '已取消收藏', variant: 'info', duration: 1500 })
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

  return (
    <div className="mt-10 flex flex-col items-center gap-5 md:mt-12">
      {/* Primary navigation */}
      <div className="flex items-center gap-4">
        <Button
          onClick={onPrev}
          variant="icon-round"
          size="icon-sm"
          aria-label="上一个笑话"
        >
          <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.25} />
        </Button>

        <Button
          onClick={onRandom}
          variant="icon-round"
          size="icon-lg"
          aria-label="随机笑话"
        >
          <Shuffle className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.25} />
        </Button>

        <Button
          onClick={onNext}
          variant="icon-round"
          size="icon-sm"
          aria-label="下一个笑话"
        >
          <ChevronRight className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.25} />
        </Button>
      </div>

      {/* Secondary actions */}
      <div className="flex items-center gap-3">
        <Button
          onClick={onToggleAutoPlay}
          variant="icon-ghost"
          size="icon-xs"
          aria-label={autoPlay ? '停止自动播放' : '开始自动播放'}
          className={autoPlay ? 'text-blue-500' : undefined}
        >
          {autoPlay ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
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
              'h-6 w-6',
              isFavorite ? 'fill-current' : '',
              heartAnimating ? 'animate-heartBeat' : '',
            ].join(' ')}
          />
        </Button>

        <Button
          onClick={handleCopy}
          variant="icon-ghost"
          size="icon-xs"
          aria-label="复制到剪贴板"
        >
          {copied ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Copy className="h-5 w-5" />
          )}
        </Button>

        <Button
          onClick={handleShare}
          variant="icon-ghost"
          size="icon-xs"
          aria-label="分享"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
})
