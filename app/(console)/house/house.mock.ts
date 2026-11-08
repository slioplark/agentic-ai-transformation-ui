export type Insight = {
  id: string
  name: string
  chineseName: string
  benefit: string
  ranks: [number, number, number, number, number]
  tasks: { name: string; level: "高" | "中" | "低" }[]
}

export const insights: Insight[] = [
  {
    id: "ops",
    name: "Operations",
    chineseName: "製造運營",
    benefit: "提升製造效率、品質及營運韌性",
    ranks: [11, 9, 6, 6, 0],
    tasks: [
      { name: "製程異常判讀", level: "中" },
      { name: "機台派工建議", level: "低" },
      { name: "良率根因分析", level: "中" },
    ],
  },
  {
    id: "customer",
    name: "Customer",
    chineseName: "業務行銷",
    benefit: "深化客戶洞察、提升客戶價值",
    ranks: [8, 9, 4, 3, 0],
    tasks: [
      { name: "客戶詢問回覆", level: "高" },
      { name: "交期承諾回覆", level: "中" },
      { name: "客戶洞察摘要", level: "中" },
    ],
  },
  {
    id: "td",
    name: "TD",
    chineseName: "技術研發",
    benefit: "加速技術研發與知識累積",
    ranks: [10, 8, 5, 4, 0],
    tasks: [
      { name: "研發知識檢索", level: "高" },
      { name: "實驗設計建議", level: "中" },
      { name: "文獻與專利比對", level: "中" },
    ],
  },
  {
    id: "planning",
    name: "Planning",
    chineseName: "策略規劃",
    benefit: "提升預測、規劃及決策品質",
    ranks: [9, 10, 4, 2, 0],
    tasks: [
      { name: "需求預測", level: "低" },
      { name: "產能規劃情境", level: "中" },
      { name: "物料短缺預警", level: "低" },
    ],
  },
  {
    id: "biz",
    name: "Biz Support",
    chineseName: "業務支援",
    benefit: "提升企業支援效率與敏捷度",
    ranks: [6, 8, 3, 2, 0],
    tasks: [
      { name: "內部服務請求", level: "高" },
      { name: "採購審核", level: "中" },
      { name: "月結對帳", level: "低" },
    ],
  },
]

export type HubAsset = "data" | "knowledge" | "agents" | "process" | "rules"
export type Hub = {
  id: string
  name: string
  data: [number, number, number]
  knowledge: [number, number, number, number, number]
  agents: [number, number, number]
  process: number
  rulesApproved: [number, number, number]
  rulesReview: [number, number, number]
  need: { knowledge: [number, number]; agents: number; process: number; rules: [number, number] }
  migrate: number
}

export const hubs: Hub[] = [
  {
    id: "ops",
    name: "Operations",
    data: [8, 4, 3],
    knowledge: [8, 5, 3, 2, 2],
    agents: [4, 2, 0],
    process: 6,
    rulesApproved: [4, 1, 0],
    rulesReview: [2, 1, 0],
    need: { knowledge: [8, 12], agents: 10, process: 10, rules: [5, 9] },
    migrate: 3,
  },
  {
    id: "customer",
    name: "Customer",
    data: [8, 1, 1],
    knowledge: [6, 4, 2, 2, 1],
    agents: [3, 1, 0],
    process: 4,
    rulesApproved: [3, 1, 0],
    rulesReview: [1, 0, 0],
    need: { knowledge: [6, 8], agents: 5, process: 5, rules: [4, 5] },
    migrate: 2,
  },
  {
    id: "td",
    name: "TD",
    data: [7, 3, 2],
    knowledge: [7, 5, 4, 2, 2],
    agents: [3, 2, 0],
    process: 4,
    rulesApproved: [3, 1, 0],
    rulesReview: [1, 1, 0],
    need: { knowledge: [7, 10], agents: 8, process: 7, rules: [4, 8] },
    migrate: 2,
  },
  {
    id: "planning",
    name: "Planning",
    data: [4, 3, 3],
    knowledge: [4, 3, 2, 1, 1],
    agents: [2, 1, 0],
    process: 3,
    rulesApproved: [2, 1, 0],
    rulesReview: [1, 0, 0],
    need: { knowledge: [4, 8], agents: 7, process: 9, rules: [3, 7] },
    migrate: 2,
  },
  {
    id: "biz",
    name: "Biz Support",
    data: [5, 2, 2],
    knowledge: [5, 3, 2, 2, 1],
    agents: [2, 1, 0],
    process: 4,
    rulesApproved: [2, 1, 0],
    rulesReview: [1, 0, 0],
    need: { knowledge: [5, 8], agents: 6, process: 6, rules: [3, 6] },
    migrate: 1,
  },
]
