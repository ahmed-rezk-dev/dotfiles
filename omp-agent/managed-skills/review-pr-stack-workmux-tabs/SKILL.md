---
name: review-pr-stack-workmux-tabs
description: "Use when reviewing a stack of related PRs (same Jira ticket) and the user wants every PR's review draft opened in its own workmux/tmux tab for interactive editing, with you as master controlling them."
---

## Procedure (worked for MV-13355, 8 PRs across mavos-store-services + mavos-db)

1. **Find the PRs**: `gh pr list -R Mav-Dev-MavOS/<repo> --state all --search "<JIRA-KEY>"` for each repo (store-services, db, types, frontend, techbay). Don't rely on Jira links (issuelinks empty).
2. **Fan out reviews first** with `task` subagents (one per PR), following `mavos-copilot-prompts/prompts/review-pr/prompt.md` (NOT the `review-pr` skill, which is the review.json workflow). Give each the stack map, Jira AC, and these rules:
   - Never use `FETCH_HEAD` in parallel: `git fetch origin pull/<N>/head:refs/review/pr-<N>`, read via `git show refs/review/pr-<N>:<path>`, delete the ref after.
   - Read through git only; never checkout/stash in the user's trees; read `AGENTS.md` from `origin/main`.
   - Ask for a "Cross-PR notes" section (env vars, event names, frequency names, client lib, merge/deploy order).
3. **Put each draft in its own tmux tab** (user said "workmux ... each agent for each tab"):
   - Save each report: `cat agent://<Id>/report > /tmp/<dir>/draft-<n>.md` (works in bash).
   - Prompt file = header (role: interactive review assistant, present drafts as D1..Dn, never post to GitHub until told, batched `gh api .../reviews` with empty body, stack context) + the draft.
   - Throwaway config `/tmp/<dir>/workmux-review.yaml`: `mode: window`, `agent: omp`, one pane `<agent>` with `focus: true`. The repo `.workmux.yml` (store-services) launches nvim/dev/azurite/tests per worktree; avoid it via `--config`.
   - Spawn from inside each repo: `workmux add pr-<n>-review --pr <n> --config <cfg> --mode window --parent-session <tmux session> -b -F -H -P <prompt>` (-F skips node_modules symlink, -H skips hooks). Use `tmux display -p '#S'` for the session. Run from mavos-db dir for DB PRs.
   - Verify with `workmux status` (idle agents show `done`) and `workmux capture <handle> -n 25`.
4. Control afterward with `workmux send/capture/wait`; clean up with `workmux remove pr-<n>-review`.

## Gotchas
- `getJiraIssue` needs `cloudId` (`method-inc.atlassian.net`) and `issueIdOrKey`; `getTeamworkGraphContext` needs `objectIdentifier`.
- Atlassian tool call with empty args fails validation; read schema first.
- Other pre-existing tmux windows (e.g. an earlier `PR884: Review...`) may exist; don't touch them.
