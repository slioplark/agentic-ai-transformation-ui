"use client"

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import type { User } from "@lib/api/auth"
import { clearSessionUser } from "@lib/session-storage"
import Avatar from "@mui/material/Avatar"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useRouter } from "next/navigation"
import { useState } from "react"
import styles from "./AppShell.module.css"

function getChineseName(name: string) {
  const chineseName = name.split(/[-–—]/).at(-1)?.trim()
  return chineseName || name.trim()
}

export default function AccountMenu({ user }: { user: User }) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)
  const router = useRouter()
  const displayName = getChineseName(user.name)

  return (
    <>
      <Avatar
        onClick={(event) => setMenuAnchor(event.currentTarget)}
        className={styles.accountButton}
        component="button"
        aria-expanded={Boolean(menuAnchor)}
        aria-haspopup="menu"
      >
        {displayName.slice(0, 1)}
      </Avatar>
      <Menu
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        anchorEl={menuAnchor}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        slotProps={{
          list: { sx: { minWidth: 280 } },
          paper: { sx: { mt: 1 } },
        }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem className={styles.accountIdentity}>
          <Avatar
            sx={{ fontSize: 20, height: 44, width: 44 }}
            className={styles.accountMenuAvatar}
          >
            {displayName.slice(0, 1)}
          </Avatar>
          <ListItemText primary={displayName} secondary={user.user_id} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            clearSessionUser()
            setMenuAnchor(null)
            router.push("/login")
          }}
        >
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>登出</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
