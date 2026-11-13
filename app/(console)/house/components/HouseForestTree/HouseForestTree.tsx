import StatusChip from "@app/components/StatusChip/StatusChip"
import TextButton from "@app/components/TextButton/TextButton"
import type { ForestTrunk } from "@(control)/components/ForestView/forestViewData"
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

export {
  buildForestView,
  type ForestBranch,
  type ForestLeaf,
  type ForestTrunk,
  type ForestTrunkBlueprint,
  type ForestViewData,
} from "@(control)/components/ForestView/forestViewData"

type HouseForestTreeProps = {
  insightId: string
  insightLabel: string
  trunks: readonly ForestTrunk[]
}

type SelectedProject = {
  project: Project
  route: ProjectRoute
}

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
                        labels={[...(leaf.digitalLevel ? [leaf.digitalLevel] : []), ...(leaf.status ? [leaf.status] : [])]}
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
