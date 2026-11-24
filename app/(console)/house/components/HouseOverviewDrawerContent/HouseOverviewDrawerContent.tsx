import { assets, coverage } from "@(control)/house/components/HouseDomainHubs/house-domain-hubs-data"
import type { DomainHub, Insight } from "@(control)/house/house.mock"
import DrawerHeaderActions, { type DrawerNavigation } from "@app/components/Drawer/DrawerHeaderActions"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import HouseForestView from "../HouseForestView/HouseForestView"
import HouseTopTasks from "../HouseTopTasks/HouseTopTasks"

export default function HouseOverviewDrawerContent({
  insight,
  domainHub,
  onProject,
  navigation,
}: {
  insight: Insight
  domainHub: DomainHub
  onProject: (projectId: string) => void
  navigation: DrawerNavigation
}) {
  const weakest = assets
    .map((asset) => {
      const [available, needed] = coverage(domainHub, asset.key)
      return { ...asset, ratio: needed ? available / needed : 0 }
    })
    .reduce((lowest, current) => (current.ratio < lowest.ratio ? current : lowest))

  return (
    <>
      <Stack
        gap={2}
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Stack gap={0.5}>
          <Typography
            color="secondary.main"
            variant="caption"
          >
            INSIGHT / {insight.name.toUpperCase()}
          </Typography>
          <Typography variant="h4">
            {insight.name} {insight.chineseName}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Insight 與其 Domain Hub 連接
          </Typography>
          <Typography variant="body2">
            Hub 就緒度（最弱環節）：
            <strong>
              {Math.round(weakest.ratio * 100)}% · {weakest.name}
            </strong>
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            待遷移 R4 方案 {domainHub.migrate} 項
          </Typography>
        </Stack>
        <DrawerHeaderActions {...navigation} />
      </Stack>
      <HouseForestView insight={insight} />
      <HouseTopTasks
        insight={insight}
        onProject={onProject}
      />
    </>
  )
}
