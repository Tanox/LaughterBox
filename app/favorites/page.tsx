'use client'

// app/favorites/page.tsx v6.1.0

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, Trash2 } from 'lucide-react'
import { JOKES_DATA_DEDUPED } from '@/lib/jokes-data'
import { CATEGORIES } from '@/lib/types'
import { useFavorites } from '@/hooks/use-favorites'

const JOKES = JOKES_DATA_DEDUPED

export default function FavoritesPage() {
  const { favorites, toggleFavorite, isLoaded } = useFavorites()

  const categoryMap = useMemo(() => {
    const map = new Map<string, { name: string; emoji: string }>()
    for (const c of CATEGORIES) {
      map.set(c.id, { name: c.name, emoji: c.emoji })
    }
    return map
  }, [])

  const favoriteJokes = useMemo(() => {
    const favSet = new Set(favorites)
    return JOKES.filter((j) => favSet.has(j.id))
  }, [favorites])

  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
      <header className="sticky top-0 z-10 border-b border-border/50 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 md:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label="返回首页"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
            返回
          </Link>
          <h1 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <Heart className="h-4 w-4 fill-red-500 text-red-500" strokeWidth={2.25} />
            我的收藏
          </h1>
          <span className="text-xs text-muted-foreground">{favoriteJokes.length} 则</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 md:px-8 md:py-10">
        {!isLoaded ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                aria-hidden="true"
                className="h-20 animate-pulse rounded-2xl bg-muted dark:bg-neutral-800"
              />
            ))}
          </div>
        ) : favoriteJokes.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <Heart className="h-12 w-12 text-muted-foreground/40" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">还没有收藏任何笑话</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              去看看笑话
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {favoriteJokes.map((joke) => {
              const cat = categoryMap.get(joke.category)
              return (
                <li
                  key={joke.id}
                  className="flex items-start gap-3 rounded-2xl border border-border/50 bg-card p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.20)]"
                >
                  <div className="flex-1">
                    <p className="font-serif text-base leading-relaxed text-foreground">
                      {joke.content}
                    </p>
                    {cat && (
                      <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <span aria-hidden="true">{cat.emoji}</span>
                        {cat.name}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleFavorite(joke.id)}
                    aria-label="取消收藏"
                    className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={2.25} />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </main>
    </div>
  )
}
