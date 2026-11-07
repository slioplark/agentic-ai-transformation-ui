"use client"

import Stack from "@mui/material/Stack"
import { useRouter } from "next/navigation"
import { useState } from "react"
import KpiCard from "./components/KpiCard/KpiCard"
import KpiDetailDrawer from "./components/KpiDetailDrawer/KpiDetailDrawer"
import TransformationSignalTable from "./components/TransformationSignalTable/TransformationSignalTable"
import {
  overviewKpis,
  reportingStatusMetrics,
  transformationSignals,
  type OverviewKpi,
} from "./overview.mock"
import PageHeader from "../components/PageHeader"
import ReportingStatusGrid from "./components/ReportingStatusGrid/ReportingStatusGrid"
import styles from "./page.module.css"

export default function HomePage() {
  const [activeKpi, setActiveKpi] = useState<OverviewKpi | null>(null)
  const router = useRouter()

  const handleKpiClick = (kpi: OverviewKpi) => {
    if (kpi.drawer) {
      setActiveKpi(kpi)
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
              onClick={kpi.drawer || kpi.href ? () => handleKpiClick(kpi) : undefined}
            />
          ))}
        </section>
        <TransformationSignalTable signals={transformationSignals} />
      </Stack>
      <KpiDetailDrawer
        kpi={activeKpi}
        open={Boolean(activeKpi)}
        onClose={() => setActiveKpi(null)}
      />
    </>
  )
}
