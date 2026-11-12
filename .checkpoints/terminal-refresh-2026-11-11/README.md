# Checkpoint: terminal-refresh-2026-11-11

Snapshot of the files modified by the "sharp + modern terminal" refresh
(Ghostty primary / WezTerm power / Starship status / Catppuccin Mocha / Geist Mono).

## Files captured

| File | Action in refresh |
|---|---|
| `wezterm.lua` | modified (palette, font, opacity, powerline status removed) |
| `tmux.conf` | modified (tokyonight status block removed, pane borders recoloured) |
| `config` | overwritten (ghostty/config — was a 2-line stub) |
| `zshrc` | modified (p10k disabled, starship init added) |

## File created (not captured, just delete on revert)

- `~/.config/starship.toml` (symlink → `~/dotfiles/starship/starship.toml`)
- `~/dotfiles/starship/` directory (new)
- Line in `~/dotfiles/install.conf.yaml` (`~/.config/starship.toml: starship/starship.toml`)

## Revert

From `~/dotfiles`:

```sh
cp .checkpoints/terminal-refresh-2026-11-11/wezterm.lua  wezterm/wezterm.lua
cp .checkpoints/terminal-refresh-2026-11-11/tmux.conf    tmux/tmux.conf
cp .checkpoints/terminal-refresh-2026-11-11/config       ghostty/config
cp .checkpoints/terminal-refresh-2026-11-11/zshrc        ~/.zshrc
rm -f ~/.config/starship.toml
rm -rf ~/dotfiles/starship
# also remove the starship line from install.conf.yaml if desired
```

Then reload: relaunch Ghostty; `tmux source ~/.config/tmux/tmux.conf`; WezTerm
reloads on save; restart zsh (`exec zsh`).

## Notes

- Working tree was dirty (133+ files) on branch `fix/hammerspoon-editor-overlay`
  at checkpoint time — this is a file-level snapshot, not a git commit, to avoid
  tangling with unrelated WIP.
- p10k was the previous prompt; lines are commented, not deleted, in ~/.zshrc.
- To also snapshot any follow-up edits (e.g. nvim palette switch, avante bell
  hook), append to this directory before editing.
