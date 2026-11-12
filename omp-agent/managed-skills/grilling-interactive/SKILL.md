---
name: grilling-interactive
description: "Use together with the grilling skill whenever the user says grill me / stress-test my plan / grill this idea. Overrides grilling's text Q&A format: each round is asked through the ask tool (selectable options, recommended pre-selected, free-text via Other) instead of posting numbered questions as chat text."
---

Overlay for the `grilling` skill. Do NOT edit or replace `grilling`; read it first and follow its method (design tree, frontier, rounds, sub-agents for facts, done = empty frontier, don't act until user confirms). This skill changes ONLY how a round is presented.

## Override: present each round with the `ask` tool

NEVER post the `❓ Q1 ... ➡️ recommended` text block. Instead, send ONE `ask` call per round containing the whole frontier.

Map each frontier question to one entry in `questions[]`:

| grilling element | `ask` field |
|---|---|
| Q-number + title | `id` (short snake_case, e.g. `auth_strategy`) and `header` (the title, short chip) |
| question body | `question` (self-contained; include the context the user needs, concise) |
| the choices | `options[]`, 2-5 items, short `label`, tradeoff in `description` |
| your recommended answer | `recommended` = 0-based index of that option (UI adds "(Recommended)") |
| pick several allowed | `multi: true` |

Rules:
- Recommended option MUST be a real option the user can accept with one keypress ("yes" = accept the default). Put it first when order is otherwise arbitrary.
- Question has no natural fixed choices (naming, numbers, free text)? Offer 2-4 concrete candidate answers incl. your recommendation. The UI auto-adds "Other (type your own)" for typed input. NEVER add your own "Other" option.
- Yes/no decisions: two options ("Yes - <what happens>", "No - <alternative>"), not a bare text prompt.
- Keep the body of each question tight; long analysis goes in the option `description`, not a wall of text before the call.
- Dispatch sub-agents for environment facts BEFORE or alongside the call, as grilling says; only questions downstream of an unfinished lookup are deferred.
- Short one-line preface before the call is fine; do not restate the questions in chat.

## Handling answers
- Selected option -> settled; recompute the frontier and run the next round with another `ask` call.
- User typed custom text via Other -> treat it as the answer. If it is a clarifying question rather than an answer, answer it first (chat), then re-ask the unresolved question(s).
- Unanswered / ask errors -> fall back to grilling's plain-text format for that round only; state that you did.

## Finish
When the frontier is empty, summarize the settled design tree in chat, then use one final `ask` (e.g. "Shared understanding reached - proceed?" with Proceed / Keep grilling) before acting.
