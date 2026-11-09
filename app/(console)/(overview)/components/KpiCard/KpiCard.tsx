import Box from "@mui/material/Box"
import ButtonBase from "@mui/material/ButtonBase"
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
      <Typography
        color="secondary.main"
        variant="caption"
      >
        {kpi.theme}
      </Typography>
      <Typography
        color="text.secondary"
        variant="body2"
      >
        {kpi.label}
      </Typography>
      <Typography
        component="p"
        variant="h4"
      >
        {kpi.value}
      </Typography>
      <Box className={styles.changeSummary}>
        <Typography
          color={changeColor[kpi.changeTone]}
          variant="caption"
        >
          {kpi.change}
        </Typography>
        <Typography
          color="text.secondary"
          variant="caption"
        >
          {kpi.comparison}
        </Typography>
      </Box>
      <Sparkline
        values={kpi.series}
      />
      <Typography
        color="text.secondary"
        variant="caption"
      >
        {kpi.detail}
      </Typography>
    </>
  )

  if (onClick) {
    return (
      <ButtonBase
        component={Paper}
        variant="outlined"
        className={`${styles.card} ${styles.interactiveCard}`}
        onClick={onClick}
        sx={{
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          "&:hover": { borderColor: "secondary.main" },
          "&:focus-visible": {
            outlineColor: "secondary.main",
          },
        }}
      >
        {content}
      </ButtonBase>
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
