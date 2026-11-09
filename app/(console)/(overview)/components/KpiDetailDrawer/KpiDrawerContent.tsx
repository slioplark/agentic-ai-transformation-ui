import {
  benefitScenarios,
  benefitSummary,
  businessUnitMaturity,
  maturityDistribution,
  type MaturityDistribution,
  type OverviewKpi,
} from "@(control)/(overview)/overview.mock"
import InfoNote from "@app/components/InfoNote/InfoNote"
import CloseIcon from "@mui/icons-material/Close"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import styles from "./KpiDetailDrawer.module.css"

type KpiDrawerContentProps = {
  kpi: OverviewKpi
  onClose: () => void
  titleId: string
}

const maturityLevels = [
  { key: "r1", label: "R1 Connected", className: styles.r1 },
  { key: "r2", label: "R2 Optimized", className: styles.r2 },
  { key: "r3", label: "R3 Transparent", className: styles.r3 },
  { key: "r4", label: "R4 Proactive", className: styles.r4 },
  { key: "r5", label: "R5 Agile", className: styles.r5 },
] as const

type MaturityCounts = Pick<MaturityDistribution, "r1" | "r2" | "r3" | "r4" | "r5">

function maturityTotal(row: MaturityCounts) {
  return row.r1 + row.r2 + row.r3 + row.r4 + row.r5
}

function maturityShare(row: MaturityDistribution) {
  return ((row.r3 + row.r4 + row.r5) / maturityTotal(row)) * 100
}

function DrawerHeader({
  eyebrow,
  onClose,
  title,
  titleId,
}: {
  eyebrow: string
  onClose: () => void
  title: string
  titleId: string
}) {
  return (
    <Stack
      alignItems="flex-start"
      direction="row"
      justifyContent="space-between"
      gap={2}
      useFlexGap
    >
      <Stack
        gap={0.5}
        alignItems="flex-start"
        useFlexGap
      >
        <Typography
          color="secondary.main"
          variant="caption"
        >
          {eyebrow}
        </Typography>
        <Typography
          id={titleId}
          variant="h4"
        >
          {title}
        </Typography>
      </Stack>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  )
}

