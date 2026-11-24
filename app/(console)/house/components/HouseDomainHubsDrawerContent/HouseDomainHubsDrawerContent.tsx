import { assets, coverage } from "@(control)/house/components/HouseDomainHubs/house-domain-hubs-data"
import HouseOverviewDrawerContent from "@(control)/house/components/HouseOverviewDrawerContent/HouseOverviewDrawerContent"
import type { DomainHub, DomainHubAsset, Insight } from "@(control)/house/house.mock"
import type { DrawerNavigation } from "@app/components/Drawer/DrawerHeaderActions"
import PaperCard from "@app/components/PaperCard/PaperCard"
import ThresholdProgress from "@app/components/ThresholdProgress/ThresholdProgress"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"

type CoverageColor = "success" | "warning" | "error"

function coverageColor(ratio: number): CoverageColor {
  return ratio >= 0.7 ? "success" : ratio >= 0.4 ? "warning" : "error"
}

function assetSummaries(hub: DomainHub, asset: DomainHubAsset) {
  switch (asset) {
    case "data":
      return [`可用 ${hub.data[0]} · 建置中 ${hub.data[1]} · 計畫 ${hub.data[2]}`]
    case "knowledge":
      return [
        `Skills ${hub.knowledge[0]} · Contexts ${hub.knowledge[1]} · URAG ${hub.knowledge[2]} · UGPT ${hub.knowledge[3]} · Harness ${hub.knowledge[4]}`,
      ]
    case "agents":
      return [`R4 ${hub.agents[0]} · R4.x ${hub.agents[1]} · R5 ${hub.agents[2]}`]
    case "process":
      return [`已註冊 ${hub.process} 項流程`]
    case "rules":
      return [
        `已核准 R4 ${hub.rulesApproved[0]} · R4.x ${hub.rulesApproved[1]} · R5 ${hub.rulesApproved[2]}`,
        `審查中 R4 ${hub.rulesReview[0]} · R4.x ${hub.rulesReview[1]} · R5 ${hub.rulesReview[2]}`,
      ]
  }
}

function CoverageProgress({ available, needed }: { available: number; needed: number }) {
  const ratio = needed ? available / needed : 0
  const color = coverageColor(ratio)

  return (
    <Stack
      gap={0.5}
      sx={{ minWidth: 128 }}
    >
      <Typography variant="body2">
        <Box component="strong">{available}</Box> / {needed} ·{" "}
        <Box
          sx={{ color: `${color}.main`, fontWeight: 700 }}
          component="span"
        >
          {Math.round(ratio * 100)}%
        </Box>
      </Typography>
      <ThresholdProgress
        color={color}
        value={ratio * 100}
      />
    </Stack>
  )
}

function DomainHubAssets({ domainHub }: { domainHub: DomainHub }) {
  const assetCoverages = assets.map((asset) => {
    const [available, needed] = coverage(domainHub, asset.key)
    return { asset, available, needed, ratio: needed ? available / needed : 0 }
  })
  const weakest = assetCoverages.reduce((lowest, current) => (current.ratio < lowest.ratio ? current : lowest))

  return (
    <PaperCard>
      <Stack gap={2}>
        <Typography variant="h5">Domain Hub 資產</Typography>
        <TableContainer>
          <Table
            size="small"
            sx={{ whiteSpace: "nowrap" }}
          >
            <TableHead>
              <TableRow>
                <TableCell>資產</TableCell>
                <TableCell>現況</TableCell>
                <TableCell>需求覆蓋</TableCell>
                <TableCell>Registry</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assetCoverages.map(({ asset, available, needed }) => (
                <TableRow key={asset.key}>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>
                    <Stack gap={0.25}>
                      {assetSummaries(domainHub, asset.key).map((summary) => (
                        <Typography
                          key={summary}
                          variant="body2"
                        >
                          {summary}
                        </Typography>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={
                        asset.key === weakest.asset.key
                          ? {
                              outline: "2px solid",
                              outlineColor: "error.main",
                              outlineOffset: "4px",
                              borderRadius: "2px",
                            }
                          : undefined
                      }
                    >
                      <CoverageProgress
                        needed={needed}
                        available={available}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="text.secondary"
                      variant="caption"
                    >
                      {asset.registry ? `${asset.registry} · 待設定` : "—"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          color="text.secondary"
          variant="caption"
        >
          紅框＝最弱環節。需求覆蓋分母由 BU 於 Forest View 規劃時核定；數字為示範。
        </Typography>
      </Stack>
    </PaperCard>
  )
}

export default function HouseDomainHubsDrawerContent({
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
  return (
    <>
      <HouseOverviewDrawerContent
        insight={insight}
        domainHub={domainHub}
        onProject={onProject}
        navigation={navigation}
      />
      <DomainHubAssets domainHub={domainHub} />
    </>
  )
}
