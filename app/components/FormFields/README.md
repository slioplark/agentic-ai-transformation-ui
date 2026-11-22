# FormFields

`FormFields` renders configured rows using a React Hook Form `control`. The caller owns the form and can validate without submitting.

```tsx
"use client"

import FormFields, { type FormRowConfig } from "@app/components/FormFields/FormFields"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useForm } from "react-hook-form"

type AccountValues = {
  email: string
  password: string
  role: string
  startDate: string
  age: number | ""
}

const configs: FormRowConfig<AccountValues>[] = [
  {
    fields: [
      {
        type: "text",
        name: "email",
        label: "Email",
        required: true,
        rules: { validate: (value) => (typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) || "Invalid email" },
      },
      {
        type: "password",
        name: "password",
        label: "Password",
        required: true,
        rules: { minLength: { value: 8, message: "Use at least 8 characters" } },
      },
    ],
  },
  {
    fields: [
      {
        type: "select",
        name: "role",
        label: "Role",
        options: [
          { value: "admin", label: "Admin" },
          { value: "user", label: "User" },
        ],
      },
      { type: "date", name: "startDate", label: "Start date" },
      { type: "number", name: "age", label: "Age", rules: { min: { value: 0, message: "Must be at least 0" } } },
    ],
  },
]

export default function AccountFormExample() {
  const form = useForm<AccountValues>({
    defaultValues: { email: "", password: "", role: "", startDate: "", age: "" },
  })

  async function handleSave() {
    if (!(await form.trigger())) return
    const values = form.getValues()
    console.log(values)
  }

  return (
    <Stack gap={2}>
      <FormFields control={form.control} configs={configs} />
      <Button variant="contained" onClick={handleSave}>Save</Button>
    </Stack>
  )
}
```

Each row contains one or more fields and becomes a single column below the `md` breakpoint. Field names must be unique. Dates use `YYYY-MM-DD` strings, or an empty string when cleared. Number fields return a number, or an empty string when cleared. Prefer `useForm`'s `defaultValues` for initial values and resets; a field's `defaultValue` is a fallback when the form has no default for that field. React Hook Form omits disabled fields from the form values.
