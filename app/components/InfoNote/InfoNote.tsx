import { styled } from "@mui/material/styles"
import type { ReactNode } from "react"

type InfoNoteProps = {
  children: ReactNode
}

const InfoNoteRoot = styled("aside")(({ theme }) => ({
  padding: theme.spacing(1.75, 2.25),
  color: theme.palette.text.primary,
  borderLeft: `3px solid ${theme.palette.secondary.main}`,
  borderRadius: "0 7px 7px 0",
  backgroundColor: "#e9f4f2",
}))

export default function InfoNote({ children }: InfoNoteProps) {
  return <InfoNoteRoot role="note">{children}</InfoNoteRoot>
}
