"use client"

import Drawer from "@app/components/Drawer/Drawer"
import EditIcon from "@mui/icons-material/Edit"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import { useState, type ComponentType } from "react"

type DrawerContentProps = {
  name: string
  selectedIds: string[]
  onChange: (ids: string[]) => void
}

type AccountsScopeDrawerButtonProps = {
  name: string
  selectedIds: string[]
  onSave: (ids: string[]) => void
  title: string
  content: ComponentType<DrawerContentProps>
}

export default function AccountsScopeDrawerButton({
  name,
  selectedIds,
  onSave,
  title,
  content: Content,
}: AccountsScopeDrawerButtonProps) {
  const [draft, setDraft] = useState<string[] | null>(null)

  return (
    <>
      <Tooltip title={title}>
        <IconButton
          size="small"
          color="warning"
          onClick={() => setDraft([...selectedIds])}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Drawer
        open={draft !== null}
        onClose={() => setDraft(null)}
      >
        {draft !== null ? (
          <>
            <Stack
              gap={1}
              sx={{ flex: 1, overflowY: "auto" }}
            >
              <Content
                name={name}
                onChange={setDraft}
                selectedIds={draft}
              />
            </Stack>
            <Stack
              gap={1}
              direction="row"
              justifyContent="flex-end"
            >
              <Button onClick={() => setDraft(null)}>取消</Button>
              <Button
                variant="contained"
                onClick={() => {
                  onSave(draft)
                  setDraft(null)
                }}
              >
                儲存
              </Button>
            </Stack>
          </>
        ) : null}
      </Drawer>
    </>
  )
}
