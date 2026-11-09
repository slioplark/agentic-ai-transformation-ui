import StatusChip from "@app/components/StatusChip/StatusChip"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import type { TransformationSignal } from "../../overview.mock"
import styles from "./TransformationSignalTable.module.css"

type TransformationSignalTableProps = {
  signals: readonly TransformationSignal[]
}

const statusDetails = {
  alert: { status: "error", label: "警示" },
  attention: { status: "warning", label: "注意" },
} as const

export default function TransformationSignalTable({ signals }: TransformationSignalTableProps) {
  return (
    <Paper
      className={styles.panel}
      component="section"
      variant="outlined"
    >
      <Stack
        spacing={1.5}
        useFlexGap
      >
        <Stack
          alignItems={{ sm: "baseline" }}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={0.5}
          useFlexGap
        >
          <Typography
            component="h2"
            id="transformation-signal-title"
            variant="h4"
          >
            轉型真偽檢核 · Elephants in the room
          </Typography>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            這些訊號不改善，代表只是導入工具，並未改變工作方式
          </Typography>
        </Stack>

        <TableContainer>
          <Table
            size="small"
            className={styles.table}
          >
            <TableHead>
              <TableRow>
                <TableCell>訊號</TableCell>
                <TableCell>現況</TableCell>
                <TableCell>4 週前</TableCell>
                <TableCell>門檻</TableCell>
                <TableCell>燈號</TableCell>
                <TableCell>為何重要</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {signals.map((signal) => {
                const status = statusDetails[signal.status]

                return (
                  <TableRow key={signal.id}>
                    <TableCell>
                      <Typography
                        component="div"
                        fontWeight={700}
                        variant="body2"
                      >
                        {signal.label}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        variant="caption"
                      >
                        {signal.englishLabel}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        component="span"
                        variant="h6"
                      >
                        {signal.currentValue}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="success.main"
                        variant="caption"
                      >
                        {signal.change}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">{signal.threshold}</Typography>
                    </TableCell>
                    <TableCell>
                      <StatusChip
                        status={status.status}
                        label={status.label}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="text.secondary"
                        variant="caption"
                      >
                        {signal.rationale}
                      </Typography>
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
