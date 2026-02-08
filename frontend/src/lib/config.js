/**
 * Runtime configuration for the frontend.
 * This allows the same build to work in different environments.
 */

// Build timestamp for debugging - set at build time
const BUILD_TIME = new Date().toISOString()

let config = null
let configPromise = null

/**
 * Detect the best backend URL to use.
 * Tries multiple strategies to find a working backend.
 */
function detectBackendUrl() {
  // Priority 1: Explicit environment variable
  const envUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL
  if (envUrl) {
    console.log('[Config] Using backend URL from env:', envUrl)
    return envUrl
  }

  // Priority 2: Same origin (for production deployment)
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location
    // If we're on a non-standard port, assume backend is on same host
    if (host.includes(':')) {
      const sameOrigin = `${protocol}//${host}`
      console.log('[Config] Using same-origin backend:', sameOrigin)
      return sameOrigin
    }
  }

  // Priority 3: Default localhost with common ports
  // In development, we use relative paths (proxy handles it)
  // In production with separate hosts, this should be set via env
  const defaultPorts = [8001, 8000, 5055]
  const defaultUrl = `http://localhost:${defaultPorts[0]}`
  console.log('[Config] Using default backend URL:', defaultUrl)
  return ''  // Empty means use relative path (Vite proxy in dev, same origin in prod)
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
  const detectedUrl = detectBackendUrl()

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
    const response = await fetch(`${baseUrl}/api/config`, {
      cache: 'no-store',
    })

    if (response.ok) {
      const data = await response.json()
      config = {
        apiUrl: baseUrl, // Use detected baseUrl
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
      throw new Error(`API config endpoint returned status ${response.status}`)
    }
  } catch (error) {
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
