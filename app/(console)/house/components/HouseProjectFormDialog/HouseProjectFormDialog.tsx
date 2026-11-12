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
import { useState } from "react"

export type ProjectRoute = {
  category: string
  item: string
}

type ProjectFormDraft = {
  background: string
  currentStatus: string
  developOwner: string
  dtoPm: string
  executionOwner: string
  objective: string
  scopeGoal: string
  targetDate: string
}

type HouseProjectFormDialogProps = {
  insightLabel: string
  onClose: () => void
  project: Project
  route: ProjectRoute
}

function getProjectValue(value: string | number | boolean | null | undefined) {
  const normalized = String(value ?? "").trim()
  return normalized || "—"
}

function getInputValue(value: string | number | boolean | null | undefined) {
  return String(value ?? "").trim()
}

function getOwnerValue(department: string | null, owner: string | null, fallbackDepartment?: string) {
  const normalizedDepartment = getInputValue(department) || fallbackDepartment || ""
  return [normalizedDepartment, getInputValue(owner)].filter(Boolean).join(" / ")
}

function getRankValue(value: Project["CURRENT_DIGITAL_LEVEL"], prefix: "R" | "D") {
  const normalized = getInputValue(value).toUpperCase()
  if (!normalized) return `${prefix}—`
  return normalized.startsWith(prefix) ? normalized : `${prefix}${normalized}`
}

function getLastEditedAt(value: Project["LAST_EDITED_AT"]) {
  const normalized = getInputValue(value)
  const match = normalized.match(/^(\d{4}-\d{2}-\d{2})[T\s](\d{2}:\d{2})/)
  return match ? `${match[1]} ${match[2]}` : normalized || "—"
}

function createProjectFormDraft(project: Project): ProjectFormDraft {
  return {
    background: getInputValue(project.BACKGROUND),
    currentStatus: getInputValue(project.CURRENT_STATUS_CONTENT),
    developOwner: getOwnerValue(project.DEVELOP, project.DEVELOP_OWNER),
    dtoPm: getOwnerValue(null, project.DTO_PM, "DTO"),
    executionOwner: getOwnerValue(project.EXECUTION, project.EXECUTION_OWNER),
    objective: getInputValue(project.TARGET),
    scopeGoal: getInputValue(project.SCOPE_D1),
    targetDate: getInputValue(project.TARGET_DATE),
  }
}

export default function HouseProjectFormDialog({ insightLabel, onClose, project, route }: HouseProjectFormDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(() => createProjectFormDraft(project))
  const updateDraft = <Key extends keyof ProjectFormDraft>(key: Key, value: ProjectFormDraft[Key]) => {
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
              <Typography variant="h4">{getProjectValue(project.TITLE)}</Typography>
              <StatusChip
                label={getRankValue(project.CURRENT_DIGITAL_LEVEL, "R")}
                color="info"
                variant="outlined"
              />
              <StatusChip
                label={getRankValue(project.CURRENT_STATUS, "D")}
                color="info"
                variant="outlined"
              />
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              最後編輯：{getProjectValue(project.LAST_EDITED_BY)} · {getLastEditedAt(project.LAST_EDITED_AT)}
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
            value={draft.targetDate}
            format="MM/DD"
            disabled={!isEditing}
            onValueChange={(value) => updateDraft("targetDate", value)}
          />
          <TextField
            label="Execution (A) 負責窗口"
            value={draft.executionOwner}
            disabled={!isEditing}
            onValueChange={(value) => updateDraft("executionOwner", value)}
          />
          <TextField
            label="DTO PM"
            value={draft.dtoPm}
            disabled={!isEditing}
            onValueChange={(value) => updateDraft("dtoPm", value)}
          />
          <TextField
            label="Develop (R) 負責窗口"
            value={draft.developOwner}
            disabled={!isEditing}
            onValueChange={(value) => updateDraft("developOwner", value)}
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
              value={draft.background}
              minRows={6}
              disabled={!isEditing}
              onValueChange={(value) => updateDraft("background", value)}
            />
            <TextField
              multiline
              label="Objective"
              value={draft.objective}
              minRows={6}
              disabled={!isEditing}
              onValueChange={(value) => updateDraft("objective", value)}
            />
            <TextField
              multiline
              label="Scope & Goal"
              value={draft.scopeGoal}
              minRows={6}
              disabled={!isEditing}
              onValueChange={(value) => updateDraft("scopeGoal", value)}
            />
          </Box>
          <Box sx={{ gridColumn: "1 / -1" }}>
            <TextField
              multiline
              label="Current Status"
              value={draft.currentStatus}
              minRows={6}
              disabled={!isEditing}
              onValueChange={(value) => updateDraft("currentStatus", value)}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
