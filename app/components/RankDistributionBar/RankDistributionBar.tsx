import Box from "@mui/material/Box"
import styles from "./RankDistributionBar.module.css"

export type RankCounts = Readonly<Record<string, number>>

const rankColors = ["#a5c6da", "#78a9cc", "#3d7eae", "#1e568e", "#10253b"]
const rankCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })

function rankNumber(label: string) {
  const match = label.match(/\d+/)
  return match ? Number(match[0]) : null
}

export function rankColorForLabel(label: string) {
  const level = rankNumber(label)
  if (level && level <= rankColors.length) return rankColors[level - 1]

  let hash = 0
  for (const character of label) hash = (hash * 31 + character.charCodeAt(0)) >>> 0
  return `hsl(${hash % 360} 44% 38%)`
}

export default function RankDistributionBar({ ranks }: { ranks: RankCounts }) {
  const segments = Object.entries(ranks)
    .filter(([, count]) => Number.isFinite(count) && count > 0)
    .sort(([left], [right]) => rankCollator.compare(left, right))

  return (
    <Box className={styles.bar}>
      {segments.map(([label, count]) => (
        <Box
          sx={{ bgcolor: rankColorForLabel(label), color: "common.white", flex: count }}
          key={label}
          className={styles.segment}
        >
          <span className={styles.rankLabel}>{label.toUpperCase()}</span>
          <span className={styles.count}>{count}</span>
        </Box>
      ))}
    </Box>
  )
}
