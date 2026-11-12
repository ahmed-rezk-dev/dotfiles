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
