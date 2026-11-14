"use client"

import Stack from "@mui/material/Stack"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker as MuiDatePicker, type DatePickerProps } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

const StyledDatePicker = styled(MuiDatePicker)(({ theme }) => ({
  "& .MuiPickersInputBase-root": {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
  },
  "& .MuiButtonBase-root": {
    color: theme.palette.text.primary,
  },
  "& .Mui-disabled": {
    cursor: "not-allowed",
  },
}))

export default function DatePicker({ label, ...props }: DatePickerProps) {
  return (
    <Stack gap={0.5}>
      {label != null ? <Typography variant="h6">{label}</Typography> : null}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledDatePicker
          {...props}
          format="YYYY/MM/DD"
        />
      </LocalizationProvider>
    </Stack>
  )
}
