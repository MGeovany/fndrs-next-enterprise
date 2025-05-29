import path from "path"

import withBundleAnalyzer from "@next/bundle-analyzer"

import type { NextConfig } from "next"
import type { Configuration as WebpackConfig } from "webpack"

import { env } from "./env.mjs"

const config: NextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  rewrites: async () => [
    { source: "/healthz", destination: "/api/health" },
    { source: "/api/healthz", destination: "/api/health" },
    { source: "/health", destination: "/api/health" },
    { source: "/ping", destination: "/api/health" },
  ],
  webpack: (config: WebpackConfig) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      components: path.resolve(__dirname, "components"),
      hooks: path.resolve(__dirname, "hooks"),
      lib: path.resolve(__dirname, "lib"),
    }
    return config
  },
}

export default env.ANALYZE ? withBundleAnalyzer({ enabled: env.ANALYZE })(config) : config
