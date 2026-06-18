'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

const FAVORITES_KEY = 'laughterbox-favorites'

// Helper to load favorites from localStorage
function loadFavorites(): number[] {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem(FAVORITES_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load favorites', e)
  }
  return []
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(loadFavorites)
  const isFirstRender = useRef(true)

  // Save favorites to localStorage whenever they change (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
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

  // Since favorites are loaded synchronously via useState initializer,
  // they are always available before first render
  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isLoaded: true
  }
}
