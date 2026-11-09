"use client"

import DetailDrawer from "@app/components/DetailDrawer/DetailDrawer"
import StatusChip from "@app/components/StatusChip/StatusChip"
import TextButton from "@app/components/TextButton/TextButton"
import CloseIcon from "@mui/icons-material/Close"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView"
import { TreeItem } from "@mui/x-tree-view/TreeItem"
import { useState } from "react"
import ProjectDrawerContent from "../../../(overview)/components/UpcomingMilestones/ProjectDrawerContent"
import { projects, projectStatus, type Project } from "../../../(overview)/components/UpcomingMilestones/milestones"
import { hubs, insights, type Hub, type Insight } from "../../house.mock"
import taxonomy from "../../insight-taxonomy.mock.json"
import DomainHubs, { assets, coverage } from "../DomainHubs/DomainHubs"
import InsightSolutions from "../InsightSolutions/InsightSolutions"

const levels = { 高: "success", 中: "warning", 低: "error" } as const
const explanations = { 高: "現有方案滿足主要需求", 中: "部分滿足，仍需人工補位", 低: "尚無可用方案，需排入 Rx 路線圖" }
const categories: Record<string, { title: string; items: string[] }[]> = taxonomy
const titleId = "house-matrix-detail-title"

type Detail = { type: "bu"; insight: Insight; hub: Hub } | { type: "project"; project: Project }

function ForestViewTree({ categories, insightId }: { categories: { title: string; items: string[] }[]; insightId: string }) {
  return (
    <SimpleTreeView
      sx={{
        "& .MuiTreeItem-content": { borderRadius: 1 },
        "& .MuiTreeItem-content:hover": { bgcolor: "action.hover" },
        "& .MuiTreeItem-groupTransition": { borderColor: "divider", borderLeft: 1, ml: 2, pl: 1.5 },
        "& .MuiTreeItem-label": { py: 0.5 },
      }}
    >
      {categories.map((category) => (
        <TreeItem
          key={category.title}
          itemId={`${insightId}-${category.title}`}
          label={category.title}
        >
          {category.items.map((item) => (
            <TreeItem
              key={item}
              itemId={`${insightId}-${category.title}-${item}`}
              label={item}
            />
          ))}
        </TreeItem>
      ))}
    </SimpleTreeView>
  )
}

function BuContent({
  insight,
  hub,
  onClose,
  onProject,
}: {
  insight: Insight
  hub: Hub
  onClose: () => void
  onProject: (project: Project) => void
}) {
  const weakest = assets
    .map((asset) => {
      const [available, needed] = coverage(hub, asset.key)
      return { ...asset, ratio: needed ? available / needed : 0 }
    })
    .reduce((lowest, current) => (current.ratio < lowest.ratio ? current : lowest))
  const project = projects.find((item) => item.id === (insight.id === "ops" ? "operations" : insight.id))
  const total = insight.ranks.reduce((sum, rank) => sum + rank, 0)

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={2}
      >
        <Stack gap={1}>
          <Typography
            variant="caption"
            color="secondary.main"
          >
            INSIGHT / {insight.name.toUpperCase()}
          </Typography>
          <Typography
            component="h2"
            variant="h4"
            id={titleId}
          >
            {insight.name} {insight.chineseName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Insight 與其 Domain Hub 連接
          </Typography>
          <Typography variant="body2">
            Hub 就緒度（最弱環節）：
            <strong>
              {Math.round(weakest.ratio * 100)}% · {weakest.name}
            </strong>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            待遷移 R4 方案 {hub.migrate} 項
          </Typography>
        </Stack>
        <IconButton
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <Paper
        component="section"
        variant="outlined"
        sx={{ p: 2 }}
      >
        <Stack gap={1}>
          <Typography
            component="h3"
            variant="h5"
          >
            Forest View
          </Typography>
          <Typography variant="body2">
            <strong>
              {total} 項 · R3 以上 {insight.ranks.slice(2).reduce((sum, rank) => sum + rank, 0)} 項
            </strong>
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
          >
            {insight.ranks.map((rank, index) => `R${index + 1} ${rank}`).join(" · ")}
          </Typography>
          <ForestViewTree
            categories={categories[insight.id] ?? []}
            insightId={insight.id}
          />
        </Stack>
      </Paper>
      <Paper
        component="section"
        variant="outlined"
        sx={{ p: 2 }}
      >
        <Stack gap={2}>
          <Typography
            component="h3"
            variant="h5"
          >
            Top tasks 需求滿足度
          </Typography>
          <TableContainer>
            <Table
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Top task</TableCell>
                  <TableCell>滿足度</TableCell>
                  <TableCell>說明</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {insight.tasks.map((task) => (
                  <TableRow key={task.name}>
                    <TableCell>{task.name}</TableCell>
                    <TableCell>
                      <StatusChip
                        label={task.level}
                        status={levels[task.level]}
                      />
                    </TableCell>
                    <TableCell>{explanations[task.level]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {project ? (
            <Stack
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              gap={1}
            >
              <Box sx={{ flex: "1 1 200px", minWidth: 0 }}>
                <Typography variant="subtitle2">{project.name}</Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {project.project} · {project.issue}
                </Typography>
              </Box>
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{ ml: "auto" }}
              >
                <StatusChip
                  label={
                    projectStatus(project) === "error"
                      ? "高風險"
                      : projectStatus(project) === "warning"
                        ? "注意"
                        : "正常"
                  }
                  status={projectStatus(project)}
                />
                <TextButton
                  onClick={() => onProject(project)}
                >
                  檢視明細 →
                </TextButton>
              </Stack>
            </Stack>
          ) : null}
        </Stack>
      </Paper>
    </>
  )
}

export default function HouseMatrix() {
  const [detail, setDetail] = useState<Detail | null>(null)
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const selectProject = (project: Project) => {
    setDetail({ type: "project", project })
    setOpen(true)
  }
  const selectBu = (id: string) => {
    const insight = insights.find((item) => item.id === id)
    const hub = hubs.find((item) => item.id === id)
    if (insight && hub) {
      setDetail({ type: "bu", insight, hub })
      setOpen(true)
    }
  }
  return (
    <>
      <InsightSolutions
        insights={insights}
        onSelect={selectBu}
      />
      <DomainHubs
        hubs={hubs}
        onSelect={selectBu}
        onProject={(id) => {
          const project = projects.find((item) => item.id === id)
          if (project) selectProject(project)
        }}
      />
      <DetailDrawer
        open={open}
        onClose={close}
      >
        {detail?.type === "bu" ? (
          <BuContent
            insight={detail.insight}
            hub={detail.hub}
            onClose={close}
            onProject={selectProject}
          />
        ) : null}
        {detail?.type === "project" ? (
          <ProjectDrawerContent
            project={detail.project}
            onClose={close}
            onSelect={selectProject}
          />
        ) : null}
      </DetailDrawer>
    </>
  )
}
