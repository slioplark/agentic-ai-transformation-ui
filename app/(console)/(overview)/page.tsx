"use client"

import PageHeader from "@(control)/components/PageHeader"
import DetailDrawer from "@app/components/DetailDrawer/DetailDrawer"
import Stack from "@mui/material/Stack"
import { useRouter } from "next/navigation"
import { useState } from "react"
import BlockerImpact from "./components/BlockerImpact/BlockerImpact"
import DecisionDrawerContent from "./components/Decisions/DecisionDrawerContent"
import Decisions from "./components/Decisions/Decisions"
import HouseProgress from "./components/HouseProgress/HouseProgress"
import KpiCard from "./components/KpiCard/KpiCard"
import KpiDrawerContent from "./components/KpiDetailDrawer/KpiDrawerContent"
import ReportingStatusGrid from "./components/ReportingStatusGrid/ReportingStatusGrid"
import TransformationSignalTable from "./components/TransformationSignalTable/TransformationSignalTable"
import ProjectDrawerContent from "./components/UpcomingMilestones/ProjectDrawerContent"
import UpcomingMilestones from "./components/UpcomingMilestones/UpcomingMilestones"
import type { Project } from "./components/UpcomingMilestones/milestones"
import {
  executiveDecisions,
  overviewKpis,
  reportingStatusMetrics,
  transformationSignals,
  type ExecutiveDecision,
  type OverviewKpi,
} from "./overview.mock"
import styles from "./page.module.css"

type ActiveDetail =
  | { type: "kpi"; kpi: OverviewKpi }
  | { type: "decision"; decision: ExecutiveDecision }
  | { type: "project"; project: Project }

export default function HomePage() {
  const [activeDetail, setActiveDetail] = useState<ActiveDetail | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const router = useRouter()
  const closeDrawer = () => setDrawerOpen(false)

  const handleKpiClick = (kpi: OverviewKpi) => {
    if (kpi.drawer) {
      setActiveDetail({ type: "kpi", kpi })
      setDrawerOpen(true)
      return
    }
    if (kpi.href) router.push(kpi.href)
  }

  const selectProject = (project: Project) => {
    setActiveDetail({ type: "project", project })
    setDrawerOpen(true)
  }

  return (
    <>
      <Stack
        className={styles.dashboard}
        spacing={2}
        useFlexGap
      >
        <PageHeader>成效總覽</PageHeader>
        <ReportingStatusGrid items={reportingStatusMetrics} />
        <section className={styles.kpiGrid}>
          {overviewKpis.map((kpi) => (
            <KpiCard
              key={kpi.id}
              kpi={kpi}
              onClick={kpi.drawer || kpi.href ? () => handleKpiClick(kpi) : undefined}
            />
          ))}
        </section>
        <TransformationSignalTable signals={transformationSignals} />
        <Decisions
          decisions={executiveDecisions}
          onSelect={(decision) => {
            setActiveDetail({ type: "decision", decision })
            setDrawerOpen(true)
          }}
        />
        <UpcomingMilestones onSelect={selectProject} />
        <BlockerImpact onSelect={selectProject} />
        <HouseProgress />
      </Stack>
      <DetailDrawer
        open={drawerOpen}
        onClose={closeDrawer}
      >
        {activeDetail?.type === "kpi" ? (
          <KpiDrawerContent
            kpi={activeDetail.kpi}
            onClose={closeDrawer}
          />
        ) : null}
        {activeDetail?.type === "project" ? (
          <ProjectDrawerContent
            project={activeDetail.project}
            onClose={closeDrawer}
            onSelect={selectProject}
          />
        ) : null}
        {activeDetail?.type === "decision" ? (
          <DecisionDrawerContent
            decision={activeDetail.decision}
            onClose={closeDrawer}
          />
        ) : null}
      </DetailDrawer>
    </>
  )
}
