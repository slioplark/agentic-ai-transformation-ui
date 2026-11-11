"use client"

import TextField from "@app/components/TextField/TextField"
import { useSignIn } from "@lib/hooks/use-sign-in"
import { setSessionUser } from "@lib/session-storage"
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined"
import Visibility from "@mui/icons-material/VisibilityOutlined"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Stack from "@mui/material/Stack"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

export default function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
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
      <Stack gap={2}>
        <TextField
          required
          name="username"
          type="text"
          label="帳號"
          value={username}
          autoComplete="username"
          onValueChange={setUsername}
        />
        <TextField
          required
          name="password"
          type={showPassword ? "text" : "password"}
          label="密碼"
          value={password}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          autoComplete="current-password"
          onValueChange={setPassword}
        />
        {error ? (
          <Alert
            role="alert"
            severity="error"
          >
            {error instanceof Error ? error.message : "登入失敗，請稍後再試。"}
          </Alert>
        ) : null}
        <Button
          type="submit"
          variant="contained"
          disabled={isMutating}
          sx={{ height: "56px", mt: 2 }}
        >
          {isMutating ? "登入中…" : "登入"}
        </Button>
      </Stack>
    </form>
  )
}
