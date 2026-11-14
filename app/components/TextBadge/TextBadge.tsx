import Typography from "@mui/material/Typography"
import type { SxProps, Theme } from "@mui/material/styles"
import { styled } from "@mui/material/styles"

type TextBadgeProps = {
  label: string
  sx?: SxProps<Theme>
}

const StyledTypography = styled(Typography)<{ component?: "span" }>(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "0 4px",
  borderRadius: "4px",
  fontSize: "10px",
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
}))

export default function TextBadge({ label, sx }: TextBadgeProps) {
  return (
    <StyledTypography
      sx={sx}
      component="span"
    >
      {label}
    </StyledTypography>
  )
}
