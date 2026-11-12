---
name: import-repo-into-monorepo-with-history
description: "Use when merging a git repository into a monorepo while preserving full commit history, tags and in-flight branches, and when proving the import is lossless."
---

# Import a repo into a monorepo with history

Proven on mavos-db (1456 commits) and mavos-techbay (562) in a /tmp rehearsal; all checks passed. Not yet proven on GitHub clones, push, or CI.

## Steps
1. Install `git-filter-repo` (`pip install git-filter-repo`, or a throwaway venv). Never run it on a working checkout: it rewrites in place and removes `origin`.
2. Fresh clone per source repo: `git clone --no-local <src> db`.
3. Rewrite into a subfolder and prefix tags (avoids tag collisions):
   `git filter-repo --to-subdirectory-filter packages/db --tag-rename '':'db/'`
   Keep `.git/filter-repo/commit-map` (old hash -> new hash) as the audit trail.
4. Create the monorepo: `git init -b main`, empty init commit, then per repo:
   `git remote add db ../db; git fetch db refs/heads/main 'refs/tags/*:refs/tags/*'; git merge --allow-unrelated-histories -m 'chore: import db history' db/main`
   Monorepo gets exactly 3 own commits for 2 repos (init + 1 merge per repo).
5. Verify (use `main` of origin, NOT the checked-out branch, which may differ in count):
   - commit count equal
   - sorted set of `%an|%ae|%aI|%cn|%cI|%s` equal
   - `git rev-parse <orig>^{tree}` == `git rev-parse <mono-ref>:<subdir>` (byte-identical tree)
   - file counts equal
   A script doing this lives at docs/improvements/IMP-0002-verify-history.sh in the mavos repo; test it with a wrong subdir to confirm it fails.
6. In-flight branches: the rewrite is deterministic (same tool + options give same hashes), so re-run on a fresh clone and `git fetch <remote> refs/heads/<branch>:refs/heads/<branch>`; it branches off monorepo main and diffs only its own files.

## Caveats to state honestly
- Commit hashes change (old hash links break; keep commit-map). Subjects keep `MV-XXXX` and `(#NNN)`.
- PR/review discussions live on GitHub, not git: archive old repos, never delete.
- Do not claim 'no history lost'; say 'full change history carries over'.
- Clones from a GitHub URL put branches under refs/remotes/origin/*; untested whether filter-repo covers them as expected.
- Repo-specific pipelines (release branches, environments, secrets, Azure OIDC) are separate work from the history import.
