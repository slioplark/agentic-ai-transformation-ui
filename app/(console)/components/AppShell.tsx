"use client"

import { getSessionExpiresAt, getSessionUser } from "@lib/session-storage"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"
import useSWR from "swr"
import AccountMenu from "./AccountMenu"
import styles from "./AppShell.module.css"
import Brand from "./Brand"
import SidebarFooter from "./SidebarFooter"
import SidebarNavigation from "./SidebarNavigation"

export default function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopCollapsed, setDesktopCollapsed] = useState(false)
  const { data: accountUser, mutate: refreshAccountUser } = useSWR("client-session", getSessionUser, {
    revalidateOnFocus: false,
  })
  const router = useRouter()
  const pathname = usePathname()
  const accountUserId = accountUser?.user_id ?? ""

  useEffect(() => {
    if (accountUser === null) router.replace("/login")
  }, [accountUser, router])

  useEffect(() => {
    if (!accountUserId) return

    const expiresAt = getSessionExpiresAt()
    if (!expiresAt) return

    const remainingMs = expiresAt - Date.now()
    if (remainingMs <= 0) {
      void refreshAccountUser()
      return
    }

    const timeoutId = window.setTimeout(() => {
      void refreshAccountUser()
    }, remainingMs)
    return () => window.clearTimeout(timeoutId)
  }, [accountUserId, refreshAccountUser])

  if (!accountUser) return null

  const closeMobileDrawer = () => setMobileOpen(false)

  const drawer = (desktop: boolean) => (
    <Box className={`${styles.drawerContent} ${desktop && desktopCollapsed ? styles.drawerContentCollapsed : ""}`}>
      <Box>
        <Brand
          onToggle={desktop ? () => setDesktopCollapsed((collapsed) => !collapsed) : undefined}
          collapsed={desktopCollapsed}
        />
        <Box className={styles.navigationContainer}>
          <SidebarNavigation
            pathname={pathname}
            onNavigate={closeMobileDrawer}
          />
        </Box>
      </Box>
      <SidebarFooter />
    </Box>
  )

  return (
    <Box className={styles.shell}>
      <AppBar
        position="fixed"
        className={styles.mobileAppBar}
        elevation={0}
      >
        <Toolbar className={styles.mobileToolbar}>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(true)}
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">UMC</Typography>
        </Toolbar>
      </AppBar>
      <Box
        className={`${styles.navWrap} ${desktopCollapsed ? styles.navWrapCollapsed : ""}`}
        component="nav"
      >
        <Drawer
          open={mobileOpen}
          onClose={closeMobileDrawer}
          variant="temporary"
          className={styles.mobileDrawer}
          slotProps={{ paper: { className: styles.drawerPaper } }}
          ModalProps={{ keepMounted: true }}
        >
          {drawer(false)}
        </Drawer>
        <Drawer
          open
          variant="permanent"
          className={styles.desktopDrawer}
          slotProps={{
            paper: { className: `${styles.drawerPaper} ${desktopCollapsed ? styles.drawerPaperCollapsed : ""}` },
          }}
        >
          {drawer(true)}
        </Drawer>
      </Box>
      <Box
        className={styles.mainContent}
        component="main"
      >
        <AccountMenu user={accountUser} />
        {children}
      </Box>
    </Box>
  )
}
