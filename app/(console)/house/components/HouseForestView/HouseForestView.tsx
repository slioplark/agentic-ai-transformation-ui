import foresetView from "@(control)/house/foreset-view.mock.json"
import type { Insight } from "@(control)/house/house.mock"
import PaperCard from "@app/components/PaperCard/PaperCard"
import RankDistributionBar from "@app/components/RankDistributionBar/RankDistributionBar"
import { useProjects } from "@lib/hooks/use-projects"
import { Box, Stack } from "@mui/material"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"
import { useMemo } from "react"
import HouseForestTree, { buildForestView, type ForestTrunkBlueprint } from "../HouseForestTree/HouseForestTree"

const forestBlueprint = foresetView as Record<string, ForestTrunkBlueprint[]>
const forestTargetRankCounts = {
  2027: [
    { rank: "R1", count: 4 },
    { rank: "R2", count: 8 },
    { rank: "R3", count: 12 },
    { rank: "R4", count: 16 },
    { rank: "R5", count: 10 },
  ],
  2028: [
    { rank: "R1", count: 2 },
    { rank: "R2", count: 6 },
    { rank: "R3", count: 14 },
    { rank: "R4", count: 18 },
    { rank: "R5", count: 14 },
  ],
}
const forestTargetRankDistributions = Object.entries(forestTargetRankCounts).map(([year, rankCounts]) => ({
  year,
  ranks: Object.fromEntries(rankCounts.map(({ rank, count }) => [rank, count])),
}))

export default function HouseForestView({ insight }: { insight: Insight }) {
  const { data, error, isLoading } = useProjects()
  const forestView = useMemo(() => buildForestView(forestBlueprint[insight.id] ?? [], data ?? []), [data, insight.id])
  const forestRanks = data ? forestView.ranks : undefined
  const forestRankCounts = Object.fromEntries(forestRanks?.map((rank, index) => [`R${index + 1}`, rank]) ?? [])

  return (
    <PaperCard>
      <Typography variant="h5">Forest View</Typography>
      <Box>
        {isLoading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : !error && forestRanks ? (
          <Stack gap={1}>
            <RankDistributionBar ranks={forestRankCounts} />
            {forestTargetRankDistributions.map(({ year, ranks }) => (
              <RankDistributionBar
                key={year}
                ranks={ranks}
              />
            ))}
          </Stack>
        ) : null}
        <HouseForestTree
          id={insight.id}
          label={`${insight.name} ${insight.chineseName}`}
          trunks={forestView.trunks}
        />
      </Box>
    </PaperCard>
  )
}
