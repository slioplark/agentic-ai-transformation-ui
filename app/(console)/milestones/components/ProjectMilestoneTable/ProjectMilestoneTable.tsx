import type { Project } from "@(control)/(overview)/components/UpcomingMilestones/milestones"
import { areas } from "@(control)/milestones/components/MilestoneFilterBar/MilestoneFilterBar"
import ProjectMilestoneRow from "@(control)/milestones/components/ProjectMilestoneRow/ProjectMilestoneRow"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { alpha } from "@mui/material/styles"
import styles from "./ProjectMilestoneTable.module.css"

type ProjectMilestoneTableProps = {
  onSelect: (project: Project) => void
  projects: readonly Project[]
}

export default function ProjectMilestoneTable({ onSelect, projects }: ProjectMilestoneTableProps) {
  const groups = new Map<string, Project[]>(areas.slice(1).map((area) => [area, []]))
  for (const project of projects) {
    const group = groups.get(project.area) ?? []
    group.push(project)
    groups.set(project.area, group)
  }

  return (
    <Paper
      variant="outlined"
      className={styles.panel}
    >
      <TableContainer>
        <Table
          size="small"
          className={styles.table}
        >
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
          {Array.from(groups, ([area, group]) =>
            group.length > 0 ? (
              <TableBody key={area}>
                <TableRow>
                  <TableCell
                    sx={{
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main",
                      fontWeight: "fontWeightBold",
                    }}
                    colSpan={7}
                    component="th"
                    scope="rowgroup"
                  >
                    {area} · {group.length} 項
                  </TableCell>
                </TableRow>
                {group.map((project) => (
                  <ProjectMilestoneRow
                    key={project.id}
                    project={project}
                    onSelect={onSelect}
                  />
                ))}
              </TableBody>
            ) : null,
          )}
        </Table>
      </TableContainer>
      {projects.length === 0 ? (
        <Typography
          color="text.secondary"
          variant="body2"
          className={styles.empty}
        >
          沒有符合條件的專案；請調整搜尋或篩選。
        </Typography>
      ) : null}
    </Paper>
  )
}
