/**
 * Runtime configuration for the frontend.
 * This allows the same Docker image to work in different environments.
 */


// Build timestamp for debugging - set at build time
const BUILD_TIME = new Date().toISOString()
const BUILD_BACKEND_URL = typeof __BACKEND_URL__ !== 'undefined' ? __BACKEND_URL__ : null

let config = null
let configPromise = null

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchWithRetry(url, options = {}, retryOptions = {}) {
  const retries = retryOptions.retries ?? 3
  const baseDelay = retryOptions.baseDelayMs ?? 300
  const maxDelay = retryOptions.maxDelayMs ?? 2000

  let lastError
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await fetch(url, options)
    } catch (err) {
      lastError = err
      if (attempt >= retries) break
      const backoff = Math.min(maxDelay, baseDelay * 2 ** attempt)
      const jitter = Math.floor(Math.random() * 100)
      await sleep(backoff + jitter)
    }
  }
  throw lastError
}

/**
 * Detect the best backend URL to use.
 */
function detectBackendUrl(isDev = import.meta.env.DEV) {
  const envUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL
  if (envUrl) {
    console.log('[Config] Using backend URL from env:', envUrl)
    return envUrl
  }

  if (BUILD_BACKEND_URL) {
    console.log('[Config] Using backend URL from build:', BUILD_BACKEND_URL)
    return BUILD_BACKEND_URL
  }

  if (!isDev && typeof window !== 'undefined') {
    const { protocol, host } = window.location
    return `${protocol}//${host}`
  }

  if (isDev) {
    return 'http://localhost:8001'
  }

  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location
    return `${protocol}//${host}`
  }

  return ''
}

/**
 * Get the API URL to use for requests.
 */
export async function getApiUrl() {
  // If we already have config, return it
  if (config) {
    return config.apiUrl
  }

  // If we're already fetching, wait for that
  if (configPromise) {
    const cfg = await configPromise
    return cfg.apiUrl
  }

  // Start fetching config
  configPromise = fetchConfig()
  const cfg = await configPromise
  return cfg.apiUrl
}

/**
 * Get the full configuration.
 */
export async function getConfig() {
  if (config) {
    return config
  }

  if (configPromise) {
    return await configPromise
  }

  configPromise = fetchConfig()
  return await configPromise
}

/**
 * Fetch configuration from the API or use defaults.
 */
async function fetchConfig() {
  // Use Vite environment variable
  const isDev = import.meta.env.DEV

  if (isDev) {
    console.log('🔧 [Config] Starting configuration detection...')
    console.log('🔧 [Config] Build time:', BUILD_TIME)
  }

  const detectedUrl = detectBackendUrl(isDev)

  const envApiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL
  if (isDev) console.log('🔧 [Config] VITE_API_URL from build:', envApiUrl || '(not set)')

  const defaultApiUrl = detectedUrl || ''

  if (typeof window !== 'undefined' && isDev) {
    console.log('🔧 [Config] Using URL:', defaultApiUrl || '(relative path for proxy)')
  }

  const baseUrl = envApiUrl || defaultApiUrl

  if (isDev) {
    console.log('🔧 [Config] Final base URL to try:', baseUrl || '(relative)')
  }

  try {
    if (isDev) console.log('🔧 [Config] Fetching backend config from:', `${baseUrl}/api/config`)
    // Try to fetch runtime config from backend API
    const response = await fetchWithRetry(`${baseUrl}/api/config`, {
      cache: 'no-store',
    }, { retries: 2 })

    if (response.ok) {
      const data = await response.json()
      config = {
        apiUrl: baseUrl, // Use baseUrl from runtime-config (Python no longer returns this)
        version: data.version || 'unknown',
        buildTime: BUILD_TIME,
        latestVersion: data.latestVersion || null,
        hasUpdate: data.hasUpdate || false,
        dbStatus: data.dbStatus, // Can be undefined for old backends
      }
      if (isDev) console.log('✅ [Config] Successfully loaded API config:', config)
      return config
    } else {
      // Don't log error here - ConnectionGuard will display it
      const err = new Error(`API config endpoint returned status ${response.status}`)
      err.attemptedUrl = `${baseUrl}/api/config`
      throw err
    }
  } catch (error) {
    if (error && typeof error === 'object' && !error.attemptedUrl) {
      error.attemptedUrl = `${baseUrl}/api/config`
    }
    // Don't log error here - ConnectionGuard will display it with proper UI
    throw error
  }
}

/**
 * Reset the configuration cache (useful for testing).
 */
export function resetConfig() {
  config = null
  configPromise = null
}
