"use client"

import Alert from "@mui/material/Alert"
import type { SnackbarProps } from "@mui/material/Snackbar"
import MuiSnackbar from "@mui/material/Snackbar"
import { useState } from "react"

export default function Snackbar({ message, ...props }: SnackbarProps) {
  const [open, setOpen] = useState(true)
  const close = () => setOpen(false)

  return (
    <MuiSnackbar
      {...props}
      open={open}
      onClose={(event, reason) => {
        props.onClose?.(event, reason)
        if (reason !== "clickaway") close()
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={6000}
    >
      <Alert
        onClose={close}
        severity="error"
      >
        {message}
      </Alert>
    </MuiSnackbar>
  )
}
