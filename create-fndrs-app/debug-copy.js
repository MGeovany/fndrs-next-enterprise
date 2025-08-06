#!/usr/bin/env node

const fs = require("fs-extra")
const path = require("path")
const config = require("./config")

async function debugCopy() {
  const templateDir = path.resolve(__dirname, "..")
  const targetDir = path.resolve(__dirname, "../debug-test")

  console.log("🔍 Debugging file copy...")
  console.log(`Template dir: ${templateDir}`)
  console.log(`Target dir: ${targetDir}`)

  // Clean up
  if (fs.existsSync(targetDir)) {
    await fs.remove(targetDir)
  }

  // Create target directory
  await fs.ensureDir(targetDir)

  console.log("\n📁 Files in template directory:")
  const templateFiles = await fs.readdir(templateDir)
  templateFiles.forEach((file) => {
    console.log(`  - ${file}`)
  })

  console.log("\n🚫 Excluded files:")
  config.excludes.forEach((exclude) => {
    console.log(`  - ${exclude}`)
  })

  console.log("\n📋 Copying files...")
  let copiedCount = 0
  let excludedCount = 0

  await fs.copy(templateDir, targetDir, {
    filter: (src) => {
      const relativePath = path.relative(templateDir, src)
      const isExcluded = config.excludes.some((ex) => src.includes(path.sep + ex))

      if (isExcluded) {
        console.log(`  ❌ Excluded: ${relativePath}`)
        excludedCount++
        return false
      } else {
        console.log(`  ✅ Copied: ${relativePath}`)
        copiedCount++
        return true
      }
    },
  })

  console.log(`\n📊 Summary:`)
  console.log(`  ✅ Copied: ${copiedCount} files`)
  console.log(`  ❌ Excluded: ${excludedCount} files`)

  console.log("\n📁 Files in target directory:")
  const targetFiles = await fs.readdir(targetDir)
  targetFiles.forEach((file) => {
    console.log(`  - ${file}`)
  })

  // Clean up
  await fs.remove(targetDir)
  console.log("\n🧹 Cleaned up test directory")
}

debugCopy().catch(console.error)
