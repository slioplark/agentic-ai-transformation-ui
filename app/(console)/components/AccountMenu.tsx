"use client"

import type { User } from "@lib/api/auth"
import { clearSessionUser } from "@lib/session-storage"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
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
        sx={[
          (theme) => ({
            color: "white",
            background: theme.palette.secondary.main,
          }),
        ]}
      >
        {displayName.slice(0, 1)}
      </Avatar>
      <Menu
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        anchorEl={menuAnchor}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          list: { sx: { minWidth: 280 } },
          paper: { sx: { mt: 1 } },
        }}
      >
        <MenuItem className={styles.accountIdentity}>
          <Avatar
            sx={[
              (theme) => ({
                color: "white",
                background: theme.palette.secondary.main,
              }),
            ]}
          >
            {displayName.slice(0, 1)}
          </Avatar>
          <ListItemText
            primary={displayName}
            secondary={user.user_id}
          />
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
