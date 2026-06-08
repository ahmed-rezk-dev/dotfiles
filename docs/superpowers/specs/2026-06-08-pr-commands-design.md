# PR Commands Design Spec

**Date:** 2026-06-08
**Topic:** Pull Request Management Commands for OpenCode

## Overview

Add four new opencode commands for pull request management that work across both GitHub and Bitbucket. Commands auto-detect the git service from remote URLs and use the appropriate MCP/tools.

## Architecture

### Git Service Detection (shared pattern)

Each command independently detects the git service:
1. Run `git remote -v` to get the origin URL
2. If URL contains `github.com` → use GitHub CLI (`gh`) commands
3. If URL contains `bitbucket` → use Bitbucket MCP tools
4. If neither found → ask user to specify

### Command Registration

All commands registered in `~/.config/opencode/opencode.jsonc` under the `command` section, with detailed instructions in `.md` files under `~/.config/opencode/command/`.

---

## Command 1: `pr-create`

**Purpose:** Create a new pull request with guided input.

**Workflow:**
1. Detect git service (GitHub vs Bitbucket)
2. Get current branch name
3. **Always ask user for target branch** (suggest `main`/`master` as default)
4. **Always ask user for reviewers** (comma-separated usernames)
5. Auto-generate PR title and description from recent commits
6. Show preview to user for confirmation
7. Create PR using appropriate tool:
   - GitHub: `gh pr create --base <target> --reviewer <reviewers> --title <title> --body <body>`
   - Bitbucket: `bitbucket_create_pull_request` MCP tool
8. Display PR URL on success

**Edge cases:**
- No commits on branch → warn user
- Reviewers not found → warn but continue
- PR already exists → show existing PR

---

## Command 2: `pr-review`

**Purpose:** Select and review an open pull request.

**Workflow:**
1. Detect git service
2. Fetch open PRs:
   - GitHub: `gh pr list --state open --json number,title,author,headRefName,createdAt`
   - Bitbucket: `bitbucket_list_pull_requests` MCP tool
3. Display numbered list: `[1] PR-123: Title — @author (branch: feature/x, 2h ago)`
4. User selects PR by number
5. Fetch PR details: diff, existing comments, review status
6. Present review context to user
7. Prompt for review action:
   - **Approve** → `gh pr review --approve` or `bitbucket_approve_pull_request`
   - **Comment** → ask for comment text, then `gh pr comment` or `bitbucket_add_comment`
   - **Request changes** → `gh pr review --request-changes` or `bitbucket_add_comment` with BLOCKER severity
8. Confirm action completed

---

## Command 3: `pr-details`

**Purpose:** View detailed PR information including diff and comments.

**Workflow:**
1. Detect git service
2. Ask user for PR number, or show open PR list to pick from
3. Fetch and display formatted report:
   - **Metadata:** title, description, author, source→target branch, status, reviewers, approvals
   - **Diff:** file changes summary with add/remove counts, key changes highlighted
   - **Comments:** all general and inline comments with author and timestamp
   - **CI status:** check run status summary
4. Format as readable markdown report

---

## Command 4: `pr-ci`

**Purpose:** Monitor CI/build status for a PR with real-time updates and notifications.

**Workflow:**
1. Detect git service
2. Show list of open PRs to pick from (or accept PR number as argument)
3. Initial fetch of CI checks:
   - GitHub: `gh pr checks <number>`
   - Bitbucket: `bitbucket_get_code_insights` MCP tool
4. Display status table: check name, status (pending/running/success/failed), duration
5. **Continuous polling:** refresh every 15 seconds
6. On status change:
   - Display update inline
   - **Desktop notification:**
     - macOS: `osascript -e 'display notification "..." with title "..."'`
     - Linux: `notify-send "..." "..."`
7. Auto-stop conditions:
   - All checks completed (success or failure)
   - User sends interrupt/cancel
8. Final summary: pass/fail with details

**Notification messages:**
- All passed: "All checks passed for PR #N: <title>"
- Any failed: "Check failed in PR #N: <title> — <check name>"
- Mixed: "PR #N: 3 passed, 1 failed, 2 pending"

---

## File Structure

```
~/.config/opencode/
├── opencode.jsonc              # Add 4 command entries
└── command/
    ├── pr-create.md            # PR creation instructions
    ├── pr-review.md            # PR review workflow
    ├── pr-details.md           # PR detailed view
    └── pr-ci.md                # CI monitoring with polling
```

## Error Handling

- No MCP available for detected service → inform user and suggest setup
- Network/API errors → retry once, then show error
- Authentication failures → clear error message with fix instructions
- Empty PR list → "No open PRs found"

## Security

- Never expose tokens, passwords, or API keys in output
- Reviewer usernames shown but not auto-resolved without confirmation
- PR creation requires explicit user confirmation before submitting
