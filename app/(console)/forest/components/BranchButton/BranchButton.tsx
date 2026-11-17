import type { ForestInterviewStatus } from "@(control)/components/ForestView/forestViewData"
import ButtonBase from "@mui/material/ButtonBase"
import { alpha } from "@mui/material/styles"
import type { MouseEventHandler } from "react"
import styles from "./BranchButton.module.css"

export type BranchColor = "error" | "warning" | "info" | "secondary" | "success"

type BranchButtonProps = {
  title: string
  count?: number
  color?: BranchColor
  dimmed?: boolean
  variant: ForestInterviewStatus
  disabled?: boolean
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function BranchButton({
  title,
  count,
  color,
  dimmed,
  variant,
  disabled,
  className,
  onClick,
}: BranchButtonProps) {
  return (
    <ButtonBase
      sx={(theme) => {
        const palette = color
          ? theme.palette[color]
          : { main: theme.palette.grey[500], contrastText: theme.palette.text.primary }

        return {
          opacity: dimmed ? 0.28 : 1,
          transition: theme.transitions.create("opacity"),
          color:
            variant === "pending"
              ? theme.palette.text.disabled
              : variant === "ongoing"
                ? theme.palette.text.primary
                : palette.contrastText,
          backgroundColor: variant === "completed" ? palette.main : alpha(palette.main, 0.16),
        }
      }}
      onClick={onClick}
      disabled={disabled}
      className={[styles.branch, className].filter(Boolean).join(" ")}
    >
      <span className={styles.title}>{title}</span>
      {count ? <span className={styles.count}>{count}</span> : null}
    </ButtonBase>
  )
}
