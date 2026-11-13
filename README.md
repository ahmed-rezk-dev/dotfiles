# dotfiles

## Fresh macOS machine

```sh
# No --recursive: hammerspoon/Spoons/VimMode.spoon is an unmapped gitlink
git clone <repo-url> ~/dotfiles && cd ~/dotfiles
./bootstrap
```

`./bootstrap` is idempotent (each step skips if already done; `DRY_RUN=1 ./bootstrap` previews). It:

1. Installs Xcode command line tools and Homebrew if missing.
2. Runs `brew bundle` on `Brewfile` (terminals, Geist Mono Nerd Font, tmux, workmux, starship, fzf, ...).
3. Installs `bun`, then `omp` (`@oh-my-pi/pi-coding-agent`).
4. Runs `./install`: links configs and checks out dotbot plus the pinned tmux plugins in `tmux/plugins`.
5. Creates `~/.zshrc.local` from `.zshrc.local.example` if missing. Fill in machine-specific values.

Then open a new terminal. antigen downloads zsh plugins on first run; tmux plugins are already in place (no `prefix + I` needed).

Optional PATH entries in `.zshrc` (rvm, Android, lmstudio, opencode) only matter if you use them.

## Layout

| Path | Linked to |
|---|---|
| `ghostty/`, `wezterm/` | `~/.config/ghostty`, `~/.config/wezterm` |
| `tmux/` | `~/.config/tmux` (plugins are submodules in `tmux/plugins`) |
| `starship/starship.toml` | `~/.config/starship.toml` |
| `workmux/` | `~/.config/workmux` |

Run `./install` again after adding a link to `install.conf.yaml`.
