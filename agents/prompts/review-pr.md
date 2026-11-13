---
description: Thorough PR review — fetches PR + Jira context, matches author profile, outputs categorized findings and draft inline comments.
argument-hint: "<url> [context]"
---

Read and follow the prompt at `/Users/ahmed.rezk/method/mavos/mavos-copilot-prompts/prompts/review-pr/prompt.md`.

Before starting, check for personal context at `/Users/ahmed.rezk/.mavos-prompts/personal-context.md`.
Look for `## Me` (github_handle, jira_account_id, role) and `## Author Profiles` sections.

All prompts follow the shared conventions in `/Users/ahmed.rezk/method/mavos/mavos-copilot-prompts/conventions.md`:
- GitHub access: prefer structured MCP tools for reads, `gh` CLI for mutations and fallback
- Jira field projection: always project the fields you need, never `*all`

$@
