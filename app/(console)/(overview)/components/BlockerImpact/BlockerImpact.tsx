import StatusChip from "@app/components/StatusChip/StatusChip"
import TextButton from "@app/components/TextButton/TextButton"
import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Link from "next/link"
import { downstreamProjects, projects, projectStatus, type Project } from "../UpcomingMilestones/milestones"
import styles from "./BlockerImpact.module.css"

const blockers = projects
  .filter((project) => projectStatus(project) !== "success")
  .map((project) => ({ project, downstream: downstreamProjects(project.id) }))
  .sort((a, b) => b.downstream.length - a.downstream.length || b.project.risk - a.project.risk)
  .slice(0, 4)

const maxDownstream = Math.max(1, ...blockers.map(({ downstream }) => downstream.length))

export default function BlockerImpact({ onSelect }: { onSelect: (project: Project) => void }) {
  return (
    <Paper
      component="section"
      aria-labelledby="blocker-impact-title"
      variant="outlined"
      className={styles.panel}
    >
      <Stack
        gap={1.5}
        useFlexGap
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          useFlexGap
        >
          <Typography
            component="h2"
            id="blocker-impact-title"
            variant="h4"
          >
            阻塞影響範圍 · 受阻項目影響範圍
          </Typography>
          <TextButton
            component={Link}
            href="/hubs"
          >
            看全部 →
          </TextButton>
        </Stack>
        <Typography
          color="text.secondary"
          variant="caption"
        >
          數字為直接與間接依賴此項的下游工作數。
        </Typography>
        {blockers.length === 0 ? (
          <Typography
            color="text.secondary"
            variant="body2"
          >
            目前無已登錄阻塞。
          </Typography>
        ) : (
          <Box className={styles.grid}>
            {blockers.map(({ project, downstream }) => {
              const status = projectStatus(project)
              return (
                <Box
                  component="article"
                  key={project.id}
                  className={styles.item}
                >
                  <Stack
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    gap={1}
                    useFlexGap
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      flexWrap="wrap"
                      gap={1}
                      useFlexGap
                    >
                      <Typography
                        component="h3"
                        variant="h6"
                      >
                        {project.name}
                      </Typography>
                      <StatusChip
                        status={status}
                        label={status === "error" ? "延誤 / 阻塞" : "有風險"}
                      />
                    </Stack>
                    <TextButton
                      onClick={() => onSelect(project)}
                      aria-label={`檢視 ${project.name} 詳情`}
                      sx={{ flexShrink: 0 }}
                    >
                      詳情 →
                    </TextButton>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={1}
                    useFlexGap
                  >
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      {project.issue}
                    </Typography>
                    <Typography variant="h6">{downstream.length}</Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    color={project.risk === 2 ? "error" : "secondary"}
                    value={(downstream.length / maxDownstream) * 100}
                    aria-label={`${project.name}影響 ${downstream.length} 項下游工作`}
                  />
                  <Typography
                    color="text.secondary"
                    variant="caption"
                  >
                    {downstream.length ? `影響：${downstream.map((item) => item.name).join("、")}` : "無下游依賴"}
                  </Typography>
                </Box>
              )
            })}
          </Box>
        )}
      </Stack>
    </Paper>
  )
}
