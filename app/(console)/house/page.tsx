import PageHeader from "@(control)/components/PageHeader"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import HouseMatrix from "./components/HouseMatrix/HouseMatrix"
import HousePillar from "./components/HousePillar/HousePillar"
import Infrastructure from "./components/Infrastructure/Infrastructure"
import styles from "./page.module.css"

export default function HousePage() {
  return (
    <Stack
      spacing={2}
      useFlexGap
    >
      <PageHeader>房子進度圖</PageHeader>
      <Box
        component="section"
        className={styles.houseSection}
      >
        <Box
          className={styles.roof}
          sx={{
            bgcolor: "primary.main",
            color: "common.white",
          }}
        >
          <Typography variant="h3">UMC Agentic AI Transformation</Typography>
          <Typography variant="body2">洞察為本、AI 為擎，以數位員工實現</Typography>
          <Typography variant="body2">Learn Faster · Work Smarter · Execute Better</Typography>
        </Box>
        <Box
          className={styles.house}
          sx={{ gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "128px minmax(0, 1fr) 128px" } }}
        >
          <HousePillar kind="governance" />
          <Stack
            gap={0.5}
            useFlexGap
            sx={{ minWidth: 0 }}
          >
            <Box
              className={styles.matrixScroll}
              tabIndex={0}
            >
              <Stack
                gap={0.5}
                useFlexGap
                className={styles.matrix}
              >
                <HouseMatrix />
              </Stack>
            </Box>
            <Infrastructure />
          </Stack>
          <HousePillar kind="citizen" />
        </Box>
      </Box>
    </Stack>
  )
}
