import { alpha, styled } from "@mui/material/styles"
import type { ReactNode } from "react"

type InfoNoteProps = {
  children: ReactNode
  status?: "success" | "warning" | "error" | "default"
}

const InfoNoteRoot = styled("aside", {
  shouldForwardProp: (prop) => prop !== "status",
})<Pick<InfoNoteProps, "status">>(({ theme, status }) => ({
  padding: theme.spacing(1.75, 2.25),
  color: theme.palette.text.primary,
  borderLeft: `4px solid ${status === "default" ? theme.palette.text.secondary : theme.palette[status ?? "secondary"].main}`,
  backgroundColor:
    status === "default" ? theme.palette.action.hover : status ? alpha(theme.palette[status].main, 0.1) : "#e9f4f2",
}))

export default function InfoNote({ children, status }: InfoNoteProps) {
  return (
    <InfoNoteRoot
      role="note"
      status={status}
    >
      {children}
    </InfoNoteRoot>
  )
}
