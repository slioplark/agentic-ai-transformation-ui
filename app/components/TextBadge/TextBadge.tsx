import type { ChipProps } from "@mui/material/Chip"
import Typography, { type TypographyProps } from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import type { ComponentType } from "react"

type TextBadgeProps = Omit<TypographyProps<"span">, "children" | "color" | "variant"> & {
  label: string
  color?: Exclude<ChipProps["color"], "default" | undefined>
  variant?: ChipProps["variant"]
}

const TypographyWithoutVariant = Typography as unknown as ComponentType<Omit<TypographyProps<"span">, "variant">>

const StyledTypography = styled(TypographyWithoutVariant, {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "variant",
})<Pick<TextBadgeProps, "color" | "variant"> & { component?: "span" }>(
  ({ theme, color, variant }) => {
    const sharedStyles = {
      width: 'fit-content',
      padding: "0 4px",
      borderRadius: "4px",
      fontSize: "10px",
    }

    if (!color) {
      return {
        ...sharedStyles,
        color: theme.palette.text.primary,
        border: variant === "outlined" ? `1px solid ${theme.palette.divider}` : undefined,
        backgroundColor: variant === "outlined" ? "transparent" : theme.palette.action.selected,
      }
    }

    return {
      ...sharedStyles,
      color: variant === "outlined" ? theme.palette[color].main : theme.palette[color].contrastText,
      border: variant === "outlined" ? `1px solid ${theme.palette[color].main}` : undefined,
      backgroundColor: variant === "outlined" ? "transparent" : theme.palette[color].main,
    }
  },
)

export default function TextBadge({ label, color, variant = "filled", ...props }: TextBadgeProps) {
  return (
    <StyledTypography
      {...props}
      color={color}
      variant={variant}
      component="span"
    >
      {label}
    </StyledTypography>
  )
}
