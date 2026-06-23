'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

const FAVORITES_KEY = 'laughterbox-favorites'

function loadFavorites(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem(FAVORITES_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
        return parsed
      }
    }
  } catch {
    // Silent ignore localStorage read errors
  }
  return []
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(loadFavorites)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
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

  const isFavorite = useCallback((id: string) => {
    return favorites.includes(id)
  }, [favorites])

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isLoaded: true
  }
}