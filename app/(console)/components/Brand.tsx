import MenuIcon from "@mui/icons-material/Menu"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import styles from "./AppShell.module.css"

export default function Brand({ onToggle, collapsed }: { onToggle?: () => void; collapsed: boolean }) {
  return (
    <Toolbar className={styles.drawerHeader}>
      {onToggle && (
        <IconButton
          title={collapsed ? "展開選單" : "收合選單"}
          onClick={onToggle}
          className={styles.menuButton}
          aria-expanded={!collapsed}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Typography className={styles.brandName}>UMC</Typography>
      <Typography
        className={styles.brandTagline}
        variant="caption"
      >
        AGENTIC AI TRANSFORMATION
      </Typography>
    </Toolbar>
  )
}
