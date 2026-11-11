"use client"

import ProjectDrawerContent, {
  DeploymentProgress,
} from "@(control)/(overview)/components/UpcomingMilestones/ProjectDrawerContent"
import { projects, type Project } from "@(control)/(overview)/components/UpcomingMilestones/milestones"
import HouseDrawerCard from "@(control)/house/components/HouseDrawerCard/HouseDrawerCard"
import DetailDrawer from "@app/components/DetailDrawer/DetailDrawer"
import ThresholdProgress from "@app/components/ThresholdProgress/ThresholdProgress"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import pageStyles from "../../page.module.css"
import styles from "./Infrastructure.module.css"
import InfrastructureInsights from "./InfrastructureInsights"

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

const summaryItems = [
  { title: "Milestone completion", value: "82%" },
  { title: "Active developers", value: "350" },
  { title: "Development efficiency", value: "+28%" },
  { title: "Delivery health", value: "ON TRACK" },
]

type Detail = { type: "project"; project: Project }

export default function Infrastructure() {
  const [expanded, setExpanded] = useState(true)
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
        className={pageStyles.section}
      >
        <Box
          className={pageStyles.heading}
          onClick={() => setExpanded((current) => !current)}
          sx={{ bgcolor: "primary.main", color: "common.white" }}
        >
          <Typography variant="h6">AI Infrastructure</Typography>
        </Box>
        <Collapse
          in={expanded}
          timeout="auto"
        >
          <Box className={styles.cards}>
            {cards.map((card) => {
              const project = findProject(card.id)
              const progress = project ? deploymentProgress(project) : 0
              return (
                <HouseDrawerCard
                  key={card.title}
                  onClick={() => {
                    if (project) {
                      selectProject(project)
                    }
                  }}
                  className={styles.card}
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
                </HouseDrawerCard>
              )
            })}
          </Box>
        </Collapse>
      </Box>
      <DetailDrawer
        open={open}
        onClose={close}
      >
        {detail?.type === "project" ? (
          <ProjectDrawerContent
            details={
              <>
                <DeploymentProgress project={detail.project} />
                <InfrastructureInsights />
              </>
            }
            project={detail.project}
            onClose={close}
            summary={
              <Box className={styles.summary}>
                {summaryItems.map((item) => (
                  <Paper
                    key={item.title}
                    variant="outlined"
                    className={styles.summaryItem}
                  >
                    <Typography
                      color="text.secondary"
                      variant="caption"
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="h6">{item.value}</Typography>
                  </Paper>
                ))}
              </Box>
            }
            onSelect={selectProject}
          />
        ) : null}
      </DetailDrawer>
    </>
  )
}
