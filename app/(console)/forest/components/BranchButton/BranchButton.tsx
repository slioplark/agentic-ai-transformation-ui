import ButtonBase from "@mui/material/ButtonBase"
import { alpha } from "@mui/material/styles"
import type { MouseEventHandler } from "react"
import styles from "./BranchButton.module.css"

export type BranchStatus = "pending" | "ongoing" | "completed"
export type BranchColor = "error" | "warning" | "info" | "secondary" | "success"

type BranchButtonProps = {
  title: string
  count?: number
  color?: BranchColor
  status: BranchStatus
  disabled?: boolean
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function BranchButton({ className, color, count, disabled, onClick, status, title }: BranchButtonProps) {
  return (
    <ButtonBase
      sx={(theme) => {
        if (!color) {
          return {
            color: "#183449",
            backgroundColor: "#e3ebef",
            "&:hover": { backgroundColor: "#d2e3ec" },
            "&.Mui-disabled": { color: "#8b9aa5", backgroundColor: "#e3ebef" },
          }
        }

        const palette = theme.palette[color]
        if (status === "pending") {
          return { color: alpha(palette.dark, 0.6), backgroundColor: alpha(palette.main, 0.08) }
        }
        if (status === "ongoing") {
          return { color: palette.dark, backgroundColor: alpha(palette.main, 0.16) }
        }
        return { color: palette.contrastText, backgroundColor: palette.main }
      }}
      onClick={onClick}
      disabled={disabled}
      className={[styles.branch, className].filter(Boolean).join(" ")}
    >
      {status === "ongoing" ? (
        <svg
          focusable="false"
          className={styles.progressBorder}
          aria-hidden="true"
        >
          <rect
            x="1"
            y="1"
            rx="7"
            fill="none"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            pathLength="100"
          />
        </svg>
      ) : null}
      <span className={styles.title}>{title}</span>
      {count ? <span className={styles.count}>{count}</span> : null}
    </ButtonBase>
  )
}
