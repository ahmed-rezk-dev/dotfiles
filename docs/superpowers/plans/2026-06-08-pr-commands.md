# PR Commands Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four opencode commands for pull request management (create, review, details, CI monitoring) that auto-detect GitHub vs Bitbucket and use the appropriate tools.

**Architecture:** Four self-contained markdown command files in `~/.config/opencode/command/`, each with full workflow instructions including git service detection logic. Commands registered in `~/.config/opencode/opencode.jsonc`.

**Tech Stack:** OpenCode commands (markdown-based), GitHub CLI (`gh`), Bitbucket MCP tools, macOS notifications (`osascript`).

---

### Task 1: Register Commands in opencode.jsonc

**Files:**
- Modify: `/Users/ahmed.rezk/.config/opencode/opencode.jsonc`

- [ ] **Step 1: Add four command entries to opencode.jsonc**

Add these entries to the `"command"` section (before the closing `}`):

```jsonc
    "pr-create": {
      "template": "Create a new pull request. Follow the instructions in the pr-create command file exactly.",
      "description": "Create a pull request",
      "agent": "build",
    },
    "pr-review": {
      "template": "Review an open pull request. Follow the instructions in the pr-review command file exactly.",
      "description": "Review a pull request",
      "agent": "build",
    },
    "pr-details": {
      "template": "Show detailed pull request information with diff and comments. Follow the instructions in the pr-details command file exactly.",
      "description": "Show PR details with diff and comments",
      "agent": "build",
    },
    "pr-ci": {
      "template": "Monitor CI/build status for a pull request with real-time updates. Follow the instructions in the pr-ci command file exactly.",
      "description": "Monitor PR CI status with notifications",
      "agent": "build",
    },
```

The existing `"command"` section ends at line 131. Add these entries after the `"accessibility"` entry, maintaining the trailing comma pattern.

- [ ] **Step 2: Verify JSONC is valid**

Run: `cat /Users/ahmed.rezk/.config/opencode/opencode.jsonc | python3 -c "import sys,json; json.loads(''.join(l for l in sys.stdin if not l.strip().startswith('//')))" && echo "Valid JSON"`
Expected: `Valid JSON`

---

### Task 2: Create pr-create.md Command

**Files:**
- Create: `/Users/ahmed.rezk/.config/opencode/command/pr-create.md`

- [ ] **Step 1: Write the pr-create.md command file**

Create the file with this exact content:

