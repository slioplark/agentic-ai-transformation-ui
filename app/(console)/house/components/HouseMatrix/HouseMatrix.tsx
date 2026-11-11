"use client"

import { projects, type Project } from "@(control)/(overview)/components/UpcomingMilestones/milestones"
import ProjectDrawerContent from "@(control)/(overview)/components/UpcomingMilestones/ProjectDrawerContent"
import HouseDomainHubs from "@(control)/house/components/HouseDomainHubs/HouseDomainHubs"
import HouseInsight, { type InsightRanks } from "@(control)/house/components/HouseInsight/HouseInsight"
import forestViewBlueprint from "@(control)/house/foreset-view.mock.json"
import { domainHubs, insights, type DomainHub, type Insight } from "@(control)/house/house.mock"
import DetailDrawer from "@app/components/DetailDrawer/DetailDrawer"
import { useProjects } from "@lib/hooks/use-projects"
import { useMemo, useState } from "react"
import { buildForestView, type ForestTrunkBlueprint } from "./ForestViewTree"
import InsightDrawerContent from "./InsightDrawerContent"

type Detail = { type: "insight"; insight: Insight; domainHub: DomainHub } | { type: "project"; project: Project }
const forestBlueprint: Record<string, ForestTrunkBlueprint[]> = forestViewBlueprint

export default function HouseMatrix() {
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState<Detail | null>(null)

  const { data, error, isLoading } = useProjects()
  const ranksByInsight = useMemo(() => {
    const ranks = new Map<string, InsightRanks>()
    if (!data) return ranks

    for (const insight of insights) {
      ranks.set(insight.id, buildForestView(forestBlueprint[insight.id] ?? [], data).ranks)
    }

    return ranks
  }, [data])

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

  return (
    <>
      <HouseInsight
        insights={insights}
        onSelect={selectInsight}
        rankStatus={isLoading ? "loading" : error ? "unavailable" : undefined}
        ranksByInsight={ranksByInsight}
      />
      <HouseDomainHubs
        domainHubs={domainHubs}
        onSelect={selectInsight}
        onProject={(id) => {
          const project = projects.find((item) => item.id === id)
          if (project) selectProject(project)
        }}
      />
      <DetailDrawer
        open={open}
        onClose={close}
      >
        {detail?.type === "insight" ? (
          <InsightDrawerContent
            insight={detail.insight}
            domainHub={detail.domainHub}
            onClose={close}
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
    </>
  )
}
