import type { ExecutiveDecision } from "@(control)/(overview)/overview.mock"
import TextButton from "@app/components/TextButton/TextButton"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import styles from "./OverviewDecisions.module.css"

type Props = {
  decisions: readonly ExecutiveDecision[]
  onSelect: (decision: ExecutiveDecision) => void
}

export default function OverviewDecisions({ decisions, onSelect }: Props) {
  return (
    <>
      <Paper
        component="section"
        variant="outlined"
        className={styles.panel}
      >
        <Stack
          gap={1.5}
          useFlexGap
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={0.5}
            useFlexGap
          >
            <Typography variant="h4">需要高層決策</Typography>
            <Chip
              label={`${decisions.length} 項待處理`}
              size="small"
            />
          </Stack>
          <Box className={styles.grid}>
            {decisions.map((decision) => (
              <Paper
                component="article"
                variant="outlined"
                className={styles.card}
                key={decision.id}
              >
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  {decision.id} · 決策期限 {decision.due.slice(5).replace("-", "/")} · {decision.who}
                </Typography>
                <Typography variant="h4">{decision.title}</Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  {decision.impact}
                </Typography>
                <TextButton
                  className={styles.action}
                  onClick={() => onSelect(decision)}
                >
                  看選項與影響 →
                </TextButton>
              </Paper>
            ))}
          </Box>
        </Stack>
      </Paper>
    </>
  )
}
