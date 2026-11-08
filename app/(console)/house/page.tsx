import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import PageHeader from "../components/PageHeader"
import InsightSolutions from "./components/InsightSolutions/InsightSolutions"
import { insights } from "./house.mock"
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
        aria-label="轉型房子架構"
        className={styles.houseSection}
      >
        <Box
          className={styles.roof}
          sx={{ bgcolor: "primary.main", color: "common.white" }}
        >
          <Typography
            component="h2"
            variant="h3"
            className={styles.roofTitle}
          >
            UMC Agentic AI Transformation
          </Typography>
          <Typography
            variant="body2"
            className={styles.roofText}
          >
            洞察為本、AI 為擎，以數位員工實現
          </Typography>
          <Typography
            variant="body2"
            className={styles.roofText}
          >
            Learn Faster · Work Smarter · Execute Better
          </Typography>
        </Box>
        <Box
          className={styles.house}
          sx={{ gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "128px minmax(0, 1fr) 128px" } }}
        >
          <Box
            component="section"
            className={`${styles.pillar} ${styles.governance}`}
            aria-labelledby="governance-title"
          >
            <Typography
              variant="caption"
              color="secondary"
            >
              信任與資安
            </Typography>
            <Typography
              component="h2"
              variant="h6"
              id="governance-title"
            >
              AI Governance &amp; Security
            </Typography>
          </Box>
          <Stack
            gap={1}
            useFlexGap
            sx={{ minWidth: 0 }}
          >
            <InsightSolutions insights={insights} />
            <Box
              component="section"
              className={styles.layer}
              aria-labelledby="hubs-title"
            >
              <Box
                className={styles.layerHeading}
                sx={{ bgcolor: "secondary.main", color: "common.white" }}
              >
                <Typography
                  component="h2"
                  variant="h6"
                  id="hubs-title"
                >
                  Domain Hubs
                </Typography>
              </Box>
              <Box
                className={styles.emptyLayer}
                aria-hidden="true"
              />
            </Box>
            <Box
              component="section"
              className={styles.layer}
              aria-labelledby="infrastructure-title"
            >
              <Box
                className={styles.layerHeading}
                sx={{ bgcolor: "primary.main", color: "common.white" }}
              >
                <Typography
                  component="h2"
                  variant="h6"
                  id="infrastructure-title"
                >
                  AI Infrastructure
                </Typography>
              </Box>
              <Box
                className={styles.emptyLayer}
                aria-hidden="true"
              />
            </Box>
          </Stack>
          <Box
            component="section"
            className={`${styles.pillar} ${styles.citizen}`}
            aria-labelledby="citizen-title"
          >
            <Typography
              variant="caption"
              color="info.main"
            >
              數位素養
            </Typography>
            <Typography
              component="h2"
              variant="h6"
              id="citizen-title"
            >
              Digital Citizen
            </Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  )
}
