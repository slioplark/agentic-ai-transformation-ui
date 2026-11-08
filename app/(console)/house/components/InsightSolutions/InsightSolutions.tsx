import StatusChip from "@app/components/StatusChip/StatusChip"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import type { Insight } from "../../house.mock"
import styles from "./InsightSolutions.module.css"

const rankLabels = ["Connected", "Optimized", "Transparent", "Proactive", "Agile"]
const rankColors = ["#c4dbea", "#8fb9d8", "#4f8fbf", "#2464a0", "#132c47"]
const levelStatus = { 高: "success", 中: "warning", 低: "error" } as const

function InsightCard({ insight }: { insight: Insight }) {
  const total = insight.ranks.reduce((sum, value) => sum + value, 0)

  return (
    <Paper
      component="article"
      variant="outlined"
      className={styles.card}
    >
      <Typography
        component="h3"
        variant="h6"
      >
        {insight.name}{" "}
        <Typography
          component="span"
          variant="caption"
          color="text.secondary"
        >
          {insight.chineseName}
        </Typography>
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
      >
        {insight.benefit}
      </Typography>
      <Box
        className={styles.rankBar}
        aria-hidden="true"
      >
        {insight.ranks.map(
          (value, index) =>
            value > 0 && (
              <Box
                key={rankLabels[index]}
                sx={{ flexGrow: value, bgcolor: rankColors[index] }}
              />
            ),
        )}
      </Box>
      <Typography
        variant="caption"
        color="text.secondary"
      >
        {insight.ranks.map((value, index) => `R${index + 1} ${value}`).join(" · ")}（{total}）
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
      >
        Top tasks 需求滿足度
      </Typography>
      <Box
        component="ul"
        className={styles.tasks}
      >
        {insight.tasks.map((task) => (
          <Box
            component="li"
            className={styles.task}
            key={task.name}
          >
            <Typography variant="caption">{task.name}</Typography>
            <StatusChip
              label={task.level}
              status={levelStatus[task.level]}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  )
}

export default function InsightSolutions({ insights }: { insights: Insight[] }) {
  const taskRows = Math.max(1, ...insights.map((insight) => insight.tasks.length))

  return (
    <Box
      component="section"
      sx={{ minWidth: 0 }}
    >
      <Box className={styles.matrix}>
        <Box
          className={styles.heading}
          sx={{ bgcolor: "info.main", color: "common.white" }}
        >
          <Typography
            component="h2"
            id="insight-solutions-title"
            variant="h6"
          >
            Insight Solutions with Rx Gating
          </Typography>
          <Typography variant="caption">
            {rankLabels.map((label, index) => `R${index + 1} ${label}`).join(" · ")} · R4.x
          </Typography>
        </Box>
        <Box
          className={styles.grid}
          sx={{ "--task-rows": taskRows }}
        >
          <Box className={styles.label}>
            <Typography
              component="h3"
              variant="h6"
            >
              Insight
            </Typography>
            <Typography variant="caption">Forest View R1→R5 能力數</Typography>
            <Typography variant="caption">Top tasks 是否滿足</Typography>
          </Box>
          {insights.map((insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
