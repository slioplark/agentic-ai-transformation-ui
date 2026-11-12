import Stack from "@mui/material/Stack"
import type { Theme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import dayjs, { type Dayjs } from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

dayjs.extend(customParseFormat)

type DatePickerProps = {
  disabled: boolean
  format?: string
  label: string
  onValueChange: (value: string) => void
  value: string
}

const datePickerSx = (theme: Theme) => ({
  "& > .MuiPickersTextField-root .MuiPickersInputBase-root": {
    color: `${theme.palette.text.primary}`,
    backgroundColor: theme.palette.background.paper,
  },
  "& > .MuiPickersTextField-root .MuiButtonBase-root": {
    color: `${theme.palette.text.primary}`,
  },
  "& > .MuiPickersTextField-root .Mui-disabled": {
    cursor: "not-allowed",
  },
})

function getDateValue(value: string, format: string): Dayjs | null {
  const date = dayjs(value, format, true)
  return date.isValid() ? date : null
}

export default function DatePicker({ disabled, format = "YYYY/MM/DD", label, onValueChange, value }: DatePickerProps) {
  return (
    <Stack
      gap={0.5}
      sx={datePickerSx}
    >
      <Typography variant="h6">{label}</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiDatePicker
          value={getDateValue(value, format)}
          format={format}
          disabled={disabled}
          onChange={(date) => onValueChange(date?.isValid() ? date.format(format) : "")}
          slotProps={{ textField: { fullWidth: true } }}
        />
      </LocalizationProvider>
    </Stack>
  )
}
