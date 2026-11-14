import {
  actualProgress,
  daysBetween,
  formatDate,
  plannedProgress,
  projectStatus,
  snapshot,
  type Project,
} from "@(control)/(overview)/components/OverMilestones/milestones"
import StatusChip from "@app/components/StatusChip/StatusChip"
import ThresholdProgress from "@app/components/ThresholdProgress/ThresholdProgress"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import styles from "./ProjectMilestoneRow.module.css"

const statusLabels = { error: "紅燈 / 阻塞", warning: "黃燈 / 風險", success: "綠燈 / 依計畫" } as const

const percentage = (project: Project) => {
  const { actual, baseline, target } = project.projectKpi
  if (actual === null || target === baseline) return null
  return Math.round(Math.min(1, Math.max(0, (actual - baseline) / (target - baseline))) * 100)
}

export default function ProjectMilestoneRow({
  onSelect,
  project,
}: {
  onSelect: (project: Project) => void
  project: Project
}) {
  const status = projectStatus(project)
  const actual = actualProgress(project)
  const planned = plannedProgress(project)
  const nextGate = project.milestones.find((gate) => !gate.done)
  const stale = daysBetween(project.updated, snapshot) > 7
  const attainment = percentage(project)
  const delay = nextGate ? daysBetween(nextGate.baseline, nextGate.forecast) : 0

  return (
    <TableRow
      hover
      role="button"
      onClick={() => onSelect(project)}
      tabIndex={0}
      className={styles.row}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onSelect(project)
        }
      }}
    >
      <TableCell>
        <Typography
          variant="body2"
          fontWeight={700}
        >
          {project.name}
        </Typography>
        <Typography
          color="text.secondary"
          variant="caption"
        >
          {project.area} · {project.project}
        </Typography>
      </TableCell>
      <TableCell>
        <Box className={styles.cellStack}>
          <StatusChip
            sx={{ justifySelf: "start" }}
            label={statusLabels[status]}
            color={status}
          />
          <Typography
            color="text.secondary"
            variant="caption"
          >
            {project.issue}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box className={styles.cellStack}>
          <Typography variant="body2">
            {actual}% / {planned}%
          </Typography>
          <ThresholdProgress
            color={status}
            value={actual}
            threshold={planned}
          />
        </Box>
      </TableCell>
      <TableCell>
        <Box className={styles.cellStack}>
          <Typography variant="body2">{project.projectKpi.name}</Typography>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            {project.projectKpi.baseline} → {project.projectKpi.target} {project.projectKpi.unit} ·{" "}
            {project.projectKpi.actual === null ? "尚未量測" : `實際 ${project.projectKpi.actual}`}
          </Typography>
          {attainment === null ? null : (
            <Typography
              color={`${status}.main`}
              variant="caption"
              fontWeight={700}
            >
              達成 {attainment}%
            </Typography>
          )}
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{project.owner}</Typography>
        <Typography
          color="text.secondary"
          variant="caption"
        >
          Sponsor：{project.sponsor}
        </Typography>
      </TableCell>
      <TableCell>
        {nextGate ? (
          <Box className={styles.cellStack}>
            <Typography variant="body2">{nextGate.name}</Typography>
            <Typography
              color="text.secondary"
              variant="caption"
              className={styles.date}
            >
              {formatDate(nextGate.baseline)} → {formatDate(nextGate.forecast)}
            </Typography>
            <Typography
              color={delay > 0 ? "error.main" : "text.secondary"}
              variant="caption"
            >
              {delay > 0 ? `預測延後 ${delay} 天` : "預測如期"}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2">已完成 D5 驗收</Typography>
        )}
      </TableCell>
      <TableCell>
        <Box className={styles.cellStack}>
          <Typography
            variant="body2"
            className={styles.date}
          >
            {formatDate(project.updated)}
          </Typography>
          {stale ? (
            <Chip
              size="small"
              label="資料待更新"
            />
          ) : null}
        </Box>
      </TableCell>
    </TableRow>
  )
}
