import Box from "@mui/material/Box"
import styles from "./Sparkline.module.css"

type SparklineProps = {
  values: readonly number[]
}

const width = 200
const height = 32
const padding = 4

export default function Sparkline({ values }: SparklineProps) {
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
      sx={{ color: "secondary.main" }}
      role="img"
      viewBox={`0 0 ${width} ${height}`}
      className={styles.chart}
      component="svg"
      preserveAspectRatio="none"
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
