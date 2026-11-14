import DatePicker from "@app/components/DatePicker/DatePicker"
import StatusChip from "@app/components/StatusChip/StatusChip"
import TextField from "@app/components/TextField/TextField"
import type { Project } from "@lib/api/projects"
import CloseIcon from "@mui/icons-material/Close"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import Box from "@mui/material/Box"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { useState } from "react"

dayjs.extend(customParseFormat)

export type ProjectRoute = {
  category: string
  item: string
}

type HouseProjectFormDialogProps = {
  route: ProjectRoute
  project: Project
  insightLabel: string
  onClose: () => void
}

function getRankValue(value: Project["CURRENT_DIGITAL_LEVEL"], prefix: "R" | "D") {
  const normalized = String(value ?? "")
    .trim()
    .toUpperCase()
  if (!normalized) return `${prefix}—`
  return normalized.startsWith(prefix) ? normalized : `${prefix}${normalized}`
}

function getOwnerValue(department: string | null, owner: string | null, fallbackDepartment?: string) {
  const normalizedDepartment = department?.trim() || fallbackDepartment || ""
  return [normalizedDepartment, owner?.trim()].filter(Boolean).join(" / ")
}

export default function HouseProjectFormDialog({ insightLabel, onClose, project, route }: HouseProjectFormDialogProps) {
  const [draft, setDraft] = useState(() => ({
    ...project,
    DTO_PM: getOwnerValue(null, project.DTO_PM, "DTO"),
    DEVELOP_OWNER: getOwnerValue(project.DEVELOP, project.DEVELOP_OWNER),
    EXECUTION_OWNER: getOwnerValue(project.EXECUTION, project.EXECUTION_OWNER),
  }))
  const [isEditing, setIsEditing] = useState(false)
  const targetDate = dayjs(draft.TARGET_DATE?.trim() ?? "", "MM/DD", true)
  const lastEditedDate = dayjs(project.LAST_EDITED_AT?.trim() ?? "")
  const updateDraft = (key: keyof typeof draft, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  return (
    <Dialog
      fullWidth
      open
      scroll="paper"
      onClose={onClose}
      maxWidth="lg"
    >
      <DialogTitle component="div">
        <Stack
          gap={2}
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Stack
            sx={{ flex: 1, minWidth: 0 }}
            gap={1}
          >
            <Breadcrumbs
              color="success"
              separator="›"
            >
              <Typography
                variant="h6"
                component="span"
              >
                {insightLabel}
              </Typography>
              <Typography
                variant="h6"
                component="span"
              >
                {route.category}
              </Typography>
              <Typography
                variant="h6"
                component="span"
              >
                {route.item}
              </Typography>
            </Breadcrumbs>
            <Stack
              gap={1}
              direction="row"
              alignItems="center"
              flexWrap="wrap"
            >
              <Typography variant="h4">{project.TITLE.trim() || "—"}</Typography>
              <StatusChip
                label={getRankValue(project.CURRENT_DIGITAL_LEVEL, "R")}
                color="primary"
                variant="outlined"
              />
              <StatusChip
                label={getRankValue(project.CURRENT_STATUS, "D")}
                color="primary"
                variant="outlined"
              />
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              最後編輯：{project.LAST_EDITED_BY?.trim() || "—"} ·{" "}
              {lastEditedDate.isValid() ? lastEditedDate.format("YYYY-MM-DD") : "—"}
            </Typography>
          </Stack>
          <Stack
            gap={0.5}
            direction="row"
          >
            <Tooltip title={isEditing ? "儲存" : "編輯"}>
              <IconButton
                color="warning"
                onClick={() => setIsEditing((current) => !current)}
              >
                {isEditing ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="關閉">
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          }}
        >
          <DatePicker
            label="目標完成日"
            value={targetDate.isValid() ? targetDate : null}
            format="MM/DD"
            disabled={!isEditing}
            onChange={(date) => updateDraft("TARGET_DATE", date?.isValid() ? date.format("MM/DD") : "")}
          />
          <TextField
            label="Execution (A) 負責窗口"
            value={draft.EXECUTION_OWNER}
            disabled={!isEditing}
            onChange={(event) => updateDraft("EXECUTION_OWNER", event.target.value)}
          />
          <TextField
            label="DTO PM"
            value={draft.DTO_PM}
            disabled={!isEditing}
            onChange={(event) => updateDraft("DTO_PM", event.target.value)}
          />
          <TextField
            label="Develop (R) 負責窗口"
            value={draft.DEVELOP_OWNER}
            disabled={!isEditing}
            onChange={(event) => updateDraft("DEVELOP_OWNER", event.target.value)}
          />
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridColumn: "1 / -1",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            }}
          >
            <TextField
              multiline
              label="Background"
              value={draft.BACKGROUND ?? ""}
              minRows={6}
              disabled={!isEditing}
              onChange={(event) => updateDraft("BACKGROUND", event.target.value)}
            />
            <TextField
              multiline
              label="Objective"
              value={draft.TARGET ?? ""}
              minRows={6}
              disabled={!isEditing}
              onChange={(event) => updateDraft("TARGET", event.target.value)}
            />
            <TextField
              multiline
              label="Scope & Goal"
              value={draft.SCOPE_D1 ?? ""}
              minRows={6}
              disabled={!isEditing}
              onChange={(event) => updateDraft("SCOPE_D1", event.target.value)}
            />
          </Box>
          <Box sx={{ gridColumn: "1 / -1" }}>
            <TextField
              multiline
              label="Current Status"
              value={draft.CURRENT_STATUS_CONTENT ?? ""}
              minRows={6}
              disabled={!isEditing}
              onChange={(event) => updateDraft("CURRENT_STATUS_CONTENT", event.target.value)}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
