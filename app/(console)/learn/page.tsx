"use client"

import DetailDrawer from "@app/components/DetailDrawer/DetailDrawer"
import StatusChip from "@app/components/StatusChip/StatusChip"
import TextButton from "@app/components/TextButton/TextButton"
import ThresholdProgress from "@app/components/ThresholdProgress/ThresholdProgress"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableFooter from "@mui/material/TableFooter"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import ProjectDrawerContent from "../(overview)/components/UpcomingMilestones/ProjectDrawerContent"
import { projects, type Project } from "../(overview)/components/UpcomingMilestones/milestones"
import PageHeader from "../components/PageHeader"
import styles from "./page.module.css"

const tools = ["Vibe coding", "Codex", "UGPT", "Skills", "Tableau", "AgilePoint"] as const

const funnel = [
  { label: "完成 L1 培訓", current: 1240, previous: 1100 },
  { label: "活躍開發者", current: 310, previous: 260 },
  { label: "已建置應用", current: 86, previous: 70 },
  { label: "通過 D-gate 與 AI 治理", current: 22, previous: 18 },
  { label: "已上線使用", current: 14, previous: 9 },
] as const

const issues = [
  {
    id: "CD-017",
    tool: "Vibe coding",
    issue: "個人開發工具無法通過資安掃描，無法上線",
    severity: "high",
    bu: "Customer",
    reportedAt: "2026-10-13",
    status: "待處理",
    owner: "資安主管",
    stage: 3,
  },
  {
    id: "CD-014",
    tool: "Codex",
    issue: "無法存取 MES 測試資料，開發卡在權限申請",
    severity: "high",
    bu: "Operations",
    reportedAt: "2026-10-09",
    status: "處理中",
    owner: "資料平台負責人",
    stage: 2,
  },
  {
    id: "CD-015",
    tool: "UGPT",
    issue: "URAG 回答引用過期文件，使用者不敢採用",
    severity: "high",
    bu: "TD",
    reportedAt: "2026-10-11",
    status: "處理中",
    owner: "AI 平台負責人",
    stage: 4,
  },
  {
    id: "CD-019",
    tool: "Skills",
    issue: "Skills 上架審核標準不明確",
    severity: "medium",
    bu: "TD",
    reportedAt: "2026-10-15",
    status: "處理中",
    owner: "AI 治理負責人",
    stage: 3,
  },
  {
    id: "CD-016",
    tool: "AgilePoint",
    issue: "表單上線需 IT 排程，平均等待 3 週",
    severity: "medium",
    bu: "Biz Support",
    reportedAt: "2026-10-12",
    status: "待處理",
    owner: "企業系統負責人",
    stage: 4,
  },
  {
    id: "CD-018",
    tool: "Tableau",
    issue: "授權數不足，L2 學員無法練習",
    severity: "medium",
    bu: "Planning",
    reportedAt: "2026-10-14",
    status: "待決策",
    owner: "數位人才負責人",
    stage: 1,
  },
  {
    id: "CD-020",
    tool: "Codex",
    issue: "內網 proxy 偶發逾時",
    severity: "low",
    bu: "全公司",
    reportedAt: "2026-10-16",
    status: "已解決",
    owner: "基礎設施負責人",
    stage: 2,
  },
] as const

const seedCoaches = [
  { bu: "Planning", values: [1, 0, 2, 1, 2, 0] },
  { bu: "Customer", values: [2, 1, 2, 1, 1, 1] },
  { bu: "TD", values: [3, 2, 3, 2, 1, 0] },
  { bu: "Operations", values: [2, 1, 2, 1, 2, 1] },
  { bu: "Biz Support", values: [2, 1, 3, 2, 1, 3] },
] as const

