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
