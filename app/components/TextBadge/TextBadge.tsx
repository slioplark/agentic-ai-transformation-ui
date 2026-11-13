import Typography from "@mui/material/Typography"
import type { SxProps, Theme } from "@mui/material/styles"

type TextBadgeColor = "primary" | "secondary" | "error" | "info" | "success" | "warning"

type TextBadgeProps = {
  label: string
  color?: TextBadgeColor
  sx?: SxProps<Theme>
}

export default function TextBadge({ label, color = "primary", sx }: TextBadgeProps) {
  return (
    <Typography
      sx={[
        (theme) => ({
          display: "inline-flex",
          alignItems: "center",
          px: "4px",
          py: "2px",
          borderRadius: "4px",
          fontSize: "10px",
          fontWeight: 600,
          lineHeight: "9px",
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      component="span"
    >
      {label}
    </Typography>
  )
}
