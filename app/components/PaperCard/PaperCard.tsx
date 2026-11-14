"use client"

import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import type { ReactNode } from "react"

const StyledPaper = styled(Paper)<{ component?: "section" }>(({}) => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 16,
}))

export default function PaperCard({ children }: { children: ReactNode }) {
  return (
    <StyledPaper
      variant="outlined"
      component="section"
    >
      {children}
    </StyledPaper>
  )
}
