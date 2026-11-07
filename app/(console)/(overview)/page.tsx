"use client"

import DetailDrawer from "@app/components/DetailDrawer/DetailDrawer"
import Stack from "@mui/material/Stack"
import { useRouter } from "next/navigation"
import { useState } from "react"
import PageHeader from "../components/PageHeader"
import ExecutiveDecisionDetail from "./components/ExecutiveDecisions/ExecutiveDecisionDetail"
import ExecutiveDecisions from "./components/ExecutiveDecisions/ExecutiveDecisions"
import KpiCard from "./components/KpiCard/KpiCard"
import KpiDetailContent from "./components/KpiDetailDrawer/KpiDetailContent"
import ReportingStatusGrid from "./components/ReportingStatusGrid/ReportingStatusGrid"
import TransformationSignalTable from "./components/TransformationSignalTable/TransformationSignalTable"
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

export default function HomePage() {
  const [activeDetail, setActiveDetail] = useState<ActiveDetail | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const router = useRouter()
  const titleId = "overview-detail-title"
  const closeDrawer = () => setDrawerOpen(false)

  const handleKpiClick = (kpi: OverviewKpi) => {
    if (kpi.drawer) {
      setActiveDetail({ type: "kpi", kpi })
      setDrawerOpen(true)
      return
    }
    if (kpi.href) router.push(kpi.href)
  }

  return (
    <>
      <Stack className={styles.dashboard} spacing={2} useFlexGap>
        <PageHeader>成效總覽</PageHeader>
        <ReportingStatusGrid items={reportingStatusMetrics} />
        <section aria-label="關鍵成效指標" className={styles.kpiGrid}>
          {overviewKpis.map((kpi) => (
            <KpiCard
              key={kpi.id}
              kpi={kpi}
              onClick={
                kpi.drawer || kpi.href ? () => handleKpiClick(kpi) : undefined
              }
            />
          ))}
        </section>
        <TransformationSignalTable signals={transformationSignals} />
        <ExecutiveDecisions
          decisions={executiveDecisions}
          onSelect={(decision) => {
            setActiveDetail({ type: "decision", decision })
            setDrawerOpen(true)
          }}
        />
      </Stack>
      <DetailDrawer open={drawerOpen} onClose={closeDrawer} titleId={titleId}>
        {activeDetail?.type === "kpi" ? (
          <KpiDetailContent
            kpi={activeDetail.kpi}
            onClose={closeDrawer}
            titleId={titleId}
          />
        ) : null}
        {activeDetail?.type === "decision" ? (
          <ExecutiveDecisionDetail
            decision={activeDetail.decision}
            onClose={closeDrawer}
            titleId={titleId}
          />
        ) : null}
      </DetailDrawer>
    </>
  )
}
