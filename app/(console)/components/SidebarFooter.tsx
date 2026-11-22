import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import styles from "./AppShell.module.css"

export default function SidebarFooter() {
  return (
    <Stack
      gap={0.5}
      className={styles.drawerFooter}
    >
      <Typography
        className={styles.footerText}
        variant="caption"
      >
        Work Smarter · Execute Better
      </Typography>
      <Typography
        className={styles.footerSubtext}
        variant="caption"
      >
        Learn Faster
      </Typography>
    </Stack>
  )
}
