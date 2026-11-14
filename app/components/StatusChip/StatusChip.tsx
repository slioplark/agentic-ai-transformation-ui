"use client"

import type { ChipProps } from "@mui/material/Chip"
import Chip from "@mui/material/Chip"
import type { SxProps, Theme } from "@mui/material/styles"
import { styled } from "@mui/material/styles"

export type ChipColor = Exclude<ChipProps["color"], "default" | undefined>

type StatusChipProps = {
  label: string
  color?: ChipColor | null
  variant?: "filled" | "outlined"
  sx?: SxProps<Theme>
}

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "color",
})<Pick<StatusChipProps, "color">>(({ theme, color }) => {
  if (!color) return {}

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
