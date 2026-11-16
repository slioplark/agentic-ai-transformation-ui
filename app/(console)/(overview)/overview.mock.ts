export type ReportingStatusMetric = {
  label: string
  value: string
}

export type TransformationSignal = {
  change: string
  currentValue: string
  englishLabel: string
  id: string
  label: string
  rationale: string
  status: "alert" | "attention"
  threshold: string
}
export const overviewSnapshot = {
  asOf: "2026/10/16",
  source: "示範資料快照",
} as const
export const reportingStatusMetrics: readonly ReportingStatusMetric[] = [
  { value: "1 / 21", label: "已人工填報項目" },
  { value: "0", label: "進行中／未完成待辦" },
  { value: "0", label: "已逾期待辦" },
  { value: "0", label: "阻塞待辦" },
]
export const transformationSignals: readonly TransformationSignal[] = [
  {
    id: "pilot-production",
    label: "試點轉量產率",
    englishLabel: "Pilot → production",
    currentValue: "38%",
    change: "▲ 33%",
    threshold: "≥ 60%",
    status: "alert",
    rationale: "試點多、量產少＝停在 pilot purgatory；目前 5 項試點已超過 6 個月。",
  },
  {
    id: "agentic-share",
    label: "Agent 承接業務量占比",
    englishLabel: "Agentic share of work",
    currentValue: "6.5%",
    change: "▲ 5.1%",
    threshold: "2027 ≥ 20%",
    status: "attention",
    rationale: "R4 以上流程中由 Agent 端到端完成的交易比例；這才是 digital workforce 的實際規模。",
  },
  {
    id: "old-way-switched-off",
    label: "舊系統／人工步驟退場",
    englishLabel: "Old way switched off",
    currentValue: "3 項",
    change: "▲ 2 項",
    threshold: "2026 ≥ 12 項",
    status: "alert",
    rationale: "新方案上線但舊做法未關＝成本疊加，不是轉型。",
  },
  {
    id: "human-override-rate",
    label: "R4+ Agent 人工推翻率",
    englishLabel: "Human override rate",
    currentValue: "12%",
    change: "▲ 15%",
    threshold: "< 5%",
    status: "attention",
    rationale: "下降代表使用者信任 Agent 的判斷；居高不下表示 HITL 只是形式。",
  },
  {
    id: "bu-owned-value",
    label: "BU 簽認效益占比",
    englishLabel: "BU-owned value",
    currentValue: "41%",
    change: "▲ 35%",
    threshold: "≥ 80%",
    status: "alert",
    rationale: "效益若只由 Digital 自報，CFO 與 BU 都不會採信。",
  },
  {
    id: "change-vs-run",
    label: "Digital 轉型：維運投入",
    englishLabel: "Change vs run",
    currentValue: "32 : 68",
    change: "▲ 30 : 70",
    threshold: "50 : 50",
    status: "attention",
    rationale: "Digital 團隊多數時間仍在維運，轉型速度受限。",
  },
]
