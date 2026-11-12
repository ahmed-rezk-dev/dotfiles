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
