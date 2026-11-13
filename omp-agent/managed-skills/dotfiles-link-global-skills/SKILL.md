---
name: dotfiles-link-global-skills
description: Link a global skills/prompts directory into the dotfiles repo and push changes
---

# Linking a global skills/prompts directory into dotfiles

Use when a global agent asset directory (e.g. `~/.omp/agent/managed-skills`, `~/.agents/prompts`) is a real directory instead of a symlink into the dotfiles repo, so it isn't versioned.

## Steps

1. Pick a target path inside the dotfiles repo mirroring the global location:
   - `~/.agents/skills` → `dotfiles/agents/skills`
   - `~/.agents/prompts` → `dotfiles/agents/prompts`
   - `~/.omp/agent/managed-skills` → `dotfiles/omp-agent/managed-skills`
2. Create the target dir and copy contents: `mkdir -p <target> && cp -a <global>/. <target>/`
3. Remove the original real dir and replace with a symlink to the target:
   `rm -rf <global> && ln -s <abs target> <global>`
4. Add a link entry to `install.conf.yaml` under the `link:` section:
   `~/.path/to/global/: relative/target/path`
5. Stage, commit, push:
   - `git add -A`
   - Remove any accidentally staged embedded git repos: `git rm -f --cached <path>` (e.g. `tmux/plugins/catppuccin-tmux`).
   - `git commit -m "chore: link <name> into dotfiles"`
   - Switch gh to the personal account before pushing: `gh auth switch -u ahmed-rezk-dev && gh auth setup-git`, then `git push origin <branch>`, then restore: `gh auth switch -u Ahmed-Rezk_MAV`.

## Pitfalls

- omp's `managed-skills` code explicitly allows a symlinked root (resolves to an existing directory), so symlinking is safe.
- Avoid committing embedded git repositories (submodules) like `tmux/plugins/catppuccin-tmux`; remove from index.
- When amending to drop an accidentally committed gitlink, use `--force-with-lease`.
