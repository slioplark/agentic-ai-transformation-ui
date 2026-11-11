import { projects, projectStatus, type Project } from "@(control)/(overview)/components/UpcomingMilestones/milestones"
import { assets, coverage } from "@(control)/house/components/HouseDomainHubs/HouseDomainHubs"
import foresetView from "@(control)/house/foreset-view.mock.json"
import { taskLevelDescriptions, type DomainHub, type Insight } from "@(control)/house/house.mock"
import ProjectMilestoneRow from "@(control)/milestones/components/ProjectMilestoneRow/ProjectMilestoneRow"
import RankDistributionBar from "@app/components/RankDistributionBar/RankDistributionBar"
import StatusChip from "@app/components/StatusChip/StatusChip"
import TextButton from "@app/components/TextButton/TextButton"
import { getErrorMessage } from "@lib/api/client"
import { useProjects } from "@lib/hooks/use-projects"
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
import { useMemo } from "react"
import ForestViewTree, { buildForestView, type ForestTrunkBlueprint } from "./ForestViewTree"

const levels = { 高: "success", 中: "warning", 低: "error" } as const
const forestBlueprint: Record<string, ForestTrunkBlueprint[]> = foresetView

type InsightDrawerContentProps = {
  insight: Insight
  domainHub: DomainHub
  onClose: () => void
  onProject: (project: Project) => void
}

export default function InsightDrawerContent({ insight, domainHub, onClose, onProject }: InsightDrawerContentProps) {
  const { data: dtoProjects, error: projectsError, isLoading: isProjectsLoading } = useProjects()
  const weakest = assets
    .map((asset) => {
      const [available, needed] = coverage(domainHub, asset.key)
      return { ...asset, ratio: needed ? available / needed : 0 }
    })
    .reduce((lowest, current) => (current.ratio < lowest.ratio ? current : lowest))
  const project = projects.find((item) => item.id === (insight.id === "ops" ? "operations" : insight.id))
  const forestView = useMemo(
    () => (dtoProjects ? buildForestView(forestBlueprint[insight.id] ?? [], dtoProjects) : null),
    [dtoProjects, insight.id],
  )
  const forestRanks = forestView?.ranks
  const forestTotal = forestRanks?.reduce((sum, rank) => sum + rank, 0) ?? 0
  const forestR3AndAbove = forestRanks?.slice(2).reduce((sum, rank) => sum + rank, 0) ?? 0
  const forestRankCounts = Object.fromEntries(forestRanks?.map((rank, index) => [`R${index + 1}`, rank]) ?? [])

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={2}
      >
        <Stack gap={0.5}>
          <Typography
            variant="caption"
            color="secondary.main"
          >
            INSIGHT / {insight.name.toUpperCase()}
          </Typography>
          <Typography variant="h4">
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
            待遷移 R4 方案 {domainHub.migrate} 項
          </Typography>
        </Stack>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Paper
        component="section"
        variant="outlined"
        sx={{ p: 2 }}
      >
        <Stack gap={1}>
          <Typography variant="h5">Forest View</Typography>
          {isProjectsLoading ? (
            <Typography
              color="text.secondary"
              variant="body2"
            >
              正在讀取 Project…
            </Typography>
          ) : projectsError ? (
            <Typography
              color="error"
              variant="body2"
            >
              無法讀取 Project：{getErrorMessage(projectsError)}
            </Typography>
          ) : forestView && forestRanks ? (
            <>
              <Typography variant="body2">
                <strong>
                  共 {forestTotal} 項 · R3 以上 {forestR3AndAbove} 項
                </strong>
              </Typography>
              <RankDistributionBar ranks={forestRankCounts} />
              <ForestViewTree
                insightId={insight.id}
                insightLabel={`${insight.name} ${insight.chineseName}`}
                trunks={forestView.trunks}
              />
            </>
          ) : null}
        </Stack>
      </Paper>
      <Paper
        component="section"
        variant="outlined"
        sx={{ p: 2 }}
      >
        <Stack gap={2}>
          <Typography variant="h5">Top tasks 需求滿足度</Typography>
          <TableContainer>
            <Table size="small">
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
                    <TableCell>{taskLevelDescriptions[task.level]}</TableCell>
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
              gap={0.5}
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
                gap={0.5}
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
                <TextButton onClick={() => onProject(project)}>檢視明細 →</TextButton>
              </Stack>
            </Stack>
          ) : null}
        </Stack>
      </Paper>
      <Paper
        component="section"
        variant="outlined"
        sx={{ p: 2, minWidth: 0 }}
      >
        <Stack gap={2}>
          <Typography variant="h5">專案與 D-gate</Typography>
          {project ? (
            <TableContainer>
              <Table
                size="small"
                sx={{ minWidth: 1320 }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>區塊 / 執行專案</TableCell>
                    <TableCell>狀態</TableCell>
                    <TableCell>D-gate 實際 / 計畫</TableCell>
                    <TableCell>專案 KPI</TableCell>
                    <TableCell>單一執行 owner</TableCell>
                    <TableCell>下一個 D-gate · 原訂 → 預測</TableCell>
                    <TableCell>最近更新</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <ProjectMilestoneRow
                    project={project}
                    onSelect={onProject}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography
              color="text.secondary"
              variant="body2"
            >
              沒有對應的專案資料。
            </Typography>
          )}
        </Stack>
      </Paper>
    </>
  )
}