```markdown
---
description: Create a new pull request with guided input
---

# PR Create Command

You are an AI agent that helps create pull requests. Follow these instructions exactly.

## Step 1: Detect Git Service

Run `git remote -v` and examine the origin URL:
- If URL contains `github.com` → use **GitHub** workflow
- If URL contains `bitbucket` → use **Bitbucket** workflow
- If neither found → ask the user which service to use

## Step 2: Gather PR Information

1. Get the current branch name: `git branch --show-current`
2. If branch is `main`, `master`, or `develop`, warn the user and ask if they want to continue
3. **ALWAYS ask the user for the target branch** (suggest `main` or `master` as default)
4. **ALWAYS ask the user for reviewers** (comma-separated usernames). If they say "none", proceed without reviewers
5. Get recent commits to auto-generate title and description:
   - Run: `git log --oneline $(git merge-base HEAD origin/<target-branch> 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD`
   - If no commits found, warn the user and ask for a manual title

## Step 3: Generate Title and Description

From the commits, generate:
- **Title:** Use the most recent commit message (without hash), or ask user
- **Description:** Markdown format with:
  - Summary of changes based on commit messages
  - List of commits with hashes
  - Section for "Type of change" (feat, fix, docs, refactor, etc.)

## Step 4: Show Preview

Display to the user:
```
📋 Pull Request Preview
━━━━━━━━━━━━━━━━━━━━━━━━
Title: <generated title>
Target: <current-branch> → <target-branch>
Reviewers: <reviewer list or "none">
Description:
<generated description>
━━━━━━━━━━━━━━━━━━━━━━━━
Proceed with creation? (yes/no/edit)
```

If user says "edit", ask what to change and update.

## Step 5: Create the PR

### GitHub Workflow:
1. Verify `gh` is available: `which gh`
2. Build and run the command:
   ```bash
   gh pr create --base <target-branch> --title "<title>" --body "<description>" [--reviewer <user1>,<user2>]
   ```
3. If `gh` is not authenticated, show: "GitHub CLI is not authenticated. Run `gh auth login` first."

### Bitbucket Workflow:
1. Use the Bitbucket MCP tool `bitbucket_create_pull_request` with:
   - `repository`: extract from git remote (last path segment)
   - `title`: the generated title
   - `sourceBranch`: current branch name
   - `targetBranch`: user-provided target branch
   - `description`: the generated description
   - `reviewers`: array of usernames (if provided)
   - `includeDefaultReviewers`: true if no specific reviewers

## Step 6: Confirm Success

On success, display:
```
✅ Pull Request Created!
━━━━━━━━━━━━━━━━━━━━━━━━
URL: <PR URL>
Title: <title>
Branch: <source> → <target>
━━━━━━━━━━━━━━━━━━━━━━━━
```

## Error Handling

- **PR already exists:** "A PR already exists from `<branch>` to `<target>`. Here it is: <URL>"
- **No commits:** "No commits found on this branch. Please provide a title and description manually."
- **Authentication error:** Clear message with fix instructions
- **Network error:** Retry once, then show error
```

- [ ] **Step 2: Verify file was created**

Run: `test -f /Users/ahmed.rezk/.config/opencode/command/pr-create.md && echo "File exists" || echo "File missing"`
Expected: `File exists`

- [ ] **Step 3: Commit**

```bash
cd /Users/ahmed.rezk/.config/opencode && git add command/pr-create.md opencode.jsonc && git commit -m "✨ feat: add pr-create command for pull request creation"
```

---

### Task 3: Create pr-review.md Command

**Files:**
- Create: `/Users/ahmed.rezk/.config/opencode/command/pr-review.md`

- [ ] **Step 1: Write the pr-review.md command file**

Create the file with this exact content:

```markdown
---
description: Review an open pull request from a numbered list
---

# PR Review Command

You are an AI agent that helps review pull requests. Follow these instructions exactly.

## Step 1: Detect Git Service

Run `git remote -v` and examine the origin URL:
- If URL contains `github.com` → use **GitHub** workflow
- If URL contains `bitbucket` → use **Bitbucket** workflow
- If neither found → ask the user which service to use

## Step 2: Fetch and Display Open PRs

### GitHub Workflow:
1. Run: `gh pr list --state open --limit 20 --json number,title,author,headRefName,createdAt,reviewDecision`
2. Parse the JSON and display a numbered list

### Bitbucket Workflow:
1. Use the Bitbucket MCP tool `bitbucket_list_pull_requests` with `state: "OPEN"` and `limit: 20`
2. Parse the response and display a numbered list

### Display Format:
```
📋 Open Pull Requests
━━━━━━━━━━━━━━━━━━━━━━━━
[1] #123: Add user authentication — @johndoe (feature/auth → main, 2h ago) [APPROVED]
[2] #124: Fix login redirect bug — @janedoe (bugfix/login-redirect → main, 5h ago) [NEEDS_REVIEW]
[3] #125: Update API docs — @bobsmith (docs/api-update → develop, 1d ago)
...
━━━━━━━━━━━━━━━━━━━━━━━━
Select a PR to review (number):
```

If no open PRs: "No open pull requests found."

## Step 3: Fetch PR Details

Once user selects a PR by number:

### GitHub Workflow:
1. Get PR details: `gh pr view <number> --json title,body,author,headRefName,baseRefName,state,reviewDecision,reviews,comments`
2. Get diff: `gh pr diff <number>`
3. Get comments: `gh pr view <number> --comments`

### Bitbucket Workflow:
1. Get PR details using `bitbucket_get_pull_request` with the PR ID
2. Get diff using `bitbucket_get_diff` with the PR ID
3. Get comments using `bitbucket_get_comments` with the PR ID
4. Get reviews using `bitbucket_get_reviews` with the PR ID

## Step 4: Present Review Context

Display to the user:

```
🔍 Review: #<number> — <title>
━━━━━━━━━━━━━━━━━━━━━━━━
Author: @<author>
Branch: <source> → <target>
Status: <state>
Description:
<body>

📊 Current Reviews:
- @reviewer1: APPROVED
- @reviewer2: NEEDS_WORK — "Please fix X"

💬 Comments:
- @user1 (file.ts:42): "Should we use a different approach here?"

📝 Key Changes:
<summary of diff — files changed, lines added/removed, notable changes>
━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 5: Prompt for Review Action

Ask the user:
```
What would you like to do?
[1] Approve PR
[2] Leave a comment
[3] Request changes
[4] View full diff
[5] Cancel
```

### Option 1 — Approve:
- GitHub: `gh pr review <number> --approve`
- Bitbucket: `bitbucket_approve_pull_request` with repository and prId
- Confirm: "✅ Approved PR #<number>"

### Option 2 — Comment:
- Ask user for comment text
- Ask if it should be inline (file-specific) or general
- If inline: ask for file path and line number
- GitHub: `gh pr comment <number> --body "<text>"`
- Bitbucket: `bitbucket_add_comment` (or `bitbucket_add_comment_inline` for inline)
- Confirm: "✅ Comment added to PR #<number>"

### Option 3 — Request Changes:
- Ask user for feedback text
- GitHub: `gh pr review <number> --request-changes --body "<text>"`
- Bitbucket: `bitbucket_add_comment` with `severity: "BLOCKER"`
- Confirm: "✅ Changes requested on PR #<number>"

### Option 4 — View Full Diff:
- Show the full diff output
- Return to action menu after

### Option 5 — Cancel:
- Exit gracefully

## Error Handling

- **PR not found:** "PR #<number> not found. Please check the number."
- **Already reviewed:** "You have already reviewed this PR."
- **Authentication error:** Clear message with fix instructions
- **Network error:** Retry once, then show error
```

- [ ] **Step 2: Verify file was created**

Run: `test -f /Users/ahmed.rezk/.config/opencode/command/pr-review.md && echo "File exists" || echo "File missing"`
Expected: `File exists`

- [ ] **Step 3: Commit**

```bash
cd /Users/ahmed.rezk/.config/opencode && git add command/pr-review.md && git commit -m "✨ feat: add pr-review command for pull request review"
```

---

### Task 4: Create pr-details.md Command

**Files:**
- Create: `/Users/ahmed.rezk/.config/opencode/command/pr-details.md`

- [ ] **Step 1: Write the pr-details.md command file**

Create the file with this exact content:

```markdown
---
description: Show detailed pull request information with diff and comments
---

# PR Details Command

You are an AI agent that shows detailed pull request information. Follow these instructions exactly.

## Step 1: Detect Git Service

Run `git remote -v` and examine the origin URL:
- If URL contains `github.com` → use **GitHub** workflow
- If URL contains `bitbucket` → use **Bitbucket** workflow
- If neither found → ask the user which service to use

## Step 2: Get PR Selection

Ask the user:
- If they have a PR number, use it directly
- Otherwise, show the open PR list to pick from

### GitHub — Show PR List:
```bash
gh pr list --state open --limit 20 --json number,title,author,headRefName,createdAt
```

### Bitbucket — Show PR List:
Use `bitbucket_list_pull_requests` with `state: "OPEN"` and `limit: 20`

### Display Format:
```
📋 Open Pull Requests
━━━━━━━━━━━━━━━━━━━━━━━━
[1] #123: Add user authentication — @johndoe (feature/auth → main, 2h ago)
[2] #124: Fix login redirect bug — @janedoe (bugfix/login-redirect → main, 5h ago)
...
━━━━━━━━━━━━━━━━━━━━━━━━
Enter PR number or select from list:
```

## Step 3: Fetch All PR Data

### GitHub Workflow:
1. PR metadata: `gh pr view <number> --json title,body,author,headRefName,baseRefName,state,reviewDecision,reviews,comments,commits,statusCheckRollup`
2. Diff: `gh pr diff <number>`
3. Comments: `gh pr view <number> --comments --json body,author,createdAt,path,line`

### Bitbucket Workflow:
1. PR metadata: `bitbucket_get_pull_request` with prId
2. Diff: `bitbucket_get_diff` with prId
3. Comments: `bitbucket_get_comments` with prId
4. Reviews: `bitbucket_get_reviews` with prId
5. Activities: `bitbucket_get_activities` with prId
6. Code insights: `bitbucket_get_code_insights` with prId

## Step 4: Display Formatted Report

Display a comprehensive markdown report:

```markdown
# PR #<number>: <title>

## Overview
| Field | Value |
|-------|-------|
| **Author** | @<author> |
| **Status** | <state> |
| **Branch** | `<source>` → `<target>` |
| **Review Decision** | <APPROVED/NEEDS_WORK/PENDING> |
| **Created** | <date> |

## Description
<body>

## Reviewers & Approvals
| Reviewer | Status |
|----------|--------|
| @user1 | ✅ APPROVED |
| @user2 | ⏳ PENDING |
| @user3 | ❌ NEEDS_WORK |

## CI Status
| Check | Status | Duration |
|-------|--------|----------|
| build | ✅ success | 3m 24s |
| test | 🔄 running | — |
| lint | ✅ success | 1m 12s |

## File Changes
<summary: X files changed, +Y -Z lines>

| File | Changes |
|------|---------|
| src/auth.ts | +42 -8 |
| tests/auth.test.ts | +28 -2 |

## Diff Summary
<key changes highlighted — new functions, modified logic, deleted code>

## Comments & Discussion
<all comments with author, timestamp, file:line for inline>

### General Comments
- **@user1** (2h ago): "Great work on this!"

### Inline Comments
- **@user2** (src/auth.ts:42, 1h ago): "Should we add error handling here?"
  - **@author** (reply, 30m ago): "Good point, will fix."
```

## Error Handling

- **PR not found:** "PR #<number> not found."
- **No PRs available:** "No open pull requests found."
- **Authentication error:** Clear message with fix instructions
- **Network error:** Retry once, then show error
```

- [ ] **Step 2: Verify file was created**

Run: `test -f /Users/ahmed.rezk/.config/opencode/command/pr-details.md && echo "File exists" || echo "File missing"`
Expected: `File exists`

- [ ] **Step 3: Commit**

```bash
cd /Users/ahmed.rezk/.config/opencode && git add command/pr-details.md && git commit -m "✨ feat: add pr-details command for detailed PR view"
```

---

### Task 5: Create pr-ci.md Command

**Files:**
- Create: `/Users/ahmed.rezk/.config/opencode/command/pr-ci.md`

- [ ] **Step 1: Write the pr-ci.md command file**

Create the file with this exact content:

```markdown
---
description: Monitor CI/build status for a pull request with real-time updates and desktop notifications
---

# PR CI Monitor Command

You are an AI agent that monitors CI/build status for pull requests. Follow these instructions exactly.

## Step 1: Detect Git Service

Run `git remote -v` and examine the origin URL:
- If URL contains `github.com` → use **GitHub** workflow
- If URL contains `bitbucket` → use **Bitbucket** workflow
- If neither found → ask the user which service to use

## Step 2: Get PR Selection

Ask the user for a PR number, or show open PRs to pick from:

### GitHub:
```bash
gh pr list --state open --limit 20 --json number,title,headRefName
```

### Bitbucket:
Use `bitbucket_list_pull_requests` with `state: "OPEN"` and `limit: 20`

Display:
```
📋 Open Pull Requests
━━━━━━━━━━━━━━━━━━━━━━━━
[1] #123: Add user authentication (feature/auth → main)
[2] #124: Fix login redirect bug (bugfix/login-redirect → main)
...
━━━━━━━━━━━━━━━━━━━━━━━━
Select PR to monitor (number):
```

## Step 3: Initial CI Check Fetch

### GitHub:
```bash
gh pr checks <number>
```

### Bitbucket:
Use `bitbucket_get_code_insights` with the PR ID

## Step 4: Display Initial Status Table

```
🔍 CI Status — PR #<number>: <title>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Check Name          | Status   | Duration | Started
────────────────────|──────────|──────────|──────────
build               | ✅ success | 3m 24s  | 10:30 AM
test-unit           | 🔄 running | —       | 10:31 AM
test-e2e            | ⏳ pending | —       | —
lint                | ✅ success | 1m 12s  | 10:30 AM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Polling every 15 seconds. Press Ctrl+C to stop.
```

Status icons:
- ⏳ pending — not started
- 🔄 running — in progress
- ✅ success — passed
- ❌ failed — failed
- ⚠️ cancelled — cancelled

## Step 5: Continuous Polling Loop

Poll every 15 seconds and refresh the status table.

### GitHub:
Re-run `gh pr checks <number>` each poll cycle

### Bitbucket:
Re-call `bitbucket_get_code_insights` each poll cycle

### On Status Change:
1. Display inline update:
   ```
   📢 Update: test-unit changed from 🔄 running → ✅ success
   ```

2. Send desktop notification:
   - **macOS:**
     ```bash
     osascript -e 'display notification "<message>" with title "PR CI Monitor" sound name "Glass"'
     ```
   - **Linux:**
     ```bash
     notify-send "PR CI Monitor" "<message>"
     ```

### Notification Messages:
- **All passed:** "All checks passed for PR #N: <title>"
- **Any failed:** "Check failed in PR #N: <title> — <check name>"
- **Mixed status:** "PR #N: 3 passed, 1 failed, 2 pending"

## Step 6: Auto-Stop Conditions

Stop polling when:
1. **All checks completed** (no running or pending checks):
   ```
   🏁 All checks completed!
   ━━━━━━━━━━━━━━━━━━━━━━━━
   Result: ✅ ALL PASSED (or ❌ FAILED)
   Passed: 4 | Failed: 0 | Cancelled: 0
   ━━━━━━━━━━━━━━━━━━━━━━━━
   ```

2. **User interrupts** (Ctrl+C or says "stop"):
   ```
   ⏹️ Monitoring stopped.
   Last status: <current status summary>
   ```

## Error Handling

- **No CI checks found:** "No CI checks configured for this PR."
- **Authentication error:** Clear message with fix instructions
- **Network error:** Retry once, then show error and continue polling
- **Rate limited:** Wait and retry, inform user
```

- [ ] **Step 2: Verify file was created**

Run: `test -f /Users/ahmed.rezk/.config/opencode/command/pr-ci.md && echo "File exists" || echo "File missing"`
Expected: `File exists`

- [ ] **Step 3: Commit**

```bash
cd /Users/ahmed.rezk/.config/opencode && git add command/pr-ci.md && git commit -m "✨ feat: add pr-ci command for CI monitoring with notifications"
```

---

### Task 6: Final Verification

**Files:**
- `/Users/ahmed.rezk/.config/opencode/opencode.jsonc`
- `/Users/ahmed.rezk/.config/opencode/command/pr-create.md`
- `/Users/ahmed.rezk/.config/opencode/command/pr-review.md`
- `/Users/ahmed.rezk/.config/opencode/command/pr-details.md`
- `/Users/ahmed.rezk/.config/opencode/command/pr-ci.md`

- [ ] **Step 1: Verify all files exist**

Run:
```bash
for f in pr-create.md pr-review.md pr-details.md pr-ci.md; do
  test -f /Users/ahmed.rezk/.config/opencode/command/$f && echo "✅ $f" || echo "❌ $f missing"
done
```
Expected: All four files show ✅

- [ ] **Step 2: Verify opencode.jsonc has all command entries**

Run:
```bash
python3 -c "
import json, re
with open('/Users/ahmed.rezk/.config/opencode/opencode.jsonc') as f:
    content = f.read()
# Remove comments
content = re.sub(r'//.*', '', content)
config = json.loads(content)
commands = config.get('command', {})
for cmd in ['pr-create', 'pr-review', 'pr-details', 'pr-ci']:
    if cmd in commands:
        print(f'✅ {cmd} registered')
    else:
        print(f'❌ {cmd} missing')
"
```
Expected: All four commands show ✅ registered

- [ ] **Step 3: Final commit with all changes**

```bash
cd /Users/ahmed.rezk/.config/opencode && git status && git log --oneline -3
```
