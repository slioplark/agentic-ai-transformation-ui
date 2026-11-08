"use client"

import Drawer from "@mui/material/Drawer"
import Stack from "@mui/material/Stack"
import type { ReactNode } from "react"
import styles from "./DetailDrawer.module.css"

type DetailDrawerProps = {
  children: ReactNode
  onClose: () => void
  open: boolean
  titleId: string
}

export default function DetailDrawer({ children, onClose, open }: DetailDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { className: styles.paper } }}
    >
      <Stack
        component="section"
        className={styles.content}
        gap={2}
        useFlexGap
      >
        {children}
      </Stack>
    </Drawer>
  )
}
