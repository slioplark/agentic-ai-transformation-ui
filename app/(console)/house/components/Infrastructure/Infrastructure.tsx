"use client"

import DetailDrawer from "@app/components/DetailDrawer/DetailDrawer"
import TextButton from "@app/components/TextButton/TextButton"
import CloseIcon from "@mui/icons-material/Close"
import Box from "@mui/material/Box"
import ButtonBase from "@mui/material/ButtonBase"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import ProjectDrawerContent from "../../../(overview)/components/UpcomingMilestones/ProjectDrawerContent"
import { projects, type Project } from "../../../(overview)/components/UpcomingMilestones/milestones"
import styles from "./Infrastructure.module.css"

const cards = [
  {
    id: "flow",
    title: "Agentic Flow Automation",
    description: "AI-agent BPM · HITL & exception handling",
  },
  {
    id: "software",
    title: "AI-Enabled Software Development",
    description: "AI coding → AI-assisted SSDLC → Secure Agentic DevOps",
  },
  {
    id: "api",
    title: "Enterprise API",
    description: "API gateway · event mesh · tool gateway · agent runtime",
  },
  {
    id: "api",
    title: "Agent Orchestration",
    description: "API gateway · event mesh · tool gateway · agent runtime",
  },
  {
    id: "core",
    title: "AI Core Technology",
    description: "AI models · UGPT · URAG",
  },
  {
    id: "data",
    title: "AI-Ready Data Platform",
    description: "語意層 · 特徵庫 · 向量庫 · 資料庫",
  },
  {
    id: "enterprise",
    title: "Enterprise Systems",
    description: "ERP · MES · Workday · Notes",
  },
  {
    id: "sdi",
    title: "Software-Defined Infrastructure (SDI)",
    description: "Edge-to-fab 秒級反應 · FinOps",
  },
] as const

const findProject = (id: string) => projects.find((item) => item.id === id)
const enterpriseProjects = projects.filter((item) => ["bs", "cim8", "cim12"].includes(item.id))
const deploymentProgress = (project: Project) => project.deployment?.actual ?? (project.deployment?.done ?? 0) * 20
const enterpriseProgress = Math.round(
  enterpriseProjects.reduce((total, item) => total + deploymentProgress(item), 0) / enterpriseProjects.length,
)

type Detail = { type: "project"; project: Project } | { type: "enterprise" }

export default function Infrastructure() {
  const [detail, setDetail] = useState<Detail | null>(null)
  const [open, setOpen] = useState(false)
  const titleId = "infrastructure-detail-title"

  const selectProject = (project: Project) => {
    setDetail({ type: "project", project })
    setOpen(true)
  }
  const close = () => setOpen(false)

  return (
    <>
      <Box
        component="section"
        className={styles.section}
        aria-labelledby="infrastructure-title"
      >
        <Box
          className={styles.heading}
          sx={{ bgcolor: "primary.main", color: "common.white" }}
        >
          <Typography
            component="h2"
            variant="h6"
            id="infrastructure-title"
          >
            AI Infrastructure
          </Typography>
        </Box>
        <Box className={styles.grid}>
          {cards.map((card) => {
            const project = findProject(card.id)
            const progress = card.id === "enterprise" ? enterpriseProgress : project ? deploymentProgress(project) : 0
            return (
              <ButtonBase
                component={Paper}
                variant="outlined"
                className={styles.card}
                sx={{ border: 1, borderColor: "divider", borderRadius: 1 }}
                key={card.title}
                aria-label={"檢視 " + card.title}
                onClick={() => {
                  if (card.id === "enterprise") {
                    setDetail({ type: "enterprise" })
                    setOpen(true)
                  } else if (project) {
                    selectProject(project)
                  }
                }}
              >
                <Box className={styles.cardText}>
                  <Typography
                    component="span"
                    variant="subtitle2"
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                  >
                    {card.description}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  color="secondary"
                  className={styles.progress}
                  aria-label={card.id === "enterprise" ? "三大現代化平均部署進度" : card.title + " 部署進度"}
                />
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                >
                  部署進度 {progress}%
                </Typography>
              </ButtonBase>
            )
          })}
        </Box>
      </Box>
      <DetailDrawer
        open={open}
        onClose={close}
        titleId={titleId}
      >
        {detail?.type === "project" ? (
          <ProjectDrawerContent
            project={detail.project}
            onClose={close}
            onSelect={selectProject}
            titleId={titleId}
          />
        ) : null}
        {detail?.type === "enterprise" ? (
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              gap={2}
            >
              <Stack
                gap={1}
                alignItems="flex-start"
                useFlexGap
              >
                <Typography
                  variant="caption"
                  color="secondary.main"
                >
                  DIGITAL INFRASTRUCTURE
                </Typography>
                <Typography
                  component="h2"
                  variant="h4"
                  id={titleId}
                >
                  Enterprise Systems
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  BS、CIM 8 吋與 CIM 12 吋三大現代化
                </Typography>
              </Stack>
              <IconButton
                aria-label="關閉 Enterprise Systems 詳情"
                onClick={close}
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
                  平均部署進度
                </Typography>
                <LinearProgress
                  variant="determinate"
                  color="secondary"
                  value={enterpriseProgress}
                  aria-label="三大現代化平均部署進度"
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {enterpriseProgress}% · 以三個項目的部署進度等權平均計算。
                </Typography>
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
                  現代化項目
                </Typography>
                {enterpriseProjects.map((project) => (
                  <Stack
                    key={project.id}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                  >
                    <Box>
                      <Typography variant="subtitle2">{project.name}</Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        部署進度 {deploymentProgress(project)}%
                      </Typography>
                    </Box>
                    <TextButton
                      onClick={() => selectProject(project)}
                      aria-label={"檢視 " + project.name}
                    >
                      檢視明細 →
                    </TextButton>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </>
        ) : null}
      </DetailDrawer>
    </>
  )
}
