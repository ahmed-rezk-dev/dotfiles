import { execFile } from "node:child_process"
import { promisify } from "node:util"
import { Plugin } from "@opencode/plugin"

const execFileAsync = promisify(execFile)

export default Plugin.define({
  id: "workmux-status",
  setup(ctx) {
    // OpenCode can emit repeated `session.status busy` events for a single turn,
    // and can even emit a stale trailing `busy` after `idle` at the end. Track
    // per-session status so workmux only sees real transitions.
    const lastStatusBySession = new Map<string, string>()
    const acceptBusyBySession = new Map<string, boolean>()

    async function setStatus(sessionID: string | undefined, status: string) {
      if (!sessionID) {
        return
      }

      const previous = lastStatusBySession.get(sessionID)
      // Ignore the final stale `busy` OpenCode sometimes emits after a session is
      // already done. The next user message re-arms `working` for the new turn.
      if (status === "working" && acceptBusyBySession.get(sessionID) === false) {
        return
      }
      if (previous === status) {
        return
      }

      lastStatusBySession.set(sessionID, status)
      acceptBusyBySession.set(sessionID, status !== "done")

      try {
        await execFileAsync("workmux", ["set-window-status", status])
      } catch (error) {
        // workmux may be absent or not running inside a workmux window.
        console.error(`workmux-status: failed to set "${status}":`, error)
      }
    }

    const controller = new AbortController()

    void (async () => {
      try {
        for await (const event of ctx.event.subscribe({ signal: controller.signal })) {
          switch (event.type) {
            // A user prompt was admitted for the session, so re-arm `working`
            // for the new turn. This replaces V1's `message.updated` hook.
            case "session.inbox.delivered":
              acceptBusyBySession.set(event.data.sessionID, true)
              break
            case "session.status":
              if (event.data.status.type === "busy") {
                await setStatus(event.data.sessionID, "working")
              }
              if (event.data.status.type === "idle") {
                await setStatus(event.data.sessionID, "done")
              }
              break
            case "permission.asked":
              await setStatus(event.data.sessionID, "waiting")
              break
            case "form.created":
              await setStatus(event.data.form.sessionID, "waiting")
              break
            case "permission.replied":
            case "form.replied":
              await setStatus(event.data.sessionID, "working")
              break
            case "session.idle":
              await setStatus(event.data.sessionID, "done")
              break
          }
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("workmux-status: event stream failed:", error)
        }
      }
    })()

    return () => controller.abort()
  },
})
