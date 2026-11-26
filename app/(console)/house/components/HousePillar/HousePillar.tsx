"use client"

import {
  actualProgress,
  daysBetween,
  plannedProgress,
  projects,
  snapshot,
  type ProjectData,
} from "@(control)/data/projects.mock"
import HouseDrawerCard from "@(control)/house/components/HouseDrawerCard/HouseDrawerCard"
import Drawer from "@app/components/Drawer/Drawer"
import useDrawerStack from "@app/components/Drawer/useDrawerStack"
import ProjectDrawerContent from "@app/components/ProjectDrawerContent/ProjectDrawerContent"
import ThresholdProgress from "@app/components/ThresholdProgress/ThresholdProgress"
import Diversity3Icon from "@mui/icons-material/Diversity3"
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import styles from "./HousePillar.module.css"

const pillars = {
  governance: {
    icon: SecurityOutlinedIcon,
    label: "信任與資安",
    items: ["政策與規範", "風險管理", "資料安全", "模型安全", "隱私保護", "合規與稽核", "責任與倫理"],
  },
  citizen: {
    icon: Diversity3Icon,
    label: "數位素養",
    items: ["AI 素養", "分級培育", "(L1/L2/L3)", "應用開發能力", "跨部門協作", "創新文化", "持續學習"],
  },
} as const

export default function HousePillar({ kind }: { kind: keyof typeof pillars }) {
  const { drawer, contentKey, isOpen, navigation, open, push } = useDrawerStack<string>()
  const project = projects.find((item) => item.id === kind)!
  const { icon: Icon, label, items } = pillars[kind]
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
  const openProject = (selected: ProjectData) => {
    open(selected.id)
  }

  return (
    <>
      <Box
        component="section"
        className={`${styles.pillar} ${styles[kind]}`}
      >
        <Box className={styles.content}>
          <Icon
            color={kind === "governance" ? "secondary" : "info"}
            fontSize="large"
          />
          <Typography color={kind === "governance" ? "secondary.main" : "info.main"}>{label}</Typography>
          <Typography>{project.name}</Typography>
          <HouseDrawerCard
            onClick={() => openProject(project)}
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
          </HouseDrawerCard>
          <Box className={styles.list}>
            {items.map((item) => (
              <Typography
                key={item}
                variant="body2"
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
      <Drawer
        open={isOpen}
        onClose={navigation.onClose}
        contentKey={contentKey}
      >
        {drawer ? (
          <ProjectDrawerContent
            projectId={drawer}
            onProject={push}
            navigation={navigation}
          />
        ) : null}
      </Drawer>
    </>
  )
}
