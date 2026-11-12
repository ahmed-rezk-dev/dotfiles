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
