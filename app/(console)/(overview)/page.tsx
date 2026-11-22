"use client"

import PageHeader from "@(control)/components/PageHeader"
import type { ProjectData } from "@(control)/data/projects.mock"
import Drawer from "@app/components/Drawer/Drawer"
import useDrawerStack from "@app/components/Drawer/useDrawerStack"
import ProjectDrawerContent from "@app/components/ProjectDrawerContent/ProjectDrawerContent"
import Stack from "@mui/material/Stack"
import { useRouter } from "next/navigation"
import OverMilestones from "./components/OverMilestones/OverMilestones"
import OverviewBlocker from "./components/OverviewBlocker/OverviewBlocker"
import OverviewDecisionDrawerContent from "./components/OverviewDecisions/OverviewDecisionDrawerContent"
import OverviewDecisions from "./components/OverviewDecisions/OverviewDecisions"
import OverviewHouse from "./components/OverviewHouse/OverviewHouse"
import OverviewKpi from "./components/OverviewKpi/OverviewKpi"
import KpiDrawerContent from "./components/OverviewKpiDrawer/KpiDrawerContent"
import OverviewReporting from "./components/OverviewReporting/OverviewReporting"
import OverviewTransformationSignalTable from "./components/OverviewTransformationSignalTable/OverviewTransformationSignalTable"
import { decisionData, type DecisionData } from "./data/overviewDecisions.mock"
import { kpiData, type KpiData } from "./data/overviewKpis.mock"
import { reportingStatusMetrics, transformationSignals } from "./overview.mock"
import styles from "./page.module.css"

type OverviewDrawerItem =
  | { type: "kpi"; kpiId: KpiData["id"] }
  | { type: "project"; projectId: ProjectData["id"] }
  | { type: "decision"; decisionId: DecisionData["id"] }

export default function HomePage() {
  const { drawer, contentKey, isOpen, navigation, open, push } = useDrawerStack<OverviewDrawerItem>()
  const router = useRouter()

  const handleKpiClick = (kpi: KpiData) => {
    if (kpi.drawer) {
      open({ type: "kpi", kpiId: kpi.id })
      return
    }
    if (kpi.href) router.push(kpi.href)
  }

  const openProject = (project: ProjectData) => {
    open({ type: "project", projectId: project.id })
  }

  const pushProject = (projectId: string) => {
    push({ type: "project", projectId })
  }

  return (
    <>
      <Stack gap={2}>
        <PageHeader>成效總覽</PageHeader>
        <OverviewReporting items={reportingStatusMetrics} />
        <section className={styles.kpiGrid}>
          {kpiData.map((kpi) => (
            <OverviewKpi
              key={kpi.id}
              kpi={kpi}
              onClick={kpi.drawer || kpi.href ? () => handleKpiClick(kpi) : undefined}
            />
          ))}
        </section>
        <OverviewTransformationSignalTable signals={transformationSignals} />
        <OverviewDecisions
          decisions={decisionData}
          onOpen={(decision) => {
            open({ type: "decision", decisionId: decision.id })
          }}
        />
        <OverMilestones onOpen={openProject} />
        <OverviewBlocker onOpen={openProject} />
        <OverviewHouse />
      </Stack>
      <Drawer
        open={isOpen}
        onClose={navigation.onClose}
        contentKey={contentKey}
      >
        {drawer?.type === "kpi" ? (
          <KpiDrawerContent
            kpiId={drawer.kpiId}
            onClose={navigation.onClose}
          />
        ) : null}
        {drawer?.type === "project" ? (
          <ProjectDrawerContent
            projectId={drawer.projectId}
            onProject={pushProject}
            navigation={navigation}
          />
        ) : null}
        {drawer?.type === "decision" ? (
          <OverviewDecisionDrawerContent
            decisionId={drawer.decisionId}
            onClose={navigation.onClose}
          />
        ) : null}
      </Drawer>
    </>
  )
}
