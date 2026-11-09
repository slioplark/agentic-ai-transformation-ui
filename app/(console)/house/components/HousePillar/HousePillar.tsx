"use client"

import DetailDrawer from "@app/components/DetailDrawer/DetailDrawer"
import ThresholdProgress from "@app/components/ThresholdProgress/ThresholdProgress"
import Box from "@mui/material/Box"
import ButtonBase from "@mui/material/ButtonBase"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import ProjectDrawerContent from "../../../(overview)/components/UpcomingMilestones/ProjectDrawerContent"
import {
  actualProgress,
  daysBetween,
  plannedProgress,
  projects,
  snapshot,
  type Project,
} from "../../../(overview)/components/UpcomingMilestones/milestones"
import styles from "./HousePillar.module.css"

const pillars = {
  governance: {
    label: "信任與資安",
    items: ["政策與規範", "風險管理", "資料安全", "模型安全", "隱私保護", "合規與稽核", "責任與倫理"],
  },
  citizen: {
    label: "數位素養",
    items: ["AI 素養", "分級培育", "(L1/L2/L3)", "應用開發能力", "跨部門協作", "創新文化", "持續學習"],
  },
} as const

export default function HousePillar({ kind }: { kind: keyof typeof pillars }) {
  const [detail, setDetail] = useState<Project | null>(null)
  const [open, setOpen] = useState(false)
  const project = projects.find((item) => item.id === kind)!
  const { label, items } = pillars[kind]
  const actual = actualProgress(project)
  const planned = plannedProgress(project)
  const overdue = daysBetween(project.updated, snapshot)
  const nextGate = project.milestones.find((gate) => !gate.done)
  const message =
    overdue > 7
      ? `資料逾期 ${overdue} 天`
      : project.issue === "依計畫進行"
        ? nextGate
          ? `下一關 ${nextGate.name.split(" ·")[0]} · ${nextGate.baseline.slice(5).replace("-", "/")}`
          : "已完成 D5"
        : project.issue
  const selectProject = (selected: Project) => {
    setDetail(selected)
    setOpen(true)
  }
  const close = () => setOpen(false)

  return (
    <>
      <Box
        component="section"
        className={`${styles.pillar} ${styles[kind]}`}
      >
        <Box>
          <Typography
            color={kind === "governance" ? "secondary.main" : "info.main"}
            variant="caption"
          >
            {label}
          </Typography>
          <Typography
            id={`${kind}-title`}
            variant="h6"
            component="h2"
          >
            {project.name}
          </Typography>
        </Box>
        <ButtonBase
          sx={{ border: 1, borderColor: "divider", borderRadius: 1 }}
          variant="outlined"
          onClick={() => selectProject(project)}
          component={Paper}
          className={styles.card}
        >
          <Box className={styles.progressLabel}>
            <Typography
              variant="h5"
              component="span"
            >
              {actual}%
            </Typography>
            <Typography
              color="text.secondary"
              variant="caption"
              component="span"
            >
              計畫 {planned}%
            </Typography>
          </Box>
          <ThresholdProgress
            color="secondary"
            value={actual}
            threshold={planned}
          />
          <Typography
            color="text.secondary"
            variant="caption"
            component="span"
          >
            {message}
          </Typography>
        </ButtonBase>
        <Box
          component="ul"
          className={styles.list}
        >
          {items.map((item) => (
            <Typography
              key={item}
              variant="body2"
              component="li"
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Box>
      <DetailDrawer
        open={open}
        onClose={close}
      >
        {detail ? (
          <ProjectDrawerContent
            project={detail}
            onClose={close}
            onSelect={selectProject}
          />
        ) : null}
      </DetailDrawer>
    </>
  )
}
