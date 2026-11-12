---
name: mavos-post-pr-review-via-gh-api
description: Use when the user asks to post drafted PR review comments (inline + general) to a GitHub PR via gh api after a /review-pr style review.
---

# Posting drafted PR review comments with gh

Only when the user explicitly says to post (e.g. "post them", "post it"). The review-pr *skill* forbids posting; the `/review-pr` command prompt allows it on user request.

## Procedure
1. Confirm head SHA unchanged: `gh pr view <N> --json headRefOid --jq .headRefOid`.
   - **If it moved** (happens between review and "post them"): `git fetch origin pull/<N>/head`, capture `git rev-parse FETCH_HEAD` immediately, `git diff <oldSHA> <newSHA>`. Re-check each finding still applies and anchor lines didn't shift; use the NEW sha as `commit_id`; tell the user what changed.
   - Re-pull inline comments (`gh api repos/<o>/<r>/pulls/<N>/comments`): drop any drafted reply/finding that someone has since answered (e.g. author/other reviewer already agreed) instead of dog-piling.
2. Write the payload to `/tmp/review<N>.json` with the `write` tool (never sed/python):
   `{commit_id, event: REQUEST_CHANGES|COMMENT|APPROVE, body: "", comments:[{path, line, start_line?, side:"RIGHT", body}]}`
   - Review body stays EMPTY (summary/recommendation/findings are terminal-only).
   - Use head-file line numbers (`git show <sha>:<path> | sed -n`, verify the exact lines before posting; drafted ranges can be off by one); `start_line`+`line` for ranges; lines must be inside a diff hunk of the PR diff vs base.
   - **Files not in the PR diff cannot take inline comments.** If a finding points at an unchanged caller (e.g. a call site), anchor the comment on the nearest changed line in the PR and name the caller file:line in the body.
   - Comment bodies: Conventional Comments labels (`**issue (blocking):**`), plain voice, NO emoji severity labels (user dislikes them).
   - Replies to existing threads cannot go in this payload; use `POST repos/<o>/<r>/pulls/<N>/comments/<comment_id>/replies` separately.
3. Post: `gh api repos/<owner>/<repo>/pulls/<N>/reviews --method POST --input /tmp/review<N>.json --jq '{id,state,html_url}'`.
   - **Quirk (seen on PR 652):** this call printed `unexpected end of JSON input` several times with `--jq`, stdin `--input -`, and the plain form, even though the file was valid JSON. The review did NOT exist after those attempts; it only posted on the run with `GH_DEBUG=api` (HTTP 200). So after ANY error or odd output, list reviews first (`gh api repos/<o>/<r>/pulls/<N>/reviews --jq '.[]|"\(.id) \(.user.login) \(.state)"'`) before retrying, to avoid duplicate REQUEST_CHANGES reviews. If it keeps failing, retry with `GH_DEBUG=api` prefixed and check again.
4. Thread replies and PR-level comments: write the body to a file with `write` (avoids shell-quote mangling of backticks/apostrophes), then `gh api .../comments/<id>/replies --method POST -F body=@/tmp/replyN.md` and `gh pr comment <N> --body-file /tmp/generalN.md`.
5. Verify anchoring AFTER ~3s via `gh api repos/<owner>/<repo>/pulls/<N>/comments --jq '.[]|"\(.id) reply=\(.in_reply_to_id) \(.path) start=\(.start_line) line=\(.line)"'` — the review-specific `/reviews/<id>/comments` endpoint shows `line: null` right after creation even when `position` is set; that is not a failure. Also check `issues/<N>/comments` for the general comment.
6. Delete the temp JSON/md files.

## Review-time gotchas (before posting)
- `git fetch origin main` overwrites FETCH_HEAD: capture the PR head SHA right after fetching it and diff with the SHA, never `FETCH_HEAD`.
- A stale local `origin/main` inflates `git diff origin/main...<sha>` with unrelated files; fetch main first and compare against `gh pr view --json files`.
- `~/.mavos-prompts/personal-context.md` may still be the blank template: no author profiles, use default tone; `gh api user --jq .login` gives the user's handle.
- Check whether the standing CHANGES_REQUESTED belongs to the user or another reviewer before choosing `Comment` vs `Request changes`.

## Stacked PR tip
If the PR sits on unmerged parent PRs (all targeting main), review only own commits: fetch parent head, capture SHA immediately (a later fetch overwrites FETCH_HEAD), `git diff <parentSHA> <prSHA>`, and add a general comment asking to retarget base or draft.
