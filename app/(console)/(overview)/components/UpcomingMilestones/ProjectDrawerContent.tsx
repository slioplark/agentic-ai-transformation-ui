import StatusChip from "@app/components/StatusChip/StatusChip"
import TextButton from "@app/components/TextButton/TextButton"
import ThresholdProgress from "@app/components/ThresholdProgress/ThresholdProgress"
import CloseIcon from "@mui/icons-material/Close"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
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
import {
  actualProgress,
  daysBetween,
  dependencies,
  downstreamProjects,
  formatDate,
  plannedProgress,
  projects,
  projectStatus,
  redeployHours,
  redeployTo,
  snapshot,
  type Project,
} from "./milestones"
import styles from "./UpcomingMilestones.module.css"

const criteria = [
  "範疇、目標、owner 與原訂時程簽核",
  "必要介面、資料與權限確認，設計通過審查",
  "功能完成並通過整合測試",
  "核定測試集達標，業務 owner 確認 Rx 證據",
  "業務驗收、維運交接與責任確認",
]
const labels = {
  error: "延誤 / 阻塞",
  warning: "有風險",
  success: "依計畫",
} as const

export default function ProjectDrawerContent({
  project,
  onClose,
  onSelect,
}: {
  project: Project
  onClose: () => void
  onSelect: (project: Project) => void
}) {
  const next = project.milestones.find((gate) => !gate.done)
  const downstream = downstreamProjects(project.id)
  const upstream = (dependencies[project.id] || []).flatMap((id) => projects.filter((item) => item.id === id))
  const kpi = project.projectKpi
  const attainment =
    kpi.actual === null || kpi.target === kpi.baseline
      ? null
      : Math.round(Math.max(0, Math.min(1, (kpi.actual - kpi.baseline) / (kpi.target - kpi.baseline))) * 100)
  const status = projectStatus(project)
  return (
    <>
      <Stack
        useFlexGap
        gap={2}
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Stack
          useFlexGap
          gap={0.5}
          alignItems="flex-start"
        >
          <Typography
            color="secondary.main"
            variant="caption"
          >
            {project.area} / {project.id.toUpperCase()}
          </Typography>
          <Stack
            useFlexGap
            gap={0.5}
            flexWrap="wrap"
            direction="row"
            alignItems="center"
          >
            <Typography variant="h4">{project.name}</Typography>
            <StatusChip
              label={labels[status]}
              status={status}
            />
          </Stack>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {project.project}
          </Typography>
          {daysBetween(project.updated, snapshot) > 7 ? (
            <Chip
              size="small"
              label="資料待更新"
            />
          ) : null}
        </Stack>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Box className={styles.summary}>
        <Paper
          variant="outlined"
          className={styles.detail}
        >
          <Typography
            color="text.secondary"
            variant="caption"
          >
            單一執行 owner
          </Typography>
          <Typography variant="h6">{project.owner}</Typography>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            Sponsor：{project.sponsor}
          </Typography>
        </Paper>
        <Paper
          variant="outlined"
          className={styles.detail}
        >
          <Stack
            useFlexGap
            gap={0.5}
          >
            <Typography
              color="text.secondary"
              variant="caption"
            >
              D-gate 已驗收 / 截至當日計畫
            </Typography>
            <Typography variant="h6">
              {actualProgress(project)}% / {plannedProgress(project)}%
            </Typography>
            <ThresholdProgress
              color={status}
              value={actualProgress(project)}
              threshold={plannedProgress(project)}
            />
          </Stack>
        </Paper>
        <Paper
          variant="outlined"
          className={styles.detail}
        >
          <Typography
            color="text.secondary"
            variant="caption"
          >
            專案 KPI · {kpi.name}
          </Typography>
          <Typography variant="h6">{kpi.actual === null ? "尚未量測" : `${kpi.actual} ${kpi.unit}`}</Typography>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            基準 {kpi.baseline} → 目標 {kpi.target} {kpi.unit}
            {attainment === null ? "" : ` · 達成 ${attainment}%`}
          </Typography>
        </Paper>
        <Paper
          variant="outlined"
          className={styles.detail}
        >
          <Typography
            color="text.secondary"
            variant="caption"
          >
            下游影響
          </Typography>
          <Typography variant="h6">{downstream.length} 項工作依賴此項</Typography>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            {formatDate(project.updated)} 更新 · 預算 NT${project.budget}M / 支出 {project.spent}M
          </Typography>
        </Paper>
      </Box>
      <Paper
        variant="outlined"
        component="section"
        className={styles.detail}
      >
        <Stack
          useFlexGap
          gap={0.5}
        >
          <Stack
            useFlexGap
            gap={0.5}
            direction="row"
            alignItems="center"
          >
            <Typography variant="h4">負責人最新填報</Typography>
            <Chip
              size="small"
              label={project.reportedAt ? "已填報" : "尚未人工填報"}
            />
          </Stack>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            以下專案資料為示範，請負責人確認並更新。
          </Typography>
          <Typography variant="body2">{project.summary}</Typography>
          {project.nextAction ? <Typography variant="body2">下一步：{project.nextAction}</Typography> : null}
          {project.blocker ? (
            <Typography variant="body2">
              風險／阻塞：{project.blocker}
              {project.unblockBy ? ` · 預計解除 ${project.unblockBy}` : ""}
            </Typography>
          ) : null}
          {project.decisionRequest ? (
            <Typography variant="body2">
              待決策：{project.decisionRequest} · {project.decisionMaker} / {project.decisionDue}
            </Typography>
          ) : null}
        </Stack>
      </Paper>
      {project.deployment ? (
        <Paper
          variant="outlined"
          component="section"
          className={styles.detail}
        >
          <Stack
            useFlexGap
            gap={0.5}
          >
            <Typography variant="h4">部署進度</Typography>
            <ThresholdProgress
              color={status}
              value={project.deployment.actual ?? (project.deployment.done ?? 0) * 20}
            />
            <Typography
              color="text.secondary"
              variant="caption"
            >
              原訂 {formatDate(project.deployment.base)} · 預測 {formatDate(project.deployment.fc)}
            </Typography>
          </Stack>
        </Paper>
      ) : null}
      <Paper
        variant="outlined"
        component="section"
        className={styles.detail}
      >
        <Stack
          useFlexGap
          gap={0.5}
        >
          <Typography variant="h4">下一步與復原計畫</Typography>
          <Typography variant="body2">
            <strong>{project.issue}</strong>
          </Typography>
          <Typography variant="body2">
            {project.risk
              ? `解除責任：${project.owner}；先完成跨單位議題確認與驗證，再更新可承諾的交付日。`
              : "依原計畫完成下一關卡，由 owner 提交驗收證據。"}
          </Typography>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            {next
              ? `下一承諾：${next.name} · 原訂 ${formatDate(next.baseline)} / 預測 ${formatDate(next.forecast)}`
              : "已通過 D5；進入效益與採用追蹤。"}
          </Typography>
        </Stack>
      </Paper>
      <Paper
        variant="outlined"
        component="section"
        className={styles.detail}
      >
        <Stack
          useFlexGap
          gap={0.5}
        >
          <Typography variant="h4">D-gate · 排程基準與實際</Typography>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            權重總和 100% · 來源：示範資料；尚未串接 DTO tracking sheet
          </Typography>
          <TableContainer>
            <Table
              size="small"
              className={styles.table}
            >
              <TableHead>
                <TableRow>
                  <TableCell>關卡 / 驗收條件</TableCell>
                  <TableCell align="center">權重</TableCell>
                  <TableCell>原訂</TableCell>
                  <TableCell>預測 / 實際</TableCell>
                  <TableCell>證據</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {project.milestones.map((gate, index) => {
                  const delay = daysBetween(gate.baseline, gate.forecast)
                  return (
                    <TableRow key={gate.name}>
                      <TableCell>
                        <Typography variant="body2">{gate.name}</Typography>
                        <Typography
                          color="text.secondary"
                          variant="caption"
                        >
                          {criteria[index]}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{gate.weight}%</TableCell>
                      <TableCell>{formatDate(gate.baseline)}</TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(gate.done && gate.accepted ? gate.accepted : gate.forecast)}{" "}
                          {gate.done ? "實際" : "預測"}
                        </Typography>
                        <StatusChip
                          label={gate.done ? "已驗收" : delay > 0 ? `預測延後 ${delay} 天` : "未完成"}
                          status={gate.done ? "success" : delay > 0 ? "error" : "default"}
                        />
                      </TableCell>
                      <TableCell>{gate.evidence}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Paper>
      <Paper
        variant="outlined"
        component="section"
        className={styles.detail}
      >
        <Stack
          useFlexGap
          gap={0.5}
        >
          <Typography variant="h4">上游依賴</Typography>
          {upstream.length ? (
            upstream.map((item) => (
              <Stack
                useFlexGap
                key={item.id}
                gap={0.5}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body2">{item.name}</Typography>
                  <Typography
                    color="text.secondary"
                    variant="caption"
                  >
                    {item.issue}
                  </Typography>
                </Box>
                <TextButton onClick={() => onSelect(item)}>查看 →</TextButton>
              </Stack>
            ))
          ) : (
            <Typography
              color="text.secondary"
              variant="body2"
            >
              無已登錄的前置依賴。
            </Typography>
          )}
          {downstream.length ? (
            <Typography
              color="text.secondary"
              variant="caption"
            >
              下游：{downstream.map((item) => item.name).join("、")}
            </Typography>
          ) : null}
        </Stack>
      </Paper>
      {project.hours ? (
        <Paper
          variant="outlined"
          component="section"
          className={styles.detail}
        >
          <Typography variant="h4">產能釋放與再投入</Typography>
          <Typography variant="body2">
            每月釋放 {project.hours} h，再投入 {redeployHours[project.id]} h 至「{redeployTo[project.id]}」。
          </Typography>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            由流程 owner 驗證；未經財務認列，不視為現金收益。
          </Typography>
        </Paper>
      ) : null}
      <Typography
        color="text.secondary"
        variant="caption"
      >
        所有資料均為原型示例；沒有連接企業系統、實際驗收文件或簽核流程。
      </Typography>
    </>
  )
}
