---
name: mavos-store-services-worktree-commit
description: "Use when creating a worktree, running tests, or committing in a mavos-store-services git worktree and husky, license check, or missing node_modules blocks you."
---

# mavos-store-services: worktree setup, test, commit

Worktrees live in `/Users/ahmed.rezk/method/mavos/mavos-store-services__worktrees/<branch-slug>`, created off `origin/main` (`git worktree add -b bugfix/MV-XXXX-slug <path> origin/main`). The main checkout is often on another feature branch, so do not use it for new work. Never use `--no-verify`.

## 1. Run tests / tsc / eslint (fresh worktree has no node_modules)
Symlink from the main checkout, run, then remove the links (symlinks show as untracked and are not covered by .gitignore):
```bash
ln -s ../../mavos-store-services/node_modules node_modules
ln -s ../../../../mavos-store-services/packages/core/node_modules packages/core/node_modules
cd packages/core && npx jest __tests__/data/mavis-eac/payments.test.ts
# when done:
rm node_modules packages/core/node_modules
```
Standalone `tsc --noEmit` shows unrelated errors from the main checkout's mavos-types version; ignore those unless they are in your files. Standalone eslint fails on a lowercase-path tsconfig lookup; the commit hook's eslint works.

## 2. `.husky/pre-commit: .husky/_/husky.sh: No such file`
`.husky/_` is gitignored. Copy it, do NOT run `npx husky` (core.hooksPath is repo-wide):
```bash
cp -R ../../mavos-store-services/.husky/_ .husky/_
```

## 3. Hook order and what it catches
`lint-staged` runs `eslint --fix` + `prettier --write` + full `tsc`, then `npm run check-license-header`. ESLint enforces `@typescript-eslint/require-await`: in jest mocks use `jest.fn(() => Promise.resolve(x))`, not `jest.fn(async () => x)`. New files need the license header comment.

## 4. `ENOTDIR ... .git/` from check-license-header
In a worktree `.git` is a file; the config ignore `"./.git/"` in `license-add-config.json` is stat'ed as a directory. Temporarily change that entry to `".git"`, commit (hooks run fully), then restore the original:
```bash
cp license-add-config.json /tmp/license-add-config.json.orig
sed -i '' 's#"./.git/",#".git",#' license-add-config.json
git commit -m "MV-XXXX: <summary>"
cp /tmp/license-add-config.json.orig license-add-config.json
```
Stage files explicitly so the config edit and symlinks never enter the commit.

## 5. Commit, push, PR
- Commit message style in this repo: `MV-XXXX: <summary>` (squash-merged, PR number appended).
- Push piped output can mask failures; check the exit code. `git push -u origin <branch>`.
- PR: `gh pr create --base main --head <branch> --title "MV-XXXX: ..." --body-file <file>`, body from `.github/pull_request_template.md` (Jira Ticket, Context, Changes, Additional Notes, Checklist). Base is `main` unless the ticket's Fix version has a cut release/hotfix branch (check with `git ls-remote --heads origin`).
- Leave the checklist boxes unchecked when something was not actually done (e.g. manual test against EAC/Tiremax).
