import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import type { ReportingStatusMetric } from "../../overview.mock"
import styles from "./ReportingStatusGrid.module.css"

type ReportingStatusGridProps = {
  items: readonly ReportingStatusMetric[]
}

export default function ReportingStatusGrid({ items }: ReportingStatusGridProps) {
  return (
    <section className={styles.grid}>
      {items.map((item) => (
        <Paper className={styles.card} component="article" key={item.label} variant="outlined">
          <Typography component="p" variant="h4">
            {item.value}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {item.label}
          </Typography>
        </Paper>
      ))}
    </section>
  )
}
