import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import type { OverviewKpi } from "../../overview.mock"
import Sparkline from "../Sparkline/Sparkline"
import styles from "./KpiCard.module.css"

type KpiCardProps = {
  kpi: OverviewKpi
  onClick?: () => void
}

const changeColor = {
  negative: "error.main",
  neutral: "text.secondary",
  positive: "success.main",
} as const

export default function KpiCard({ kpi, onClick }: KpiCardProps) {
  const content = (
    <>
      <Typography color="secondary.main" variant="caption">
        {kpi.theme}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {kpi.label}
      </Typography>
      <Typography component="p" variant="h4">
        {kpi.value}
      </Typography>
      <Box className={styles.changeSummary}>
        <Typography color={changeColor[kpi.changeTone]} variant="caption">
          {kpi.change}
        </Typography>
        <Typography color="text.secondary" variant="caption">
          {kpi.comparison}
        </Typography>
      </Box>
      <Sparkline label={kpi.label} values={kpi.series} />
      <Typography color="text.secondary" variant="caption">
        {kpi.detail}
      </Typography>
    </>
  )

  if (onClick) {
    return (
      <Paper
        component="button"
        type="button"
        variant="outlined"
        className={`${styles.card} ${styles.interactiveCard}`}
        onClick={onClick}
        sx={{
          "&:hover": { borderColor: "secondary.main" },
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: "secondary.main",
            outlineOffset: 2,
          },
        }}
      >
        {content}
      </Paper>
    )
  }

  return (
    <Paper
      component="article"
      variant="outlined"
      className={styles.card}
    >
      {content}
    </Paper>
  )
}