const trainings = [
  {
    date: "2026-10-21",
    topic: "Vibe coding 入門：從需求到可用工具",
    tool: "Vibe coding",
    level: "L1",
    audience: "全公司",
    booked: 38,
    capacity: 40,
  },
  {
    date: "2026-10-23",
    topic: "Codex 實作：報表與資料整理自動化",
    tool: "Codex",
    level: "L2",
    audience: "Biz Support · Customer",
    booked: 18,
    capacity: 20,
  },
  {
    date: "2026-10-28",
    topic: "UGPT 提問技巧與 URAG 知識查詢",
    tool: "UGPT",
    level: "L1",
    audience: "Operations",
    booked: 45,
    capacity: 60,
  },
  {
    date: "2026-10-30",
    topic: "Skills 撰寫、評測與上架流程",
    tool: "Skills",
    level: "L2",
    audience: "TD",
    booked: 12,
    capacity: 20,
  },
  {
    date: "2026-11-04",
    topic: "Tableau 自助分析：連接 Domain Data Lake",
    tool: "Tableau",
    level: "L2",
    audience: "Planning",
    booked: 9,
    capacity: 25,
  },
  {
    date: "2026-11-06",
    topic: "AgilePoint 表單與審批流程設計",
    tool: "AgilePoint",
    level: "L1",
    audience: "Biz Support",
    booked: 22,
    capacity: 25,
  },
  {
    date: "2026-11-11",
    topic: "Codex + Skills：建立部門 Agent",
    tool: "Codex · Skills",
    level: "L3",
    audience: "TD · Operations",
    booked: 8,
    capacity: 12,
  },
] as const

const governancePath = [
  { milestone: "高風險模型審查規範核定", due: "2026/11", status: "warning", label: "有風險" },
  { milestone: "AI Governance 委員會成立", due: "2027/03", status: "success", label: "依計畫" },
  { milestone: "D1–D5 套用至自助與公民開發", due: "2027/03", status: "default", label: "未開始" },
  { milestone: "ISO/IEC 42001 差距評估", due: "2027/04", status: "default", label: "未開始" },
  { milestone: "Responsible AI 框架核定", due: "2027/06", status: "success", label: "依計畫" },
  { milestone: "ISO/IEC 42001 認證", due: "2027/12", status: "default", label: "未開始" },
] as const

const severity = {
  high: { label: "高", status: "error" },
  medium: { label: "中", status: "warning" },
  low: { label: "低", status: "default" },
} as const

const funnelMaximum = Math.max(...funnel.map((stage) => stage.current))
const openIssues = issues.filter((issue) => issue.status !== "已解決")
const columnTotals = tools.map((_, index) => seedCoaches.reduce((sum, coach) => sum + coach.values[index], 0))
const citizenProject = projects.find((project) => project.id === "citizen")!
const governanceProject = projects.find((project) => project.id === "governance")!

const total = (values: readonly number[]) => values.reduce((sum, value) => sum + value, 0)
const dateLabel = (date: string) => date.slice(5).replace("-", "/")

