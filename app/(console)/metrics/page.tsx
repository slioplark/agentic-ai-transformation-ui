import PageHeader from "@(control)/components/PageHeader"
import StatusChip from "@app/components/StatusChip/StatusChip"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { domainMetrics, metricPrinciples, sourceRows } from "./metrics.data"

function PrincipleCard({ description, note, number, statusDetails, title }: (typeof metricPrinciples)[number]) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        p: 2,
      }}
      variant="outlined"
      component="article"
    >
      <Typography variant="h6">
        {number} · {title}
      </Typography>
      <Typography
        color="text.secondary"
        variant="body2"
      >
        {description}
      </Typography>
      {statusDetails ? (
        <Stack
          useFlexGap
          gap={0.5}
          flexWrap="wrap"
          direction="row"
        >
          {statusDetails.map(({ label, color }) => (
            <StatusChip
              key={label}
              label={label}
              color={color}
            />
          ))}
        </Stack>
      ) : null}
      {note ? (
        <Typography
          color="text.secondary"
          variant="caption"
        >
          {note}
        </Typography>
      ) : null}
    </Paper>
  )
}

export default function MetricsPage() {
  return (
    <Stack
      useFlexGap
      gap={2}
    >
      <PageHeader>指標與管理規則</PageHeader>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(2, minmax(0, 1fr))" },
          gap: 2,
        }}
        component="section"
      >
        {metricPrinciples.map((principle) => (
          <PrincipleCard
            key={principle.number}
            {...principle}
          />
        ))}
      </Box>
      <Paper
        sx={{ p: 2.5 }}
        variant="outlined"
        component="section"
      >
        <Stack
          useFlexGap
          spacing={1.5}
        >
          <Typography variant="h5">各區塊第二層指標</Typography>
          <TableContainer>
            <Table
              sx={{ minWidth: 760 }}
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell>區塊</TableCell>
                  <TableCell>建議指標</TableCell>
                  <TableCell>衡量原則</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {domainMetrics.map(([area, metric, principle]) => (
                  <TableRow key={area}>
                    <TableCell>{area}</TableCell>
                    <TableCell>{metric}</TableCell>
                    <TableCell>{principle}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Paper>
      <Paper
        sx={{ p: 2.5 }}
        variant="outlined"
        component="section"
      >
        <Stack
          useFlexGap
          spacing={1.5}
        >
          <Typography variant="h5">正式資料來源</Typography>
          <TableContainer>
            <Table
              sx={{ minWidth: 760 }}
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell>資料</TableCell>
                  <TableCell>來源</TableCell>
                  <TableCell>更新頻率</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sourceRows.map(([data, source, frequency]) => (
                  <TableRow key={data}>
                    <TableCell>{data}</TableCell>
                    <TableCell>{source}</TableCell>
                    <TableCell>{frequency}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Paper>
    </Stack>
  )
}
