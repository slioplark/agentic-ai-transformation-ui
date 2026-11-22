import TextField from "@app/components/TextField/TextField"
import MenuItem from "@mui/material/MenuItem"
import type { TextFieldProps } from "@mui/material/TextField"
import type { ReactNode } from "react"

export type SelectFieldOption = {
  value: string | number
  label: ReactNode
  disabled?: boolean
}

export type SelectFieldProps = Omit<TextFieldProps, "children" | "select"> & {
  options: readonly SelectFieldOption[]
}

export default function SelectField({ options, ...props }: SelectFieldProps) {
  return (
    <TextField
      select
      {...props}
    >
      {options.map(({ value, label, disabled }) => (
        <MenuItem
          key={value}
          value={value}
          disabled={disabled}
        >
          {label}
        </MenuItem>
      ))}
    </TextField>
  )
}
