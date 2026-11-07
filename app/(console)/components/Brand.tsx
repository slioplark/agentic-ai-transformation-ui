import Stack from "@mui/material/Stack"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import styles from "./AppShell.module.css"

export default function Brand() {
  return (
    <Toolbar className={styles.drawerHeader}>
      <Stack spacing={0.5} useFlexGap>
        <Typography className={styles.brandName}>UMC</Typography>
        <Typography className={styles.brandTagline} variant="caption">
          AGENTIC AI TRANSFORMATION
        </Typography>
      </Stack>
    </Toolbar>
  )
}
