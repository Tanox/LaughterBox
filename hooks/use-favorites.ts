'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

const FAVORITES_KEY = 'laughterbox-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    // Try to load from localStorage during initialization
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(FAVORITES_KEY)
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          console.error('Failed to load favorites', e)
        }
      }
    }
    return []
  })
  const [isLoaded, setIsLoaded] = useState(false)
  const firstRender = useRef(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    }
    firstRender.current = false
  }, [favorites])

  const toggleFavorite = useCallback((index: number) => {
    setFavorites(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index)
      } else {
        return [...prev, index]
      }
    })
  }, [])

  const isFavorite = useCallback((index: number) => {
    return favorites.includes(index)
  }, [favorites])

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isLoaded
  }
}
