import PageHeader from "@(control)/components/PageHeader"
import forestBlueprint from "@(control)/house/foreset-view.mock.json"
import { insights } from "@(control)/house/house.mock"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import styles from "./page.module.css"

type ForestId = keyof typeof forestBlueprint

const forestOrder: ForestId[] = ["planning", "customer", "td", "ops", "biz"]
const insightNames = new Map(insights.map((insight) => [insight.id, insight.name]))

export default function ForestPage() {
  return (
    <Stack gap={2}>
      <PageHeader>Forest View</PageHeader>
      <Box className={styles.map}>
        {forestOrder.map((id) => (
          <Box
            key={id}
            className={`${styles.forest} ${styles[id]}`}
            component="section"
          >
            <Typography
              className={styles.forestTitle}
              variant="h6"
            >
              {insightNames.get(id)}
            </Typography>
            <Box
              className={styles.scrollArea}
              tabIndex={0}
            >
              <Box className={styles.blocks}>
                {forestBlueprint[id].map((block) => (
                  <Box
                    key={block.title}
                    className={styles.block}
                  >
                    <Typography variant="subtitle2">{block.title}</Typography>
                    <Box className={styles.items}>
                      {block.branches.map((branch) => (
                        <Box
                          key={branch}
                          className={styles.item}
                        >
                          {branch}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Stack>
  )
}
