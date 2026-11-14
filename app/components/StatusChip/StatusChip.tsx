"use client"

import type { ChipProps } from "@mui/material/Chip"
import Chip from "@mui/material/Chip"
import { styled } from "@mui/material/styles"

export type ChipColor = Exclude<ChipProps["color"], "default" | undefined>

type StatusChipProps = Omit<ChipProps, "color"> & {
  color?: ChipColor
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

export default function StatusChip({ color, size = "small", ...props }: StatusChipProps) {
  return (
    <StyledChip
      size={size}
      color={color}
      {...props}
    />
  )
}
