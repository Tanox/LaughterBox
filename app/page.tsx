'use client'

import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { ThemeToggle } from '@/app/components/theme-toggle'
import { JokeCard } from '@/app/components/joke-card'
import { NavigationControls } from '@/app/components/navigation-controls'
import { JOKES_DATA } from '@/app/lib/jokes-data'
import { useFavorites } from '@/app/hooks/use-favorites'

// app/page.tsx v5.9.0

export default function Page() {
  const [jokes] = useState<string[]>(JOKES_DATA)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [direction, setDirection] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const { toggleFavorite, isFavorite, isLoaded: favoritesLoaded } = useFavorites()

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
      if (JOKES_DATA.length > 0) {
        setCurrentIndex(Math.floor(Math.random() * JOKES_DATA.length))
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (autoPlay && jokes.length > 1) {
      interval = setInterval(() => {
        setDirection(1)
        setCurrentIndex(prev => (prev + 1) % jokes.length)
      }, 30000)
    }
    
    return () => {
      if (interval) {
        clearInterval(interval)
      }
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

  const handleDragEnd = useCallback((offset: { x: number }) => {
    if (offset.x < -50) {
      handleNext()
    } else if (offset.x > 50) {
      handlePrev()
    }
  }, [handleNext, handlePrev])

  const isReady = mounted && favoritesLoaded

  return (
    <div id="page-wrapper" className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <header id="main-header" className="sticky top-0 z-10 border-b border-neutral-200/50 bg-white/90 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-950/90">
        <div id="header-content" className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:px-8 md:py-3">
          <div id="brand-logo" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-neutral-900 dark:text-neutral-50 md:h-6 md:w-6" />
            <h1 className="text-lg font-bold dark:text-neutral-50 md:text-xl">LaughterBox</h1>
          </div>
          <div id="header-actions" className="flex items-center gap-3 md:gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="main-content" className="flex flex-1 flex-col items-center justify-center px-4 py-6 md:px-12 lg:px-24 overflow-hidden">
        <div id="joke-viewer-container" className="relative w-full max-w-3xl lg:max-w-4xl">
          <AnimatePresence mode="wait" custom={direction}>
            {isReady && jokes.length > 0 && (
              <JokeCard
                joke={jokes[currentIndex]}
                index={currentIndex}
                total={jokes.length}
                direction={direction}
                onDragEnd={handleDragEnd}
              />
            )}
            {!isReady && (
              <div className="flex min-h-[350px] flex-col justify-center rounded-3xl bg-white p-8 shadow-sm dark:bg-neutral-900 sm:p-12 md:min-h-[450px] md:p-16 lg:p-20">
                <div className="h-12 w-3/4 animate-pulse self-center rounded-lg bg-neutral-100 dark:bg-neutral-800" />
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
    </div>
  )
}
