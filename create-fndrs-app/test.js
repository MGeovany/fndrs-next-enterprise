#!/usr/bin/env node
import { execSync } from "child_process"
import path from "path"
import { fileURLToPath } from "url"

import fs from "fs-extra"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const testProjectName = "test-fndrs-app"
const testDir = path.resolve(process.cwd(), testProjectName)

console.log("🧪 Testing create-fndrs-app CLI...")

// Clean up any existing test directory
if (fs.existsSync(testDir)) {
  console.log("Cleaning up existing test directory...")
  fs.removeSync(testDir)
}

try {
  // Test the CLI
  console.log("Running CLI test...")
  execSync(`node index.js ${testProjectName} --yes`, {
    stdio: "inherit",
    cwd: __dirname,
  })

  // Verify the project was created
  if (fs.existsSync(testDir)) {
    console.log("✅ Project created successfully!")

    // Check for essential files
    const essentialFiles = ["package.json", "next.config.mjs", "app/page.tsx", "tailwind.config.js", "tsconfig.json"]

    let allFilesExist = true
    for (const file of essentialFiles) {
      const filePath = path.join(testDir, file)
      if (!fs.existsSync(filePath)) {
        console.log(`❌ Missing essential file: ${file}`)
        allFilesExist = false
      }
    }

    if (allFilesExist) {
      console.log("✅ All essential files are present!")
    } else {
      console.log("❌ Some essential files are missing!")
    }

    // Check package.json
    const packageJson = fs.readJsonSync(path.join(testDir, "package.json"))
    if (packageJson.name === testProjectName) {
      console.log("✅ Package.json name updated correctly!")
    } else {
      console.log("❌ Package.json name not updated!")
    }

    console.log("\n🎉 CLI test completed successfully!")
    console.log(`📁 Test project created at: ${testDir}`)
  } else {
    console.log("❌ Project was not created!")
  }
} catch (error) {
  console.error("❌ CLI test failed:", error.message)
  process.exit(1)
}
