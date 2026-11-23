"use client"

import PageHeader from "@(control)/components/PageHeader"
import FormFields from "@app/components/FormFields/FormFields"
import PaperCard from "@app/components/PaperCard/PaperCard"
import CloseIcon from "@mui/icons-material/Close"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form"
import {
  contentConfigs,
  defaultValues,
  gateConfigs,
  insight,
  insightConfigs,
  kpiConfigs,
  kpiEvidenceConfigs,
  project,
  riskConfigs,
  taskConfigs,
  type InsightFormValues,
} from "./insight-form-config"

export default function UpdatesPage() {
  const { control, getValues, setError, trigger } = useForm<InsightFormValues>({ defaultValues })
  const { fields: tasks, append, remove } = useFieldArray({ control, name: "tasks" })
  const values = useWatch({ control })
  const [checkedValues, setCheckedValues] = useState<string | null>(null)

  async function handleCheck() {
    const current = getValues()
    const snapshot = JSON.stringify(current)
    let valid = await trigger()
    let previousIncomplete = false
    for (let index = 0; index < current.milestones.length; index++) {
      const gate = current.milestones[index]
      if (gate.done && previousIncomplete) {
        setError(`milestones.${index}.accepted`, { message: "請依序完成 D-gate 驗收" })
        valid = false
      }
      if (!gate.done) previousIncomplete = true
    }
    setCheckedValues(valid && snapshot === JSON.stringify(getValues()) ? snapshot : null)
  }

  const saveAction = (
    <>
      {checkedValues !== null && checkedValues === JSON.stringify(values) ? (
        <Alert severity="success">欄位檢查通過。此示範表單不會儲存資料。</Alert>
      ) : null}
      <Button
        variant="contained"
        onClick={handleCheck}
      >
        儲存並同步
      </Button>
    </>
  )

  return (
    <Stack gap={2}>
      <PageHeader>負責人填報</PageHeader>
      <Typography
        color="text.secondary"
        variant="body2"
      >
        {insight.name} {insight.chineseName} · {project.project}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 280px" },
          alignItems: "start",
          gap: 2,
        }}
      >
        <Stack
          gap={2}
          sx={{
            gridColumn: { lg: 2 },
            gridRow: { lg: 1 },
            position: { lg: "sticky" },
            top: { lg: 16 },
            maxHeight: { lg: "calc(100vh - 32px)" },
            overflowY: { lg: "auto" },
          }}
        >
          <PaperCard>
            <Typography variant="h5">填報提示</Typography>
            <Typography variant="body2">1. 先確認項目範圍與責任人。</Typography>
            <Typography variant="body2">2. 現況寫「已完成什麼、尚缺什麼」。</Typography>
            <Typography variant="body2">3. 下一步要有可交付的承諾。</Typography>
            <Typography variant="body2">4. 有阻塞請填解除日；需要決策請填決策人與期限。</Typography>
            <Typography variant="body2">5. 檢查前確認 D-gate 的日期及證據。</Typography>
          </PaperCard>
          <Stack
            gap={1}
            sx={{ display: { xs: "none", lg: "flex" } }}
          >
            {saveAction}
          </Stack>
        </Stack>
        <Stack
          gap={2}
          sx={{ gridColumn: { lg: 1 }, gridRow: { lg: 1 } }}
        >
          <PaperCard>
            <Typography variant="h5">01 · 項目內容與現況</Typography>
            <FormFields
              control={control}
              configs={contentConfigs}
            />
          </PaperCard>
          <PaperCard>
            <Typography variant="h5">02 · 風險、阻塞與待決策</Typography>
            <FormFields
              control={control}
              configs={riskConfigs}
            />
          </PaperCard>
          <PaperCard>
            <Stack
              gap={1}
              flexWrap="wrap"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5">03 · 待辦事項</Typography>
              <Button onClick={() => append({ title: "", assignee: "", due: "", status: "todo", note: "" })}>
                ＋ 新增待辦
              </Button>
            </Stack>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              待辦可獨立追蹤，但完成待辦不會自動增加 D-gate 進度。
            </Typography>
            {tasks.length === 0 ? (
              <Typography
                color="text.secondary"
                variant="body2"
              >
                尚未新增待辦。
              </Typography>
            ) : null}
            {tasks.map((task, index) => (
              <Stack
                key={task.id}
                gap={2}
              >
                <Stack
                  gap={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6">待辦 {index + 1}</Typography>
                  <IconButton
                    title={`移除待辦 ${index + 1}`}
                    onClick={() => remove(index)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
                <FormFields
                  control={control}
                  configs={taskConfigs(index)}
                />
              </Stack>
            ))}
          </PaperCard>
          <PaperCard>
            <Typography variant="h5">04 · D-gate 預測與驗收紀錄</Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              權重固定且合計 100%。需依序完成；已驗收需填實際日期、首次通過結果與證據。
            </Typography>
            <Stack gap={2}>
              {project.milestones.map((gate, index) => (
                <Stack
                  key={gate.name}
                  gap={2}
                >
                  <Stack
                    gap={1}
                    flexWrap="wrap"
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h6">
                      {gate.name} · {gate.weight}%
                    </Typography>
                    <Controller
                      name={`milestones.${index}.done`}
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          label="填報已驗收"
                          control={
                            <Checkbox
                              onBlur={field.onBlur}
                              checked={field.value}
                              inputRef={field.ref}
                              onChange={(_, checked) => field.onChange(checked)}
                            />
                          }
                        />
                      )}
                    />
                  </Stack>
                  <FormFields
                    control={control}
                    configs={gateConfigs(index)}
                  />
                </Stack>
              ))}
            </Stack>
          </PaperCard>
          <PaperCard>
            <Typography variant="h5">05 · 專案 KPI（CIO v5）</Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              KPI
              基準與目標需由管理員依核准紀錄變更。只有勾選「本次已量測」且填寫證據，才將實績視為本次填報；未勾選時，儲存後會標示尚未量測。
            </Typography>
            <FormFields
              control={control}
              configs={kpiConfigs}
            />
            <Controller
              name="kpiMeasured"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  label="本次已量測，並附證據"
                  control={
                    <Checkbox
                      onBlur={field.onBlur}
                      checked={field.value}
                      inputRef={field.ref}
                      onChange={(_, checked) => field.onChange(checked)}
                    />
                  }
                />
              )}
            />
            <FormFields
              control={control}
              configs={kpiEvidenceConfigs}
            />
          </PaperCard>
          <PaperCard>
            <Typography variant="h5">06 · Insight／BU 現況</Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              Forest View R1–R5 基準不會因待辦完成自動晉級。以下填寫 Top task 滿足度與待遷移數量。
            </Typography>
            <FormFields
              control={control}
              configs={insightConfigs}
            />
          </PaperCard>
          {checkedValues !== null && checkedValues === JSON.stringify(values) ? (
            <Alert
              sx={{ display: { xs: "flex", lg: "none" }, position: "sticky", bottom: 68, zIndex: 1 }}
              severity="success"
            >
              欄位檢查通過。此示範表單不會儲存資料。
            </Alert>
          ) : null}
          <Button
            sx={{ display: { xs: "inline-flex", lg: "none" }, position: "sticky", bottom: 16, zIndex: 1, mx: 2 }}
            variant="contained"
            onClick={handleCheck}
          >
            儲存並同步
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}
