---
name: mavos-local-browser-verify
description: "Use to verify MavOS UI behavior (job checkboxes, See More lists, quotes, left-panel reservation cards and tags) in the local app via the browser tool, including auth handling and faking API data browser-only."
---

# Verifying MavOS UI locally via browser

1. Check services first: `curl localhost:3000` (Next frontend) and `lsof -iTCP -sTCP:LISTEN -nP | grep -E ':(3000|7071)'` (7071 = Azure Functions backend from mavos-store-services). Confirm WHICH worktree serves the port: `lsof -p <pid> | awk '$4=="cwd"{print $9}'`. Port 3000 may serve another worktree; do not kill the user's server, ask them to switch it or use the port that already serves yours.
2. Auth is Microsoft Entra SSO. A fresh managed Chromium profile has no session and redirects to login. Do NOT type credentials, use repo test-account secrets, or copy session tokens between origins; open the tab with `headed: true, persist: true` and ask the user to log in (including picking the account tile) and choose the store. Closing the tab drops the session.
3. Ask the user for a work-order URL like `http://localhost:3000/check-in/<orderId>` (retail quote screen) or use `/check-in` for the left panel.
4. Engine checkboxes: `tab.observe()` to find the tab named `Engine` (the category tab strip scrolls; click by element id, not text), click it, then click `text/See More` under the Engine box. Extract checkbox labels with `tab.evaluate` over `input[type=checkbox],[role=checkbox]`.
5. Raw data: from inside the tab, `fetch('http://localhost:7071/api/stores/1/jobs?group=engine')` returns `data.jobCodes[]`. Local backend accepts it without auth headers. Other groups: `group=quick|tire_services|...`. Left-panel cards: `GET /api/stores/<n>/workorders` (each card has `workOrderCardType`: unconfirmed, todays_reservations, needs_attention, ...). Scan stores for the card types you need; most have none.
6. Faking data (left panel states like Late reservations) WITHOUT touching the shared dev DB: `tab.addInitScript` that wraps `XMLHttpRequest.prototype.open` to store the URL and overrides the `responseText` getter (axios reads it; do not override `response`) to append fake cards to `data` when the URL matches `/stores/\d+/workorders$`. Use ids like 9000001+ and relative times (`Date.now() - minutes*60000`). Then `goto` the page and read `[id^="reservation-tile-"]` text / `getComputedStyle`. ALWAYS remove it (`for (s of await tab.initScripts()) await tab.removeInitScript(s.id)`) and reload before finishing, otherwise the user later believes real orders were created. Tell the user the cards were fake.
7. Compare to Figma via REST: `curl -H "X-Figma-Token: $FIGMA_API_KEY" https://api.figma.com/v1/files/<fileKey>/nodes?ids=<id>&depth=40` (node-id in URLs uses `-`, API uses `:`), `/v1/images/<fileKey>?ids=...&format=png` for renders. A running process may hold a stale token; `source ~/.zshrc.local` inside the command and never print the value.
8. Close the tab with `browser.close({name})` when done.

Seed -> UI mapping: rows in mavos-db `scripts/seed_data/add_*_jobs.sql` (table dbo.store_jobs); `is_above_fold=0` = appears only after See More; see CONTEXT.md 'Service Job Checkbox'.
