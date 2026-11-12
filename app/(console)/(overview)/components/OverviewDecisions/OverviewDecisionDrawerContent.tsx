import type { ExecutiveDecision } from "@(control)/(overview)/overview.mock"
import InfoNote from "@app/components/InfoNote/InfoNote"
import CloseIcon from "@mui/icons-material/Close"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import styles from "./OverviewDecisions.module.css"

type Props = {
  decision: ExecutiveDecision
  onClose: () => void
}

export default function OverviewDecisionDrawerContent({ decision, onClose }: Props) {
  return (
    <>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        gap={2}
        useFlexGap
      >
        <Stack
          gap={0.5}
          alignItems="flex-start"
          useFlexGap
        >
          <Typography
            color="secondary.main"
            variant="caption"
          >
            EXECUTIVE DECISION / {decision.id}
          </Typography>
          <Typography variant="h4">{decision.title}</Typography>
        </Stack>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Box className={styles.details}>
        <Paper
          variant="outlined"
          className={styles.detail}
        >
          <Typography
            color="text.secondary"
            variant="caption"
          >
            決策期限
          </Typography>
          <Typography variant="h6">{decision.due.replaceAll("-", "/")}</Typography>
        </Paper>
        <Paper
          variant="outlined"
          className={styles.detail}
        >
          <Typography
            color="text.secondary"
            variant="caption"
          >
            建議決策人
          </Typography>
          <Typography variant="h6">{decision.who}</Typography>
        </Paper>
      </Box>
      <Paper
        component="section"
        variant="outlined"
        className={styles.detail}
      >
        <Stack
          gap={2}
          useFlexGap
        >
          <Box>
            <Typography variant="h4">為何現在需要決策</Typography>
            <Typography variant="body2">{decision.impact}</Typography>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              阻塞影響範圍：{decision.project} 的下游有 {decision.downstreamCount} 項工作。
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4">建議行動</Typography>
            <Typography variant="body2">{decision.recommendation}</Typography>
          </Box>
          <Box>
            <Typography variant="h4">可選方案</Typography>
            <Typography variant="body2">{decision.options}</Typography>
          </Box>
        </Stack>
      </Paper>
      <Paper
        component="section"
        variant="outlined"
        className={styles.detail}
      >
        <Typography variant="h4">連動專案與責任</Typography>
        <Typography variant="body2">
          {decision.project} · 議題 owner：{decision.owner}
        </Typography>
      </Paper>
      <InfoNote>
        <Typography variant="body2">此頁為決策資訊示範，沒有送出核准或通知功能。</Typography>
      </InfoNote>
    </>
  )
}
