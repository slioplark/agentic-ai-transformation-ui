import type { User } from "@lib/api/auth"

const sessionUserKey = "agentic-ai-transformation.user"
export const sessionCacheKey = "client-session"
export const sessionDurationMs = 8 * 60 * 60 * 1000

type StoredSessionPayload = {
  user: User
  expiresAt: number
}

function parseStoredUser(value: unknown): User | null {
  if (typeof value !== "object" || value === null) return null

  const user = value as Partial<User>
  if (!user.user_id) return null

  return {
    user_id: user.user_id,
    name: user.name ?? "",
    email: user.email ?? "",
    title: user.title ?? "",
    department: user.department ?? "",
  }
}

function parseStoredSessionPayload(value: unknown): StoredSessionPayload | null {
  if (typeof value !== "object" || value === null) return null

  const session = value as { user?: unknown; expiresAt?: unknown }
  const user = parseStoredUser(session.user)
  if (!user || typeof session.expiresAt !== "number" || !Number.isFinite(session.expiresAt)) return null

  return { user, expiresAt: session.expiresAt }
}

function getStoredSession(): StoredSessionPayload | null {
  if (typeof window === "undefined") return null

  const storedSession = sessionStorage.getItem(sessionUserKey)
  if (!storedSession) return null

  try {
    const session = parseStoredSessionPayload(JSON.parse(storedSession))
    if (!session || session.expiresAt <= Date.now()) {
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

export function setSessionUser(user: User): User {
  if (user.user_id === "") throw new Error("Sign-in response is missing user_id")

  const session: StoredSessionPayload = {
    user,
    expiresAt: Date.now() + sessionDurationMs,
  }
  sessionStorage.setItem(sessionUserKey, JSON.stringify(session))
  return user
}

export function clearSessionUser() {
  sessionStorage.removeItem(sessionUserKey)
}
