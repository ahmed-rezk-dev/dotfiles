---
name: read-slack-thread-via-browser-relay
description: "Use when given a Slack permalink (method.slack.com/archives/...) and you must read the message, replies, or screenshot attachments; fetch returns 403 and no Slack MCP is configured."
---

# Read a Slack thread via omp browser relay

Prereq: omp relay extension connected (badge "on"). Check with `browser.targets({app:{relay:true}})` only to see user tabs; not required to open a new one.

1. Convert permalink `https://method.slack.com/archives/<CH>/p<TS>` to `https://method.slack.com/messages/<CH>/p<TS>` (archives/ URL stops on a 'Launching desktop app' page).
2. `tab = await browser.open({name, url:'about:blank', app:{relay:true}, persist:true})`, then `try { await tab.goto(url) } catch {}` — Slack detaches the relay (`target_closed`) but the tab stays alive; verify with `browser.tabs()`. Wait ~12s; it lands on `app.slack.com/client/T024FHH0A/<CH>`.
3. Message `p1793632498366729` -> selector `[data-msg-ts="1793632498.366729"]` (10-digit seconds + '.' + rest). `tab.evaluate` to read its `innerText`; click its button matching /repl/ to open the thread pane; read `.p-flexpane` innerText.
4. Screenshots attached: get rect of `.p-flexpane .p-file_image_thumbnail__image`, `tab.clickAt(x,y)`, then `tab.screenshot({})` to read the enlarged image.
5. `Escape`, then `browser.close({name})`.

Notes: Don't re-run a call after a 'detached' error without checking `browser.tabs()` first. If open fails with 'extension never connected', ask user to run `omp browser-relay install` / enable the extension. Fallback: ask the user to paste the thread.
