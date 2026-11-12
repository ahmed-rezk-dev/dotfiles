---
name: notes-vault-setup-and-verify
description: "Use when adding a project vault, creating notes projects/boards, or changing the dotfiles Obsidian/obsidian.nvim notes system on the LLM wiki."
---

# Notes vault setup and verification

See /Users/ahmed.rezk/dotfiles/obsidian-template/README.md and GLOSSARY.md for the model.

## Add a vault
1. Open pi/omp in the repo once so `<repo>/.llm-wiki/wiki` exists (newvault fails otherwise).
2. From the repo root run `newvault` (project vault) or `newvault --system` (~/.llm-wiki/wiki). It is idempotent, symlinks `templates/`, downloads the pinned Kanban plugin, and git-excludes `.llm-wiki/` for project vaults.
3. Open Neovim in the repo. `<leader>oN` / `<leader>oB` create/open projects and boards in the repo vault if it exists, else the system vault.

## Rules that break the wiki if ignored
- Every `.md` under `wiki/` needs a frontmatter `type`; one miss makes the metadata rebuild return ok:false (background warning `concept_missing_type`). Boards need `type: board`.
- Never copy templates into the vault; the wiki skips symlinks only. Never name a hand-written note `index.md`.
- obsidian.nvim must keep `frontmatter.enabled = false` (otherwise it rewrites wiki frontmatter on save).

## Verify without waiting for the background job
Run with bun: import `resolveVaultPaths` (lib/utils.ts), `rebuildMetadata` (lib/metadata.ts) and `runWikiLint` (lib/lint.ts) from `~/.omp/plugins/node_modules/@zosmaai/pi-llm-wiki/extensions/llm-wiki/lib/`, call them with `process.env.HOME`; expect `ok:true` and no diagnostics. The rebuild writes meta/, so remove probe notes afterwards and rebuild again.

## Headless Neovim smoke
`nvim --headless -c "luafile /tmp/x.lua"` with a script that opens a vault note, runs `:Obsidian new/today`, `require('utils.notes').new_project()` (stub `vim.ui.input`/`vim.ui.select`) and always ends with `vim.cmd('qa!')` (an error before it hangs the run). Delete probe notes afterwards.

## lazy-lock.json
`Lazy! install` rewrites the whole lockfile; restore from `git show HEAD:nvim/lazy-lock.json` and add only the new entry.
