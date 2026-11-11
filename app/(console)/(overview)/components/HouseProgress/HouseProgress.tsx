import {
  actualProgress,
  daysBetween,
  plannedProgress,
  projects,
  projectStatus,
  snapshot,
} from "@(control)/(overview)/components/UpcomingMilestones/milestones"
import { benefitSummary } from "@(control)/(overview)/overview.mock"
import InfoNote from "@app/components/InfoNote/InfoNote"
import TextButton from "@app/components/TextButton/TextButton"
import ThresholdProgress from "@app/components/ThresholdProgress/ThresholdProgress"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Link from "next/link"
import styles from "./HouseProgress.module.css"

const areas = [
  { name: "Insight Solutions", label: "Insight Solutions · Rx Gating" },
  { name: "Domain Hubs", label: "Domain Hubs" },
  { name: "AI Infrastructure", label: "AI Infrastructure" },
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
      variant="outlined"
      component="section"
      className={styles.panel}
    >
      <Stack
        useFlexGap
        gap={1.5}
      >
        <Stack
          useFlexGap
          gap={0.5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4">房子各層 · 計畫與實際</Typography>
          <TextButton
            href="/house"
            component={Link}
          >
            打開互動房子 →
          </TextButton>
        </Stack>
        <Box className={styles.grid}>
          {summaries.map((area) => (
            <Box
              key={area.name}
              component="article"
              className={styles.row}
            >
              <Stack
                useFlexGap
                gap={0.5}
                className={styles.content}
              >
                <Stack
                  useFlexGap
                  gap={0.5}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h4">{area.label}</Typography>
                  <TextButton
                    sx={{ flexShrink: 0, whiteSpace: "nowrap" }}
                    href={`/milestones?area=${encodeURIComponent(area.name)}`}
                    component={Link}
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
                <ThresholdProgress
                  color="secondary"
                  value={area.actual}
                  threshold={area.planned}
                />
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
            useFlexGap
            gap={2}
            flexWrap="wrap"
            direction="row"
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
