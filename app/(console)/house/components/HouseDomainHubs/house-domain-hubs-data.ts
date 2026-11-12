import type { DomainHub, DomainHubAsset } from "@(control)/house/house.mock"

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

