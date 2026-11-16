import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"

export type DrawerNavigation = {
  onBack?: () => void
  onClose: () => void
}

export default function DrawerHeaderActions({ onBack, onClose }: DrawerNavigation) {
  return (
    <Stack direction="row">
      {onBack ? (
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
      ) : null}
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  )
}
