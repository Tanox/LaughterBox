'use client'

import { Shuffle, Heart, Share2, Copy, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface NavigationControlsProps {
  onRandom: () => void
  onPrev: () => void
  onNext: () => void
  onToggleFavorite: () => void
  isFavorite: boolean
  jokeText: string
}

export function NavigationControls({ 
  onRandom, 
  onPrev, 
  onNext, 
  onToggleFavorite, 
  isFavorite,
  jokeText 
}: NavigationControlsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jokeText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error('Failed to copy', e)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LaughterBox',
          text: jokeText,
          url: window.location.href
        })
      } catch (e) {
        console.error('Failed to share', e)
      }
    } else {
      handleCopy()
    }
  }

  return (
    <div id="nav-controls" className="mt-10 flex flex-col items-center gap-4 md:mt-12">
      <div className="flex items-center gap-4">
        <button
          id="btn-prev"
          onClick={onPrev}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:bg-neutral-100 active:scale-95 dark:bg-neutral-900 dark:hover:bg-neutral-800 md:h-16 md:w-16"
          aria-label="上一个"
        >
          <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
        </button>

        <button
          id="btn-random"
          onClick={onRandom}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-lg font-bold shadow-sm transition-all hover:bg-neutral-100 active:scale-95 dark:bg-neutral-900 dark:hover:bg-neutral-800 md:h-20 md:w-20 md:text-xl"
          aria-label="随机"
        >
          <Shuffle className="h-6 w-6 md:h-7 md:w-7" />
        </button>

        <button
          id="btn-next"
          onClick={onNext}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:bg-neutral-100 active:scale-95 dark:bg-neutral-900 dark:hover:bg-neutral-800 md:h-16 md:w-16"
          aria-label="下一个"
        >
          <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          id="btn-favorite"
          onClick={onToggleFavorite}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 ${
            isFavorite 
              ? 'text-red-500' 
              : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
          }`}
          aria-label={isFavorite ? '取消收藏' : '收藏'}
        >
          <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        <button
          id="btn-copy"
          onClick={handleCopy}
          className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-400 transition-all hover:text-neutral-600 hover:scale-110 active:scale-95 dark:hover:text-neutral-300"
          aria-label="复制"
        >
          {copied ? (
            <span className="text-sm font-medium text-green-500">✓</span>
          ) : (
            <Copy className="h-5 w-5" />
          )}
        </button>

        <button
          id="btn-share"
          onClick={handleShare}
          className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-400 transition-all hover:text-neutral-600 hover:scale-110 active:scale-95 dark:hover:text-neutral-300"
          aria-label="分享"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
