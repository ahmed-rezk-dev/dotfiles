import { execFile } from "node:child_process"
import { promisify } from "node:util"
import { Plugin } from "@opencode/plugin"

const execFileAsync = promisify(execFile)

// 🔧 CONFIGURATION: Set to true to enable this plugin
const ENABLED = false

export default Plugin.define({
  id: "notify",
  setup(ctx) {
    // Plugin disabled - set ENABLED = true to activate
    if (!ENABLED) {
      return
    }

    const controller = new AbortController()

    void (async () => {
      try {
        for await (const event of ctx.event.subscribe({
          types: ["session.idle"],
          signal: controller.signal,
        })) {
          await execFileAsync("say", ["Your code is done!"])
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("notify: event stream failed:", error)
        }
      }
    })()

    return () => controller.abort()
  },
})
