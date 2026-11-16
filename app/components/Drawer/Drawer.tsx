"use client"

import MuiDrawer, { type DrawerProps } from "@mui/material/Drawer"
import { styled } from "@mui/material/styles"
import { useLayoutEffect, useRef } from "react"

const StyledDrawer = styled(MuiDrawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    gap: 16,
    width: "50%",
    padding: 24,
    backgroundColor: theme.palette.background.default,
    "@media (max-width: 1024px)": {
      width: "75%",
    },
    "@media (max-width: 425px)": {
      width: "100%",
      padding: 16,
    },
  },
}))

type Props = DrawerProps & {
  contentKey?: number
}

export default function Drawer({ anchor = "right", contentKey, ...props }: Props) {
  const drawerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (contentKey !== undefined && props.open) {
      drawerRef.current?.querySelector<HTMLElement>(".MuiDrawer-paper")?.scrollTo({ top: 0 })
    }
  }, [contentKey, props.open])

  return (
    <StyledDrawer
      {...props}
      ref={drawerRef}
      anchor={anchor}
    />
  )
}
