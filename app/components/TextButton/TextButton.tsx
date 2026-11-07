import type { ButtonProps } from "@mui/material/Button"
import Button from "@mui/material/Button"

export default function TextButton(props: ButtonProps) {
  return (
    <Button
      variant="text"
      size="small"
      sx={{ px: 1.5, py: 0.5 }}
      {...props}
    />
  )
}
