"use client"

import MenuIcon from "@mui/icons-material/Menu"
import {
  getSessionExpiresAt,
  getSessionUser,
} from "@lib/session-storage"
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
import SidebarNavigation from "./SidebarNavigation"
import SidebarFooter from "./SidebarFooter"

export default function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { data: accountUser, mutate: refreshAccountUser } = useSWR(
    "client-session",
    getSessionUser,
    { revalidateOnFocus: false },
  )
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

  const drawer = (
    <Box className={styles.drawerContent}>
      <Box>
        <Brand />
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
            aria-label="開啟選單"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">UMC</Typography>
        </Toolbar>
      </AppBar>
      <Box
        className={styles.navigationRegion}
        component="nav"
        aria-label="主要選單"
      >
        <Drawer
          open={mobileOpen}
          onClose={closeMobileDrawer}
          variant="temporary"
          className={styles.mobileDrawer}
          slotProps={{ paper: { className: styles.drawerPaper } }}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
        <Drawer
          open
          variant="permanent"
          className={styles.desktopDrawer}
          slotProps={{ paper: { className: styles.drawerPaper } }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box className={styles.mainContent} component="main">
        <AccountMenu user={accountUser} />
        {children}
      </Box>
    </Box>
  )
}
