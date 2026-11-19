import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Agentic-AI-Transformation",
  trailingSlash: true,
  experimental: {
    agentUpgrade: "security",
  },
}

export default nextConfig
