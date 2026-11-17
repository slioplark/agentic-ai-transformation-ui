import type { Project } from "@lib/api/projects"

export type ForestTrunkBlueprint = {
  title: string
  dept?: string
  branches: readonly ForestBranchBlueprint[]
  interviewStatus?: string
}

export type ForestBranchMaturityStatus = string
export type ForestInterviewStatus = "pending" | "ongoing" | "completed"

export type ForestBranchBlueprint = {
  title: string
  maturityStatus?: ForestBranchMaturityStatus
}

export type ForestProjectRoute = {
  category: string
  item: string
}

export type ForestLeaf = {
  id: string
  name: string
  digitalLevel: string | null
  status: string | null
  project: Project
  route: ForestProjectRoute
}

export type ForestBranch = {
  title: string
  maturityStatus?: ForestBranchMaturityStatus
  leaves: ForestLeaf[]
}

export type ForestTrunk = {
  dept?: string
  title: string
  branches: ForestBranch[]
  leafCount: number
  interviewStatus: ForestInterviewStatus
}

export type ForestViewData = {
  trunks: ForestTrunk[]
  ranks: [number, number, number, number, number]
}

type BuildForestViewOptions = {
  includeUnranked?: boolean
}

const archivedValues = new Set(["1", "true", "yes", "y"])
const digitalRankPattern = /^R?([1-5])$/

function isArchived(value: Project["ARCHIVED"]) {
  return archivedValues.has(
    String(value ?? "")
      .trim()
      .toLowerCase(),
  )
}

function getDigitalRank(value: Project["CURRENT_DIGITAL_LEVEL"]) {
  const normalized = String(value ?? "")
    .trim()
    .toUpperCase()
  const match = normalized.match(digitalRankPattern)
  return match ? Number(match[1]) : null
}

export function buildForestView(
  blueprint: readonly ForestTrunkBlueprint[],
  projects: readonly Project[],
  { includeUnranked = false }: BuildForestViewOptions = {},
): ForestViewData {
  const trunks: ForestTrunk[] = blueprint.map((trunk) => ({
    dept: trunk.dept,
    title: trunk.title,
    branches: trunk.branches.map((branch) => ({
      title: branch.title,
      maturityStatus: branch.maturityStatus,
      leaves: [],
    })),
    leafCount: 0,
    interviewStatus: (trunk.interviewStatus ?? "pending") as ForestInterviewStatus,
  }))
  const branchesByTrunk = new Map(
    trunks.map((trunk) => [trunk.title, new Map(trunk.branches.map((branch) => [branch.title, branch]))]),
  )
  const trunksByTitle = new Map(trunks.map((trunk) => [trunk.title, trunk]))
  const ranks: ForestViewData["ranks"] = [0, 0, 0, 0, 0]

  for (const project of projects) {
    if (isArchived(project.ARCHIVED)) continue

    const rank = getDigitalRank(project.CURRENT_DIGITAL_LEVEL)
    if (rank === null && !includeUnranked) continue

    const trunk = trunksByTitle.get(project.CATEGORY)
    const branch = branchesByTrunk.get(project.CATEGORY)?.get(project.ITEM)
    if (!trunk || !branch) continue

    branch.leaves.push({
      id: String(project.ID),
      name: project.TITLE,
      digitalLevel: rank === null ? null : `R${rank}`,
      status: project.CURRENT_STATUS,
      project,
      route: { category: trunk.title, item: branch.title },
    })
    trunk.leafCount += 1
    if (rank !== null) ranks[rank - 1] += 1
  }

  return { trunks, ranks }
}
