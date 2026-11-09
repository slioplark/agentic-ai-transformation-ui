"use client"

import Chip from "@mui/material/Chip"
import { alpha } from "@mui/material/styles"
import type { SxProps, Theme } from "@mui/material/styles"

type StatusChipProps = {
  label: string
  status: "success" | "warning" | "error" | "default"
  sx?: SxProps<Theme>
}

export default function StatusChip({ label, status, sx }: StatusChipProps) {
  return (
    <Chip
      sx={[
        (theme) => ({
          fontWeight: theme.typography.fontWeightBold,
          ...(status !== "default" && {
            backgroundColor: alpha(theme.palette[status].main, 0.12),
            color: theme.palette[status].dark,
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      size="small"
      color={status}
      label={label}
    />
  )
}
