import Stack from "@mui/material/Stack"
import MuiTextField, { type TextFieldProps } from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

export default function TextField({ label, minRows, maxRows, multiline, ...props }: TextFieldProps) {
  return (
    <Stack gap={0.5}>
      {label != null ? <Typography variant="h6">{label}</Typography> : null}
      <MuiTextField
        fullWidth
        {...props}
        minRows={minRows}
        maxRows={maxRows ?? (multiline ? minRows : undefined)}
        multiline={multiline}
      />
    </Stack>
  )
}
