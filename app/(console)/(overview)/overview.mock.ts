export type KpiDrawerKind = "benefits" | "maturity"

export type OverviewKpi = {
  drawer?: KpiDrawerKind
  href?: "/learn" | "/milestones"
  id: string
  theme: string
  label: string
  value: string
  change: string
  changeTone: "positive" | "negative" | "neutral"
  comparison: string
  detail: string
  series: readonly number[]
}

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

export type MaturityDistribution = {
  period: string
  kind: "actual" | "target"
  r1: number
  r2: number
  r3: number
  r4: number
  r5: number
}

export type BusinessUnitMaturity = {
  name: string
  r1: number
  r2: number
  r3: number
  r4: number
  r5: number
}

export type BenefitScenario = {
  name: string
  freedHours: number
  redeployedHours: number
  redeployedTo: string
  owner: string
}

export const overviewSnapshot = {
  asOf: "2026/10/16",
  source: "示範資料快照",
} as const

export const overviewKpis: readonly OverviewKpi[] = [
  {
    id: "r3-plus",
    drawer: "maturity",
    theme: "整體成效",
    label: "R3 以上能力占比",
    value: "30.7%",
    change: "▲ 3.9 個百分點",
    changeTone: "positive",
    comparison: "較上季",
    detail: "2027 目標 48.8% · 達成 63%",
    series: [18.1, 22.8, 26.8, 30.7],
  },
  {
    id: "redeployment",
    drawer: "benefits",
    theme: "Work Smarter",
    label: "釋放產能再投入率",
    value: "73%",
    change: "▲ 10 個百分點",
    changeTone: "positive",
    comparison: "較 4 週前",
    detail: "釋放 960 h/月 · 再投入 700 h/月",
    series: [54, 58, 60, 63, 68, 70, 72, 73],
  },
  {
    id: "growth-fte",
    drawer: "benefits",
    theme: "Work Smarter",
    label: "不增人力承接業務成長",
    value: "3.4 FTE",
    change: "▲ 1.6 FTE",
    changeTone: "positive",
    comparison: "較 4 週前",
    detail: "目標 8 FTE · 成本避免，非裁減",
    series: [1, 1.2, 1.5, 1.8, 2.2, 2.6, 3, 3.4],
  },
  {
    id: "d-gate",
    href: "/milestones",
    theme: "Execute Better",
    label: "D-gate 準時通過率",
    value: "83%",
    change: "▲ 5 個百分點",
    changeTone: "positive",
    comparison: "較 4 週前",
    detail: "以首次驗收通過為計算基準",
    series: [74, 76, 75, 78, 80, 81, 83],
  },
  {
    id: "kpi-attainment",
    href: "/milestones",
    theme: "Execute Better",
    label: "專案 KPI 平均達成率",
    value: "49%",
    change: "▲ 5 個百分點",
    changeTone: "positive",
    comparison: "較 4 週前",
    detail: "基準至目標的平均進度",
    series: [38, 40, 42, 44, 45, 47, 49],
  },
  {
    id: "citizen-apps",
    href: "/learn",
    theme: "Learn Faster",
    label: "公民開發應用上線",
    value: "14",
    change: "▲ 7 項",
    changeTone: "positive",
    comparison: "較 4 週前",
    detail: "目標 40 項 · 達成 35%",
    series: [3, 4, 6, 7, 9, 9, 12, 14],
  },
]

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

export const maturityDistribution: readonly MaturityDistribution[] = [
  { period: "2026-Q1", kind: "actual", r1: 58, r2: 46, r3: 14, r4: 9, r5: 0 },
  { period: "2026-Q2", kind: "actual", r1: 52, r2: 46, r3: 17, r4: 12, r5: 0 },
  { period: "2026-Q3", kind: "actual", r1: 48, r2: 45, r3: 20, r4: 14, r5: 0 },
  { period: "2026-Q4", kind: "actual", r1: 44, r2: 44, r3: 22, r4: 17, r5: 0 },
  { period: "2027 目標", kind: "target", r1: 25, r2: 40, r3: 30, r4: 26, r5: 6 },
]

