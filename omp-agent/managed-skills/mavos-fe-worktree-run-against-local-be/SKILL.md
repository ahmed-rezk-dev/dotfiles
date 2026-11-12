---
name: mavos-fe-worktree-run-against-local-be
description: Use when verifying a mavos-frontend workmux worktree against the local mavos-store-services backend (including a BE PR branch) in the browser tool.
---

# Run a mavos-frontend worktree against the local BE

1. Create/manage worktrees only with `workmux` (`workmux add`, `list`, `rebase`, `remove`). `.workmux.yaml` symlinks `node_modules`, `.env.local`, `GLOSSARY.md`, `docs/agents`, `.agents-local.md` and copies `.omp`.
   - NEVER run `workmux sync-files` in a worktree that has a deliberately local `node_modules`: it replaces it with the shared symlink (older `mavos-types`).
   - A newer `mavos-types` must be installed into the SHARED main-checkout `node_modules` (`npm install --no-save github:Mav-Dev-MavOS/mavos-types#vX.Y.Z` in `mavos-frontend`). Ask the user first; it affects every worktree.
   - Bump `package.json`/`package-lock.json` in the worktree by hand-editing only the mavos-types lines (version + resolved commit); plain `npm install` rewrites ~90 unrelated lock lines.
2. BE PR branch: user checks it out in the main `mavos-store-services` folder (agent harness blocks `git checkout`/`switch`/`stash`). Afterwards: `npm ci`, `npm run build-core && npm run build-test-utils && npm run build-http-api`, `func start` in `packages/http-api` (port 7071, CORS only `http://localhost:3000`).
3. Because BE CORS allows only :3000, run the worktree FE on :3000. If busy, the user has authorised killing the existing server on :3000 (`lsof -tiTCP:3000 -sTCP:LISTEN`). No proxy needed.
4. In a workmux worktree Turbopack crashes ('Symlink [project]/node_modules ... points out of the filesystem root'). Start with `npx next dev --webpack -p 3000`. `.env.local` already has `NEXT_PUBLIC_SERVER_API=http://localhost:7071/api` and MSW off.
5. Browser tool: open one tab with `headed: true, persist: true, app: {relay:false, tern:false}`. Entra SSO is per origin and lost when the tab closes; ask the user to log in (never type credentials), then pick a store on `/` (e.g. `text/#4: Peekskill`) and `goto` the page under test with `waitUntil: 'domcontentloaded'` and a long timeout (webpack compiles on demand). Keep the tab open between checks.
6. Find a store with data by scanning `GET /api/<endpoint>` over `GET /api/stores/` store numbers (dev store 1 has ~900 open work orders; store 4 has 4).
7. Never grep `local.settings.json` with partial masking; it prints secrets. If every DB-backed endpoint returns 500 with 'Login failed for user <token-identified principal>', it is an Azure login problem (`az login` with an accepted account), not code.
8. Cleanup: kill dev servers/proxies you started, close the browser tab, remove temp files in /tmp.
