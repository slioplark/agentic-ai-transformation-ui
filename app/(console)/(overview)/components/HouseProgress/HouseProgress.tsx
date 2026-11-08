import InfoNote from "@app/components/InfoNote/InfoNote"
import TextButton from "@app/components/TextButton/TextButton"
import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Link from "next/link"
import { benefitSummary } from "../../overview.mock"
import {
  actualProgress,
  daysBetween,
  plannedProgress,
  projects,
  projectStatus,
  snapshot,
} from "../UpcomingMilestones/milestones"
import styles from "./HouseProgress.module.css"

const areas = [
  { name: "Insight Solutions", label: "Insight Solutions · Rx Gating" },
  { name: "Domain Hubs", label: "Domain Hubs" },
  { name: "Digital Infrastructure", label: "Digital Infrastructure" },
  { name: "Pillars", label: "AI Governance & Digital Citizen" },
] as const

const summaries = areas.map((area) => {
  const items = projects.filter((project) => project.area === area.name)
  const average = (getProgress: (project: (typeof projects)[number]) => number) =>
    items.length ? Math.round(items.reduce((sum, project) => sum + getProgress(project), 0) / items.length) : 0
  return {
    ...area,
    count: items.length,
    actual: average(actualProgress),
    planned: average(plannedProgress),
    red: items.filter((project) => projectStatus(project) === "error").length,
    amber: items.filter((project) => projectStatus(project) === "warning").length,
    stale: items.filter((project) => daysBetween(project.updated, snapshot) > 7).length,
  }
})

const money = (amount: number) => `NT$ ${amount.toLocaleString("en-US", { maximumFractionDigits: 2 })}M`
const spent = projects.reduce((sum, project) => sum + project.spent, 0)
const budget = projects.reduce((sum, project) => sum + project.budget, 0)

export default function HouseProgress() {
  return (
    <Paper
      component="section"
      aria-labelledby="house-progress-title"
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
            id="house-progress-title"
            variant="h4"
          >
            房子各層 · 計畫與實際
          </Typography>
          <TextButton
            component={Link}
            href="/house"
          >
            打開互動房子 →
          </TextButton>
        </Stack>
        <Box className={styles.grid}>
          {summaries.map((area) => (
            <Box
              component="article"
              key={area.name}
              className={styles.row}
            >
              <Stack
                gap={0.5}
                useFlexGap
                className={styles.content}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={1}
                  useFlexGap
                >
                  <Typography
                    component="h3"
                    variant="h4"
                  >
                    {area.label}
                  </Typography>
                  <TextButton
                    component={Link}
                    href={`/milestones?area=${encodeURIComponent(area.name)}`}
                    aria-label={`追蹤 ${area.label} 進度`}
                    sx={{ flexShrink: 0, whiteSpace: "nowrap" }}
                  >
                    追進度 →
                  </TextButton>
                </Stack>
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  {area.count} 項 · {area.red} 紅 / {area.amber} 黃 / {area.stale} 灰
                </Typography>
                <Box className={styles.progress}>
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={area.actual}
                    aria-label={`${area.label}實際進度 ${area.actual}%，計畫進度 ${area.planned}%`}
                  />
                  <Box
                    className={styles.marker}
                    sx={{ left: `${area.planned}%`, bgcolor: "text.primary" }}
                    aria-hidden="true"
                  />
                </Box>
              </Stack>
              <Stack alignItems="flex-end">
                <Typography variant="h6">{area.actual}%</Typography>
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  計畫 {area.planned}%
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
        <InfoNote status={spent > budget ? "error" : "success"}>
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={2}
            useFlexGap
          >
            <Typography variant="body2">
              累計支出 <strong>{money(spent)}</strong>
            </Typography>
            <Typography variant="body2">
              核定預算 <strong>{money(budget)}</strong>
            </Typography>
            <Typography variant="body2">
              財務已認列價值 <strong>{benefitSummary.recognizedSavings}</strong>
            </Typography>
          </Stack>
        </InfoNote>
      </Stack>
    </Paper>
  )
}
