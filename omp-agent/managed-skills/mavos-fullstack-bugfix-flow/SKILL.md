---
name: mavos-fullstack-bugfix-flow
description: "Use when fixing a MavOS bug that spans frontend, backend (mavos-store-services) and DB: branching, reproducing via sqlit/curl/browser, committing past hooks, and opening paired PRs."
---

# MavOS full-stack bugfix flow

1. **Ticket**: read the Jira issue (atlassian getJiraIssue). Bug tickets use branch `bugfix/MV-XXXX-short-name` in every repo touched (frontend worktree + `mavos-store-services` + `mavos-db` if needed).
2. **Reproduce with real data**:
   - Raw WO: `curl localhost:7071/api/workorders/<id>/services` (service items live here, not in `/workorders/<id>`; no auth needed locally).
   - DB row: `sqlit query -c "Mavos QA" -q "SELECT ... FROM service_items WHERE service_item_id=..."` (read-only; local backend uses the same shared QA DB, so wrap any write in BEGIN TRAN/ROLLBACK).
   - UI: `browser.open` `http://localhost:3000/check-in/<id>`; ask the user to log in if redirected to Entra. Port 3000 may be held by another worktree's dev server (`lsof -p <pid> | grep cwd`); start this worktree with `npx next dev -p 3000` once free. Undo any test data you add to a shared QA order.
   - API tests: Bruno CLI `bru`, collections in `mavos-store-services/bruno`.
3. **Fix test-first in each layer** (backend jest in `packages/core/__tests__`, frontend jest in `__tests__/`). Run related suites + `npx tsc --noEmit` + eslint on touched files.
4. **Commit**: `MV-XXXX: Summary`; stage only your files (the user often has unrelated uncommitted bruno edits). Frontend hook runs full `tsc`; if it fails with unrelated mavos-types errors, installed version is stale: `npm install --no-save --no-audit --no-fund --ignore-scripts "github:Mav-Dev-MavOS/mavos-types#<version from package.json>"`. Never `--no-verify`.
5. **PRs**: write body from `.github/pull_request_template.md` to a temp file, `git push -u origin <branch>`, `gh pr create --base main --head <branch> --title "MV-XXXX: ..." --body-file <file>`. Leave unchecked any checklist box not actually exercised (e.g. end-to-end backend import) and say so.
6. Keep `CONTEXT.md` (gitignored locally in mavos-frontend) as a glossary only.
