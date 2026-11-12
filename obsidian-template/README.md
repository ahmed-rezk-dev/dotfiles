# Notes system

Obsidian + Neovim (obsidian.nvim) on the LLM wiki's two vault tiers. Vocabulary: `/GLOSSARY.md`. Why the vaults live inside the wiki: `/docs/adr/0001-share-vaults-with-llm-wiki-using-wiki-conventions.md`.

| Tier | Vault | Holds |
| --- | --- | --- |
| System | `~/.llm-wiki/wiki` | Daily notes (`daily/`), cross-project Atomic notes (`concepts/`), and Projects created outside a repo (`projects/<slug>/`: hub + Kanban board) |
| Project | `<repo>/.llm-wiki/wiki` | Repo-specific Atomic notes (`concepts/`) and the repo's own Projects (`projects/<slug>/`); git-excluded locally |

## Create a vault

The wiki must already exist (open pi/omp in the directory once).

```sh
newvault --system        # ~/.llm-wiki/wiki: adds projects/, daily/, daily-notes config
newvault                 # <cwd>/.llm-wiki/wiki: adds .llm-wiki/ to .git/info/exclude
```

`newvault` layers `vault/` (and `system-only/` for `--system`) from this directory without overwriting existing files, symlinks `templates/` into the vault, and downloads the pinned Kanban plugin. Afterwards open the folder in Obsidian ("Open folder as vault") and enable community plugins.

Templates are symlinked, not copied, because the wiki indexes every `.md` under `wiki/` (and blocks its metadata rebuild when one lacks a frontmatter `type`) but skips symlinks. For the same reason every note in a shared vault needs a `type:`, including Kanban boards (`type: board`).

## Neovim keys

Any markdown file under a directory containing `.obsidian/` is picked up automatically; the system vault is the default for keys used outside a vault. Projects and boards are local-first: they use the project wiki nearest to the current file or working directory, otherwise the system vault. "Nearest" checks each directory up to (not including) `$HOME` and its immediate children for `.llm-wiki/wiki`, so a repo finds a wiki in its own `docs/` or in a sibling directory shared by several repos. If that wiki has not been through `newvault` yet, `<leader>oN` runs it first.

| Key | Action |
| --- | --- |
| `<leader>on` / `oT` | New Atomic note / new note from template |
| `<leader>oN` | New Project (hub + board) in the repo's vault, else the system vault |
| `<leader>oB` | Open a project board: the repo vault's boards if it has any, else the system vault's |
| `<leader>of` / `os` | Find note / search notes |
| `<leader>ob` | Backlinks |
| `<leader>od` / `oD` | Today's Daily note / list dailies |
| `<leader>og` / `op` | Tags / properties |
| `<leader>ot` | Insert template |
| `<leader>ow` | Switch vault |
| `<leader>oo` | Open in Obsidian |

On a board buffer: `<leader>o]` / `<leader>o[` move the card under the cursor to the next / previous column, `<leader>oa` adds a card to the current column.

Conventions in shared vaults: kebab-case filenames, `[label](/folder/page.md)` links, wiki frontmatter, `projects: [slug]` on Atomic notes. obsidian.nvim never rewrites frontmatter on save.
