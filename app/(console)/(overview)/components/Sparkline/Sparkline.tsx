import Box from "@mui/material/Box"
import styles from "./Sparkline.module.css"

type SparklineProps = {
  label: string
  values: readonly number[]
}

const width = 200
const height = 32
const padding = 4

export default function Sparkline({ label, values }: SparklineProps) {
  const low = Math.min(...values)
  const high = Math.max(...values)
  const range = high - low || 1
  const lastIndex = values.length - 1
  const x = (index: number) => padding + (index * (width - padding * 2)) / lastIndex
  const y = (value: number) => height - padding - ((value - low) / range) * (height - padding * 2)
  const path = values
    .map((value, index) => `${index === 0 ? "M" : "L"}${x(index).toFixed(1)} ${y(value).toFixed(1)}`)
    .join(" ")

  return (
    <Box
      component="svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-label={`${label} 趨勢`}
      className={styles.chart}
      role="img"
      sx={{ color: "secondary.main" }}
    >
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={x(lastIndex)} cy={y(values[lastIndex])} fill="currentColor" r="3" />
    </Box>
  )
}
