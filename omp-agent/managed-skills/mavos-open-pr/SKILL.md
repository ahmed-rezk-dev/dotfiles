---
name: mavos-open-pr
description: "Open a PR from a mavos-frontend worktree branch using the repo's PR template and honest verification evidence, including targeting the Jira Fix version's release branch and committing from the main checkout when branch switching is blocked."
---

# Opening a PR in mavos-frontend

## Steps

1. Read `.github/pull_request_template.md` first. Its sections are **Jira Ticket / Context / Changes / Additional Notes / Checklist** — a generic `Summary/Changes/Testing` template from an invoked skill is overridden by this file. Fill the actual sections.
2. Resolve the target branch from the ticket's Fix version BEFORE pushing (see "Targeting a release branch").
3. Gather context:
   - `git log origin/<target>..HEAD --format="%h %s"` for branch-only commits (`origin/main...HEAD` log also lists merge-side commits — ignore those).
   - `git diff origin/<target>...HEAD --stat`, then read the changed files themselves for the real diff.
   - Check push state with `git log origin/<branch>..HEAD --oneline | wc -l`; commit only genuine uncommitted work, never `--no-verify`.
4. Verify before writing the Testing section — run the tests you will cite:
   `npx jest <paths>` and `npx tsc --noEmit`.
5. Only claim verification actually exercised. If the UI was checked against a local render/mock and never against QA store data, say so explicitly and leave the "Manually tested" checkbox unticked. Never tick it speculatively.
6. Write the body to a file in one full write (see pitfall below), then:
   `gh pr create --web --base <target> --head <branch> --title "<MV-XXXX title, ≤72 chars>" --body-file <path>`

## Committing from the main checkout (branch switching blocked)

`git checkout` / `git switch` in the shared main checkout is blocked by workspace policy. If your edits are uncommitted on `main`:

1. `git fetch origin main`, then `git worktree add -b feature/MV-XXXX-slug ../mavos-frontend__worktrees/feature-mv-xxxx-slug origin/main`.
2. `git diff -- <files> > /tmp/x.patch` in main, `git -C <wt> apply /tmp/x.patch`.
3. In the new worktree symlink what hooks need: `ln -s <main>/node_modules <wt>/node_modules` and `ln -s <main>/.husky/_ <wt>/.husky/_` (without `.husky/_` the pre-commit fails with `husky.sh: No such file`).
4. `git add <specific files>` only (the node_modules symlink shows as untracked), then `git commit -m "feat(MV-XXXX): ..."` so hooks (lint-staged, tsc, license header) run.
5. Push with an explicit refspec, NOT piped to tail: `git push -u origin <branch>:<branch>` (the new branch tracks origin/main, so a bare push is wrong).
6. Restore the main checkout's copy of your edits with the edit tool (edit forward; `git checkout -- file` is blocked). Also revert `next-env.d.ts` if `next dev` rewrote it (`.next/dev/types` -> `.next/types`).
7. `GLOSSARY.md` is in `.git/info/exclude`, so glossary edits never reach the commit.

## Targeting a release branch

- Get Fix versions: `twg -o json jira workitem get MV-XXXX --output-summary none` (the Atlassian MCP may be disconnected; `twg` works) and read `fixVersions[].name`, e.g. `MavOS v2026.11.04.r1`. Empty fixVersions => `main`.
- Check which branch exists with `git ls-remote --heads origin "release/v2026.11.04.r1" "release/2026-11-04" "hotfix/*2026-11-04*"` in FE and BE (and mavos-types); `git branch -r` can be stale. Hotfix wins over release; no branch => `main`.
- Branch model: only `bugfix/*` may target `release/*`; a `feature/*` branch for a User Story needs the user's explicit OK. Ask which target they want and say why.
- Compare the release branch's `mavos-types` pin and confirm the BE release contains the BE PR: `git merge-base --is-ancestor <be-commit> origin/release/...`.
- If the working branch carries commits that are not on the release branch (later `main` commits), do NOT open the PR from it. In a NEW worktree: `git worktree add ../mv-<ticket>-release-pr -b <branch>-r1 origin/release/<ver>`, `git cherry-pick <sha>`, then push with an explicit refspec `git push -u origin <branch>-r1:<branch>-r1` (the new branch's upstream is the release branch, so a bare `git push` would push to the release branch). Check first that the touched files are identical on main and release (`git diff origin/release/... <main-sha> --stat -- <files>` empty) so the cherry-pick is clean; cherry-pick skips the pre-commit hook, and the new worktree has no `node_modules`, so say tests were not rerun there.

## Pitfall

Do not hand-roll partial file edits through the bash tool — offsets drift and silently duplicate or clobber sections. Write the whole file once, or use the edit tool on a file you have read in this session (re-check line ranges before a PUT range edit).

## Notes

- PR is opened in the browser for the human to review and submit; do not use `gh pr create` without `--web`, and confirm with `gh pr list --head <branch>` that it does not exist until the human submits.
- Worktree branches here are named `MV-<ticket>-<slug>` or `feature/MV-<ticket>-<slug>`; follow the existing worktree's name.
