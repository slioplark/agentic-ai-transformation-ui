"use client"

import Chip from "@mui/material/Chip"
import type { SxProps, Theme } from "@mui/material/styles"
import { styled } from "@mui/material/styles"

type StatusChipProps = {
  label: string
  status?: "primary" | "success" | "warning" | "error" | null
  variant?: "filled" | "outlined"
  sx?: SxProps<Theme>
}

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "status",
})<Pick<StatusChipProps, "status">>(({ theme, status }) => {
  if (!status) return {}

  return {
    color: theme.darken(theme.palette[status].light, 0.6),
    backgroundColor: theme.lighten(theme.palette[status].light, 0.9),
  }
})

export default function StatusChip({ label, status, variant, sx }: StatusChipProps) {
  return (
    <StyledChip
      sx={sx}
      size="small"
      label={label}
      color={status ?? undefined}
      status={status}
      variant={variant}
    />
  )
}
