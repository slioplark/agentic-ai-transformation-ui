"use client"

import DetailDrawer from "@app/components/DetailDrawer/DetailDrawer"
import ThresholdProgress from "@app/components/ThresholdProgress/ThresholdProgress"
import Box from "@mui/material/Box"
import ButtonBase from "@mui/material/ButtonBase"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import ProjectDrawerContent from "../../../(overview)/components/UpcomingMilestones/ProjectDrawerContent"
import { projects, type Project } from "../../../(overview)/components/UpcomingMilestones/milestones"
import styles from "./Infrastructure.module.css"

type InfrastructureCard = {
  id: string
  title: string
  description: string
}

const cards: readonly InfrastructureCard[] = [
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
    id: "orchestration",
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
const deploymentProgress = (project: Project) => project.deployment?.actual ?? (project.deployment?.done ?? 0) * 20

type Detail = { type: "project"; project: Project }

export default function Infrastructure() {
  const [detail, setDetail] = useState<Detail | null>(null)
  const [open, setOpen] = useState(false)
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
            const progress = project ? deploymentProgress(project) : 0
            return (
              <ButtonBase
                component={Paper}
                variant="outlined"
                className={styles.card}
                sx={{ border: 1, borderColor: "divider", borderRadius: 1 }}
                key={card.title}
                onClick={() => {
                  if (project) {
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
                <ThresholdProgress
                  color="secondary"
                  value={progress}
                  className={styles.progress}
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
      >
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
