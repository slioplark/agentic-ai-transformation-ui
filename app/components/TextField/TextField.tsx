import Stack from "@mui/material/Stack"
import type { Theme } from "@mui/material/styles"
import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

type TextFieldProps = Omit<
  MuiTextFieldProps,
  "disabled" | "label" | "maxRows" | "minRows" | "multiline" | "onChange" | "value"
> & {
  disabled: boolean
  label: string
  maxRows?: number
  minRows?: number
  multiline?: boolean
  onValueChange: (value: string) => void
  value: string
}

const disabledFieldSx = (theme: Theme) => ({
  "& .MuiInputBase-root": {
    backgroundColor: theme.palette.background.paper,
  },
  "& .MuiInputBase-root.Mui-disabled .MuiInputBase-input": {
    WebkitTextFillColor: `${theme.palette.text.primary} !important`,
    cursor: "not-allowed",
  },
})

export default function TextField({
  disabled,
  label,
  value,
  maxRows,
  minRows,
  multiline = false,
  onValueChange,
  ...muiTextFieldProps
}: TextFieldProps) {
  const resolvedMaxRows = maxRows ?? (multiline ? minRows : undefined)

  return (
    <Stack gap={0.75}>
      <Typography variant="h6">{label}</Typography>
      <MuiTextField
        {...muiTextFieldProps}
        fullWidth
        multiline={multiline}
        sx={disabledFieldSx}
        value={value}
        maxRows={resolvedMaxRows}
        minRows={minRows}
        disabled={disabled}
        onChange={(event) => onValueChange(event.target.value)}
      />
    </Stack>
  )
}
