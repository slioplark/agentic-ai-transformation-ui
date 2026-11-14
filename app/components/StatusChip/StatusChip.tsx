"use client"

import type { ChipPropsColorOverrides } from "@mui/material/Chip"
import Chip from "@mui/material/Chip"
import type { SxProps, Theme } from "@mui/material/styles"
import { styled } from "@mui/material/styles"
import type { OverridableStringUnion } from "@mui/types"

type StatusChipProps = {
  label: string
  color?:
    | OverridableStringUnion<
        "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning",
        ChipPropsColorOverrides
      >
    | undefined
  variant?: "filled" | "outlined"
  sx?: SxProps<Theme>
}

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "color",
})<Pick<StatusChipProps, "color">>(({ theme, color }) => {
  if (!color || color === "default") return {}

  return {
    color: theme.darken(theme.palette[color].light, 0.6),
    backgroundColor: theme.lighten(theme.palette[color].light, 0.9),
  }
})

export default function StatusChip({ label, color, variant, sx }: StatusChipProps) {
  return (
    <StyledChip
      sx={sx}
      size="small"
      label={label}
      color={color ?? undefined}
      variant={variant}
    />
  )
}
