---
name: address-pr-review-feedback
description: "Use when asked to check or address feedback on your own GitHub PR: read inline review comments, apply fixes, push safely, and reply on each thread."
---

## Procedure

1. Find PR: `gh pr view --json number,url,reviewDecision,statusCheckRollup`.
2. Read feedback. `gh pr view N --json reviews,comments` shows top-level only; inline threads need
   `gh api repos/<owner>/<repo>/pulls/N/comments | jq '[.[]|{id,a:.user.login,path,line,body,reply:.in_reply_to_id}]'`.
3. Read the commented file and every other caller of anything you change (grep) before editing.
4. Apply fixes, then run tsc, eslint, prettier and the related Jest suites. Commit as a NEW commit
   (branch is pushed; do not amend). Stage files by explicit path.
5. `git fetch origin` and check `git log HEAD..origin/<branch>`. GitHub "Update branch" adds main
   merges remotely. If behind, merge `origin/<branch>` (match the branch's merge style); no force push.
6. Push ALONE and confirm success (`git status -sb` has no ahead count). NEVER chain
   `git push | tail && gh api ...`: the pipe hides a rejected push.
7. Only after the push lands, reply on each thread:
   `gh api repos/<owner>/<repo>/pulls/N/comments/<comment_id>/replies -f body="..."`.
   Do not resolve threads; the reviewer does that.

## Reply tone

Short, casual, first person, one or two sentences. State what changed and any deviation, e.g.
"Good call, made it required and dropped the cast. The only other caller now passes `false`."
No bullet lists, no headings, no "Thank you for the review!" boilerplate.

## Shared-workspace gotchas

`git stash` and `git checkout -- file` are blocked. A dirty generated file (e.g. `next-env.d.ts`)
blocks merges: compare with `git diff HEAD origin/<branch> -- file`, then edit it back by hand.
