export type KpiDrawerKind = "benefits" | "maturity"

export type KpiData = {
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
export const kpiData: readonly KpiData[] = [
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

export const getKpiById = (id: string) => kpiData.find((kpi) => kpi.id === id)
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
