export type MetricPrinciple = {
  description: string
  note?: string
  number: string
  statusDetails?: readonly {
    label: string
    status?: "success" | "warning" | "error" | null
  }[]
  title: string
}

export type MetricRow = readonly [area: string, metric: string, principle: string]

export type SourceRow = readonly [data: string, source: string, frequency: string]

export const metricPrinciples: readonly MetricPrinciple[] = [
  {
    number: "01",
    title: "成效先於進度",
    description:
      "首頁第一個數字是 Forest View R3 以上能力占比，接著依 Work Smarter / Execute Better / Learn Faster 分組。交付進度放在第二層。",
    note: "R 晉級須經 Governance & Rx Rules 核准，不以專案完成自動晉級。",
  },
  {
    number: "02",
    title: "Work Smarter 衡量產能再投入，不是省人",
    description:
      "已驗證釋放工時 → 再投入到具名的高價值工作 → 不增人力承接業務成長（FTE）。呈現的是成本避免，而非裁減名單。",
    note: "未指定再投入去向的工時不計入再投入率；財務認列價值另列。",
  },
  {
    number: "03",
    title: "Execute Better 看交付紀律與成果",
    description:
      "D-gate 準時通過率＝依原訂日期首次通過的關卡 ÷ 應通過關卡；重送不算準時。專案 KPI 達成率＝（實際 − 基準）÷（目標 − 基準）。基礎設施另看部署進度。",
    note: "D1–D5 名稱與驗收條件依 DTO 正式定義；資料來源為 DTO tracking sheet。",
  },
  {
    number: "04",
    title: "轉型真偽檢核",
    description:
      "試點轉量產率、Agent 承接業務量占比、舊做法退場數、R4+ 人工推翻率、BU 簽認效益占比、Digital 轉型 : 維運投入。任一項長期不改善，代表只是導入工具。",
    note: "門檻建議：轉量產 ≥ 60%、推翻率 < 5%、BU 簽認 ≥ 80%、轉型 : 維運 50 : 50。",
  },
  {
    number: "05",
    title: "Insight 以 Rx 與 top task 滿足度衡量",
    description: "每個 BU 顯示 R1→R5 能力數與 top tasks 需求滿足度。",
    statusDetails: [
      { label: "高：現有方案滿足主要需求", status: "success" },
      { label: "中：部分滿足，仍需人工補位", status: "warning" },
      { label: "低：尚無可用方案", status: "error" },
    ],
    note: "Governance & Rx Rules 顯示各 BU R4 / R4.x / R5 已核准與審查中數量。",
  },
  {
    number: "06",
    title: "Domain Hub 以需求覆蓋與最弱環節衡量",
    description:
      "覆蓋率＝已具備 ÷ 該 BU top tasks 與 Rx 目標所需。Hub 就緒度取五項中最低者，不取平均。品質看 owner、SLA 內更新、複用；並追蹤待遷移 R4 方案。",
    note: "Skills、Agents、流程等數量保留為脈絡，不作為分數。",
  },
  {
    number: "07",
    title: "基礎設施以部署進度衡量",
    description: "以 0–100% 的實際部署進度呈現，並顯示原訂與預測完成日期；預測晚於原訂時以紅色提示。",
  },
  {
    number: "08",
    title: "燈號、資料新鮮度與決策期限",
    description: "受阻項目依下游影響數排序，影響最大者升級為高層決策，並列決策人與期限。",
    statusDetails: [
      { label: "紅：阻塞影響範圍或延後超過 7 日", status: "error" },
      { label: "黃：延後 1–7 日或已有可識別風險", status: "warning" },
      { label: "綠：依計畫", status: "success" },
      { label: "灰：超過 7 日未更新" },
    ],
  },
]

export const domainMetrics: readonly MetricRow[] = [
  ["整體成效", "R3 以上能力占比、R4 / R4.x / R5 核准數", "Forest View 為唯一來源；晉級需 Governance & Rx Rules 核准。"],
  [
    "Work Smarter",
    "已驗證釋放工時、再投入率、不增人力承接成長（FTE）、財務認列價值",
    "工時→再投入去向→成長承接；財務認列另列，不以工時直接換算現金。",
  ],
  [
    "Execute Better",
    "D-gate 準時首次通過率、專案 KPI 達成率、基礎設施部署進度",
    "DTO tracking sheet 為來源；KPI 以基準→目標→實際計算。",
  ],
  [
    "Insight Solutions",
    "各 BU R1→R5 分布、top task 需求滿足度（高 / 中 / 低）",
    "滿足度由 BU 業務 owner 評定，每季更新。",
  ],
  [
    "Domain Hubs",
    "需求覆蓋（已具備 / 需要）、最弱環節、品質（owner、SLA、複用）、待遷移 R4",
    "數量為脈絡，覆蓋率與最弱環節才是分數。",
  ],
  [
    "Digital Infrastructure",
    "部署進度、服務可用率、每成功任務成本",
    "以 0–100% 的實際部署進度呈現，並與計畫完成日比較。",
  ],
  [
    "AI Governance & Security",
    "高風險審查覆蓋率、未結重大風險、ISO/IEC 42001 里程碑",
    "重大資安與合規風險獨立紅燈，不被平均進度稀釋。",
  ],
  [
    "Digital Citizen",
    "漏斗各步轉換率、未結問題與嚴重度、種子教官缺口、課程報名率",
    "依 BU 與工具拆分；最大流失步驟優先處理。",
  ],
]

export const sourceRows: readonly SourceRow[] = [
  ["專案、D1–D5、專案 KPI", "DTO tracking sheet", "每週二 / 五"],
  ["R1–R5 能力數", "DTO Project", "依目前資料"],
  ["Top tasks", "Forest View", "每季"],
  ["Data Lakes / Knowledge / Agents / Processes", "Data Directory · Knowledge / Agent / Process Registry", "每週"],
  ["R-gate 核准與審查", "Governance & Rx Rules 審查紀錄", "隨審查"],
  ["工時、再投入、FTE、財務認列", "流程 owner 驗證 + 財務", "每月"],
  ["轉型真偽檢核", "使用紀錄、系統退場清單、HITL 紀錄、工時系統", "每月"],
  ["培訓、種子教官、問題回報", "人資學習系統、問題追蹤", "每週"],
]
