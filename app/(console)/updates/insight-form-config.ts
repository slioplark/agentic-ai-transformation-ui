import projectsData from "@(control)/data/projects.mock.json"
import { domainHubs, insights } from "@(control)/house/house.mock"
import type { FormRowConfig } from "@app/components/FormFields/FormFields"
import dayjs from "dayjs"

type NumberValue = number | ""
export type InsightFormValues = {
  owner: string
  sponsor: string
  description: string
  summary: string
  nextAction: string
  risk: string
  unblockBy: string
  blocker: string
  decisionRequest: string
  decisionMaker: string
  decisionDue: string
  tasks: { title: string; assignee: string; due: string; status: string; note: string }[]
  milestones: {
    baseline: string
    forecast: string
    accepted: string
    firstPass: string
    evidence: string
    done: boolean
  }[]
  kpiName: string
  kpiUnit: string
  kpiBaseline: NumberValue
  kpiTarget: NumberValue
  kpiActual: NumberValue
  kpiMeasured: boolean
  kpiEvidence: string
  topTasks: { title: string; level: string }[]
  migrate: NumberValue
}

export const insight = insights[0]
export const project = projectsData.projects[0]
const hub = domainHubs.find((item) => item.id === insight.id)
export const defaultValues: InsightFormValues = {
  owner: project.owner,
  sponsor: project.sponsor,
  description: project.project,
  summary: project.summary,
  nextAction: project.nextAction,
  risk: String(project.risk),
  unblockBy: project.unblockBy,
  blocker: project.blocker,
  decisionRequest: project.decisionRequest,
  decisionMaker: project.decisionMaker,
  decisionDue: project.decisionDue,
  tasks: [],
  milestones: project.milestones.map((gate) => ({
    baseline: gate.baseline,
    forecast: gate.forecast,
    accepted: gate.accepted ?? "",
    firstPass: gate.firstPass === null ? "" : gate.firstPass ? "yes" : "no",
    evidence: gate.evidence,
    done: gate.done,
  })),
  kpiName: project.projectKpi.name,
  kpiUnit: project.projectKpi.unit,
  kpiBaseline: project.projectKpi.baseline,
  kpiTarget: project.projectKpi.target,
  kpiActual: project.projectKpi.actual ?? "",
  kpiMeasured: project.projectKpi.measured,
  kpiEvidence: project.projectKpi.evidence,
  topTasks: insight.tasks.map((task) => ({ title: task.name, level: task.level })),
  migrate: hub?.migrate ?? 0,
}

const requiredText = {
  validate: (value: unknown) => (typeof value === "string" && value.trim().length > 0) || "Required",
}
const levelOptions = ["高", "中", "低"].map((value) => ({ value, label: value }))

export const contentConfigs: FormRowConfig<InsightFormValues>[] = [
  {
    fields: [
      { type: "text", name: "owner", label: "負責人／責任角色", required: true, rules: requiredText },
      { type: "text", name: "sponsor", label: "Sponsor" },
    ],
  },
  {
    fields: [
      {
        type: "text",
        name: "description",
        label: "項目內容、範圍與預期交付",
        required: true,
        multiline: true,
        minRows: 3,
        rules: requiredText,
      },
    ],
  },
  {
    fields: [
      {
        type: "text",
        name: "summary",
        label: "本次現況摘要",
        required: true,
        multiline: true,
        minRows: 3,
        rules: requiredText,
      },
    ],
  },
  { fields: [{ type: "text", name: "nextAction", label: "下一步與具體承諾", multiline: true, minRows: 3 }] },
]

export const riskConfigs: FormRowConfig<InsightFormValues>[] = [
  {
    fields: [
      {
        type: "select",
        name: "risk",
        label: "人工風險評估",
        helperText: "日期逾期會另行計算；選擇無風險不會消除交付延誤。",
        options: [
          { value: "0", label: "無額外風險" },
          { value: "1", label: "黃燈：有風險" },
          { value: "2", label: "紅燈：重大風險／阻塞" },
        ],
      },
      { type: "date", name: "unblockBy", label: "預計解除日" },
    ],
  },
  {
    fields: [
      {
        type: "text",
        name: "blocker",
        label: "風險／阻塞原因",
        helperText: "黃燈／紅燈時必填。",
        multiline: true,
        minRows: 3,
        rules: {
          validate: (value, values) =>
            values.risk === "0" || (typeof value === "string" && value.trim().length > 0) || "黃燈／紅燈時必填",
        },
      },
    ],
  },
  {
    fields: [
      {
        type: "text",
        name: "decisionRequest",
        label: "需要主管決定什麼",
        helperText: "正式填報後會出現在首頁待決策清單；清空後移除這筆填報決策。",
        multiline: true,
        minRows: 3,
      },
    ],
  },
  {
    fields: [
      {
        type: "text",
        name: "decisionMaker",
        label: "決策人／責任主管",
        rules: {
          validate: (value, values) =>
            !values.decisionRequest.trim() || (typeof value === "string" && !!value.trim()) || "請填寫決策人",
        },
      },
      {
        type: "date",
        name: "decisionDue",
        label: "決策期限",
        rules: { validate: (value, values) => !values.decisionRequest.trim() || !!value || "請填寫決策期限" },
      },
    ],
  },
]

