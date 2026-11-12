"use client"

import PageHeader from "@(control)/components/PageHeader"
import HouseDomainHubs from "@(control)/house/components/HouseDomainHubs/HouseDomainHubs"
import HouseInsight, { type InsightRanks } from "@(control)/house/components/HouseInsight/HouseInsight"
import forestViewBlueprint from "@(control)/house/foreset-view.mock.json"
import { domainHubs, insights } from "@(control)/house/house.mock"
import { useProjects } from "@lib/hooks/use-projects"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useMemo } from "react"
import HouseAiInfra from "./components/HouseAiInfra/HouseAiInfra"
import { buildForestView, type ForestTrunkBlueprint } from "./components/HouseForestTree/HouseForestTree"
import HousePillar from "./components/HousePillar/HousePillar"
import styles from "./page.module.css"

const forestBlueprint: Record<string, ForestTrunkBlueprint[]> = forestViewBlueprint

export default function HousePage() {
  const { data, error, isLoading } = useProjects()
  const ranksByInsight = useMemo(() => {
    const ranks = new Map<string, InsightRanks>()
    if (!data) return ranks

    for (const insight of insights) {
      ranks.set(insight.id, buildForestView(forestBlueprint[insight.id] ?? [], data).ranks)
    }

    return ranks
  }, [data])

  return (
    <Stack
      useFlexGap
      spacing={2}
    >
      <PageHeader>房子進度圖</PageHeader>
      <Box component="section">
        <Box
          className={styles.roof}
          sx={{
            bgcolor: "primary.main",
            color: "common.white",
          }}
        >
          <Typography variant="h3">UMC Agentic AI Transformation</Typography>
          <Typography variant="body2">洞察為本、AI 為擎，以數位員工實現</Typography>
          <Typography variant="body2">Learn Faster · Work Smarter · Execute Better</Typography>
        </Box>
        <Box className={styles.house}>
          <HousePillar kind="governance" />
          <Box
            className={styles.matrixScroll}
            tabIndex={0}
          >
            <Stack
              useFlexGap
              gap={0.5}
              className={styles.matrix}
            >
              <HouseInsight
                insights={insights}
                rankStatus={isLoading ? "loading" : error ? "unavailable" : undefined}
                ranksByInsight={ranksByInsight}
              />
              <HouseDomainHubs domainHubs={domainHubs} />
              <HouseAiInfra />
            </Stack>
          </Box>
          <HousePillar kind="citizen" />
        </Box>
      </Box>
    </Stack>
  )
}
