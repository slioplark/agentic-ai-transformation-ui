"use client"

import { domainHubs, insights } from "@(control)/house/house.mock"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import AccountsScopeDrawerButton from "./AccountsScopeDrawerButton"

const sections = [
  { id: "roof", name: "房子基本資訊" },
  ...insights.map((insight) => ({ id: `insight:${insight.id}`, name: `Insight：${insight.name}` })),
  ...domainHubs.map((hub) => ({ id: `hub:${hub.id}`, name: `Domain Hubs：${hub.name}` })),
  { id: "infrastructure", name: "AI Infrastructure" },
  { id: "governance", name: "信任與資安" },
  { id: "citizen", name: "數位素養" },
]

const optionsLayout = {
  display: "grid",
  gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))" },
  columnGap: 2,
  p: 2,
}

function toggleSelection(values: string[], id: string) {
  return values.includes(id) ? values.filter((value) => value !== id) : [...values, id]
}

function setGroupSelection(values: string[], ids: string[], selected: boolean) {
  const group = new Set(ids)
  return selected
    ? [...values.filter((value) => !group.has(value)), ...ids]
    : values.filter((value) => !group.has(value))
}

function AccountsHouseDrawerContent({
  name,
  selectedIds,
  onChange,
}: {
  name: string
  selectedIds: string[]
  onChange: (ids: string[]) => void
}) {
  const selectedCount = sections.filter((section) => selectedIds.includes(section.id)).length

  return (
    <Stack gap={3}>
      <Stack gap={0.5}>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          房子授權
        </Typography>
        <Typography variant="h3">{name}</Typography>
      </Stack>
      <Box
        sx={{
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          overflowY: "auto",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={0.5}
          sx={{
            p: 2,
            bgcolor: "background.default",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <FormControlLabel
            sx={{ m: 0 }}
            label={<Typography variant="h6">全選</Typography>}
            control={
              <Checkbox
                checked={sections.every((section) => selectedIds.includes(section.id))}
                indeterminate={
                  sections.some((section) => selectedIds.includes(section.id)) &&
                  !sections.every((section) => selectedIds.includes(section.id))
                }
                onChange={(event) =>
                  onChange(
                    setGroupSelection(
                      selectedIds,
                      sections.map((section) => section.id),
                      event.target.checked,
                    ),
                  )
                }
              />
            }
          />
          <Typography
            sx={{ flexShrink: 0 }}
            color="text.secondary"
            variant="body2"
          >
            {selectedCount} / {sections.length}
          </Typography>
        </Stack>
        <FormGroup sx={optionsLayout}>
          {sections.map((section) => (
            <FormControlLabel
              sx={{ m: 0, minWidth: 0 }}
              key={section.id}
              label={section.name}
              control={
                <Checkbox
                  checked={selectedIds.includes(section.id)}
                  onChange={() => onChange(toggleSelection(selectedIds, section.id))}
                />
              }
            />
          ))}
        </FormGroup>
      </Box>
    </Stack>
  )
}

type AccountsHouseDrawerButtonProps = {
  name: string
  selectedIds: string[]
  onSave: (ids: string[]) => void
}

export default function AccountsHouseDrawerButton(props: AccountsHouseDrawerButtonProps) {
  return (
    <AccountsScopeDrawerButton
      {...props}
      title="編輯房子區塊權限"
      content={AccountsHouseDrawerContent}
    />
  )
}
