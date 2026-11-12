---
name: mavos-fe-commit-from-main-checkout
description: "Use when mavos-frontend edits were made in the main checkout (branch switching blocked) and need to be committed, pushed and opened as a PR with husky hooks working."
---

# Commit main-checkout edits via a new worktree (mavos-frontend)

`git checkout` / `git switch` are blocked in the shared main checkout. Do not work around it; use a worktree.

1. Save the change: `git diff -- <changed files> > /tmp/<ticket>.patch` (GLOSSARY.md is git-excluded; ignore it).
2. `git fetch origin main`, then `git worktree add -b feature/MV-XXXX-slug ../mavos-frontend__worktrees/feature-mv-xxxx-slug origin/main`.
3. `git -C <wt> apply /tmp/<ticket>.patch`.
4. Make hooks and tests work in the worktree: `ln -s <main>/node_modules <wt>/node_modules` and `ln -s <main>/.husky/_ <wt>/.husky/_`. Without the second link the pre-commit fails with `.husky/_/husky.sh: No such file`. If `mavos-types` in node_modules is stale vs package.json, `npm install --no-save --no-audit --no-fund --ignore-scripts github:Mav-Dev-MavOS/mavos-types#<pinned>`.
5. `git add <explicit files>` only (the node_modules symlink appears as untracked). Commit with `git commit -m "feat(MV-XXXX): ..."` (hooks run tsc/eslint/prettier/license check; never --no-verify). `npx cz` is interactive, so use -m.
6. Push with an explicit refspec and do not pipe to tail: `git push -u origin <branch>:<branch>` (the branch's upstream is origin/main).
7. PR: follow skill mavos-open-pr (`gh pr create --web ... --body-file`). Leave 'Manually tested' unticked unless verified on QA data.
8. Restore the main checkout's edited files by editing forward with the edit tool (checkout is blocked). If `next dev` ran, `next-env.d.ts` was rewritten (`.next/dev/types/...` -> `.next/types/...`); edit it back.

Running FE on a port other than 3000 against local BE needs a CORS proxy (BE Host.CORS allows only localhost:3000): small node proxy on 7072 -> 7071 adding Access-Control-Allow-Origin for the FE origin, and start FE with `NEXT_PUBLIC_SERVER_API=http://localhost:7072/api npx next dev -p 3001`.
