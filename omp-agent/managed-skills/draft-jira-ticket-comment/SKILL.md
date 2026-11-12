---
name: draft-jira-ticket-comment
description: "Use when asked to craft, draft, or write a comment to add to a Jira ticket (findings, proposed fix, asking for confirmation) for the user's team."
---

# Draft a Jira ticket comment (user-approved style)

User approved this style on MV-13949 and asked to always use it. Output the draft in chat only. Never post it to Jira unless explicitly asked.

## Process
1. Gather facts first (logs, code, ticket fields). The comment must rest on observed evidence.
2. Write a first draft, then cut it down: the user asked twice to make it shorter and more human before approving.

## Shape (plain paragraphs, no headings, no bold section titles except the side note)
1. **Opener, one line:** 'Found it.' plus what is really going on.
2. **Evidence:** quote the real log line / numbers, formatted as inline code. One or two concrete cases.
3. **Cause:** say it simply. Mark anything inferred with 'looks like' and add 'I couldn't confirm that on their side' when it cannot be verified.
4. **Fix:** 2-3 sentences in plain words, one worked example with real numbers (for rounding or math, show before and after). Mention scope (what is and is not touched), whether there is a flag, and that the branch is ready (not that a PR is open unless it is).
5. **Confirm list:** 'Can someone confirm:' then 2-3 numbered questions the team can answer with yes/no. Include any mismatch between ticket and logs (e.g. WO number).
6. **Side note (optional):** a bolded 'Side note, <topic>:' paragraph at the very end for a related issue found on the way. Say what it is, why it mattered here, what fixing it would touch, and a lean on whether to do it in this ticket or a separate one, ending with an offer to include it if they want.

## Rules
- Short and straightforward, human voice, like a teammate writing in the thread. No marketing, no filler, no long structured report.
- Drop numbers that were derived rather than observed (e.g. an amount computed as invoice minus logged value) unless clearly labeled.
- No PII: no customer names, emails, or customer numbers from logs. Use store-order ids only.
- After the draft, mention briefly what you left out and offer to add it back (one line).
- Use the ticket's own words and ids; be exact about store and WO numbers.
