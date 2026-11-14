import type { Project } from "@(control)/(overview)/components/OverMilestones/milestones"
import HouseDrawerCard from "@(control)/house/components/HouseDrawerCard/HouseDrawerCard"
import HouseInsightDrawerContent from "@(control)/house/components/HouseInsightDrawerContent/HouseInsightDrawerContent"
import { domainHubs, type DomainHub, type Insight } from "@(control)/house/house.mock"
import DetailDrawer from "@app/components/DetailDrawer/DetailDrawer"
import ProjectDrawerContent from "@app/components/ProjectDrawerContent/ProjectDrawerContent"
import StatusChip from "@app/components/StatusChip/StatusChip"
import TextButton from "@app/components/TextButton/TextButton"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import Typography from "@mui/material/Typography"
import Link from "next/link"
import { useState } from "react"
import pageStyles from "../../page.module.css"
import styles from "./HouseInsight.module.css"

const rankLabels = ["Connected", "Optimized", "Transparent", "Proactive", "Agile"]
const rankColors = ["#c4dbea", "#8fb9d8", "#4f8fbf", "#2464a0", "#132c47"]
const levelStatus = { 高: "success", 中: "warning", 低: "error" } as const

export type InsightRanks = [number, number, number, number, number]

export function InsightRankBar({ ranks }: { ranks: InsightRanks }) {
  return (
    <Box
      className={styles.rankBar}
      aria-hidden="true"
    >
      {ranks.map(
        (value, index) =>
          value > 0 && (
            <Box
              key={rankLabels[index]}
              sx={{ flexGrow: value, bgcolor: rankColors[index] }}
            />
          ),
      )}
    </Box>
  )
}

function InsightCard({
  insight,
  ranks,
  rankStatus,
  onSelect,
}: {
  insight: Insight
  ranks: InsightRanks | undefined
  rankStatus: "loading" | "unavailable" | undefined
  onSelect: (id: string) => void
}) {
  const total = ranks?.reduce((sum, value) => sum + value, 0)

  return (
    <HouseDrawerCard
      onClick={() => onSelect(insight.id)}
      className={styles.card}
    >
      <Typography variant="h6">
        {insight.name}{" "}
        <Typography
          component="span"
          variant="caption"
          color="text.secondary"
        >
          {insight.chineseName}
        </Typography>
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
      >
        {insight.benefit}
      </Typography>
      {ranks ? (
        <>
          <InsightRankBar ranks={ranks} />
          <Typography
            variant="caption"
            color="text.secondary"
          >
            R1 → R5（{total}）
          </Typography>
        </>
      ) : (
        <>
          <Box className={styles.rankBar} />
          <Typography
            variant="caption"
            color="text.secondary"
          >
            {rankStatus === "loading" ? "R1–R5 載入中" : "R1–R5 無可用資料"}
          </Typography>
        </>
      )}
      <Typography
        variant="caption"
        color="text.secondary"
      >
        Top tasks 需求滿足度
      </Typography>
      <Box className={styles.tasks}>
        {insight.tasks.map((task) => (
          <Box
            className={styles.task}
            key={task.name}
          >
            <Typography variant="caption">{task.name}</Typography>
            <StatusChip
              label={task.level}
              status={levelStatus[task.level]}
            />
          </Box>
        ))}
      </Box>
    </HouseDrawerCard>
  )
}

type Detail = { type: "insight"; insight: Insight; domainHub: DomainHub } | { type: "project"; project: Project }

export default function HouseInsight({
  insights,
  rankStatus,
  ranksByInsight,
}: {
  insights: Insight[]
  rankStatus: "loading" | "unavailable" | undefined
  ranksByInsight: ReadonlyMap<string, InsightRanks>
}) {
  const [expanded, setExpanded] = useState(true)
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState<Detail | null>(null)
  const close = () => setOpen(false)
  const selectProject = (project: Project) => {
    setDetail({ type: "project", project })
    setOpen(true)
  }
  const selectInsight = (id: string) => {
    const insight = insights.find((item) => item.id === id)
    const domainHub = domainHubs.find((item) => item.id === id)
    if (insight && domainHub) {
      setDetail({ type: "insight", insight, domainHub })
      setOpen(true)
    }
  }
  const taskRows = Math.max(1, ...insights.map((insight) => insight.tasks.length))

  return (
    <Box className={pageStyles.section}>
      <Box
        className={pageStyles.heading}
        onClick={() => setExpanded((current) => !current)}
        sx={{ bgcolor: "info.main", color: "common.white" }}
      >
        <Typography variant="h6">Insight Solutions with Rx Gating</Typography>
        <Typography variant="caption">
          {rankLabels.map((label, index) => `R${index + 1} ${label}`).join(" · ")} · R4.x
        </Typography>
      </Box>
      <Collapse
        in={expanded}
        timeout="auto"
      >
        <Box
          className={styles.grid}
          sx={{ "--task-rows": taskRows }}
        >
          <Box className={styles.label}>
            <Typography variant="h6">Insight</Typography>
            <Typography variant="caption">Forest View R1→R5 能力數</Typography>
            <Typography variant="caption">Top tasks 是否滿足</Typography>
            <TextButton
              sx={{ alignSelf: "flex-end", mt: "auto" }}
              href="/forest"
              component={Link}
            >
              Forest View →
            </TextButton>
          </Box>
          {insights.map((insight) => (
            <InsightCard
              key={insight.id}
              ranks={ranksByInsight.get(insight.id)}
              insight={insight}
              onSelect={selectInsight}
              rankStatus={rankStatus}
            />
          ))}
        </Box>
      </Collapse>
      <DetailDrawer
        open={open}
        onClose={close}
      >
        {detail?.type === "insight" ? (
          <HouseInsightDrawerContent
            insight={detail.insight}
            onClose={close}
            domainHub={detail.domainHub}
            onProject={selectProject}
          />
        ) : null}
        {detail?.type === "project" ? (
          <ProjectDrawerContent
            project={detail.project}
            onClose={close}
            onSelect={selectProject}
          />
        ) : null}
      </DetailDrawer>
    </Box>
  )
}
