---
name: workmux-pr-review-fanout
description: "Use when you need to review several related PRs interactively, one agent per tmux tab via workmux, with the current agent as master."
---

# Workmux PR review fan-out

1. Produce draft reviews first (e.g. parallel `task` subagents following the review-pr prompt). Parallel reviewers sharing one clone must NOT use `FETCH_HEAD`: fetch each PR into `refs/review/pr-<n>` and delete it afterwards. Save each draft: `cat agent://<id>/report > /tmp/<dir>/draft-<n>.md`.
2. Write `/tmp/<dir>/workmux-review.yaml`:
   ```yaml
   mode: window
   agent: omp
   panes:
     - command: <agent>
       focus: true
   ```
   (Needed because mavos-store-services/.workmux.yml is mode: session and starts nvim, dev server, azurite and tests.)
3. Build one self-contained prompt per PR: header (role: interactive review assistant; present the draft with numbered drafts D1..Dn; never post to GitHub until the user says so; batched `gh api .../reviews` with empty body when told; stack context and cross-PR facts) + the draft.
4. Spawn from the repo that owns each PR (mavos-db PRs from the mavos-db repo):
   `workmux add pr-<n>-review --pr <n> --config <yaml> --mode window --parent-session <tmux-session> -b -F -H -P <prompt>`
   Get the session name with `tmux display -p '#S'`.
5. Confirm with `workmux status` (idle agents show `done`, which means idle, NOT posted) and `workmux capture <handle> -n 30`.
6. Suggest a review order: PRs that gate others first (deploy-order risks, shared decisions), then down the merge order.
7. Dropping tabs: only when the user says so or GitHub confirms a review was posted. Verify with `gh pr view <n> --json reviews,comments` plus `gh api repos/<o>/<r>/pulls/<n>/comments`, check the worktree is clean (`git -C <worktree> status --short`), then `workmux remove <handle> -f` from the owning repo. If GitHub shows nothing posted, ask before dropping.
8. Control: `workmux send <handle> "..."`, `workmux wait`.
