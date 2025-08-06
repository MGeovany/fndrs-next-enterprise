#!/usr/bin/env node

const { execSync, spawn } = require("child_process")
const fs = require("fs-extra")
const path = require("path")
const config = require("./config")

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

// Check if package manager is available
function checkPackageManager(manager) {
  try {
    execSync(`${manager} --version`, { stdio: "ignore" })
    return true
  } catch {
    return false
  }
}

// Install dependencies with real-time output
async function installDependencies(targetDir, projectName) {
  log.step("Installing dependencies...")

  const managers = config.requirements.packageManagers.map((manager) => ({
    name: manager,
    command: `${manager} install`,
  }))

  for (const manager of managers) {
    if (!checkPackageManager(manager.name)) {
      log.warning(`${manager.name} not found, trying next...`)
      continue
    }

    try {
      log.info(`Trying ${manager.name}...`)

      // Use spawn for real-time output
      const child = spawn(manager.name, ["install"], {
        cwd: targetDir,
        stdio: "inherit",
        env: { ...process.env, FORCE_COLOR: "1" },
      })

      return new Promise((resolve, reject) => {
        child.on("close", (code) => {
          if (code === 0) {
            log.success(`Dependencies installed successfully with ${manager.name}!`)
            resolve(true)
          } else {
            log.warning(`${manager.name} failed with code ${code}`)
            resolve(false)
          }
        })

        child.on("error", (error) => {
          log.warning(`${manager.name} failed: ${error.message}`)
          resolve(false)
        })
      })
    } catch (error) {
      log.warning(`${manager.name} failed: ${error.message}`)
      continue
    }
  }

  log.error("All package managers failed. Please install dependencies manually:")
  console.log(`  cd ${projectName}`)
  console.log("  npm install")
  return false
}

// Verify project creation
async function verifyProject(targetDir) {
  log.step("Verifying project structure...")

  let allFilesExist = true
  for (const file of config.essentialFiles) {
    const filePath = path.join(targetDir, file)
    if (fs.existsSync(filePath)) {
      log.success(`${file} ✓`)
    } else {
      log.error(`${file} missing`)
      allFilesExist = false
    }
  }

  if (allFilesExist) {
    log.success("All essential files are present!")
  } else {
    log.warning("Some files are missing. The project may not work correctly.")
  }

  return allFilesExist
}

// Main installation function
async function installProject(projectName) {
  const targetDir = path.resolve(process.cwd(), projectName)

  if (!fs.existsSync(targetDir)) {
    log.error(`Project directory '${projectName}' not found.`)
    log.error("Please run the CLI first to create the project.")
    process.exit(1)
  }

  try {
    // Install dependencies
    const depsInstalled = await installDependencies(targetDir, projectName)

    if (depsInstalled) {
      // Verify project structure
      await verifyProject(targetDir)

      log.title("✅ Installation completed successfully!")
      console.log(`📁 Project location: ${targetDir}`)
      console.log("\n🚀 To get started:")
      console.log(`  cd ${projectName}`)
      console.log("  npm run dev")
    } else {
      log.warning("Dependency installation failed.")
      console.log("\n💡 Troubleshooting:")
      console.log("• Check your internet connection")
      console.log("• Try running manually: cd " + projectName + " && npm install")
      console.log("• Make sure you have Node.js >=20.0.0 installed")
    }
  } catch (error) {
    log.error(`Installation failed: ${error.message}`)
    process.exit(1)
  }
}

// CLI
if (require.main === module) {
  const projectName = process.argv[2]

  if (!projectName) {
    log.error("Please provide a project name.")
    console.log("Usage: node install.js <project-name>")
    process.exit(1)
  }

  log.title("🔧 FNDRS Project Installer")
  installProject(projectName)
}

module.exports = { installProject, verifyProject }
