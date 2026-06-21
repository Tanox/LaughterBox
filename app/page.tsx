'use client'

import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import { ThemeToggle } from '@/components/theme-toggle'
import { JokeCard } from '@/components/joke-card'
import { NavigationControls } from '@/components/navigation-controls'
import { JOKES_DATA_DEDUPED } from '@/lib/jokes-data'
import { useFavorites } from '@/hooks/use-favorites'

export default function Page() {
  const [jokes] = useState<string[]>(JOKES_DATA_DEDUPED)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [direction, setDirection] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const { toggleFavorite, isFavorite, isLoaded: favoritesLoaded } = useFavorites()

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
      if (jokes.length > 0) {
        setCurrentIndex(Math.floor(Math.random() * jokes.length))
      }
    }, 0)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    if (autoPlay && jokes.length > 1) {
      interval = setInterval(() => {
        setDirection(1)
        setCurrentIndex(prev => (prev + 1) % jokes.length)
      }, 30000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoPlay, jokes.length])

  const handleRandom = useCallback(() => {
    if (jokes.length <= 1) return
    setDirection(0)
    setCurrentIndex(prev => {
      let nextIndex = prev
      while (nextIndex === prev && jokes.length > 1) {
        nextIndex = Math.floor(Math.random() * jokes.length)
      }
      return nextIndex
    })
  }, [jokes.length])

  const handleNext = useCallback(() => {
    if (jokes.length <= 1) return
    setDirection(1)
    setCurrentIndex(prev => (prev + 1) % jokes.length)
  }, [jokes.length])

  const handlePrev = useCallback(() => {
    if (jokes.length <= 1) return
    setDirection(-1)
    setCurrentIndex(prev => (prev - 1 + jokes.length) % jokes.length)
  }, [jokes.length])

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

  // Keyboard shortcuts for accessibility
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
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mounted, handleNext, handlePrev, handleRandom])

  const isReady = mounted && favoritesLoaded

  return (
    <div
      id="page-wrapper"
      className="flex min-h-screen flex-col bg-background transition-colors duration-300"
    >
      {/* Header / brand */}
      <header
        id="main-header"
        className="sticky top-0 z-10 border-b border-border/50 bg-background/90 backdrop-blur"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
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
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">LaughterBox</span>
              <span className="text-[11px] text-muted-foreground hidden sm:block">
                极简笑话收藏 · {jokes.length} 则
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="relative w-full max-w-3xl lg:max-w-4xl">
          <AnimatePresence mode="wait" custom={direction}>
            {isReady && jokes.length > 0 ? (
              <JokeCard
                key={currentIndex}
                joke={jokes[currentIndex]}
                index={currentIndex}
                total={jokes.length}
                direction={direction}
                onDragEnd={handleDragEnd}
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex min-h-[350px] flex-col justify-center rounded-3xl bg-card p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.20)] sm:p-12 md:min-h-[450px] md:p-16 lg:p-20"
              >
                <div className="h-12 w-3/4 animate-pulse self-center rounded-xl bg-muted dark:bg-neutral-800" />
              </div>
            )}
          </AnimatePresence>

          {isReady && jokes.length > 0 && (
            <NavigationControls
              onRandom={handleRandom}
              onPrev={handlePrev}
              onNext={handleNext}
              onToggleFavorite={() => toggleFavorite(currentIndex)}
              isFavorite={isFavorite(currentIndex)}
              jokeText={jokes[currentIndex]}
              autoPlay={autoPlay}
              onToggleAutoPlay={() => setAutoPlay(prev => !prev)}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          左右滑动或使用方向键切换 · 按空格随机
        </p>
      </footer>
    </div>
  )
}
