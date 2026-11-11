import Stack from "@mui/material/Stack"
import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

type TextFieldProps = Omit<
  MuiTextFieldProps,
  "disabled" | "label" | "maxRows" | "minRows" | "multiline" | "onChange" | "value"
> & {
  label: string
  maxRows?: number
  minRows?: number
  disabled?: boolean
  multiline?: boolean
  onValueChange: (value: string) => void
  value: string
}

export default function TextField({
  label,
  value,
  maxRows,
  minRows,
  disabled,
  multiline = false,
  onValueChange,
  ...muiTextFieldProps
}: TextFieldProps) {
  const resolvedMaxRows = maxRows ?? (multiline ? minRows : undefined)

  return (
    <Stack gap={0.5}>
      <Typography variant="h6">{label}</Typography>
      <MuiTextField
        {...muiTextFieldProps}
        fullWidth
        multiline={multiline}
        value={value}
        maxRows={resolvedMaxRows}
        minRows={minRows}
        disabled={disabled}
        onChange={(event) => onValueChange(event.target.value)}
      />
    </Stack>
  )
}
