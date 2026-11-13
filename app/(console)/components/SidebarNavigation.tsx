import type { SvgIconComponent } from "@mui/icons-material"
// import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined"
// import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined"
// import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined"
// import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
// import ReorderOutlinedIcon from "@mui/icons-material/ReorderOutlined"
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import StackedBarChartOutlinedIcon from "@mui/icons-material/StackedBarChartOutlined"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Link from "next/link"
import styles from "./AppShell.module.css"

type NavItem = { label: string; href: string; icon: SvgIconComponent }

const workspaceItems: readonly NavItem[] = [
  { label: "成效總覽", href: "/", icon: StackedBarChartOutlinedIcon },
  { label: "房子進度圖", href: "/house", icon: HomeOutlinedIcon },
  // { label: "負責人填報", href: "/updates", icon: EditNoteOutlinedIcon },
  // { label: "Domain Hubs", href: "/hubs", icon: GridViewOutlinedIcon },
  // { label: "專案與 D-gate", href: "/milestones", icon: AccountTreeOutlinedIcon },
  // { label: "公民開發與治理", href: "/learn", icon: HistoryOutlinedIcon },
  // { label: "指標與管理規則", href: "/metrics", icon: ReorderOutlinedIcon },
  // { label: "帳號與授權", href: "/accounts", icon: SettingsOutlinedIcon },
]

type SidebarNavigationProps = {
  onNavigate: () => void
  pathname: string
}

export default function SidebarNavigation({ onNavigate, pathname }: SidebarNavigationProps) {
  return (
    <List className={styles.navigationList}>
      {workspaceItems.map(({ label, href, icon: Icon }) => {
        const selected = href === "/" ? pathname === "/" : pathname.startsWith(href)

        return (
          <ListItemButton
            key={href}
            href={href}
            onClick={onNavigate}
            selected={selected}
            className={styles.navigationItem}
            component={Link}
            sx={{ borderRadius: 1 }}
          >
            <ListItemIcon className={styles.navigationIcon}>
              <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={label}
              slotProps={{ primary: { className: styles.navigationLabel } }}
            />
          </ListItemButton>
        )
      })}
    </List>
  )
}
