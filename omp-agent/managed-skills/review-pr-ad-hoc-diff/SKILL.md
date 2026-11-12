---
name: review-pr-ad-hoc-diff
description: Use when the review-pr skill is invoked on a bare PR URL/number without pr_diff.txt or pr_description.txt already materialized (i.e. outside the normal CI workflow checkout).
---

## Problem

The `review-pr` skill's contract assumes a workflow-provided `pr_diff.txt` (pre-annotated with `[OLD:n]`/`[NEW:n]`/`[OLD:n,NEW:m]` prefixes) and `pr_description.txt` sitting in the working directory. When a user instead invokes review-pr ad hoc against a bare GitHub PR URL in a plain repo checkout, neither file exists yet — you must materialize them yourself before you can produce a validator-passing `review.json`.

## Procedure

1. **Get PR metadata/description**: use `pr://<N>` (or `gh pr view`) for title, body, base/head branch, file list. Write the body to `pr_description.txt`.
2. **Fetch the PR branch and base**:
   ```sh
   git fetch origin pull/<N>/head:pr-<N>
   git fetch origin <base-branch>
   git merge-base origin/<base-branch> pr-<N>
   ```
3. **Raw unified diff** against the merge-base (three-dot semantics, merge-base not tip-of-base):
   ```sh
   git diff <merge-base-sha> pr-<N> -- . > /tmp/raw_pr.diff
   ```
4. **Annotate it** into the format `validate_review_json.py` expects. Parse the unified diff line by line, tracking old/new line counters reset at each `@@ -a,b +c,d @@` hunk header:
   - Pass through unchanged: lines starting with `diff --git `, `index `, `new file mode`/`deleted file mode`/`old mode`/`new mode`, `--- `, `+++ `, and the `@@ ... @@` header itself.
   - `+` lines → `[NEW:<new_ln>] <text>`, increment new_ln only.
   - `-` lines → `[OLD:<old_ln>] <text>`, increment old_ln only.
   - ` ` (context) lines → `[OLD:<old_ln>,NEW:<new_ln>] <text>`, increment both.
   - `\ No newline at end of file` lines → pass through unchanged.
   A small Python script (via `eval`) does this in one shot for a multi-thousand-line diff; don't hand-edit.
5. Write the result to `pr_diff.txt` in the repo root (the path the validator and skill expect).
6. Proceed with the rest of the review-pr skill normally (write `review.json`, run `python3 .agents/skills/review-pr/scripts/validate_review_json.py --review-json review.json --diff pr_diff.txt`).

## Gotchas

- Use the **merge-base**, not `origin/<base>` directly — otherwise unrelated commits merged into base after the PR branched show up as noise in the diff and shift line numbers.
- The validator keys content purely off these bracket annotations per path (reset on each `diff --git` line) — if your annotation script mis-tracks old/new counters across hunks (e.g. forgetting to reset at each `@@` header), every subsequent line number in that file's remaining hunks will be wrong and the validator will reject comments that look correct by eye.
- Confirm line counts: the annotated file's line count should equal the raw diff's line count (every diff line maps to exactly one annotated line, including headers) — a quick `wc -l` sanity check before writing `pr_diff.txt` catches dropped/duplicated lines.
