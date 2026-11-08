export type Insight = {
  id: string
  name: string
  chineseName: string
  benefit: string
  ranks: [number, number, number, number, number]
  tasks: { name: string; level: "高" | "中" | "低" }[]
}

// 示範資料，待資料契約確認後替換。
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
