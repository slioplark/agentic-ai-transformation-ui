import StatusChip from "@app/components/StatusChip/StatusChip"
import TextButton from "@app/components/TextButton/TextButton"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import Link from "next/link"
import { daysBetween, formatDate, upcoming, type Project } from "./milestones"
import styles from "./OverMilestones.module.css"

export default function OverMilestones({ onSelect }: { onSelect: (project: Project) => void }) {
  return (
    <Paper
      component="section"
      variant="outlined"
      className={styles.panel}
    >
      <Stack
        gap={1.5}
        useFlexGap
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={0.5}
          useFlexGap
        >
          <Typography variant="h4">未來 14 天 · 需要守住的承諾</Typography>
          <TextButton
            component={Link}
            href="/milestones"
          >
            全部 {upcoming.length} 項 →
          </TextButton>
        </Stack>
        <TableContainer>
          <Table
            size="small"
            className={styles.table}
          >
            <TableHead>
              <TableRow>
                <TableCell>區塊 / D-gate</TableCell>
                <TableCell>原訂日期</TableCell>
                <TableCell>預測日期</TableCell>
                <TableCell>負責人</TableCell>
                <TableCell>影響</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcoming.slice(0, 6).map(({ project, gate }) => {
                const delay = daysBetween(gate.baseline, gate.forecast)
                return (
                  <TableRow
                    key={`${project.id}-${gate.name}`}
                    hover
                    tabIndex={0}
                    role="button"
                    onClick={() => onSelect(project)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        onSelect(project)
                      }
                    }}
                    sx={{
                      cursor: "pointer",
                      "&:focus-visible": {
                        outline: "2px solid",
                        outlineColor: "secondary.main",
                        outlineOffset: "-2px",
                      },
                    }}
                  >
                    <TableCell>
                      <Typography
                        component="div"
                        variant="body2"
                        fontWeight={700}
                      >
                        {project.name}
                      </Typography>
                      <Typography
                        component="div"
                        color="text.secondary"
                        variant="caption"
                      >
                        {gate.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDate(gate.baseline)}</TableCell>
                    <TableCell>{formatDate(gate.forecast)}</TableCell>
                    <TableCell>{project.owner}</TableCell>
                    <TableCell>
                      <StatusChip
                        color={delay > 0 ? "error" : "success"}
                        label={delay > 0 ? `延後 ${delay} 天` : "預測如期"}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Paper>
  )
}
