"use client"

import { Check, Copy, Terminal } from "lucide-react"
import { useState } from "react"

export function CopyCommand() {
  const [copied, setCopied] = useState(false)
  const command = "npm create fndrs-app@latest"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy command:", err)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="relative w-full">
        <div className="flex items-center gap-3 w-full px-6 py-2 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl">
          <Terminal className="h-5 w-5 text-blue-400 flex-shrink-0" />
          <code className="flex-1 text-sm text-gray-200 font-mono select-all">{command}</code>
          <button
            onClick={copyToClipboard}
            className="flex-shrink-0 p-2.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-200 flex items-center justify-center group"
            title={copied ? "Copied!" : "Copy command"}>
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4 text-blue-400 group-hover:text-blue-300" />
            )}
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-400 text-center max-w-md">
        Run this command in your terminal to create a new FNDRS project with all the features you need
      </p>
    </div>
  )
}
