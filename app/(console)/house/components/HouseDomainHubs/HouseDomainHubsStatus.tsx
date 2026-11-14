import { styled } from "@mui/material/styles"

type Status = "success" | "warning" | "error"

const StyledSpan = styled("span", {
  shouldForwardProp: (prop) => prop !== "status",
})<{ status: Status }>(({ theme, status }) => ({
  alignSelf: "flex-start",
  margin: theme.spacing(0, -0.5),
  padding: theme.spacing(0, 0.5),
  borderRadius: 4,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.darken(theme.palette[status].light, 0.6),
  backgroundColor: theme.lighten(theme.palette[status].light, 0.9),
}))

export default function HouseDomainHubsStatus({ available, needed }: { available: number; needed: number }) {
  const ratio = needed ? available / needed : 0
  const status: Status = ratio >= 0.7 ? "success" : ratio >= 0.4 ? "warning" : "error"

  return (
    <StyledSpan status={status}>
      需求覆蓋 {available}/{needed}
    </StyledSpan>
  )
}
