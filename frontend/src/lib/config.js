/**
 * Runtime configuration for the frontend.
 * This allows the same build to work in different environments.
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
 * Tries multiple strategies to find a working backend.
 */
function detectBackendUrl(isDev = import.meta.env.DEV) {
  // Priority 1: Explicit environment variable
  const envUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL
  if (envUrl) {
    console.log('[Config] Using backend URL from env:', envUrl)
    return envUrl
  }

  // Priority 2: Build-time backend URL (from Vite config define)
  if (BUILD_BACKEND_URL) {
    console.log('[Config] Using backend URL from build:', BUILD_BACKEND_URL)
    return BUILD_BACKEND_URL
  }

  // Priority 3: Same origin (for production deployment)
  if (!isDev && typeof window !== 'undefined') {
    const { protocol, host } = window.location
    const sameOrigin = `${protocol}//${host}`
    console.log('[Config] Using same-origin backend:', sameOrigin)
    return sameOrigin
  }

  // Priority 4: Default localhost for dev
  if (isDev) {
    const defaultUrl = 'http://localhost:8001'
    console.log('[Config] Using default dev backend URL:', defaultUrl)
    return defaultUrl
  }

  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location
    const sameOrigin = `${protocol}//${host}`
    console.log('[Config] Using same-origin backend:', sameOrigin)
    return sameOrigin
  }

  return ''  // Last resort: relative path
}

/**
 * Get the API URL to use for requests.
 *
 * Priority:
 * 1. Cached config
 * 2. Environment variable (VITE_BACKEND_URL)
 * 3. Auto-detection based on current origin
 * 4. Empty (relative path - uses Vite proxy in dev)
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

  // Detect the best backend URL to use
  const detectedUrl = detectBackendUrl(isDev)

  // STEP 1: Runtime config from server (Skipped for Vite/SPA serving)
  let runtimeApiUrl = null;

  // STEP 2: Build-time environment variable (Vite style)
  const envApiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL
  if (isDev) console.log('🔧 [Config] VITE_API_URL from build:', envApiUrl || '(not set)')

  // STEP 3: Auto-detected URL or relative path
  const defaultApiUrl = detectedUrl || ''  // Empty means relative path (Vite proxy)

  if (typeof window !== 'undefined' && isDev) {
    console.log('🔧 [Config] Using URL:', defaultApiUrl || '(relative path for proxy)')
  }

  // Priority: Runtime config > Build-time env var > Auto-detected > Relative path
  const baseUrl = runtimeApiUrl !== null && runtimeApiUrl !== undefined ? runtimeApiUrl : (envApiUrl || defaultApiUrl)

  if (isDev) {
    console.log('🔧 [Config] Final base URL to try:', baseUrl || '(relative)')
  }

  try {
    if (isDev) console.log('🔧 [Config] Fetching backend config from:', `${baseUrl || '(relative)'}/api/config`)
    // Try to fetch runtime config from backend API
    const response = await fetchWithRetry(`${baseUrl}/api/config`, {
      cache: 'no-store',
    }, { retries: 2 })

    if (response.ok) {
      const data = await response.json()
      config = {
        apiUrl: baseUrl, // Use detected baseUrl
        version: data.version || 'unknown',
        buildTime: BUILD_TIME,
        latestVersion: data.latestVersion || null,
        hasUpdate: data.hasUpdate || false,
        dbStatus: data.dbStatus, // Can be undefined for old backends
        queueStatus: data.queueStatus,
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
 * Check API health endpoint.
 */
export async function getHealth() {
  const isDev = import.meta.env.DEV
  const detectedUrl = detectBackendUrl(isDev)
  const envApiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL
  const baseUrl = envApiUrl || detectedUrl || ''

  const healthUrl = `${baseUrl}/health`
  if (isDev) console.log('🔧 [Config] Checking health:', healthUrl || '(relative)')

  const response = await fetchWithRetry(healthUrl, { cache: 'no-store' }, { retries: 2 })
  if (!response.ok) {
    const err = new Error(`Health check returned status ${response.status}`)
    err.attemptedUrl = healthUrl
    throw err
  }
  return response.json()
}

/**
 * Reset the configuration cache (useful for testing).
 */
export function resetConfig() {
  config = null
  configPromise = null
}
