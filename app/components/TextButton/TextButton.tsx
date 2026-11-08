import type { ButtonProps } from "@mui/material/Button"
import Button from "@mui/material/Button"

export default function TextButton({ sx, ...props }: ButtonProps) {
  return (
    <Button
      variant="text"
      size="small"
      sx={[{ width: "fit-content", minWidth: 0, p: "4px" }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    />
  )
}
