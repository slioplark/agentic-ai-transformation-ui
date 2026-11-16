"use client"

import { formatDate, projectStatus, projects, type ProjectData } from "@(control)/data/projects.mock"
import HouseDrawerCard from "@(control)/house/components/HouseDrawerCard/HouseDrawerCard"
import Drawer from "@app/components/Drawer/Drawer"
import useDrawerStack from "@app/components/Drawer/useDrawerStack"
import ProjectDrawerContent from "@app/components/ProjectDrawerContent/ProjectDrawerContent"
import StatusChip from "@app/components/StatusChip/StatusChip"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import pageStyles from "../../page.module.css"
import styles from "./HouseAiInfra.module.css"

const stageLabels = ["POC", "PO 與導入", "首次部署", "二次部署", "全面部署"]

const statusLabels = {
  error: "延誤 / 阻塞",
  warning: "有風險",
  success: "依計畫",
} as const

const aiInfraCardIds = ["flow", "software", "api", "orchestration"] as const
const getProject = (id: string) => projects.find((project) => project.id === id)

const clampStage = (value: number) => Math.min(stageLabels.length, Math.max(0, value))
const progressToStage = (value: number | undefined) => clampStage(Math.floor((value ?? 0) / 20))

function completedStages(project: ProjectData) {
  const deployment = project.deployment
  return deployment?.done === undefined ? progressToStage(deployment?.actual) : clampStage(deployment.done)
}

function plannedStages(project: ProjectData, completed: number) {
  const plan = project.deployment?.plan
  return plan === undefined ? completed : Math.max(completed, progressToStage(plan))
}

function AiInfraCard({
  className,
  onOpen,
  project,
}: {
  className: string
  onOpen: (project: ProjectData) => void
  project: ProjectData
}) {
  const deployment = project.deployment
  const completed = completedStages(project)
  const planned = plannedStages(project, completed)
  const status = projectStatus(project)
  const delayed = deployment ? deployment.fc > deployment.base : false
  const nextStage = stageLabels[completed]
  const detailClassName = delayed ? `${styles.stageDetail} ${styles.delayed}` : styles.stageDetail

  return (
    <HouseDrawerCard
      onClick={() => onOpen(project)}
      className={className}
    >
      <Box className={styles.cardHeader}>
        <Typography variant="subtitle2">{project.name}</Typography>
        <StatusChip
          label={statusLabels[status]}
          color={status}
        />
      </Box>
      {deployment ? (
        <>
          <Box className={styles.stageProgress}>
            <Box className={styles.segments}>
              {stageLabels.map((label, index) => {
                const state = index < completed ? styles.complete : index < planned ? styles.late : index === completed ? styles.next : undefined
                const segmentClassName = state ? `${styles.segment} ${state}` : styles.segment
                return (
                  <Box
                    key={label}
                    className={segmentClassName}
                  />
                )
              })}
            </Box>
            <Box className={styles.stageLabels}>
              {stageLabels.map((label, index) => (
                <Typography
                  key={label}
                  variant="caption"
                  className={index === completed ? styles.currentLabel : undefined}
                >
                  {label}
                </Typography>
              ))}
            </Box>
          </Box>
          <Typography
            variant="caption"
            className={detailClassName}
          >
            {nextStage
              ? `下一階段：${nextStage} · 原訂 ${formatDate(deployment.base)}${delayed ? ` → 預測 ${formatDate(deployment.fc)}` : ""}`
              : "已全面部署"}
          </Typography>
        </>
      ) : (
        <Typography
          variant="caption"
          className={styles.stageDetail}
        >
          尚未規劃部署階段
        </Typography>
      )}
    </HouseDrawerCard>
  )
}

type Detail = { type: "project"; projectId: string }

export default function HouseAiInfra() {
  const [expanded, setExpanded] = useState(true)
  const { drawer, contentKey, isOpen, navigation, open, push } = useDrawerStack<Detail>()
  const openProject = (project: ProjectData) => {
    open({ type: "project", projectId: project.id })
  }
  const pushProject = (projectId: string) => push({ type: "project", projectId })
  const aiInfraProjects = aiInfraCardIds.map(getProject).filter((project): project is ProjectData => project !== undefined)
  const coreProject = getProject("core")
  const dataProject = getProject("data")
  const enterpriseProject = getProject("enterprise")
  const sdiProject = getProject("sdi")

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
            {aiInfraProjects.map((project) => (
              <AiInfraCard
                key={project.id}
                project={project}
                className={styles.card}
                onOpen={openProject}
              />
            ))}
            {coreProject || dataProject || enterpriseProject ? (
              <Box className={styles.coreDataLayout}>
                {coreProject ? (
                  <AiInfraCard
                    className={`${styles.card} ${styles.coreCard}`}
                    project={coreProject}
                    onOpen={openProject}
                  />
                ) : null}
                <Box className={styles.dataEnterpriseColumn}>
                  {dataProject ? (
                    <AiInfraCard
                      className={styles.card}
                      project={dataProject}
                      onOpen={openProject}
                    />
                  ) : null}
                  {enterpriseProject ? (
                    <AiInfraCard
                      className={styles.card}
                      project={enterpriseProject}
                      onOpen={openProject}
                    />
                  ) : null}
                </Box>
              </Box>
            ) : null}
            {sdiProject ? (
              <AiInfraCard
                className={`${styles.card} ${styles.wide}`}
                project={sdiProject}
                onOpen={openProject}
              />
            ) : null}
          </Box>
        </Collapse>
      </Box>
      <Drawer
        open={isOpen}
        onClose={navigation.onClose}
        contentKey={contentKey}
      >
        {drawer?.type === "project" ? (
          <ProjectDrawerContent
            projectId={drawer.projectId}
            onProject={pushProject}
            navigation={navigation}
          />
        ) : null}
      </Drawer>
    </>
  )
}
