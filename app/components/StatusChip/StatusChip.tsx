"use client"

import Chip from "@mui/material/Chip"
import type { SxProps, Theme } from "@mui/material/styles"
import { alpha } from "@mui/material/styles"

type StatusChipProps = {
  label: string
  color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
  status?: "success" | "warning" | "error" | "default"
  variant?: "filled" | "outlined"
  sx?: SxProps<Theme>
}

export default function StatusChip({ label, color, status = "default", variant = "filled", sx }: StatusChipProps) {
  const chipColor = color ?? status

  return (
    <Chip
      sx={[
        (theme) => ({
          fontWeight: theme.typography.fontWeightBold,
          ...(variant === "filled" &&
            chipColor !== "default" && {
              backgroundColor: alpha(theme.palette[chipColor].main, 0.12),
              color: theme.palette[chipColor].dark,
            }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      size="small"
      label={label}
      color={chipColor}
      variant={variant}
    />
  )
}
