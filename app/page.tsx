'use client'

// app/page.tsx v6.0.0

import { useState, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence } from 'motion/react'
import { ThemeToggle } from '@/components/theme-toggle'
import { JokeCard } from '@/components/joke-card'
import { NavigationControls } from '@/components/navigation-controls'
import { JOKES_DATA_DEDUPED } from '@/lib/jokes-data'
import { useFavorites } from '@/hooks/use-favorites'
import { Joke } from '@/lib/types'

const JOKES = JOKES_DATA_DEDUPED
const JOKES_COUNT = JOKES.length

const LogoIcon = function LogoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 2l2.39 5.37L20 8l-4.2 3.73L17.5 18l-5.5-3.27L6.5 18 17.18 8 12 2z" />
    </svg>
  )
}

const SkeletonCard = function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="flex min-h-[350px] flex-col justify-center rounded-3xl bg-card p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.20)] sm:p-12 md:min-h-[450px] md:p-16 lg:p-20"
    >
      <div className="h-12 w-3/4 animate-pulse self-center rounded-xl bg-muted dark:bg-neutral-800" />
    </div>
  )
}

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [direction, setDirection] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const { toggleFavorite, isFavorite, isLoaded: favoritesLoaded } = useFavorites()
  const copyCallbackRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
      if (JOKES_COUNT > 0) {
        setCurrentIndex(Math.floor(Math.random() * JOKES_COUNT))
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    if (autoPlay && JOKES_COUNT > 1) {
      interval = setInterval(() => {
        setDirection(1)
        setCurrentIndex(prev => (prev + 1) % JOKES_COUNT)
      }, 30000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoPlay])

  const handleRandom = useCallback(() => {
    if (JOKES_COUNT <= 1) return
    setDirection(0)
    setCurrentIndex(prev => {
      let nextIndex = prev
      while (nextIndex === prev && JOKES_COUNT > 1) {
        nextIndex = Math.floor(Math.random() * JOKES_COUNT)
      }
      return nextIndex
    })
  }, [])

  const handleNext = useCallback(() => {
    if (JOKES_COUNT <= 1) return
    setDirection(1)
    setCurrentIndex(prev => (prev + 1) % JOKES_COUNT)
  }, [])

  const handlePrev = useCallback(() => {
    if (JOKES_COUNT <= 1) return
    setDirection(-1)
    setCurrentIndex(prev => (prev - 1 + JOKES_COUNT) % JOKES_COUNT)
  }, [])

  const handleDragEnd = useCallback(
    (offset: { x: number }) => {
      if (offset.x < -50) {
        handleNext()
      } else if (offset.x > 50) {
        handlePrev()
      }
    },
    [handleNext, handlePrev]
  )

  const handleToggleAutoPlay = useCallback(() => {
    setAutoPlay(prev => !prev)
  }, [])

  const handleToggleFavorite = useCallback(() => {
    const currentJoke = JOKES[currentIndex]
    if (currentJoke) {
      toggleFavorite(currentJoke.id)
    }
  }, [currentIndex, toggleFavorite])

  const setCopyCallback = useCallback((fn: () => void) => {
    copyCallbackRef.current = fn
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!mounted) return
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === ' ' || e.key.toLowerCase() === 'r') {
        e.preventDefault()
        handleRandom()
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault()
        handleToggleFavorite()
      } else if (e.key.toLowerCase() === 'c') {
        e.preventDefault()
        if (copyCallbackRef.current) {
          copyCallbackRef.current()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mounted, handleNext, handlePrev, handleRandom, handleToggleFavorite])

  const isReady = mounted && favoritesLoaded
  const currentJoke = JOKES[currentIndex]

  return (
    <div
      id="page-wrapper"
      className="flex min-h-screen flex-col bg-background transition-colors duration-300"
    >
      <header
        id="main-header"
        className="sticky top-0 z-10 border-b border-border/50 bg-background/90 backdrop-blur"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <LogoIcon />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">LaughterBox</span>
              <span className="hidden text-[11px] text-muted-foreground sm:block">
                极简笑话收藏 · {JOKES_COUNT} 则
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-6 md:px-12 lg:px-24">
        <div className="relative w-full max-w-3xl lg:max-w-4xl">
          <AnimatePresence mode="wait" custom={direction}>
            {isReady && JOKES_COUNT > 0 && currentJoke ? (
              <JokeCard
                key={currentJoke.id}
                joke={currentJoke}
                index={currentIndex}
                total={JOKES_COUNT}
                direction={direction}
                onDragEnd={handleDragEnd}
              />
            ) : (
              <SkeletonCard />
            )}
          </AnimatePresence>

          {isReady && JOKES_COUNT > 0 && currentJoke && (
            <NavigationControls
              onRandom={handleRandom}
              onPrev={handlePrev}
              onNext={handleNext}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite(currentJoke.id)}
              jokeText={currentJoke.content}
              autoPlay={autoPlay}
              onToggleAutoPlay={handleToggleAutoPlay}
              registerCopy={setCopyCallback}
            />
          )}
        </div>
      </main>

      <footer className="border-t border-border/50 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          左右滑动或使用方向键切换 · 按空格随机 · F 收藏 · C 复制
        </p>
      </footer>
    </div>
  )
}