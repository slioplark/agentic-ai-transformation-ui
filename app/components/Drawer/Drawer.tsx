"use client"

import MuiDrawer, { type DrawerProps } from "@mui/material/Drawer"
import { styled } from "@mui/material/styles"

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

export default function Drawer({ anchor = "right", ...props }: DrawerProps) {
  return (
    <StyledDrawer
      {...props}
      anchor={anchor}
    />
  )
}
