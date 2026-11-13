# dotfiles

## Fresh macOS machine

```sh
# 1. Toolchain
xcode-select --install
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Clone (no --recursive: hammerspoon/Spoons/VimMode.spoon is an unmapped gitlink)
git clone <repo-url> ~/dotfiles && cd ~/dotfiles

# 3. Packages: terminals, Geist Mono Nerd Font, tmux, workmux, starship, fzf, ...
brew bundle --file=Brewfile

# 4. Link configs; also checks out dotbot and the pinned tmux plugins (tmux/plugins)
./install

# 5. Reload
exec zsh                    # antigen downloads zsh plugins on first run
tmux                        # plugins are already in tmux/plugins; no prefix+I needed
```

Not covered by the Brewfile:

- `omp` (agent CLI): `bun install -g @oh-my-pi/pi-coding-agent` (needs `bun`, https://bun.sh).
- `~/.zshrc.local`: machine-specific secrets/paths. Copy from `~/.zshrc.local.example`.
- Optional PATH entries in `.zshrc` (rvm, Android, lmstudio, opencode) are only needed if you use them.

## Layout

| Path | Linked to |
|---|---|
| `ghostty/`, `wezterm/` | `~/.config/ghostty`, `~/.config/wezterm` |
| `tmux/` | `~/.config/tmux` (plugins are submodules in `tmux/plugins`) |
| `starship/starship.toml` | `~/.config/starship.toml` |
| `workmux/` | `~/.config/workmux` |

Run `./install` again after adding a link to `install.conf.yaml`.
