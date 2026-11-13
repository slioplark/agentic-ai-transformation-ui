import { overviewSnapshot } from "@(control)/(overview)/overview.mock"
import data from "./milestones.mock.json"

export type Milestone = {
  name: string
  weight: number
  baseline: string
  forecast: string
  done: boolean
  accepted: string | null
  evidence: string
}

export type Project = {
  id: string
  area: string
  name: string
  project: string
  owner: string
  sponsor: string
  risk: number
  issue: string
  updated: string
  budget: number
  spent: number
  hours: number
  summary: string
  nextAction: string
  blocker: string
  unblockBy: string
  decisionRequest: string
  decisionDue: string
  decisionMaker: string
  reportedAt: string | null
  milestones: Milestone[]
  projectKpi: { name: string; unit: string; baseline: number; target: number; actual: number | null }
  deployment: { actual?: number; done?: number; plan?: number; base: string; fc: string } | null
}

export const projects: readonly Project[] = data.projects
export const dependencies: Record<string, string[]> = data.dependency
export const redeployTo: Record<string, string> = data.redeployTo
export const redeployHours: Record<string, number> = data.redeployHrs
export const snapshot = overviewSnapshot.asOf.replaceAll("/", "-")
const horizon = "2026-10-30"
export const upcoming = projects
  .flatMap((project) =>
    project.milestones
      .filter((gate) => !gate.done && gate.baseline >= snapshot && gate.baseline <= horizon)
      .map((gate) => ({ project, gate })),
  )
  .sort((a, b) => a.gate.baseline.localeCompare(b.gate.baseline))
export const formatDate = (date: string) => date.replaceAll("-", "/")
export const daysBetween = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000)
export const actualProgress = (project: Project) =>
  project.milestones.filter((gate) => gate.done).reduce((sum, gate) => sum + gate.weight, 0)
export const plannedProgress = (project: Project) =>
  project.milestones.filter((gate) => gate.baseline <= snapshot).reduce((sum, gate) => sum + gate.weight, 0)
export function projectStatus(project: Project) {
  const late = Math.max(
    0,
    project.deployment ? daysBetween(project.deployment.base, project.deployment.fc) : 0,
    ...project.milestones
      .filter((gate) => !gate.done)
      .map((gate) =>
        Math.max(
          daysBetween(gate.baseline, gate.forecast),
          gate.baseline < snapshot ? daysBetween(gate.baseline, snapshot) : 0,
        ),
      ),
  )
  return project.risk === 2 || late > 7 ? "error" : project.risk === 1 || late > 0 ? "warning" : "success"
}
export function downstreamProjects(id: string) {
  const found = new Set<string>()
  const queue = [id]
  while (queue.length) {
    const current = queue.shift()!
    for (const [child, parents] of Object.entries(dependencies)) {
      if (parents.includes(current) && child !== id && !found.has(child)) {
        found.add(child)
        queue.push(child)
      }
    }
  }
  return projects.filter((project) => found.has(project.id))
}
