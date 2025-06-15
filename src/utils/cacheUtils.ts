// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000

interface CacheItem<T> {
  data: T
  timestamp: number
}

type CacheValue = unknown

// In-memory cache store
const cacheStore = new Map<string, CacheItem<CacheValue>>()

export const cache = {
  // Get data from cache
  get: <T>(key: string): T | null => {
    const item = cacheStore.get(key)
    if (!item) return null

    // Check if cache is expired
    if (Date.now() - item.timestamp > CACHE_DURATION) {
      cacheStore.delete(key)
      return null
    }

    return item.data as T
  },

  // Set data in cache
  set: <T>(key: string, data: T): void => {
    cacheStore.set(key, {
      data,
      timestamp: Date.now(),
    })
  },

  // Clear specific cache item
  clear: (key: string): void => {
    cacheStore.delete(key)
  },

  // Clear all cache
  clearAll: (): void => {
    cacheStore.clear()
  },

  // Generate cache key
  generateKey: (endpoint: string, params?: Record<string, unknown>): string => {
    if (!params) return endpoint
    const sortedParams = Object.keys(params)
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = params[key]
          return acc
        },
        {} as Record<string, unknown>,
      )
    return `${endpoint}:${JSON.stringify(sortedParams)}`
  },
}

// Fetch with caching
export const fetchWithCache = async <T>(url: string, options?: RequestInit, cacheKey?: string): Promise<T> => {
  const key = cacheKey || cache.generateKey(url, options?.body ? JSON.parse(options.body as string) : undefined)

  // Try to get from cache first
  const cachedData = cache.get<T>(key)
  if (cachedData) {
    return cachedData
  }

  // If not in cache, fetch from API
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()

  // Store in cache
  cache.set(key, data)

  return data
}

// Stale-while-revalidate pattern
export const fetchWithSWR = async <T>(url: string, options?: RequestInit, cacheKey?: string): Promise<T> => {
  const key = cacheKey || cache.generateKey(url, options?.body ? JSON.parse(options.body as string) : undefined)

  // Check if we have cached data
  const cachedData = cache.get<T>(key)

  // If we have cached data, return it immediately and fetch fresh data in background
  if (cachedData) {
    // Fetch fresh data in the background (fire and forget)
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      })
      .then((data: T) => {
        cache.set(key, data)
      })
      .catch((error) => {
        console.error("Background fetch failed:", error)
      })

    return cachedData
  }

  // If no cached data, fetch fresh data
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    cache.set(key, data)
    return data as T
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

// Simple fetch function without caching (fallback)
export const simpleFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}
