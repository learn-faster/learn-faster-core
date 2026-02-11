const STORAGE_KEY = 'open_notebook_user_id'

const USER_ID_PATTERN = /^[a-zA-Z0-9_-]{6,80}$/

const generateUserId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  const randomPart = Math.random().toString(36).slice(2, 10)
  return `user_${Date.now()}_${randomPart}`
}

export const getUserId = () => {
  try {
    const existing = localStorage.getItem(STORAGE_KEY)
    if (existing) return existing

    const generated = generateUserId()
    localStorage.setItem(STORAGE_KEY, generated)
    return generated
  } catch (error) {
    return generateUserId()
  }
}

export const isValidUserId = (value) => {
  if (!value) return false
  return USER_ID_PATTERN.test(String(value).trim())
}

export const setUserId = (value) => {
  const next = String(value || '').trim()
  if (!isValidUserId(next)) {
    throw new Error('Invalid user ID format')
  }
  localStorage.setItem(STORAGE_KEY, next)
  return next
}

export const clearUserId = () => {
  localStorage.removeItem(STORAGE_KEY)
}

export default getUserId