export function taskConfigs(index: number): FormRowConfig<InsightFormValues>[] {
  return [
    {
      fields: [{ type: "text", name: `tasks.${index}.title`, label: "待辦內容", required: true, rules: requiredText }],
    },
    {
      fields: [
        { type: "text", name: `tasks.${index}.assignee`, label: "執行人" },
        { type: "date", name: `tasks.${index}.due`, label: "完成期限" },
        {
          type: "select",
          name: `tasks.${index}.status`,
          label: "狀態",
          options: [
            { value: "todo", label: "未開始" },
            { value: "doing", label: "進行中" },
            { value: "blocked", label: "阻塞" },
            { value: "done", label: "完成" },
            { value: "cancelled", label: "取消" },
          ],
        },
      ],
    },
    { fields: [{ type: "text", name: `tasks.${index}.note`, label: "現況／驗收說明", multiline: true, minRows: 2 }] },
  ]
}

export function gateConfigs(index: number): FormRowConfig<InsightFormValues>[] {
  return [
    {
      fields: [
        { type: "date", name: `milestones.${index}.baseline`, label: "原訂日期", required: true },
        { type: "date", name: `milestones.${index}.forecast`, label: "最新預測日期", required: true },
      ],
    },
    {
      fields: [
        {
          type: "date",
          name: `milestones.${index}.accepted`,
          label: "實際驗收日期",
          rules: {
            validate: (value, values) => {
              if (!values.milestones[index]?.done) return true
              if (typeof value !== "string" || !value) return "已驗收時必填"
              return value <= dayjs().format("YYYY-MM-DD") || "實際驗收日期不可晚於今天"
            },
          },
        },
        {
          type: "select",
          name: `milestones.${index}.firstPass`,
          label: "首次驗收即通過",
          options: [
            { value: "", label: "尚未確認" },
            { value: "yes", label: "是" },
            { value: "no", label: "否" },
          ],
          rules: { validate: (value, values) => !values.milestones[index]?.done || !!value || "已驗收時必填" },
        },
      ],
    },
    {
      fields: [
        {
          type: "text",
          name: `milestones.${index}.evidence`,
          label: "驗收文件／證據說明",
          multiline: true,
          minRows: 2,
          rules: {
            validate: (value, values) =>
              !values.milestones[index]?.done || (typeof value === "string" && !!value.trim()) || "已驗收時必填",
          },
        },
      ],
    },
  ]
}

export const kpiConfigs: FormRowConfig<InsightFormValues>[] = [
  {
    fields: [
      { type: "text", name: "kpiName", label: "KPI 名稱", required: true, rules: requiredText },
      { type: "text", name: "kpiUnit", label: "單位", required: true, rules: requiredText },
    ],
  },
  {
    fields: [
      { type: "number", name: "kpiBaseline", label: "基準", required: true },
      {
        type: "number",
        name: "kpiTarget",
        label: "目標",
        required: true,
        rules: { validate: (value, values) => value !== values.kpiBaseline || "目標不可等於基準" },
      },
      {
        type: "number",
        name: "kpiActual",
        label: "本次實績（可留空）",
        rules: { validate: (value, values) => !values.kpiMeasured || typeof value === "number" || "已量測時必填" },
      },
    ],
  },
]
export const kpiEvidenceConfigs: FormRowConfig<InsightFormValues>[] = [
  {
    fields: [
      {
        type: "text",
        name: "kpiEvidence",
        label: "量測期間、來源與證據",
        multiline: true,
        minRows: 3,
        rules: {
          validate: (value, values) =>
            !values.kpiMeasured || (typeof value === "string" && !!value.trim()) || "已量測時必填",
        },
      },
    ],
  },
]
export const insightConfigs: FormRowConfig<InsightFormValues>[] = [
  ...defaultValues.topTasks.map((_, index): FormRowConfig<InsightFormValues> => ({
    fields: [
      { type: "text", name: `topTasks.${index}.title`, label: "Top task", required: true, rules: requiredText },
      { type: "select", name: `topTasks.${index}.level`, label: "滿足度", options: levelOptions },
    ],
  })),
  {
    fields: [
      {
        type: "number",
        name: "migrate",
        label: "待遷移至 Hub 的 R4 方案數",
        required: true,
        rules: {
          min: { value: 0, message: "請輸入非負整數" },
          max: { value: 1000000, message: "最多可輸入 1,000,000" },
          validate: (value) => (typeof value === "number" && Number.isInteger(value)) || "請輸入非負整數",
        },
      },
    ],
  },
]
