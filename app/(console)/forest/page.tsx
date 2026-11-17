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
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"
import { Chip, Divider } from "@mui/material"
import Box from "@mui/material/Box"
import ButtonBase from "@mui/material/ButtonBase"
import ListItemIcon from "@mui/material/ListItemIcon"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { MouseEvent } from "react"
import { useMemo, useState } from "react"
import BranchButton, { type BranchColor } from "./components/BranchButton/BranchButton"
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
const interviewStatuses = [
  { value: "pending", label: "待訪談" },
  { value: "ongoing", label: "訪談中" },
  { value: "completed", label: "已完成" },
] as const
const maturityStatuses = [
  { rank: "R1", label: "R1: Connected", color: "error" },
  { rank: "R2", label: "R2: Optimized", color: "warning" },
  { rank: "R3", label: "R3: Transparent", color: "info" },
  { rank: "R4", label: "R4: Proactive", color: "secondary" },
  { rank: "R5", label: "R5: Agile", color: "success" },
] as const satisfies readonly { rank: string; label: string; color: BranchColor }[]

type MaturityStatus = (typeof maturityStatuses)[number]["rank"]
type InterviewStatus = (typeof interviewStatuses)[number]["value"]

function getInsightLabel(id: ForestId) {
  return insightNames.get(id) ?? id
}

function getMaturityStatus(maturityStatus: string | undefined) {
  return maturityStatuses.find(({ rank }) => rank === maturityStatus)?.color
}

export default function ForestPage() {
  const [openBranch, setOpenBranch] = useState<OpenBranch | null>(null)
  const [selectedRank, setSelectedRank] = useState<MaturityStatus | null>(null)
  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null)
  const [expandedInsight, setExpandedInsight] = useState<ForestId | null>(null)
  const [selectedInterviewStatus, setSelectedInterviewStatus] = useState<InterviewStatus | null>(null)

  const { data, error, isLoading } = useProjects()
  const forestViews = useMemo(() => {
    const views = new Map<ForestId, ForestViewData>()

    for (const id of forestOrder) {
      views.set(id, buildForestView(forestBlueprint[id], data ?? [], { includeUnranked: true }))
    }

    return views
  }, [data])
  const openBranchMenu = (event: MouseEvent<HTMLElement>, insightLabel: string, leaves: ForestLeaf[]) => {
    setOpenBranch({ anchorElement: event.currentTarget, insightLabel, leaves })
  }

  const closeBranchMenu = () => setOpenBranch(null)

  const selectProject = (leaf: ForestLeaf) => {
    if (!openBranch) return

    setOpenBranch(null)
    setSelectedProject({ insightLabel: openBranch.insightLabel, project: leaf.project, route: leaf.route })
  }

  const ForestMap = (id: ForestId, isExpanded: boolean) => {
    const label = getInsightLabel(id)
    const forestView = forestViews.get(id)

    return (
      <Box
        key={id}
        component="section"
        className={`${styles.forest} ${styles[id]} ${isExpanded ? styles.expanded : ""}`}
      >
        <Box className={styles.forestHeader}>
          <Typography variant="h6">{label} Insight</Typography>
          <ButtonBase
            className={styles.titleAction}
            onClick={() => setExpandedInsight(isExpanded ? null : id)}
          >
            {isExpanded ? <FullscreenExitIcon /> : <FullscreenIcon />}
            {isExpanded ? "收合" : "展開"}
          </ButtonBase>
        </Box>
        <Divider />
        <Box
          tabIndex={0}
          className={styles.scrollArea}
        >
          <Box className={styles.blocks}>
            {forestView?.trunks.map((trunk) => {
              const isDimmed = selectedInterviewStatus !== null && trunk.interviewStatus !== selectedInterviewStatus

              return (
                <Box
                  sx={(theme) => ({
                    opacity: isDimmed ? 0.28 : 1,
                    transition: theme.transitions.create("opacity"),
                  })}
                  key={trunk.title}
                  className={styles.block}
                >
                  {trunk.interviewStatus === "ongoing" ? (
                    <Box
                      sx={{ color: "success.main" }}
                      component="svg"
                      focusable="false"
                      className={styles.progressBorder}
                      aria-hidden="true"
                    >
                      <rect
                        x="1"
                        y="1"
                        rx="7"
                        fill="none"
                        width="calc(100% - 2px)"
                        height="calc(100% - 2px)"
                        pathLength="100"
                      />
                    </Box>
                  ) : null}
                  {selectedInterviewStatus === "pending" && trunk.interviewStatus === "pending" ? (
                    <Box
                      sx={(theme) => ({
                        border: `2px dashed ${theme.palette.primary.main}`,
                        boxSizing: "border-box",
                      })}
                      className={styles.pendingInterviewBorder}
                    />
                  ) : null}
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
                    {trunk.branches.map((branch) => {
                      const isDimmed = selectedRank !== null && branch.maturityStatus !== selectedRank

                      return (
                        <BranchButton
                          key={branch.title}
                          color={getMaturityStatus(branch.maturityStatus)}
                          count={branch.leaves.length}
                          title={branch.title}
                          dimmed={isDimmed}
                          variant={trunk.interviewStatus}
                          onClick={(event) => openBranchMenu(event, label, branch.leaves)}
                          disabled={isLoading || Boolean(error) || branch.leaves.length === 0}
                        />
                      )
                    })}
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Stack gap={2}>
      <PageHeader>Forest View</PageHeader>
      <Stack
        gap={1}
        flexWrap="wrap"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack
          gap={1}
          direction="row"
        >
          {interviewStatuses.map(({ label, value }) => (
            <Chip
              key={value}
              label={label}
              color="primary"
              variant={selectedInterviewStatus === value ? "filled" : "outlined"}
              onClick={() => setSelectedInterviewStatus((current) => (current === value ? null : value))}
            />
          ))}
        </Stack>
        <Stack
          gap={1}
          flexWrap="wrap"
          direction="row"
        >
          {maturityStatuses.map(({ rank, label, color }) => (
            <Chip
              key={label}
              label={label}
              color={color}
              variant={selectedRank === rank ? "filled" : "outlined"}
              onClick={() => setSelectedRank((current) => (current === rank ? null : rank))}
            />
          ))}
        </Stack>
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
        {forestOrder
          .filter((id) => expandedInsight === null || expandedInsight === id)
          .map((id) => ForestMap(id, expandedInsight === id))}
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
