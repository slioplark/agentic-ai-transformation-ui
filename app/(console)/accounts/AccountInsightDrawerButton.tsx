"use client"

import type { ForestTrunkBlueprint } from "@(control)/components/ForestView/forestViewData"
import forestBlueprint from "@(control)/house/foreset-view.mock.json"
import { insights } from "@(control)/house/house.mock"
import SearchIcon from "@mui/icons-material/Search"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { RichTreeView } from "@mui/x-tree-view/RichTreeView"
import { useState } from "react"
import AccountsScopeDrawerButton from "./AccountsScopeDrawerButton"

type TreeItem = { id: string; label: string; children?: TreeItem[]; projectId?: string; disabled?: boolean }

const selectionPropagation = { parents: true, descendants: true }
const isItemSelectionDisabled = (item: TreeItem) => Boolean(item.disabled)
const blueprints: Record<string, ForestTrunkBlueprint[]> = forestBlueprint
const mockGroups = insights.map((insight) => ({
  insight,
  trunks: (blueprints[insight.id] ?? []).map((trunk, trunkIndex) => ({
    title: trunk.title,
    branches: trunk.branches.map((branch, branchIndex) => ({
      title: branch.title,
      leaves: ["數位化", "智慧化"].map((suffix, projectIndex) => ({
        id: `mock:${insight.id}:${trunkIndex}:${branchIndex}:${projectIndex}`,
        name: `${branch.title}${suffix}專案`,
      })),
    })),
  })),
}))

function AccountsInsightDrawerContent({
  name,
  selectedIds,
  onChange,
}: {
  name: string
  selectedIds: string[]
  onChange: (ids: string[]) => void
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const groups = mockGroups.map(({ insight, trunks }) => {
    const projectIds = trunks.flatMap((trunk) =>
      trunk.branches.flatMap((branch) => branch.leaves.map((leaf) => leaf.id)),
    )
    const items: TreeItem[] = trunks.flatMap((trunk, trunkIndex) => {
      const trunkMatches = trunk.title.toLowerCase().includes(searchQuery)
      const children: TreeItem[] = trunk.branches.flatMap((branch, branchIndex) => {
        const branchMatches = trunkMatches || branch.title.toLowerCase().includes(searchQuery)
        const leaves = branch.leaves.filter((leaf) => branchMatches || leaf.name.toLowerCase().includes(searchQuery))
        if (searchQuery && leaves.length === 0) return []
        return [
          {
            id: `branch:${trunkIndex}:${branchIndex}`,
            label: branch.title,
            disabled: leaves.length === 0,
            children: leaves.map((leaf) => ({ id: `project:${leaf.id}`, label: leaf.name, projectId: leaf.id })),
          },
        ]
      })
      if (searchQuery && children.length === 0) return []
      return [
        {
          id: `trunk:${trunkIndex}`,
          label: trunk.title,
          disabled: children.every((branch) => branch.disabled),
          children,
        },
      ]
    })
    return { insight, projectIds, items }
  })

  const selectedCount = groups.reduce(
    (count, group) => count + group.projectIds.filter((id) => selectedIds.includes(id)).length,
    0,
  )

  return (
    <>
      <Stack gap={0.5}>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          專案授權
        </Typography>
        <Typography variant="h3">{name}</Typography>
      </Stack>
      <Stack
        flexWrap="wrap"
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        gap={0.5}
      >
        <TextField
          size="small"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setSearchQuery(searchTerm.trim().toLowerCase())}
                  >
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Typography
          color="text.secondary"
          variant="body2"
        >
          已選擇{" "}
          <Box
            component="span"
            sx={{ color: "secondary.main", fontWeight: 700 }}
          >
            {selectedCount}
          </Box>{" "}
          個專案
        </Typography>
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))" },
          gap: 2,
        }}
      >
        {groups.map(({ insight, projectIds, items }) => {
          const visibleIds = items.flatMap((trunk) =>
            (trunk.children ?? []).flatMap((branch) => (branch.children ?? []).map((leaf) => leaf.projectId!)),
          )
          const allSelected = projectIds.length > 0 && projectIds.every((id) => selectedIds.includes(id))
          const someSelected = projectIds.some((id) => selectedIds.includes(id))
          const groupSelectedCount = projectIds.filter((id) => selectedIds.includes(id)).length
          return (
            <Box
              key={insight.id}
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.paper",
                overflowX: "auto",
              }}
            >
              <Stack
                gap={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  p: 1,
                  bgcolor: "background.default",
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <FormControlLabel
                  sx={{ m: 0 }}
                  label={
                    <Stack>
                      <Typography variant="h6">{insight.name}</Typography>
                      <Typography
                        color="text.secondary"
                        variant="body2"
                      >
                        {insight.chineseName}
                      </Typography>
                    </Stack>
                  }
                  control={
                    <Checkbox
                      checked={allSelected}
                      disabled={projectIds.length === 0}
                      indeterminate={someSelected && !allSelected}
                      onChange={(event) => {
                        const group = new Set(projectIds)
                        onChange(
                          event.target.checked
                            ? [...selectedIds.filter((id) => !group.has(id)), ...projectIds]
                            : selectedIds.filter((id) => !group.has(id)),
                        )
                      }}
                    />
                  }
                />
                <Typography
                  sx={{ flexShrink: 0 }}
                  color="text.secondary"
                  variant="body2"
                >
                  {groupSelectedCount} / {projectIds.length}
                </Typography>
              </Stack>
              {items.length ? (
                <RichTreeView
                  checkboxSelection
                  multiSelect
                  key={searchQuery}
                  sx={{ p: 1, minWidth: "max-content" }}
                  items={items}
                  isItemSelectionDisabled={isItemSelectionDisabled}
                  expansionTrigger="iconContainer"
                  selectedItems={visibleIds.filter((id) => selectedIds.includes(id)).map((id) => `project:${id}`)}
                  defaultExpandedItems={
                    searchQuery
                      ? items.flatMap((trunk) => [trunk.id, ...(trunk.children ?? []).map((branch) => branch.id)])
                      : []
                  }
                  selectionPropagation={selectionPropagation}
                  onSelectedItemsChange={(_, ids) => {
                    const visible = new Set(visibleIds)
                    const selected = ids
                      .filter((id) => id.startsWith("project:"))
                      .map((id) => id.slice("project:".length))
                    onChange([...selectedIds.filter((id) => !visible.has(id)), ...selected])
                  }}
                />
              ) : (
                <Typography
                  sx={{ p: 2 }}
                  color="text.secondary"
                  variant="body2"
                >
                  找不到符合條件的專案。
                </Typography>
              )}
            </Box>
          )
        })}
      </Box>
    </>
  )
}

type AccountInsightDrawerButtonProps = {
  name: string
  selectedIds: string[]
  onSave: (ids: string[]) => void
}

export default function AccountInsightDrawerButton(props: AccountInsightDrawerButtonProps) {
  return (
    <AccountsScopeDrawerButton
      {...props}
      title="編輯專案權限"
      content={AccountsInsightDrawerContent}
    />
  )
}
