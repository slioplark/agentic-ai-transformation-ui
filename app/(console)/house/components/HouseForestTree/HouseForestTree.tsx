import StatusChip from "@app/components/StatusChip/StatusChip"
import TextButton from "@app/components/TextButton/TextButton"
import type { Project } from "@lib/api/projects"
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf"
import ParkIcon from "@mui/icons-material/Park"
import Polyline from "@mui/icons-material/Polyline"
import Box from "@mui/material/Box"
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView"
import { TreeItem } from "@mui/x-tree-view/TreeItem"
import type { ElementType } from "react"
import { useState } from "react"
import HouseProjectFormDialog, { type ProjectRoute } from "../HouseProjectFormDialog/HouseProjectFormDialog"

export type ForestTrunkBlueprint = {
  title: string
  branches: readonly string[]
}

type ForestLeaf = {
  id: string
  name: string
  digitalLevel: string
  status: string | null
  project: Project
  route: ProjectRoute
}

type ForestBranch = {
  title: string
  leaves: ForestLeaf[]
}

export type ForestTrunk = {
  title: string
  leafCount: number
  branches: ForestBranch[]
}

export type ForestViewData = {
  trunks: ForestTrunk[]
  ranks: [number, number, number, number, number]
}

type HouseForestTreeProps = {
  insightId: string
  insightLabel: string
  trunks: readonly ForestTrunk[]
}

type SelectedProject = {
  project: Project
  route: ProjectRoute
}

const archivedValues = new Set(["1", "true", "yes", "y"])

function HouseForestTreeLabel({
  icon: Icon,
  count,
  title,
  labels = [],
  onTitleClick,
}: {
  icon: ElementType
  count?: number
  title: string
  labels?: readonly string[]
  onTitleClick?: () => void
}) {
  return (
    <Box
      sx={{ alignItems: "center", display: "flex", gap: 1, minWidth: 0, width: "100%" }}
      component="span"
    >
      <Icon sx={{ color: "success.main" }} />
      {onTitleClick ? (
        <TextButton
          sx={{
            display: "block",
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
            textAlign: "left",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          onClick={(event) => {
            event.stopPropagation()
            onTitleClick()
          }}
        >
          {title}
        </TextButton>
      ) : (
        <Box
          sx={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          component="span"
        >
          {title}
        </Box>
      )}
      {labels.map((label) => {
        return (
          <StatusChip
            sx={{ flexShrink: 0 }}
            key={label}
            color="info"
            label={label}
            variant="outlined"
          />
        )
      })}
      {count !== undefined && count > 0 ? (
        <StatusChip
          sx={{ flexShrink: 0, ml: "auto" }}
          label={String(count)}
          status="success"
        />
      ) : null}
    </Box>
  )
}

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
  const match = normalized.match(/^R?([1-5])$/)
  return match ? Number(match[1]) : null
}

export function buildForestView(
  blueprint: readonly ForestTrunkBlueprint[],
  projects: readonly Project[],
): ForestViewData {
  const trunks: ForestTrunk[] = blueprint.map((trunk) => ({
    title: trunk.title,
    leafCount: 0,
    branches: trunk.branches.map((branch) => ({ title: branch, leaves: [] })),
  }))
  const branchesByTrunk = new Map(
    trunks.map((trunk) => [trunk.title, new Map(trunk.branches.map((branch) => [branch.title, branch]))]),
  )
  const trunksByTitle = new Map(trunks.map((trunk) => [trunk.title, trunk]))
  const ranks: ForestViewData["ranks"] = [0, 0, 0, 0, 0]

  for (const project of projects) {
    if (isArchived(project.ARCHIVED)) continue

    const rank = getDigitalRank(project.CURRENT_DIGITAL_LEVEL)
    if (rank === null) continue

    const trunk = trunksByTitle.get(project.CATEGORY)
    const branch = branchesByTrunk.get(project.CATEGORY)?.get(project.ITEM)
    if (!trunk || !branch) continue

    branch.leaves.push({
      id: String(project.ID),
      name: project.TITLE,
      digitalLevel: `R${rank}`,
      status: project.CURRENT_STATUS,
      project,
      route: { category: trunk.title, item: branch.title },
    })
    trunk.leafCount += 1
    ranks[rank - 1] += 1
  }

  return { trunks, ranks }
}

export default function HouseForestTree({ insightId, insightLabel, trunks }: HouseForestTreeProps) {
  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null)

  return (
    <>
      <SimpleTreeView
        sx={{
          margin: "0 -8px",
          "& .MuiTreeItem-label": { flex: 1, minWidth: 0, py: 0.5 },
        }}
      >
        {trunks.map((trunk) => (
          <TreeItem
            key={trunk.title}
            label={
              <HouseForestTreeLabel
                icon={ParkIcon}
                count={trunk.leafCount}
                title={trunk.title}
              />
            }
            itemId={`${insightId}-${trunk.title}`}
          >
            {trunk.branches.map((branch) => (
              <TreeItem
                disabled={branch.leaves.length === 0}
                key={branch.title}
                label={
                  <HouseForestTreeLabel
                    icon={Polyline}
                    count={branch.leaves.length}
                    title={branch.title}
                  />
                }
                itemId={`${insightId}-${trunk.title}-${branch.title}`}
              >
                {branch.leaves.map((leaf) => (
                  <TreeItem
                    key={leaf.id}
                    label={
                      <HouseForestTreeLabel
                        icon={EnergySavingsLeafIcon}
                        title={leaf.name}
                        labels={[leaf.digitalLevel, ...(leaf.status ? [leaf.status] : [])]}
                        onTitleClick={() => setSelectedProject({ project: leaf.project, route: leaf.route })}
                      />
                    }
                    itemId={`${insightId}-${trunk.title}-${branch.title}-${leaf.id}`}
                  />
                ))}
              </TreeItem>
            ))}
          </TreeItem>
        ))}
      </SimpleTreeView>
      {selectedProject ? (
        <HouseProjectFormDialog
          key={selectedProject.project.ID}
          route={selectedProject.route}
          project={selectedProject.project}
          onClose={() => setSelectedProject(null)}
          insightLabel={insightLabel}
        />
      ) : null}
    </>
  )
}
