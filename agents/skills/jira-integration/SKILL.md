---
name: jira-integration
description: Use when working with Jira tickets - fetching, updating, searching, transitioning. Uses jira-server MCP tools directly.
metadata:
  origin: custom
---

# Jira Integration

Use `jira-server` MCP tools. No setup needed.

## Quick Reference

| Task | Tool | Example |
|------|------|---------|
| Get issue | `jira_get_issue` | key: `E2G-1234` |
| Search | `jira_search` | JQL: `project = E2G AND status != Done` |
| Comment | `jira_add_comment` | key + comment text |
| Transition | `jira_get_transitions` → `jira_transition_issue` | Get IDs first, then transition |
| Create | `jira_create_issue` | project, type, summary |
| Update | `jira_update_issue` | key + fields to change |
| Link issue | `jira_create_issue_link` | keys + link type |
| Sprint issues | `jira_get_sprint_issues` | board + sprint ID |

## Common JQL Queries

```
project = E2G AND statusCategory != Done ORDER BY Rank ASC
assignee = currentUser() ORDER BY updated DESC
project = E2G AND labels = 'Shopper_Acc' ORDER BY Rank ASC
issue = E2G-1234
```

## Transition Workflow

1. `jira_get_transitions` → get available transition IDs
2. `jira_transition_issue` → use correct ID

## Comment Templates

**Start work:**
```
Starting implementation.
Branch: feat/E2G-1234-feature
```

**PR created:**
```
PR: [title](link)
Ready for review.
```

**Done:**
```
Complete. PR merged: [link]
Tests: all passing
```

## Tips

- Issue keys: `PROJECT-NUMBER` (e.g., `E2G-1234`)
- Always get transitions before changing status
- Use JQL for complex searches
