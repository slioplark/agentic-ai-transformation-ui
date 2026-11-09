import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import styles from "./ThresholdProgress.module.css"

type ThresholdProgressProps = {
  color?: "secondary" | "success" | "warning" | "error"
  value: number
  threshold?: number
  className?: string
}

const clampProgress = (value: number) => Math.min(100, Math.max(0, value))

export default function ThresholdProgress({
  color = "secondary",
  value,
  threshold,
  className,
}: ThresholdProgressProps) {
  const progress = clampProgress(value)
  const rootClassName = className ? `${styles.root} ${className}` : styles.root
  const clampedThreshold = threshold === undefined ? undefined : clampProgress(threshold)

  return (
    <Box className={rootClassName}>
      <LinearProgress
        color={color}
        value={progress}
        variant="determinate"
        className={styles.progress}
      />
      {clampedThreshold === undefined ? null : (
        <Box
          sx={{ left: `${clampedThreshold}%` }}
          className={styles.marker}
          aria-hidden="true"
        />
      )}
    </Box>
  )
}
