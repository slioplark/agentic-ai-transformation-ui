import { actualProgress, projects } from "@(control)/(overview)/components/UpcomingMilestones/milestones"
import HouseDrawerCard from "@(control)/house/components/HouseDrawerCard/HouseDrawerCard"
import type { DomainHub, DomainHubAsset } from "@(control)/house/house.mock"
import TextButton from "@app/components/TextButton/TextButton"
import { Stack } from "@mui/material"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import pageStyles from "../../page.module.css"
import styles from "./HouseDomainHubs.module.css"

export const assets: { key: DomainHubAsset; name: string; projectId: string; registry?: string }[] = [
  { key: "data", name: "Domain Data Lakes", projectId: "lake", registry: "Data Directory" },
  { key: "knowledge", name: "AI Knowledge Repositories", projectId: "knowledge", registry: "Knowledge Registry" },
  { key: "agents", name: "Agents Repositories", projectId: "agents", registry: "Agent Registry" },
  { key: "process", name: "Domain Process Repositories", projectId: "process", registry: "Process Registry" },
  { key: "rules", name: "Governance & Rx Rules", projectId: "rgate" },
]

export function coverage(hub: DomainHub, asset: DomainHubAsset): [number, number] {
  switch (asset) {
    case "data":
      return [hub.data[0], hub.data.reduce((sum, value) => sum + value, 0)]
    case "knowledge":
      return hub.need.knowledge
    case "agents":
      return [hub.agents.reduce((sum, value) => sum + value, 0), hub.need.agents]
    case "process":
      return [hub.process, hub.need.process]
    case "rules":
      return hub.need.rules
  }
}

function tone(ratio: number) {
  return ratio >= 0.7 ? styles.high : ratio >= 0.4 ? styles.medium : styles.low
}

function AssetContent({ hub, asset }: { hub: DomainHub; asset: DomainHubAsset }) {
  if (asset === "data") {
    const total = hub.data.reduce((sum, value) => sum + value, 0)
    return (
      <>
        {(["可用", "建置中", "計畫"] as const).map((label, index) => (
          <span
            className={styles.line}
            key={label}
          >
            <span>{label}</span>
            <strong>{hub.data[index]}</strong>
          </span>
        ))}
        <span
          className={styles.bar}
          aria-hidden="true"
        >
          {hub.data.map((value, index) => (
            <Box
              component="span"
              key={index}
              className={styles[`bar${index}`]}
              sx={{ flexGrow: total ? value : 0 }}
            />
          ))}
        </span>
      </>
    )
  }
  if (asset === "knowledge") {
    return (
      <>
        {(["Skills", "Contexts", "URAG", "UGPT", "Harness"] as const).map((label, index) => (
          <span
            className={styles.line}
            key={label}
          >
            <span>{label}</span>
            <strong>{hub.knowledge[index]}</strong>
          </span>
        ))}
      </>
    )
  }
  if (asset === "agents")
    return (
      <>
        <span>
          R4 <strong>{hub.agents[0]}</strong> · R4.x <strong>{hub.agents[1]}</strong> · R5{" "}
          <strong>{hub.agents[2]}</strong>
        </span>
        <span>共 {hub.agents.reduce((sum, value) => sum + value, 0)} 個已註冊</span>
      </>
    )
  if (asset === "process")
    return (
      <span>
        <strong>{hub.process}</strong> 已註冊流程
      </span>
    )
  return (
    <>
      <span>已核准</span>
      <span>
        R4 <strong>{hub.rulesApproved[0]}</strong> · R4.x <strong>{hub.rulesApproved[1]}</strong> · R5{" "}
        <strong>{hub.rulesApproved[2]}</strong>
      </span>
      <span>審查中</span>
      <span>
        R4 <strong>{hub.rulesReview[0]}</strong> · R4.x <strong>{hub.rulesReview[1]}</strong> · R5{" "}
        <strong>{hub.rulesReview[2]}</strong>
      </span>
    </>
  )
}

export default function HouseDomainHubs({
  domainHubs,
  onSelect,
  onProject,
}: {
  domainHubs: DomainHub[]
  onSelect: (id: string) => void
  onProject: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(true)

  return (
    <Box
      component="section"
      className={`${pageStyles.section}`}
    >
      <Box
        className={`${pageStyles.heading}`}
        onClick={() => setExpanded((current) => !current)}
        sx={{ color: "common.white", bgcolor: "secondary.main" }}
      >
        <Typography variant="h6">Domain Hubs</Typography>
        <Typography variant="caption">需求覆蓋＝已具備 / 該 BU 需要</Typography>
      </Box>
      <Collapse
        in={expanded}
        timeout="auto"
      >
        <Stack gap={0.5}>
          {assets.map((asset) => (
            <Box
              className={styles.row}
              key={asset.key}
            >
              <Box className={styles.label}>
                <Typography variant="subtitle2">{asset.name}</Typography>
                <TextButton onClick={() => onProject(asset.projectId)}>
                  平台進度 {actualProgress(projects.find((project) => project.id === asset.projectId)!)}% →
                </TextButton>
                {asset.registry ? (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {asset.registry} · 待設定
                  </Typography>
                ) : null}
              </Box>
              {domainHubs.map((hub) => {
                const [available, needed] = coverage(hub, asset.key)
                return (
                  <HouseDrawerCard
                    key={hub.id}
                    onClick={() => onSelect(hub.id)}
                    className={styles.cell}
                  >
                    <AssetContent
                      hub={hub}
                      asset={asset.key}
                    />
                    <span className={`${styles.coverage} ${tone(needed ? available / needed : 0)}`}>
                      需求覆蓋 {available}/{needed}
                    </span>
                  </HouseDrawerCard>
                )
              })}
            </Box>
          ))}
          <Box className={`${styles.row} ${styles.readinessRow}`}>
            <Box className={styles.label}>
              <Typography variant="subtitle2">Hub 就緒度</Typography>
              <Typography variant="caption">取五項中最弱環節</Typography>
            </Box>
            {domainHubs.map((hub) => {
              const weakest = assets
                .map((asset) => {
                  const [available, needed] = coverage(hub, asset.key)
                  return { ...asset, ratio: needed ? available / needed : 0 }
                })
                .reduce((lowest, current) => (current.ratio < lowest.ratio ? current : lowest))
              return (
                <Paper
                  key={hub.id}
                  variant="outlined"
                  className={`${styles.cell} ${styles.readinessCell} ${tone(weakest.ratio)}`}
                >
                  <Typography variant="h5">{Math.round(weakest.ratio * 100)}%</Typography>
                  <span>最弱：{weakest.name}</span>
                  <span>待遷移 R4 方案 {hub.migrate} 項</span>
                </Paper>
              )
            })}
          </Box>
        </Stack>
      </Collapse>
    </Box>
  )
}
