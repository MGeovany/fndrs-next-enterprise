#!/usr/bin/env node
import { execSync } from "child_process"
import path from "path"
import { fileURLToPath } from "url"

import fs from "fs-extra"
import prompts from "prompts"

import config from "./config.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Colors for better console output
const colors = config.colors

const log = {
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset}  ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset}  ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset}  ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset}  ${msg}`),
  step: (msg) => console.log(`${colors.blue}→${colors.reset}  ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.magenta}${msg}${colors.reset}`),
}

// Check Node.js version
function checkNodeVersion() {
  const requiredVersion = config.requirements.nodeVersion.replace(">=", "")
  const currentVersion = process.version.slice(1) // Remove 'v' prefix

  const parseVersion = (version) => {
    return version.split(".").map(Number)
  }

  const current = parseVersion(currentVersion)
  const required = parseVersion(requiredVersion)

  for (let i = 0; i < 3; i++) {
    if (current[i] > required[i]) return true
    if (current[i] < required[i]) return false
  }
  return true
}

// Check if package manager is available
function checkPackageManager(manager) {
  try {
    execSync(`${manager} --version`, { stdio: "ignore" })
    return true
  } catch {
    return false
  }
}

// Install dependencies with better error handling
async function installDependencies(targetDir, projectName, packageManager) {
  log.step("Installing dependencies...")

  // If a specific package manager was selected, try it first, then fallback to others
  const managers = packageManager
    ? [packageManager, ...config.requirements.packageManagers.filter((m) => m !== packageManager)]
    : config.requirements.packageManagers

  let triedManagers = []

  for (const manager of managers) {
    // Skip if we already tried this manager
    if (triedManagers.includes(manager)) continue
    triedManagers.push(manager)

    if (!checkPackageManager(manager)) {
      log.warning(`${manager} not found, trying next...`)
      continue
    }

    try {
      log.info(`Trying ${manager}...`)

      // Use different flags for different package managers to handle peer dependency conflicts
      let installCommand = `${manager} install`
      if (manager === "npm") {
        installCommand = `${manager} install --legacy-peer-deps`
      } else if (manager === "yarn") {
        installCommand = `${manager} install --ignore-engines`
      }

      execSync(installCommand, {
        cwd: targetDir,
        stdio: "inherit",
        env: { ...process.env, FORCE_COLOR: "1" },
      })
      log.success(`Dependencies installed successfully with ${manager}!`)
      return true
    } catch (error) {
      log.warning(`${manager} failed: ${error.message}`)
      continue
    }
  }

  log.error("All package managers failed. Please install dependencies manually:")
  console.log(`  cd ${projectName}`)
  console.log("  npm install --legacy-peer-deps")
  console.log("  # or")
  console.log("  pnpm install")
  console.log("  # or")
  console.log("  yarn install --ignore-engines")
  return false
}

// Get template directory based on execution context
function getTemplateDir() {
  // Always use the template directory within the package
  return path.join(__dirname, "template")
}

// Copy template files to target directory
async function copyTemplateFiles(templateDir, targetDir, options) {
  log.step("Copying template files...")

  try {
    // Copy the entire template directory
    await fs.copy(templateDir, targetDir)

    // Customize files based on options
    await customizeFiles(targetDir, options)

    log.success("Template files copied successfully!")
    return true
  } catch (error) {
    log.error(`Failed to copy template files: ${error.message}`)
    return false
  }
}

// Customize files based on user choices
async function customizeFiles(targetDir, options) {
  // Update package.json with project name
  const pkgPath = path.join(targetDir, "package.json")
  if (fs.existsSync(pkgPath)) {
    const pkg = await fs.readJson(pkgPath)
    pkg.name = options.projectName
    delete pkg.bin
    delete pkg.files

    // Remove problematic scripts that require git repository
    if (pkg.scripts) {
      delete pkg.scripts.prepare
      delete pkg.scripts.postinstall
    }

    await fs.writeJson(pkgPath, pkg, { spaces: 2 })
  }

  // Update README.md with project name
  const readmePath = path.join(targetDir, "README.md")
  if (fs.existsSync(readmePath)) {
    let readme = await fs.readFile(readmePath, "utf8")
    readme = readme.replace(/fndrs-next-enterprise/g, options.projectName)
    await fs.writeFile(readmePath, readme)
  }

  // Remove unnecessary files
  const filesToRemove = [
    ".git",
    "node_modules",
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
  ]

  for (const file of filesToRemove) {
    const filePath = path.join(targetDir, file)
    if (fs.existsSync(filePath)) {
      await fs.remove(filePath)
    }
  }
}

// Main function
async function main() {
  // Welcome message
  log.title("🚀 Welcome to FNDRS Next.js Enterprise!")
  console.log("Create a new FNDRS application with enterprise-grade features.\n")

  // Check Node.js version
  if (!checkNodeVersion()) {
    log.error(`Node.js version ${config.requirements.nodeVersion} is required.`)
    log.error(`Current version: ${process.version}`)
    log.error("Please upgrade Node.js and try again.")
    console.log(`\n📦 Download: ${config.urls.nodejs}`)
    process.exit(1)
  }

  // Parse command line arguments
  const args = process.argv.slice(2)
  let projectName = null
  let skipPrompts = false

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === "--yes" || arg === "-y") {
      skipPrompts = true
    } else if (!projectName && !arg.startsWith("-")) {
      projectName = arg
    }
  }

  // Interactive prompts
  let options = {
    projectName: projectName || config.defaults.projectName,
    packageManager: config.defaults.packageManager,
    installDeps: config.defaults.installDeps,
    features: {
      typescript: true,
      tailwind: true,
      eslint: true,
      prettier: true,
      jest: true,
      playwright: true,
      storybook: false,
    },
  }

  if (!skipPrompts) {
    try {
      // Get project name
      if (!projectName) {
        const nameResponse = await prompts({
          type: "text",
          name: "projectName",
          message: "What will your project be called?",
          initial: config.defaults.projectName,
          validate: (name) => {
            if (!name) return "Project name is required."
            if (!config.validation.projectName.pattern.test(name)) {
              return config.validation.projectName.message
            }
            return true
          },
        })
        options.projectName = nameResponse.projectName
      }

      // Package manager selection
      const packageManagerResponse = await prompts({
        type: "select",
        name: "packageManager",
        message: "Which package manager would you like to use?",
        choices: [
          { title: "npm", value: "npm" },
          { title: "pnpm", value: "pnpm" },
          { title: "yarn", value: "yarn" },
        ],
        initial: 0,
      })
      options.packageManager = packageManagerResponse.packageManager

      // Features selection
      const featuresResponse = await prompts({
        type: "multiselect",
        name: "features",
        message: "Which features would you like to include?",
        choices: [
          { title: "TypeScript", value: "typescript", selected: true },
          { title: "Tailwind CSS", value: "tailwind", selected: true },
          { title: "ESLint", value: "eslint", selected: true },
          { title: "Prettier", value: "prettier", selected: true },
          { title: "Jest Testing", value: "jest", selected: true },
          { title: "Playwright E2E Testing", value: "playwright", selected: true },
          { title: "Storybook", value: "storybook", selected: false },
        ],
      })

      // Convert features array to object
      options.features = {}
      featuresResponse.features.forEach((feature) => {
        options.features[feature] = true
      })

      // Install dependencies
      const installResponse = await prompts({
        type: "select",
        name: "installDeps",
        message: "Should we install dependencies now?",
        choices: [
          { title: "Yes, install dependencies", value: "yes" },
          { title: "No, I'll install them later", value: "no" },
        ],
        initial: 0,
      })
      options.installDeps = installResponse.installDeps === "yes"
    } catch (error) {
      log.error("Failed to get user input. Exiting.")
      process.exit(1)
    }
  }

  if (!options.projectName) {
    log.error("Project name is required. Exiting.")
    process.exit(1)
  }

  const targetDir = path.resolve(process.cwd(), options.projectName)

  // Check if directory exists
  if (fs.existsSync(targetDir)) {
    log.error(`Directory '${options.projectName}' already exists.`)
    log.error("Please choose a different name or remove the existing directory.")
    process.exit(1)
  }

  try {
    log.step(`Creating project in ./${options.projectName}...`)

    // Create target directory
    await fs.ensureDir(targetDir)

    // Get template directory
    const templateDir = getTemplateDir()

    // Copy template files
    const copySuccess = await copyTemplateFiles(templateDir, targetDir, options)

    if (!copySuccess) {
      log.error("Failed to copy template files. Exiting.")
      process.exit(1)
    }

    log.success(`Project created successfully!`)

    // Install dependencies if requested
    let depsInstalled = false
    if (options.installDeps) {
      depsInstalled = await installDependencies(targetDir, options.projectName, options.packageManager)
    }

    // Success message
    log.title("✅ Success! Your new FNDRS app is ready!")
    console.log(`📁 Location: ${targetDir}`)

    if (!depsInstalled) {
      console.log("\n📦 To install dependencies:")
      console.log(`  cd ${options.projectName}`)
      console.log(`  ${options.packageManager} install`)
    }

    console.log("\n🚀 To get started:")
    console.log(`  cd ${options.projectName}`)
    console.log(`  ${options.packageManager} run dev`)

    console.log(`\n📚 Documentation: ${config.urls.documentation}`)
    console.log(`🐛 Issues: ${config.urls.issues}`)
    console.log(`⭐ Star us: ${config.urls.repository}`)
  } catch (error) {
    log.error(`Failed to create project: ${error.message}`)
    console.log("\n💡 Troubleshooting:")
    console.log("• Make sure you have write permissions in the current directory")
    console.log("• Try running with sudo if needed")
    console.log("• Check your Node.js version (requires >=18.0.0)")
    process.exit(1)
  }
}

// Handle process termination
process.on("SIGINT", () => {
  console.log("\n\n❌ Operation cancelled by user.")
  process.exit(0)
})

// Run the CLI
main().catch((error) => {
  log.error(`Unexpected error: ${error.message}`)
  process.exit(1)
})
