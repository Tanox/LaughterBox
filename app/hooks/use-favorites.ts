'use client'

// app/hooks/use-favorites.ts v6.1.0

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'

const FAVORITES_KEY = 'laughterbox-favorites'
const FAVORITES_VERSION = 1

interface StoredFavorites {
  version: number
  ids: string[]
}

function loadFavorites(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem(FAVORITES_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (
        parsed &&
        typeof parsed === 'object' &&
        'version' in parsed &&
        'ids' in parsed &&
        Array.isArray(parsed.ids) &&
        parsed.ids.every((item: unknown) => typeof item === 'string')
      ) {
        return (parsed as StoredFavorites).ids
      }
      if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
        return parsed
      }
    }
  } catch {
    // Silent ignore localStorage read errors
  }
  return []
}

function saveFavorites(ids: string[]) {
  if (typeof window === 'undefined') return
  try {
    const data: StoredFavorites = {
      version: FAVORITES_VERSION,
      ids,
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(data))
  } catch {
    // Silent ignore localStorage write errors
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(loadFavorites)
  const [isLoaded, setIsLoaded] = useState(false)
  const isFirstRender = useRef(true)

  const favoritesSet = useMemo(() => new Set(favorites), [favorites])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    saveFavorites(favorites)
  }, [favorites])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id)
      } else {
        return [...prev, id]
      }
    })
  }, [])

  const isFavorite = useCallback(
    (id: string) => favoritesSet.has(id),
    [favoritesSet]
  )

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isLoaded,
  }
}