function MaturityDrawerContent({ onClose, titleId }: { onClose: () => void; titleId: string }) {
  return (
    <>
      <DrawerHeader
        eyebrow="FOREST VIEW / R-LADDER"
        onClose={onClose}
        title="能力成熟度分布"
        titleId={titleId}
      />
      <Paper
        component="section"
        variant="outlined"
        className={styles.panel}
      >
        <Stack
          gap={0.5}
          useFlexGap
        >
          {maturityDistribution.map((row) => (
            <Box
              className={`${styles.ladderRow} ${row.kind === "target" ? styles.targetRow : ""}`}
              key={row.period}
            >
              <Typography variant="body2">{row.period}</Typography>
              <Box className={styles.ladderBar}>
                {maturityLevels.map(({ className, key }) => {
                  const value = row[key]
                  return value ? (
                    <Box
                      className={className}
                      key={key}
                      sx={{ flex: value }}
                    >
                      {value}
                    </Box>
                  ) : null
                })}
              </Box>
              <Typography
                align="right"
                variant="body2"
              >
                {maturityTotal(row)}
              </Typography>
            </Box>
          ))}
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={0.5}
            useFlexGap
          >
            {maturityLevels.map(({ className, label }) => (
              <Box
                className={styles.legendItem}
                key={label}
              >
                <Box className={`${styles.swatch} ${className}`} />
                <Typography variant="caption">{label}</Typography>
              </Box>
            ))}
            <Typography
              color="text.secondary"
              variant="caption"
            >
              淡色列 = 2027 目標
            </Typography>
          </Stack>
        </Stack>
      </Paper>
      <Paper
        className={styles.tablePanel}
        variant="outlined"
      >
        <TableContainer>
          <Table
            aria-describedby="maturity-table-note"
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell>期間</TableCell>
                {maturityLevels.map(({ label }) => (
                  <TableCell
                    align="center"
                    key={label}
                  >
                    {label}
                  </TableCell>
                ))}
                <TableCell align="center">R3+ 占比</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {maturityDistribution.map((row) => (
                <TableRow key={row.period}>
                  <TableCell>{row.period}</TableCell>
                  {maturityLevels.map(({ key }) => (
                    <TableCell
                      align="center"
                      key={key}
                    >
                      {row[key]}
                    </TableCell>
                  ))}
                  <TableCell align="center">{maturityShare(row).toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          color="text.secondary"
          variant="caption"
        >
          歷史與目標供趨勢比較。
        </Typography>
      </Paper>
      <Paper
        className={styles.tablePanel}
        variant="outlined"
      >
        <Typography variant="h4">各 BU 分布（2026-Q4）</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>BU</TableCell>
                {maturityLevels.map(({ key }) => (
                  <TableCell
                    align="center"
                    key={key}
                  >
                    {key.toUpperCase()}
                  </TableCell>
                ))}
                <TableCell align="center">合計</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {businessUnitMaturity.map((unit) => (
                <TableRow key={unit.name}>
                  <TableCell>{unit.name}</TableCell>
                  {maturityLevels.map(({ key }) => (
                    <TableCell
                      align="center"
                      key={key}
                    >
                      {unit[key]}
                    </TableCell>
                  ))}
                  <TableCell align="center">{maturityTotal(unit)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}

function BenefitsDrawerContent({ onClose, titleId }: { onClose: () => void; titleId: string }) {
  return (
    <>
      <DrawerHeader
        eyebrow="WORK SMARTER / DEMO"
        onClose={onClose}
        title="產能釋放與再投入"
        titleId={titleId}
      />
      <Typography
        color="text.secondary"
        variant="body2"
      >
        釋放的工時要說得出去向，否則會被解讀為可裁減的人力。以下均為示範數值。
      </Typography>
      <Box
        component="section"
        className={styles.summaryGrid}
      >
        <Paper
          component="section"
          variant="outlined"
          className={styles.summarySection}
        >
          <Typography
            id="benefit-verified-label"
            color="text.secondary"
            variant="h4"
          >
            已驗證釋放 / 再投入（每月）
          </Typography>
          <Typography variant="h6">
            {benefitSummary.freedHours} h / {benefitSummary.redeployedHours} h · {benefitSummary.redeploymentRate}
          </Typography>
        </Paper>
        <Paper
          component="section"
          variant="outlined"
          className={styles.summarySection}
        >
          <Typography
            id="benefit-growth-label"
            color="text.secondary"
            variant="h4"
          >
            不增人力承接業務成長
          </Typography>
          <Typography variant="h6">{benefitSummary.growthFte}</Typography>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            成本避免；財務已認列 {benefitSummary.recognizedSavings}
          </Typography>
        </Paper>
      </Box>
      <Paper
        className={styles.tablePanel}
        variant="outlined"
      >
        <TableContainer>
          <Table
            aria-describedby="benefits-table-note"
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell>場景</TableCell>
                <TableCell align="center">釋放 h/月</TableCell>
                <TableCell align="center">再投入 h/月</TableCell>
                <TableCell>再投入去向</TableCell>
                <TableCell>驗證 owner</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {benefitScenarios.map((scenario) => (
                <TableRow key={scenario.name}>
                  <TableCell>{scenario.name}</TableCell>
                  <TableCell align="center">{scenario.freedHours}</TableCell>
                  <TableCell align="center">{scenario.redeployedHours}</TableCell>
                  <TableCell>{scenario.redeployedTo}</TableCell>
                  <TableCell>{scenario.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          color="text.secondary"
          variant="caption"
        >
          計算口徑：相同業務量 × 單次作業時間減少 − 新增人工覆核時間；再投入須有具名工作與 BU 主管確認。
        </Typography>
      </Paper>
      <InfoNote>
        <Typography variant="body2">
          建議向 CFO 呈現：釋放的產能承接了多少業務成長、避免了多少新增人力，而非可減少多少人。
        </Typography>
      </InfoNote>
    </>
  )
}

export default function KpiDrawerContent({ kpi, onClose, titleId }: KpiDrawerContentProps) {
  return (
    <>
      {kpi.drawer === "maturity" ? (
        <MaturityDrawerContent
          onClose={onClose}
          titleId={titleId}
        />
      ) : null}
      {kpi.drawer === "benefits" ? (
        <BenefitsDrawerContent
          onClose={onClose}
          titleId={titleId}
        />
      ) : null}
    </>
  )
}
