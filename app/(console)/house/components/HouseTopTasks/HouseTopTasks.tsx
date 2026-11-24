import { projects, projectStatus } from "@(control)/data/projects.mock"
import { taskLevelDescriptions, type Insight } from "@(control)/house/house.mock"
import PaperCard from "@app/components/PaperCard/PaperCard"
import StatusChip from "@app/components/StatusChip/StatusChip"
import TextButton from "@app/components/TextButton/TextButton"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"

const levels = { 高: "success", 中: "warning", 低: "error" } as const

export default function HouseTopTasks({
  insight,
  onProject,
}: {
  insight: Insight
  onProject: (projectId: string) => void
}) {
  const project = projects.find((item) => item.id === (insight.id === "ops" ? "operations" : insight.id))

  return (
    <PaperCard>
      <Stack gap={2}>
        <Typography variant="h5">Top tasks 需求滿足度</Typography>
        <TableContainer>
          <Table>
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
                  projectStatus(project) === "error" ? "高風險" : projectStatus(project) === "warning" ? "注意" : "正常"
                }
                color={projectStatus(project)}
              />
              <TextButton onClick={() => onProject(project.id)}>檢視明細 →</TextButton>
            </Stack>
          </Stack>
        ) : null}
      </Stack>
    </PaperCard>
  )
}
