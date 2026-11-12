---
name: mavos-frontend-commit-hook-workarounds
description: "Use when a git commit in a mavos-frontend worktree is rejected by husky pre-commit (tsc errors in untouched files, license check failing on graphify-out, missing .husky/_/husky.sh), or when setting up a brand-new worktree to run the dev server or jest."
---

# mavos-frontend commit hook workarounds

Pre-commit runs `lint-staged` (full `npx tsc`) then `npm run check-license-header`. Never use `--no-verify`.

## 1. tsc errors in files you did not touch
Stale `node_modules/mavos-types`. Compare versions:
```bash
node -p "require('./node_modules/mavos-types/package.json').version"
grep '"mavos-types"' package.json
```
If they differ (touches only node_modules, ~15s):
```bash
npm install --no-save --no-audit --no-fund --ignore-scripts "github:Mav-Dev-MavOS/mavos-types#<pinned-tag>"
npx tsc --noEmit
```
Do this on a REAL node_modules copy (see section 5), never through a symlink, or you modify the main checkout's modules.

## 2. `License not found in graphify-out/...`
Worktrees may contain a `graphify-out` symlink to `../../mavos-frontend/graphify-out`. license-check-and-add scans it (untracked or not) and renaming it inside the worktree does not help (hidden dirs are scanned too). Move it outside the tree for the commit, then restore:
```bash
mv graphify-out /tmp/graphify-out.link
git commit -m "..."
mv /tmp/graphify-out.link graphify-out
```
Restore in the same command so a failed commit cannot leave it missing. Permanent fix would be adding `graphify-out` to `.gitignore` (the check reads it as ignoreFile).

## 3. `index.lock` exists
Transient concurrent git process; check `ps` and that the lock is gone, then retry.

## 4. `.husky/pre-commit: .husky/_/husky.sh: No such file or directory` (brand-new worktree)
`.husky/_/` is gitignored generated content, so a fresh `git worktree add` lacks it. Copy it from any existing worktree:
```bash
cp -R ../<other-worktree>/.husky/_ .husky/_
```
Do NOT run `npx husky`: `core.hooksPath` is repo-wide config shared by all worktrees and it would rewrite it.

## 5. Setting up a fresh worktree to run `next dev`
- `.env.local`: symlink to `../../mavos-frontend/.env.local` is fine. NOTE it points `NEXT_PUBLIC_SERVER_API` at the QA APIM (real QA data), not the local func host on :7071.
- `node_modules`: do NOT symlink (Turbopack: "Symlink [project]/node_modules is invalid, it points out of the filesystem root"). Clone with APFS copy-on-write: `cp -cR ../../mavos-frontend/node_modules node_modules` (~30s). Many existing worktrees (e.g. the MV-13801 one) have `node_modules` as a SYMLINK to the main checkout; `cp -cR <such-worktree>/node_modules` copies the symlink itself and `ls node_modules | wc -l` still looks fine. Always copy from the main checkout's real directory and confirm with `ls -ld node_modules` (must start with `d`, not `l`). jest/tsc work through a symlink, only `next dev` fails.
- Pick a source whose deps match `package-lock.json`; compare `@awesome.me/kit-6abd8026f9` version (lock pins e.g. 1.0.28; an older 1.0.24 install fails with "Export faBarsFilter doesn't exist"). Check also `mavos-types` per section 1.
- Port 3000 is usually another worktree's server (check `lsof -p <pid>` cwd); do not kill it. Run yours with `npx next dev -p 3001` as a named service. Entra SSO accepted `http://localhost:3001/` as redirect URI (verified 2026-11-11), so login works there; the agent cannot log in, the user signs in in the headed `browser.open({headed:true, persist:true})` tab and picks the store.
- Icons: the FA kit `@awesome.me/kit-6abd8026f9` is a subset (no folder icons). A Figma duotone icon exported as one SVG is often only ONE layer; render it and check before shipping.

## Tooling gotchas in worktrees
- The `edit` tool resolves relative paths against the session cwd, not the bash `cwd` param; use absolute worktree paths or you edit the main checkout.
- `git checkout -- <file>` is blocked by workspace policy; undo by editing forward.
- After a hashline edit that uses several PUTs, re-read the file: line numbers refer to the original file and a duplicated line can slip in.

## Commit message
Conventional commits with Jira id, e.g. `fix(reservations): MV-13538 <summary>`. Stage files explicitly; leave unrelated untracked files (e.g. CONTEXT.md, node_modules) out.

## Branch naming
Bug fixes use `bugfix/MV-XXXX-slug` (user preference), features `feature/MV-XXXX-slug`. Worktree path: `../mavos-frontend__worktrees/mv-<ticket>-<slug>` (or `feature-mv-<ticket>-<slug>`), created off `origin/main`. When the base PR is unmerged, branch off the PR branch and run `git branch --unset-upstream` so pushes don't target the base branch; rebase onto main after it merges.
