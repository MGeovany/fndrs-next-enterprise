// CLI Configuration
export default {
  // Project defaults
  defaults: {
    projectName: "fndrs-app",
    packageManager: "npm", // npm, pnpm, yarn
    installDeps: true,
  },

  // Node.js requirements
  requirements: {
    nodeVersion: ">=18.0.0",
    packageManagers: ["npm", "pnpm", "yarn"],
  },

  // Files to exclude from template
  excludes: [
    "node_modules",
    ".git",
    "create-fndrs-app",
    "storybook-static",
    "test-results",
    "playwright-report",
    "pnpm-lock.yaml",
    ".next",
    "dist",
    "build",
    "coverage",
    ".DS_Store",
  ],

  // Essential files to verify after creation
  essentialFiles: [
    "package.json",
    "next.config.mjs",
    "app/page.tsx",
    "components/ui/button/button.tsx",
    "tailwind.config.js",
    "tsconfig.json",
  ],

  // URLs
  urls: {
    documentation: "https://github.com/mgeovany/fndrs-next-enterprise",
    issues: "https://github.com/mgeovany/fndrs-next-enterprise/issues",
    repository: "https://github.com/mgeovany/fndrs-next-enterprise",
    nodejs: "https://nodejs.org/",
  },

  // Console colors
  colors: {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  },

  // Validation rules
  validation: {
    projectName: {
      pattern: /^[a-zA-Z0-9-_]+$/,
      message: "Use only letters, numbers, dashes, and underscores.",
    },
  },
}
