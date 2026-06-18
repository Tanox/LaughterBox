'use client'

import { Shuffle, Heart, Share2, Copy, ChevronLeft, ChevronRight, Play, Pause, Check } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import React from 'react'

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
  onToggleAutoPlay
}: NavigationControlsProps) {
  const [copied, setCopied] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showError, setShowError] = useState(false)
  const [heartAnimating, setHeartAnimating] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jokeText)
      setCopied(true)
      setShowToast(true)
      setShowError(false)
      setTimeout(() => {
        setCopied(false)
        setShowToast(false)
      }, 2000)
    } catch (e) {
      // Clipboard API failed - show error feedback
      console.error('Failed to copy to clipboard:', e)
      setShowError(true)
      setTimeout(() => setShowError(false), 2000)
    }
  }

  const handleToggleFavorite = () => {
    if (!isFavorite) {
      setHeartAnimating(true)
      setTimeout(() => setHeartAnimating(false), 500)
    }
    onToggleFavorite()
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
    <>
      <div id="nav-controls" className="mt-10 flex flex-col items-center gap-4 md:mt-12">
        <div className="flex items-center gap-4">
          <button
            id="btn-prev"
            onClick={onPrev}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:bg-neutral-100 hover:shadow-[0_8px_20px_rgb(0,0,0,0.1)] active:scale-95 active:translate-y-0 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:shadow-[0_8px_20px_rgb(0,0,0,0.35)] md:h-16 md:w-16"
            aria-label="上一个"
          >
            <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
          </button>

          <button
            id="btn-random"
            onClick={onRandom}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-lg font-bold transition-all hover:-translate-y-0.5 hover:bg-neutral-100 hover:shadow-[0_8px_20px_rgb(0,0,0,0.1)] active:scale-95 active:translate-y-0 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:shadow-[0_8px_20px_rgb(0,0,0,0.35)] md:h-20 md:w-20 md:text-xl"
            aria-label="随机"
          >
            <Shuffle className="h-6 w-6 md:h-7 md:w-7" />
          </button>

          <button
            id="btn-next"
            onClick={onNext}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:bg-neutral-100 hover:shadow-[0_8px_20px_rgb(0,0,0,0.1)] active:scale-95 active:translate-y-0 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:shadow-[0_8px_20px_rgb(0,0,0,0.35)] md:h-16 md:w-16"
            aria-label="下一个"
          >
            <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-autoplay"
            onClick={onToggleAutoPlay}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 ${
              autoPlay 
                ? 'text-blue-500' 
                : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
            }`}
            aria-label={autoPlay ? '暂停自动播放' : '开始自动播放'}
          >
            {autoPlay ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>

          <button
            id="btn-favorite"
            onClick={handleToggleFavorite}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 ${
              isFavorite 
                ? 'text-red-500' 
                : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
            }`}
            aria-label={isFavorite ? '取消收藏' : '收藏'}
          >
            <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current animate-heartBeat' : ''} ${heartAnimating ? 'animate-heartBeat' : ''}`} />
          </button>

          <button
            id="btn-copy"
            onClick={handleCopy}
            className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-400 transition-all hover:scale-110 hover:text-neutral-600 active:scale-95 dark:hover:text-neutral-300"
            aria-label="复制"
          >
            {copied ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>

          <button
            id="btn-share"
            onClick={handleShare}
            className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-400 transition-all hover:scale-110 hover:text-neutral-600 active:scale-95 dark:hover:text-neutral-300"
            aria-label="分享"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Toast notification - success */}
      <div 
        className={`fixed top-8 left-1/2 -translate-x-1/2 translate-y-[-100px] bg-green-500 text-white px-6 py-3 rounded-full text-sm font-medium shadow-[0_8px_24px_rgba(34,197,94,0.4)] opacity-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center gap-2 pointer-events-none z-50 ${showToast ? 'show' : ''}`}
        id="copied-toast"
      >
        <Check className="h-4 w-4" />
        已复制到剪贴板
      </div>

      {/* Toast notification - error */}
      <div 
        className={`fixed top-8 left-1/2 -translate-x-1/2 translate-y-[-100px] bg-red-500 text-white px-6 py-3 rounded-full text-sm font-medium shadow-[0_8px_24px_rgba(239,68,68,0.4)] opacity-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center gap-2 pointer-events-none z-50 ${showError ? 'show' : ''}`}
        id="error-toast"
      >
        <span>复制失败，请重试</span>
      </div>
    </>
  )
})
