"use client"

import PageHeader from "@(control)/components/PageHeader"
import DetailDrawer from "@app/components/DetailDrawer/DetailDrawer"
import ProjectDrawerContent from "@app/components/ProjectDrawerContent/ProjectDrawerContent"
import Stack from "@mui/material/Stack"
import { useRouter } from "next/navigation"
import { useState } from "react"
import OverMilestones from "./components/OverMilestones/OverMilestones"
import type { Project } from "./components/OverMilestones/milestones"
import OverviewBlocker from "./components/OverviewBlocker/OverviewBlocker"
import OverviewDecisionDrawerContent from "./components/OverviewDecisions/OverviewDecisionDrawerContent"
import OverviewDecisions from "./components/OverviewDecisions/OverviewDecisions"
import OverviewHouse from "./components/OverviewHouse/OverviewHouse"
import OverviewKpi from "./components/OverviewKpi/OverviewKpi"
import KpiDrawerContent from "./components/OverviewKpiDrawer/KpiDrawerContent"
import OverviewReporting from "./components/OverviewReporting/OverviewReporting"
import OverviewTransformationSignalTable from "./components/OverviewTransformationSignalTable/OverviewTransformationSignalTable"
import {
  executiveDecisions,
  overviewKpis,
  reportingStatusMetrics,
  transformationSignals,
  type ExecutiveDecision,
  type OverviewKpi as OverviewKpiData,
} from "./overview.mock"
import styles from "./page.module.css"

type ActiveDetail =
  | { type: "kpi"; kpi: OverviewKpiData }
  | { type: "decision"; decision: ExecutiveDecision }
  | { type: "project"; project: Project }

export default function HomePage() {
  const [activeDetail, setActiveDetail] = useState<ActiveDetail | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const router = useRouter()
  const closeDrawer = () => setDrawerOpen(false)

  const handleKpiClick = (kpi: OverviewKpiData) => {
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
        spacing={2}
        useFlexGap
      >
        <PageHeader>成效總覽</PageHeader>
        <OverviewReporting items={reportingStatusMetrics} />
        <section className={styles.kpiGrid}>
          {overviewKpis.map((kpi) => (
            <OverviewKpi
              key={kpi.id}
              kpi={kpi}
              onClick={kpi.drawer || kpi.href ? () => handleKpiClick(kpi) : undefined}
            />
          ))}
        </section>
        <OverviewTransformationSignalTable signals={transformationSignals} />
        <OverviewDecisions
          decisions={executiveDecisions}
          onSelect={(decision) => {
            setActiveDetail({ type: "decision", decision })
            setDrawerOpen(true)
          }}
        />
        <OverMilestones onSelect={selectProject} />
        <OverviewBlocker onSelect={selectProject} />
        <OverviewHouse />
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
          <OverviewDecisionDrawerContent
            decision={activeDetail.decision}
            onClose={closeDrawer}
          />
        ) : null}
      </DetailDrawer>
    </>
  )
}
