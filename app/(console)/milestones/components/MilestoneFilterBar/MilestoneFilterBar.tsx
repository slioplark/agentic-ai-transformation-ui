import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { type SelectChangeEvent } from "@mui/material/Select"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import styles from "./MilestoneFilterBar.module.css"

export const areas = ["all", "Insight Solutions", "Domain Hubs", "AI Infrastructure", "Pillars"] as const
export const statusFilters = ["all", "error", "warning", "success", "stale", "upcoming", "overdue"] as const

export type AreaFilter = (typeof areas)[number]
export type StatusFilter = (typeof statusFilters)[number]

const areaLabels: Record<AreaFilter, string> = {
  all: "所有房子區塊",
  "Insight Solutions": "Insight Solutions",
  "Domain Hubs": "Domain Hubs",
  "AI Infrastructure": "AI Infrastructure",
  Pillars: "Pillars",
}

const statusLabels: Record<StatusFilter, string> = {
  all: "所有狀態",
  error: "紅燈 / 阻塞",
  warning: "黃燈 / 風險",
  success: "綠燈 / 依計畫",
  stale: "資料待更新",
  upcoming: "未來 14 天",
  overdue: "已逾原訂日期",
}

type MilestoneFilterBarProps = {
  area: AreaFilter
  onAreaChange: (area: AreaFilter) => void
  onQueryChange: (query: string) => void
  onStatusChange: (status: StatusFilter) => void
  query: string
  resultCount: number
  status: StatusFilter
  totalCount: number
}

export default function MilestoneFilterBar({
  area,
  onAreaChange,
  onQueryChange,
  onStatusChange,
  query,
  resultCount,
  status,
  totalCount,
}: MilestoneFilterBarProps) {
  const updateArea = (event: SelectChangeEvent<AreaFilter>) => onAreaChange(event.target.value as AreaFilter)
  const updateStatus = (event: SelectChangeEvent<StatusFilter>) => onStatusChange(event.target.value as StatusFilter)

  return (
    <Stack
      useFlexGap
      gap={1.5}
      className={styles.root}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack
        useFlexGap
        gap={1.5}
        className={styles.controls}
        direction="row"
      >
        <TextField
          focused
          size="small"
          label="搜尋專案或負責人"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className={styles.search}
        />
        <FormControl
          size="small"
          className={styles.control}
        >
          <InputLabel id="milestone-area-label">房子區塊</InputLabel>
          <Select
            label="房子區塊"
            value={area}
            labelId="milestone-area-label"
            onChange={updateArea}
          >
            {areas.map((item) => (
              <MenuItem
                key={item}
                value={item}
              >
                {areaLabels[item]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          size="small"
          className={styles.control}
        >
          <InputLabel id="milestone-status-label">狀態</InputLabel>
          <Select
            label="狀態"
            value={status}
            labelId="milestone-status-label"
            onChange={updateStatus}
          >
            {statusFilters.map((item) => (
              <MenuItem
                key={item}
                value={item}
              >
                {statusLabels[item]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Typography
        color="text.secondary"
        variant="body2"
      >
        {resultCount} / {totalCount} 項
      </Typography>
    </Stack>
  )
}