export default function LearnPage() {
  const [detail, setDetail] = useState<Project | null>(null)

  return (
    <>
      <PageHeader>公民開發與治理</PageHeader>
      <Stack
        useFlexGap
        gap={2.25}
        className={styles.page}
      >
        <Paper
          variant="outlined"
          component="section"
          className={styles.panel}
        >
          <Stack
            useFlexGap
            gap={2}
          >
            <Stack
              useFlexGap
              gap={1}
              direction="row"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                >
                  自助與公民開發漏斗
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  累計 · 細線為 4 週前
                </Typography>
              </Box>
              <TextButton onClick={() => setDetail(citizenProject)}>詳情 →</TextButton>
            </Stack>
            <Stack divider={<Divider flexItem />}>
              {funnel.map((stage, index) => {
                const blockers = openIssues.filter((issue) => issue.stage === index)
                const loss = index ? 1 - stage.current / funnel[index - 1].current : null
                const highestLoss = index === 1 || index === 2
                return (
                  <Box
                    key={stage.label}
                    className={styles.funnelRow}
                  >
                    <Typography variant="body2">{stage.label}</Typography>
                    <Box className={styles.funnelDetails}>
                      {loss === null ? null : (
                        <Typography
                          color={highestLoss ? "error.main" : "text.secondary"}
                          variant="caption"
                          className={styles.loss}
                        >
                          ↓ 流失 {Math.round(loss * 100)}%{highestLoss ? "（最大流失）" : ""}
                        </Typography>
                      )}
                      <Box className={styles.funnelBars}>
                        <Box
                          className={index === funnel.length - 1 ? styles.finalBar : styles.currentBar}
                          sx={{ width: `${(stage.current / funnelMaximum) * 100}%` }}
                        />
                        <Box
                          sx={{ width: `${(stage.previous / funnelMaximum) * 100}%` }}
                          className={styles.previousBar}
                        />
                      </Box>
                      {blockers.length ? (
                        <Typography
                          color="error.main"
                          variant="caption"
                          className={styles.blocker}
                        >
                          ⚠ {blockers.length} 項未結問題阻擋此階段：{blockers.map((issue) => issue.id).join("、")}
                        </Typography>
                      ) : null}
                    </Box>
                    <Typography
                      variant="body2"
                      className={`${styles.numeric} ${styles.funnelValue}`}
                    >
                      {stage.current.toLocaleString()}
                    </Typography>
                  </Box>
                )
              })}
            </Stack>
          </Stack>
        </Paper>

        <Paper
          variant="outlined"
          component="section"
          className={styles.panel}
        >
          <Stack
            useFlexGap
            gap={1.5}
          >
            <Box>
              <Typography
                variant="h4"
                component="h2"
              >
                回報問題與嚴重度
              </Typography>
              <Typography
                color="text.secondary"
                variant="caption"
              >
                阻礙公民開發成功的問題
              </Typography>
            </Box>
            <Box className={styles.summary}>
              {(["high", "medium", "low"] as const).map((level) => (
                <Box
                  key={level}
                  className={styles.summaryItem}
                >
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    component="span"
                  >
                    未結 · {severity[level].label}
                  </Typography>
                  <Typography
                    color={level === "low" ? "text.primary" : `${severity[level].status}.main`}
                    variant="h3"
                    component="span"
                  >
                    {openIssues.filter((issue) => issue.severity === level).length}
                  </Typography>
                </Box>
              ))}
              <Box className={styles.summaryItem}>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  component="span"
                >
                  已解決
                </Typography>
                <Typography
                  variant="h3"
                  component="span"
                >
                  {issues.length - openIssues.length}
                </Typography>
              </Box>
            </Box>
            <TableContainer className={styles.tableContainer}>
              <Table
                size="small"
                className={styles.issueTable}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>問題</TableCell>
                    <TableCell>工具</TableCell>
                    <TableCell>嚴重度</TableCell>
                    <TableCell>BU</TableCell>
                    <TableCell>狀態 / owner</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {issues.map((issue) => (
                    <TableRow
                      key={issue.id}
                      className={issue.status === "已解決" ? styles.resolved : undefined}
                    >
                      <TableCell>
                        <Typography
                          fontWeight={700}
                          variant="body2"
                        >
                          {issue.issue}
                        </Typography>
                        <Typography
                          color="text.secondary"
                          variant="caption"
                        >
                          回報 {dateLabel(issue.reportedAt)} · 阻擋「{funnel[issue.stage].label}」
                        </Typography>
                      </TableCell>
                      <TableCell>{issue.tool}</TableCell>
                      <TableCell>
                        <StatusChip
                          label={severity[issue.severity].label}
                          status={severity[issue.severity].status}
                        />
                      </TableCell>
                      <TableCell>{issue.bu}</TableCell>
                      <TableCell>
                        <Typography variant="body2">{issue.status}</Typography>
                        <Typography
                          color="text.secondary"
                          variant="caption"
                        >
                          {issue.owner}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Paper>

        <Paper
          variant="outlined"
          component="section"
          className={styles.panel}
        >
          <Stack
            useFlexGap
            gap={1.5}
          >
            <Box>
              <Typography
                variant="h4"
                component="h2"
              >
                種子教官 · 各 BU × 工具
              </Typography>
              <Typography
                color="text.secondary"
                variant="caption"
              >
                紅色 0＝該 BU 此工具無教官
              </Typography>
            </Box>
            <TableContainer className={styles.tableContainer}>
              <Table
                size="small"
                className={styles.seedTable}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>BU</TableCell>
                    {tools.map((tool) => (
                      <TableCell
                        key={tool}
                        align="center"
                      >
                        {tool}
                      </TableCell>
                    ))}
                    <TableCell align="center">合計</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {seedCoaches.map((coach) => (
                    <TableRow key={coach.bu}>
                      <TableCell>
                        <Typography
                          fontWeight={700}
                          variant="body2"
                        >
                          {coach.bu}
                        </Typography>
                      </TableCell>
                      {coach.values.map((value, index) => (
                        <TableCell
                          key={tools[index]}
                          align="center"
                          className={value ? styles.numeric : styles.zero}
                        >
                          {value}
                        </TableCell>
                      ))}
                      <TableCell
                        align="center"
                        className={styles.numeric}
                      >
                        <strong>{total(coach.values)}</strong>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell variant="body">合計</TableCell>
                    {columnTotals.map((value, index) => (
                      <TableCell
                        key={tools[index]}
                        align="center"
                        variant="body"
                        className={styles.numeric}
                      >
                        <strong>{value}</strong>
                      </TableCell>
                    ))}
                    <TableCell
                      align="center"
                      variant="body"
                      className={styles.numeric}
                    >
                      <strong>{total(columnTotals)}</strong>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              建議比例：每 25 位活躍開發者至少 1 位該工具教官；缺口優先由同 BU L3 學員補位。
            </Typography>
          </Stack>
        </Paper>

        <Paper
          variant="outlined"
          component="section"
          className={styles.panel}
        >
          <Stack
            useFlexGap
            gap={1.5}
          >
            <Box>
              <Typography
                variant="h4"
                component="h2"
              >
                即將開課
              </Typography>
              <Typography
                color="text.secondary"
                variant="caption"
              >
                未來 4 週
              </Typography>
            </Box>
            <TableContainer className={styles.tableContainer}>
              <Table
                size="small"
                className={styles.trainingTable}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>日期</TableCell>
                    <TableCell>主題</TableCell>
                    <TableCell>工具 / 級別</TableCell>
                    <TableCell>對象</TableCell>
                    <TableCell>報名</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trainings.map((training) => {
                    const rate = Math.round((training.booked / training.capacity) * 100)
                    return (
                      <TableRow key={`${training.date}-${training.topic}`}>
                        <TableCell className={styles.numeric}>{dateLabel(training.date)}</TableCell>
                        <TableCell>{training.topic}</TableCell>
                        <TableCell>
                          <Typography variant="body2">{training.tool}</Typography>
                          <Typography
                            color="text.secondary"
                            variant="caption"
                          >
                            {training.level}
                          </Typography>
                        </TableCell>
                        <TableCell>{training.audience}</TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            className={styles.numeric}
                          >
                            {training.booked} / {training.capacity}
                          </Typography>
                          <ThresholdProgress
                            color={rate < 50 ? "warning" : "secondary"}
                            value={rate}
                          />
                          {rate < 50 ? (
                            <Typography
                              color="warning.main"
                              variant="caption"
                            >
                              報名偏低
                            </Typography>
                          ) : null}
                        </TableCell>
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
          className={styles.panel}
        >
          <Stack
            useFlexGap
            gap={2}
          >
            <Stack
              useFlexGap
              gap={1}
              direction="row"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                >
                  AI Governance 與 ISO/IEC 42001 路徑
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  委員會與框架 2027 年中 · 認證 2027 年底
                </Typography>
              </Box>
              <TextButton onClick={() => setDetail(governanceProject)}>詳情 →</TextButton>
            </Stack>
            <TableContainer className={styles.tableContainer}>
              <Table
                size="small"
                className={styles.governanceTable}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>里程碑</TableCell>
                    <TableCell>期限</TableCell>
                    <TableCell>狀態</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {governancePath.map((item) => (
                    <TableRow key={item.milestone}>
                      <TableCell>{item.milestone}</TableCell>
                      <TableCell className={styles.numeric}>{item.due}</TableCell>
                      <TableCell>
                        <StatusChip
                          label={item.label}
                          status={item.status}
                        />
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
              重大資安與合規風險獨立紅燈，不被平均進度稀釋。
            </Typography>
          </Stack>
        </Paper>
      </Stack>
      <DetailDrawer
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
      >
        {detail ? (
          <ProjectDrawerContent
            project={detail}
            onClose={() => setDetail(null)}
            onSelect={setDetail}
          />
        ) : null}
      </DetailDrawer>
    </>
  )
}
