"use client"

import Snackbar from "@app/components/Snackbar/Snackbar"
import theme from "@app/theme"
import { getErrorMessage } from "@lib/api/client"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { useCallback, useMemo, useState, type ReactNode } from "react"
import { SWRConfig } from "swr"

export default function AppProviders({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<{ id: number; message: string } | null>(null)

  const onError = useCallback((error: unknown) => {
    const message = getErrorMessage(error)
    setNotification((prev) => ({ id: (prev?.id ?? 0) + 1, message }))
  }, [])

  const swrConfig = useMemo(
    () => ({
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      onError,
    }),
    [onError],
  )

  return (
    <SWRConfig value={swrConfig}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        {notification ? (
          <Snackbar
            key={notification.id}
            message={notification.message}
          />
        ) : null}
      </ThemeProvider>
    </SWRConfig>
  )
}
