import type { AlertProps } from "@mui/material/Alert"
import Alert from "@mui/material/Alert"
import { styled } from "@mui/material/styles"

const StyledAlert = styled(Alert)({
  padding: "16px",
  borderLeft: "4px solid currentColor",
  "& .MuiAlert-message": {
    padding: 0,
  },
})

export default function InfoNote({ color = "info", ...props }: AlertProps) {
  return (
    <StyledAlert
      {...props}
      square
      icon={false}
      role="note"
      color={color}
    />
  )
}
