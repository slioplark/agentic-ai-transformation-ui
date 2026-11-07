"use client"

import { useSignIn } from "@lib/hooks/use-sign-in"
import { setSessionUser } from "@lib/session-storage"
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined"
import Visibility from "@mui/icons-material/VisibilityOutlined"
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const { error, isMutating, trigger } = useSignIn()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    try {
      const response = await trigger({
        username: String(formData.get("username") ?? ""),
        password: String(formData.get("password") ?? ""),
      })
      setSessionUser(response.user)
      router.replace("/")
    } catch {
      // The error alert below reports failed sign-in attempts.
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2.5}>
        <TextField
          name="username"
          type="text"
          label="帳號"
          focused
          required
          fullWidth
          autoComplete="username"
        />
        <TextField
          name="password"
          type={showPassword ? "text" : "password"}
          label="密碼"
          focused
          required
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "隱藏密碼" : "顯示密碼"}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          autoComplete="current-password"
        />
        {error ? (
          <Alert role="alert" severity="error">
            {error instanceof Error ? error.message : "登入失敗，請稍後再試。"}
          </Alert>
        ) : null}
        <Button type="submit" variant="contained" disabled={isMutating} fullWidth>
          {isMutating ? "登入中…" : "登入"}
        </Button>
      </Stack>
    </form>
  )
}
