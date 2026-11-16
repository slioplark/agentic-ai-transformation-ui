export type DecisionData = {
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

export const decisionData: readonly DecisionData[] = [
  {
    id: "D01",
    title: "指定各域資料產品擁有人及跨單位授權窗口",
    due: "2026-10-20",
    who: "各業務主管 / Digital",
    impact: "阻塞 Domain Data Lakes，連動 Operations、Planning 與 AI-Ready Data Platform。",
    recommendation: "由各業務主管指派資料產品擁有人，Digital 提供平台與治理標準。",
    options: "A. 本週指定各領域 owner（建議）　B. 延後試點、重訂上線計畫",
    project: "Domain Data Lakes",
    owner: "資料平台負責人",
    downstreamCount: 10,
  },
  {
    id: "D02",
    title: "核定工具閘道資安審查的優先次序",
    due: "2026-10-21",
    who: "資安主管",
    impact: "影響 Enterprise API、Agentic Flow Automation 與製造試點的串接。",
    recommendation: "指派專責審查窗口與每日追蹤機制，依原資安標準驗證。",
    options: "A. 配置專責審查時數（建議）　B. 限縮試點範圍",
    project: "Enterprise API & Agent Orchestration",
    owner: "整合平台負責人",
    downstreamCount: 6,
  },
  {
    id: "D03",
    title: "確認每個 Domain Hub 的單一執行 owner",
    due: "2026-10-23",
    who: "各域主管",
    impact: "R4 方案會早於 Hub 完成；目前 10 項 R4 方案待遷移，沒有單一 owner 將持續延後。",
    recommendation: "每個 Hub 資產對每個 Domain 指定單一執行 owner，並承諾既有 R4 方案的遷移時程。",
    options: "A. 本月核定 Hub owner 清單（建議）　B. 先由 Digital PMO 代管、下季再定",
    project: "Domain Process Repositories",
    owner: "流程平台負責人",
    downstreamCount: 2,
  },
]

export const getDecisionById = (id: string) => decisionData.find((decision) => decision.id === id)
