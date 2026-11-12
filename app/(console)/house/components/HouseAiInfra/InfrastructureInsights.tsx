import Sparkline from "@app/components/Sparkline/Sparkline"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import styles from "./HouseAiInfra.module.css"

const adoption = [140, 185, 220, 270, 310, 350]
const productivity = [100, 104, 110, 116, 122, 128]

export default function InfrastructureInsights() {
  return (
    <Box className={styles.summary}>
      <Paper
        variant="outlined"
        component="section"
        className={styles.summaryItem}
      >
        <Stack
          useFlexGap
          gap={1}
        >
          <Typography variant="h6">Tool Deployment</Typography>
          <Box
            component="ul"
            className={styles.toolList}
          >
            <Typography
              component="li"
              variant="body2"
            >
              GitHub Copilot · 程式碼輔助
            </Typography>
            <Typography
              component="li"
              variant="body2"
            >
              ChatGPT · 文件與問題分析
            </Typography>
            <Typography
              component="li"
              variant="body2"
            >
              AI 測試工具 · 測試案例產生
            </Typography>
          </Box>
        </Stack>
      </Paper>
      <Paper
        variant="outlined"
        component="section"
        className={styles.summaryItem}
      >
        <Stack
          useFlexGap
          gap={1}
        >
          <Typography variant="h6">User Adoption</Typography>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            每月活躍使用者趨勢（示範）
          </Typography>
          <Typography variant="h4">350 人</Typography>
          <Sparkline values={adoption} />
          <Box className={styles.chartLabels}>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              1 月 · 140 人
            </Typography>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              6 月 · 350 人
            </Typography>
          </Box>
        </Stack>
      </Paper>
      <Paper
        variant="outlined"
        component="section"
        className={styles.summaryItem}
      >
        <Stack
          useFlexGap
          gap={1}
        >
          <Typography variant="h6">Productivity Improvement</Typography>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            開發效率指數趨勢（示範）
          </Typography>
          <Typography variant="h4">+28%</Typography>
          <Sparkline values={productivity} />
          <Box className={styles.chartLabels}>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Before · 100
            </Typography>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              After · 128
            </Typography>
          </Box>
        </Stack>
      </Paper>
      <Paper
        variant="outlined"
        component="section"
        className={styles.summaryItem}
      >
        <Stack
          useFlexGap
          gap={1}
        >
          <Typography variant="h6">Success Stories</Typography>
          <Typography variant="body2">
            開發團隊運用 AI 協助產生單元測試與重複性程式碼，縮短撰寫時間，讓工程師更專注於需求設計與程式碼審查。
          </Typography>
        </Stack>
      </Paper>
    </Box>
  )
}
