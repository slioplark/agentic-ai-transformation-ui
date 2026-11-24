import { projects, projectStatus } from "@(control)/data/projects.mock"
import { assets, coverage } from "@(control)/house/components/HouseDomainHubs/house-domain-hubs-data"
import foresetView from "@(control)/house/foreset-view.mock.json"
import { taskLevelDescriptions, type DomainHub, type Insight } from "@(control)/house/house.mock"
import DrawerHeaderActions, { type DrawerNavigation } from "@app/components/Drawer/DrawerHeaderActions"
import PaperCard from "@app/components/PaperCard/PaperCard"
import RankDistributionBar from "@app/components/RankDistributionBar/RankDistributionBar"
import StatusChip from "@app/components/StatusChip/StatusChip"
import TextButton from "@app/components/TextButton/TextButton"
import { useProjects } from "@lib/hooks/use-projects"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { useMemo } from "react"
import HouseForestTree, { buildForestView, type ForestTrunkBlueprint } from "../HouseForestTree/HouseForestTree"

const levels = { 高: "success", 中: "warning", 低: "error" } as const
const forestBlueprint = foresetView as Record<string, ForestTrunkBlueprint[]>
const forestTargetRankCounts = {
  2027: [
    { rank: "R1", count: 4 },
    { rank: "R2", count: 8 },
    { rank: "R3", count: 12 },
    { rank: "R4", count: 16 },
    { rank: "R5", count: 10 },
  ],
  2028: [
    { rank: "R1", count: 2 },
    { rank: "R2", count: 6 },
    { rank: "R3", count: 14 },
    { rank: "R4", count: 18 },
    { rank: "R5", count: 14 },
  ],
}
const forestTargetRankDistributions = Object.entries(forestTargetRankCounts).map(([year, rankCounts]) => ({
  year,
  ranks: Object.fromEntries(rankCounts.map(({ rank, count }) => [rank, count])),
}))

export default function HouseOverviewDrawerContent({
  insight,
  domainHub,
  onProject,
  navigation,
}: {
  insight: Insight
  domainHub: DomainHub
  onProject: (projectId: string) => void
  navigation: DrawerNavigation
}) {
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
  const forestRankCounts = Object.fromEntries(forestRanks?.map((rank, index) => [`R${index + 1}`, rank]) ?? [])

  return (
    <>
      <Stack
        gap={2}
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Stack gap={0.5}>
          <Typography
            color="secondary.main"
            variant="caption"
          >
            INSIGHT / {insight.name.toUpperCase()}
          </Typography>
          <Typography variant="h4">
            {insight.name} {insight.chineseName}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
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
            color="text.secondary"
            variant="body2"
          >
            待遷移 R4 方案 {domainHub.migrate} 項
          </Typography>
        </Stack>
        <DrawerHeaderActions {...navigation} />
      </Stack>
      <PaperCard>
        <Stack gap={1}>
          <Typography variant="h5">Forest View</Typography>
          {isProjectsLoading ? (
            <Typography
              color="text.secondary"
              variant="body2"
            >
              正在載入 Project 資料。
            </Typography>
          ) : projectsError ? (
            <Typography
              color="text.secondary"
              variant="body2"
            >
              無法取得 Project 資料，請稍後再試。
            </Typography>
          ) : forestView && forestRanks ? (
            <>
              <RankDistributionBar ranks={forestRankCounts} />
              {forestTargetRankDistributions.map(({ year, ranks }) => (
                <RankDistributionBar
                  key={year}
                  ranks={ranks}
                />
              ))}
              <HouseForestTree
                insightId={insight.id}
                insightLabel={`${insight.name} ${insight.chineseName}`}
                trunks={forestView.trunks}
              />
            </>
          ) : null}
        </Stack>
      </PaperCard>
      <PaperCard>
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
                        color={levels[task.level]}
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
              gap={0.5}
              direction="row"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box sx={{ flex: "1 1 200px", minWidth: 0 }}>
                <Typography variant="subtitle2">{project.name}</Typography>
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  {project.project} · {project.issue}
                </Typography>
              </Box>
              <Stack
                gap={0.5}
                direction="row"
                alignItems="center"
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
                  color={projectStatus(project)}
                />
                <TextButton onClick={() => onProject(project.id)}>檢視明細 →</TextButton>
              </Stack>
            </Stack>
          ) : null}
        </Stack>
      </PaperCard>
    </>
  )
}
