"use client"

import FormFields, { type FormRowConfig } from "@app/components/FormFields/FormFields"
import { useSignIn } from "@lib/hooks/use-sign-in"
import { sessionCacheKey, setSessionUser } from "@lib/session-storage"
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined"
import Visibility from "@mui/icons-material/VisibilityOutlined"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Stack from "@mui/material/Stack"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSWRConfig } from "swr"

type LoginFormValues = {
  username: string
  password: string
}

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: { username: "", password: "" },
  })
  const { mutate } = useSWRConfig()
  const { isMutating, trigger } = useSignIn()

  async function handleSignIn({ username, password }: LoginFormValues) {
    try {
      const response = await trigger({ username, password })
      const user = setSessionUser(response.user)
      await mutate(sessionCacheKey, user, { revalidate: false })
      router.replace("/")
    } catch {
      // AppProviders reports failed sign-in attempts.
    }
  }

  const configs: FormRowConfig<LoginFormValues>[] = [
    {
      fields: [
        {
          type: "text",
          name: "username",
          label: "帳號",
          required: true,
        },
      ],
    },
    {
      fields: [
        {
          type: showPassword ? "text" : "password",
          name: "password",
          label: "密碼",
          required: true,
          slotProps: {
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
          },
        },
      ],
    },
  ]

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleSignIn)}
    >
      <Stack gap={2}>
        <FormFields
          control={control}
          configs={configs}
        />
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
