import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import type { Project } from "../../../(overview)/components/UpcomingMilestones/milestones"
import ProjectMilestoneRow from "../ProjectMilestoneRow/ProjectMilestoneRow"
import styles from "./ProjectMilestoneTable.module.css"

type ProjectMilestoneTableProps = {
  onSelect: (project: Project) => void
  projects: readonly Project[]
}

export default function ProjectMilestoneTable({ onSelect, projects }: ProjectMilestoneTableProps) {
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
          <TableBody>
            {projects.map((project) => (
              <ProjectMilestoneRow
                key={project.id}
                project={project}
                onSelect={onSelect}
              />
            ))}
          </TableBody>
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
