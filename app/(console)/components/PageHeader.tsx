import Typography from "@mui/material/Typography"
import type { ReactNode } from "react"

type PageHeaderProps = {
  children: ReactNode
}

export default function PageHeader({ children }: PageHeaderProps) {
  return <Typography component="h1" variant="h1">{children}</Typography>
}
