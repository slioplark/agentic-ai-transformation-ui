import type { User } from "@lib/api/auth"

const sessionUserKey = "agentic-ai-transformation.user"
export const sessionDurationMs = 8 * 60 * 60 * 1000

type StoredSessionPayload = {
  user: User
  expiresAt: number
}

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) return false

  const user = value as Partial<User>
  return (
    typeof user.user_id === "string" &&
    typeof user.name === "string" &&
    typeof user.email === "string" &&
    typeof user.title === "string" &&
    typeof user.department === "string"
  )
}

function isStoredSessionPayload(value: unknown): value is StoredSessionPayload {
  if (typeof value !== "object" || value === null) return false

  const session = value as Partial<StoredSessionPayload>
  return (
    isUser(session.user) &&
    typeof session.expiresAt === "number" &&
    Number.isFinite(session.expiresAt)
  )
}

function getStoredSession(): StoredSessionPayload | null {
  if (typeof window === "undefined") return null

  const storedSession = sessionStorage.getItem(sessionUserKey)
  if (!storedSession) return null

  try {
    const session: unknown = JSON.parse(storedSession)
    if (
      !isStoredSessionPayload(session) ||
      session.expiresAt <= Date.now()
    ) {
      clearSessionUser()
      return null
    }
    return session
  } catch {
    clearSessionUser()
    return null
  }
}

export function getSessionUser(): User | null {
  return getStoredSession()?.user ?? null
}

export function getSessionExpiresAt(): number | null {
  return getStoredSession()?.expiresAt ?? null
}

export function setSessionUser(user: User) {
  const session: StoredSessionPayload = {
    user,
    expiresAt: Date.now() + sessionDurationMs,
  }
  sessionStorage.setItem(sessionUserKey, JSON.stringify(session))
}

export function clearSessionUser() {
  sessionStorage.removeItem(sessionUserKey)
}
