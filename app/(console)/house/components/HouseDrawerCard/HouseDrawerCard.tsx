import ButtonBase from "@mui/material/ButtonBase"
import Paper from "@mui/material/Paper"
import type { ReactNode } from "react"
import styles from "./HouseDrawerCard.module.css"

type HouseDrawerCardProps = {
  children: ReactNode
  className: string
  onClick: () => void
}

export default function HouseDrawerCard({ children, className, onClick }: HouseDrawerCardProps) {
  return (
    <ButtonBase
      sx={{ border: 1, borderColor: "divider", borderRadius: 1 }}
      variant="outlined"
      onClick={onClick}
      component={Paper}
      className={`${styles.card} ${className}`}
    >
      {children}
    </ButtonBase>
  )
}
