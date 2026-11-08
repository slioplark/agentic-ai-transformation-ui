import Chip from "@mui/material/Chip"
import { alpha } from "@mui/material/styles"

type StatusChipProps = {
  label: string
  status: "success" | "warning" | "error" | "default"
}

export default function StatusChip({ label, status }: StatusChipProps) {
  return (
    <Chip
      color={status}
      label={label}
      size="small"
      sx={(theme) =>
        status === "default"
          ? {}
          : {
              backgroundColor: alpha(theme.palette[status].main, 0.12),
              color: theme.palette[status].dark,
            }
      }
    />
  )
}
