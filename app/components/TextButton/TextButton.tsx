"use client"

import type { ButtonProps } from "@mui/material/Button"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"

const StyledButton = styled(Button)({
  width: "fit-content",
  minWidth: 0,
  padding: "4px",
})

export default function TextButton(props: ButtonProps) {
  return (
    <StyledButton
      size="small"
      variant="text"
      {...props}
    />
  )
}
