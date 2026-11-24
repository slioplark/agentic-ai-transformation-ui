import type {
  ForestBranch,
  ForestInterviewStatus,
  ForestLeaf,
  ForestTrunk as ForestTrunkData,
} from "@(control)/components/ForestView/forestViewData"
import TextBadge from "@app/components/TextBadge/TextBadge"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { MouseEvent } from "react"
import styles from "../../page.module.css"
import BranchButton, { type BranchColor } from "../BranchButton/BranchButton"

type ForestBranchGroup = {
  unit?: string
  branches: ForestBranch[]
}

type ForestTrunkProps = {
  trunk: ForestTrunkData
  isDimmed: boolean
  selectedRank: string | null
  selectedInterviewStatus: ForestInterviewStatus | null
  isPendingHighlighted: boolean
  getBranchColor: (maturityStatus: string | undefined) => BranchColor | undefined
  onOpenBranch: (event: MouseEvent<HTMLButtonElement>, leaves: ForestLeaf[]) => void
}

function groupBranchesByUnit(branches: ForestBranch[]) {
  return branches.reduce<ForestBranchGroup[]>((groups, branch) => {
    const currentGroup = groups.at(-1)

    if (currentGroup && currentGroup.unit === branch.unit) {
      currentGroup.branches.push(branch)
      return groups
    }

    groups.push({ unit: branch.unit, branches: [branch] })
    return groups
  }, [])
}

export default function ForestTrunk({
  trunk,
  isDimmed,
  selectedRank,
  selectedInterviewStatus,
  isPendingHighlighted,
  getBranchColor,
  onOpenBranch,
}: ForestTrunkProps) {
  const renderBranch = (branch: ForestBranch) => {
    const isDimmed =
      (selectedRank !== null && branch.maturityStatus !== selectedRank) ||
      (selectedInterviewStatus !== null && branch.interviewStatus !== selectedInterviewStatus)

    return (
      <BranchButton
        key={branch.title}
        count={branch.leaves.length}
        title={branch.title}
        color={getBranchColor(branch.maturityStatus)}
        dimmed={isDimmed}
        variant={branch.interviewStatus}
        onClick={(event) => onOpenBranch(event, branch.leaves)}
        disabled={branch.leaves.length === 0}
      />
    )
  }

  const renderBranchGroup = (group: ForestBranchGroup, groupKey: string) => (
    <Stack
      key={groupKey}
      gap={0.5}
      sx={group.unit ? { p: 0.5, borderRadius: 1, backgroundColor: "action.hover" } : undefined}
    >
      {group.unit ? (
        <TextBadge
          label={group.unit}
          color="primary"
          variant="outlined"
        />
      ) : null}
      <Box className={styles.branches}>{group.branches.map(renderBranch)}</Box>
    </Stack>
  )

  return (
    <Box
      className={styles.block}
      sx={(theme) => ({
        opacity: isDimmed ? 0.28 : 1,
        transition: theme.transitions.create("opacity"),
      })}
    >
      {trunk.interviewStatus === "ongoing" ? (
        <Box
          sx={{ color: "success.main" }}
          component="svg"
          focusable="false"
          className={styles.progressBorder}
          aria-hidden="true"
        >
          <rect
            x="1"
            y="1"
            rx="7"
            fill="none"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            pathLength="100"
          />
        </Box>
      ) : null}
      {isPendingHighlighted ? (
        <Box
          className={styles.pendingInterviewBorder}
          sx={(theme) => ({
            border: `2px dashed ${theme.palette.primary.main}`,
            boxSizing: "border-box",
          })}
        />
      ) : null}
      <Stack
        sx={{ px: 0.5 }}
        flexWrap="wrap"
        direction="row"
        alignItems="center"
      >
        <Typography
          sx={{ mr: 0.5 }}
          variant="subtitle2"
        >
          {trunk.title}
        </Typography>
        {trunk.dept ? (
          <TextBadge
            label={trunk.dept}
            color="primary"
          />
        ) : null}
      </Stack>
      <Stack
        className={styles.branchArea}
        gap={0.5}
      >
        {groupBranchesByUnit(trunk.branches).map((group, groupIndex) =>
          renderBranchGroup(group, `${group.unit ?? "branches"}-${groupIndex}`),
        )}
      </Stack>
    </Box>
  )
}
