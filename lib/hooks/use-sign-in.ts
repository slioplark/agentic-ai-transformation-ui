"use client"

import {
  signIn,
  signInPath,
  type SignInCredentials,
  type SignInResponse,
} from "@lib/api/auth"
import useSWRMutation, { type MutationFetcher } from "swr/mutation"

export function useSignIn() {
  const fetcher: MutationFetcher<SignInResponse, string, SignInCredentials> = (
    _path,
    { arg },
  ) => signIn(arg)

  return useSWRMutation<SignInResponse, Error, string, SignInCredentials>(
    signInPath,
    fetcher,
  )
}
