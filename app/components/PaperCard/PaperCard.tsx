"use client"

import Paper, { type PaperProps } from "@mui/material/Paper"
import { styled } from "@mui/material/styles"

const StyledPaper = styled(Paper)<{ component?: PaperProps["component"] }>(({}) => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 16,
}))

export default function PaperCard({ component = "section", variant = "outlined", ...props }: PaperProps) {
  return (
    <StyledPaper
      {...props}
      variant={variant}
      component={component}
    />
  )
}
