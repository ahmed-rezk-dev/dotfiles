---
name: mavos-run-be-pr-branch-locally
description: "Use when a mavos-frontend task depends on an open mavos-store-services PR and you need that backend branch running locally (separate port) without touching the user's running func host."
---

# Run a mavos-store-services PR branch locally (alongside the user's host)

Use `workmux` for worktrees, never raw `git worktree add`. Never checkout/stash in the user's main checkout (blocked by policy and it has a running func host, usually on :7071).

1. Read the PR first (`read pr://Mav-Dev-MavOS/mavos-store-services/<N>`). Get the real route and query params from the diff (`git fetch origin <branch>; git show origin/<branch>:packages/http-api/src/workorders/<func>/index.ts`). The route in the PR can differ from what the FE assumed (e.g. `workorders/list?storeNumber=N`, not `stores/{n}/workorders/open`). Also read the SQL/status filters and compare with the ticket AC.
2. `cd mavos-store-services && workmux add --pr <N> --name <short-name> -b -C` creates `mavos-store-services__worktrees/<short-name>`. BE has no `.workmux.yaml`, so nothing is copied or symlinked.
3. Copy `packages/http-api/local.settings.json` (gitignored; main checkout has it) into the worktree and change `Host.LocalHttpPort` to a free port (7072) and `Host.CORS` to the FE origins (`http://localhost:3000,http://localhost:3001`). Use python/json to edit. NEVER grep/sed-print this file: it holds secrets.
4. In the worktree: `npm ci`, then `npm run build-core && npm run build-test-utils && npm run build-http-api`. Do not run the full `npm run build` (license-header step).
5. Start as a service: `cd packages/http-api && func start` (bash tool with `name`, `pty`, `ready` log `func-get-...|Host started`). Do not `read proc://<name>` without a line selector (`proc://<name>:-45`); the startup dump is 1000 lines.
6. Smoke: `curl -H 'Origin: http://localhost:3001' 'http://localhost:7072/api/<route>'`. If every DB-backed endpoint (health-check, stores/10) returns 500 with `Login failed for user '<token-identified principal>'`, it is an Azure credential problem, same on the user's own host: ask the user to `az login` with an account the SQL server accepts. It is not a code bug.
7. FE side: `NEXT_PUBLIC_SERVER_API=http://localhost:7072/api npm run dev -- -p 3001` in the FE worktree (BE CORS must list that origin). Entra SSO needs the user to log in in the headed browser tab and pick a store; closing the tab drops the session.
8. Stop the func service and tell the user the worktree/port when done. Remove with `workmux remove <name>` only when the user says so.

FE gotchas in the same flow:
- `workmux sync-files` in an FE worktree replaces a local `node_modules` with the shared symlink to the main checkout. Install a newer `mavos-types` into the shared one (`npm install --no-save github:Mav-Dev-MavOS/mavos-types#vX.Y.Z` in the main checkout) after asking the user.
- The `node_modules` symlink shows as untracked in the worktree; never `git add -A`.
- `npm install` rewrites the lockfile broadly; for a `mavos-types` bump edit only the pin in `package.json` and the `node_modules/mavos-types` version + resolved commit in `package-lock.json`.
