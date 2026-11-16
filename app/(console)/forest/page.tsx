"use client"

import {
  buildForestView,
  type ForestLeaf,
  type ForestProjectRoute,
  type ForestViewData,
} from "@(control)/components/ForestView/forestViewData"
import PageHeader from "@(control)/components/PageHeader"
import HouseProjectFormDialog from "@(control)/house/components/HouseProjectFormDialog/HouseProjectFormDialog"
import forestBlueprint from "@(control)/house/foreset-view.mock.json"
import { insights } from "@(control)/house/house.mock"
import StatusChip from "@app/components/StatusChip/StatusChip"
import TextBadge from "@app/components/TextBadge/TextBadge"
import type { Project } from "@lib/api/projects"
import { useProjects } from "@lib/hooks/use-projects"
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf"
import { Chip, Divider } from "@mui/material"
import Box from "@mui/material/Box"
import ListItemIcon from "@mui/material/ListItemIcon"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { MouseEvent } from "react"
import { useMemo, useState } from "react"
import BranchButton from "./components/BranchButton/BranchButton"
import styles from "./page.module.css"

type ForestId = keyof typeof forestBlueprint

type OpenBranch = {
  anchorElement: HTMLElement
  insightLabel: string
  leaves: ForestLeaf[]
}

type SelectedProject = {
  insightLabel: string
  project: Project
  route: ForestProjectRoute
}

const forestOrder: ForestId[] = ["planning", "customer", "td", "ops", "biz"]
const insightNames = new Map(insights.map((insight) => [insight.id, insight.name]))
const maturityStatuses = [
  {
    label: "R1: Connected",
    color: "error",
  },
  {
    label: "R2: Optimized",
    color: "warning",
  },
  {
    label: "R3: Transparent",
    color: "info",
  },
  {
    label: "R4: Proactive",
    color: "secondary",
  },
  {
    label: "R5: Agile",
    color: "success",
  },
] as const

function getInsightLabel(id: ForestId) {
  return insightNames.get(id) ?? id
}

export default function ForestPage() {
  const [openBranch, setOpenBranch] = useState<OpenBranch | null>(null)
  const [selectedRank, setSelectedRank] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null)

  const { data, error, isLoading } = useProjects()
  const forestViews = useMemo(() => {
    const views = new Map<ForestId, ForestViewData>()

    for (const id of forestOrder) {
      views.set(id, buildForestView(forestBlueprint[id], data ?? [], { includeUnranked: true }))
    }

    return views
  }, [data])
  const isUnavailable = isLoading || Boolean(error)

  const openBranchMenu = (event: MouseEvent<HTMLElement>, insightLabel: string, leaves: ForestLeaf[]) => {
    setOpenBranch({ anchorElement: event.currentTarget, insightLabel, leaves })
  }

  const closeBranchMenu = () => setOpenBranch(null)

  const selectProject = (leaf: ForestLeaf) => {
    if (!openBranch) return

    setOpenBranch(null)
    setSelectedProject({ insightLabel: openBranch.insightLabel, project: leaf.project, route: leaf.route })
  }

  return (
    <Stack gap={2}>
      <PageHeader>Forest View</PageHeader>
      <Stack
        gap={1}
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
      >
        {maturityStatuses.map(({ label, color }, index) => (
          <Chip
            key={label}
            label={label}
            color={color}
            variant={selectedRank === index ? "filled" : "outlined"}
            onClick={() => setSelectedRank((current) => (current === index ? null : index))}
          />
        ))}
      </Stack>
      {isLoading ? (
        <Typography
          color="text.secondary"
          variant="body2"
          className={styles.message}
        >
          正在載入專案資料…
        </Typography>
      ) : null}
      <Box className={styles.map}>
        {forestOrder.map((id) => {
          const insightLabel = getInsightLabel(id)
          const forestView = forestViews.get(id)

          return (
            <Box
              key={id}
              component="section"
              className={`${styles.forest} ${styles[id]}`}
            >
              <Typography
                variant="h6"
                className={styles.forestTitle}
              >
                {insightLabel} Insight
              </Typography>
              <Divider />
              <Box
                tabIndex={0}
                className={styles.scrollArea}
              >
                <Box className={styles.blocks}>
                  {forestView?.trunks.map((trunk) => (
                    <Box
                      key={trunk.title}
                      className={styles.block}
                    >
                      <Stack
                        sx={{ px: 0.5 }}
                        flexWrap="wrap"
                        direction="row"
                        alignItems="center"
                      >
                        <Typography
                          sx={{ mr: 0.5 }}
                          variant="subtitle2"
                        >
                          {trunk.title}
                        </Typography>
                        {trunk.dept ? <TextBadge label={trunk.dept} /> : null}
                      </Stack>
                      <Box className={styles.branches}>
                        {trunk.branches.map((branch) => (
                          <BranchButton
                            key={branch.title}
                            title={branch.title}
                            count={branch.leaves.length}
                            status={branch.leaves.length > 0 ? "ongoing" : "pending"}
                            onClick={(event) => openBranchMenu(event, insightLabel, branch.leaves)}
                            disabled={isUnavailable || branch.leaves.length === 0}
                          />
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>
      <Menu
        open={Boolean(openBranch)}
        onClose={closeBranchMenu}
        anchorEl={openBranch?.anchorElement ?? null}
        slotProps={{ list: { dense: true }, paper: { sx: { maxWidth: 420 } } }}
      >
        {openBranch?.leaves.map((leaf) => (
          <MenuItem
            key={leaf.id}
            onClick={() => selectProject(leaf)}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <EnergySavingsLeafIcon
                color="success"
                fontSize="small"
              />
            </ListItemIcon>
            <Stack
              sx={{ width: "100%", minWidth: 0 }}
              gap={0.75}
              direction="row"
              alignItems="center"
            >
              <Typography
                noWrap
                sx={{ flex: 1, minWidth: 0 }}
                variant="body2"
              >
                {leaf.name}
              </Typography>
              {leaf.digitalLevel && (
                <StatusChip
                  label={leaf.digitalLevel}
                  color="primary"
                  variant="outlined"
                />
              )}
              {leaf.status ? (
                <StatusChip
                  label={leaf.status}
                  color="primary"
                  variant="outlined"
                />
              ) : null}
            </Stack>
          </MenuItem>
        ))}
      </Menu>
      {selectedProject ? (
        <HouseProjectFormDialog
          key={selectedProject.project.ID}
          route={selectedProject.route}
          project={selectedProject.project}
          onClose={() => setSelectedProject(null)}
          insightLabel={selectedProject.insightLabel}
        />
      ) : null}
    </Stack>
  )
}
