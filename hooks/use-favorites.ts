'use client'

import { useState, useEffect, useCallback } from 'react'

const FAVORITES_KEY = 'laughterbox-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(FAVORITES_KEY)
    if (saved) {
      try {
        setFavorites(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load favorites', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    }
  }, [favorites, isLoaded])

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
