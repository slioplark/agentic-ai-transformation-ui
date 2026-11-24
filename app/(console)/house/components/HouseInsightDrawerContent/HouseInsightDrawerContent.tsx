import { projects } from "@(control)/data/projects.mock"
import HouseOverviewDrawerContent from "@(control)/house/components/HouseOverviewDrawerContent/HouseOverviewDrawerContent"
import type { DomainHub, Insight } from "@(control)/house/house.mock"
import MilestoneTableRow from "@(control)/milestones/components/MilestoneTableRow/MilestoneTableRow"
import type { DrawerNavigation } from "@app/components/Drawer/DrawerHeaderActions"
import PaperCard from "@app/components/PaperCard/PaperCard"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"

export default function HouseInsightDrawerContent({
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
  const project = projects.find((item) => item.id === (insight.id === "ops" ? "operations" : insight.id))

  return (
    <>
      <HouseOverviewDrawerContent
        insight={insight}
        domainHub={domainHub}
        onProject={onProject}
        navigation={navigation}
      />
      <PaperCard>
        <Stack gap={2}>
          <Typography variant="h5">專案與 D-gate</Typography>
          {project ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>區塊 / 執行專案</TableCell>
                    <TableCell>狀態</TableCell>
                    <TableCell>D-gate 實際 / 計畫</TableCell>
                    <TableCell>專案 KPI</TableCell>
                    <TableCell>單一執行 owner</TableCell>
                    <TableCell>下一個 D-gate · 原訂 → 預測</TableCell>
                    <TableCell>最近更新</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <MilestoneTableRow
                    project={project}
                    onOpen={(openedProject) => onProject(openedProject.id)}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography
              color="text.secondary"
              variant="body2"
            >
              沒有對應的專案資料。
            </Typography>
          )}
        </Stack>
      </PaperCard>
    </>
  )
}