export const businessUnitMaturity: readonly BusinessUnitMaturity[] = [
  { name: "Planning", r1: 9, r2: 10, r3: 4, r4: 2, r5: 0 },
  { name: "Customer", r1: 8, r2: 9, r3: 4, r4: 3, r5: 0 },
  { name: "TD", r1: 10, r2: 8, r3: 5, r4: 4, r5: 0 },
  { name: "Operations", r1: 11, r2: 9, r3: 6, r4: 6, r5: 0 },
  { name: "Biz Support", r1: 6, r2: 8, r3: 3, r4: 2, r5: 0 },
]

export const benefitScenarios: readonly BenefitScenario[] = [
  {
    name: "Operations 製造運營",
    freedHours: 480,
    redeployedHours: 360,
    redeployedTo: "新產品線良率分析與製程優化",
    owner: "製造數位產品負責人",
  },
  {
    name: "Customer 業務行銷",
    freedHours: 120,
    redeployedHours: 90,
    redeployedTo: "新客戶導入與技術支援",
    owner: "客戶應用產品負責人",
  },
  {
    name: "TD 技術研發",
    freedHours: 200,
    redeployedHours: 150,
    redeployedTo: "實驗設計 (DOE) 與數據分析",
    owner: "研發應用產品負責人",
  },
  {
    name: "Biz Support 業務支援",
    freedHours: 160,
    redeployedHours: 100,
    redeployedTo: "流程改善與內控檢核",
    owner: "企業服務產品負責人",
  },
]

export const benefitSummary = {
  freedHours: 960,
  redeployedHours: 700,
  redeploymentRate: "73%",
  growthFte: "3.4 FTE",
  recognizedSavings: "NT$0.6M",
} as const

export type ExecutiveDecision = {
  id: string
  title: string
  due: string
  who: string
  impact: string
  recommendation: string
  options: string
  project: string
  owner: string
  downstreamCount: number
}

export const executiveDecisions: readonly ExecutiveDecision[] = [
  {
    id: "D01", title: "指定各域資料產品擁有人及跨單位授權窗口", due: "2026-10-20", who: "各業務主管 / Digital",
    impact: "阻塞 Domain Data Lakes，連動 Operations、Planning 與 AI-Ready Data Platform。",
    recommendation: "由各業務主管指派資料產品擁有人，Digital 提供平台與治理標準。",
    options: "A. 本週指定各領域 owner（建議）　B. 延後試點、重訂上線計畫",
    project: "Domain Data Lakes", owner: "資料平台負責人", downstreamCount: 10,
  },
  {
    id: "D02", title: "核定工具閘道資安審查的優先次序", due: "2026-10-21", who: "資安主管",
    impact: "影響 Enterprise API、Agentic Flow Automation 與製造試點的串接。",
    recommendation: "指派專責審查窗口與每日追蹤機制，依原資安標準驗證。",
    options: "A. 配置專責審查時數（建議）　B. 限縮試點範圍",
    project: "Enterprise API & Agent Orchestration", owner: "整合平台負責人", downstreamCount: 6,
  },
  {
    id: "D03", title: "確認每個 Domain Hub 的單一執行 owner", due: "2026-10-23", who: "各域主管",
    impact: "R4 方案會早於 Hub 完成；目前 10 項 R4 方案待遷移，沒有單一 owner 將持續延後。",
    recommendation: "每個 Hub 資產對每個 Domain 指定單一執行 owner，並承諾既有 R4 方案的遷移時程。",
    options: "A. 本月核定 Hub owner 清單（建議）　B. 先由 Digital PMO 代管、下季再定",
    project: "Domain Process Repositories", owner: "流程平台負責人", downstreamCount: 2,
  },
]
