"use client"

import {
  daysBetween,
  projectStatus,
  projects,
  snapshot,
  type Project,
} from "@(control)/(overview)/components/OverMilestones/milestones"
import PageHeader from "@(control)/components/PageHeader"
import DetailDrawer from "@app/components/DetailDrawer/DetailDrawer"
import ProjectDrawerContent from "@app/components/ProjectDrawerContent/ProjectDrawerContent"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useSearchParams } from "next/navigation"
import { Suspense, useMemo, useState } from "react"
import MilestoneFilterBar, {
  type AreaFilter,
  type StatusFilter,
} from "./components/MilestoneFilterBar/MilestoneFilterBar"
import ProjectMilestoneTable from "./components/ProjectMilestoneTable/ProjectMilestoneTable"

const areaFilters = new Set<AreaFilter>(["all", "Insight Solutions", "Domain Hubs", "AI Infrastructure", "Pillars"])
const snapshotHorizon = new Date(`${snapshot}T00:00:00`)
snapshotHorizon.setDate(snapshotHorizon.getDate() + 14)
const horizon = snapshotHorizon.toISOString().slice(0, 10)

const isStale = (project: Project) => daysBetween(project.updated, snapshot) > 7
const isUpcoming = (project: Project) =>
  project.milestones.some((gate) => !gate.done && gate.baseline >= snapshot && gate.baseline <= horizon)
const isOverdue = (project: Project) => project.milestones.some((gate) => !gate.done && gate.baseline < snapshot)

function MilestonesPageContent() {
  const searchParams = useSearchParams()
  const requestedArea = searchParams.get("area")
  const [area, setArea] = useState<AreaFilter>(
    areaFilters.has(requestedArea as AreaFilter) ? (requestedArea as AreaFilter) : "all",
  )
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<StatusFilter>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    return projects
      .filter((project) => {
        const matchesQuery =
          !normalizedQuery ||
          `${project.name} ${project.project} ${project.owner} ${project.issue}`
            .toLocaleLowerCase()
            .includes(normalizedQuery)
        const matchesArea = area === "all" || project.area === area
        const matchesStatus =
          status === "all" ||
          (status === "stale" && isStale(project)) ||
          (status === "upcoming" && isUpcoming(project)) ||
          (status === "overdue" && isOverdue(project)) ||
          projectStatus(project) === status
        return matchesQuery && matchesArea && matchesStatus
      })
      .sort((first, second) => {
        const rank = (project: Project) => {
          const statusRank = { error: 0, warning: 2, success: 3 }[projectStatus(project)]
          return isStale(project) ? Math.min(1, statusRank) : statusRank
        }
        return rank(first) - rank(second) || first.name.localeCompare(second.name, "zh-Hant")
      })
  }, [area, query, status])

  const closeDrawer = () => setSelectedProject(null)

  return (
    <>
      <Stack
        useFlexGap
        gap={2}
      >
        <PageHeader>專案與 D-gate</PageHeader>
        <MilestoneFilterBar
          area={area}
          query={query}
          status={status}
          totalCount={projects.length}
          resultCount={visibleProjects.length}
          onAreaChange={setArea}
          onQueryChange={setQuery}
          onStatusChange={setStatus}
        />
        <ProjectMilestoneTable
          onSelect={setSelectedProject}
          projects={visibleProjects}
        />
        <Typography
          color="text.secondary"
          variant="caption"
        >
          點選整列即可打開詳情。D1–D5
          同樣適用於自助與公民開發。原訂基準不隨預測變動；重新定基準需保留核准人、核准日期與變更原因。
        </Typography>
      </Stack>
      <DetailDrawer
        open={selectedProject !== null}
        onClose={closeDrawer}
      >
        {selectedProject ? (
          <ProjectDrawerContent
            project={selectedProject}
            onClose={closeDrawer}
            onSelect={setSelectedProject}
          />
        ) : null}
      </DetailDrawer>
    </>
  )
}

export default function MilestonesPage() {
  return (
    <Suspense
      fallback={
        <Stack>
          <PageHeader>專案與 D-gate</PageHeader>
        </Stack>
      }
    >
      <MilestonesPageContent />
    </Suspense>
  )
}
