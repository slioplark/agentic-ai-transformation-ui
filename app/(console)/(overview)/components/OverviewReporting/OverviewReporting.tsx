import type { ReportingStatusMetric } from "@(control)/(overview)/overview.mock"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import styles from "./OverviewReporting.module.css"

type OverviewReportingProps = {
  items: readonly ReportingStatusMetric[]
}

export default function OverviewReporting({ items }: OverviewReportingProps) {
  return (
    <section className={styles.grid}>
      {items.map((item) => (
        <Paper
          className={styles.card}
          component="article"
          key={item.label}
          variant="outlined"
        >
          <Typography variant="h4">{item.value}</Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {item.label}
          </Typography>
        </Paper>
      ))}
    </section>
  )
}
