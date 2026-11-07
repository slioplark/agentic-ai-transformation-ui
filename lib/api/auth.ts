import { api } from "@lib/api/client"

export type User = {
  user_id: string
  name: string
  email: string
  title: string
  department: string
}

export type SignInCredentials = {
  username: string
  password: string
}

export type SignInResponse = {
  user: User
}

export const signInPath = "/api/auth/sign-in"

export function signIn(credentials: SignInCredentials) {
  return api.post<SignInResponse, SignInCredentials>(signInPath, credentials)
}
