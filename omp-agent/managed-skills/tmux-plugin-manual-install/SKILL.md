---
name: tmux-plugin-manual-install
description: "Manually install tmux plugins when tpm's install_plugins script fails or reports false positives"
---

# Manual tmux Plugin Installation

When `tpm/bin/install_plugins` reports "Already installed" for a plugin that isn't actually present, or when adding a new plugin doesn't work via tpm's normal flow.

## Symptoms
- `~/.tmux/plugins/tpm/bin/install_plugins` says "Already installed" but plugin directory doesn't exist
- New `@plugin` line added to tmux.conf but plugin not available
- Tmux config errors referencing missing plugin files

## Procedure

### 1. Verify plugin directory location
```bash
grep "TMUX_PLUGIN_MANAGER_PATH" ~/.config/tmux/tmux.conf
```
Common locations: `~/.tmux/plugins/` or `~/dotfiles/tmux/plugins/`

### 2. Check if plugin actually exists
```bash
ls $PLUGIN_MANAGER_PATH/ | grep -i <plugin-name>
```

### 3. Manual clone if missing
```bash
cd $PLUGIN_MANAGER_PATH
git clone https://github.com/<org>/<plugin>.git <plugin-dir-name>
```

### 4. Source the plugin in tmux.conf
Add after the `@plugin` line:
```tmux
run '$PLUGIN_MANAGER_PATH/<plugin-dir>/<main-file>.tmux'
```

Common main files:
- `catppuccin/tmux` → `catppuccin.tmux`
- Most plugins → `<plugin-name>.tmux` or check README

### 5. Reload tmux config
```bash
tmux source-file ~/.config/tmux/tmux.conf
```

## Example: catppuccin/tmux
```bash
cd ~/dotfiles/tmux/plugins
git clone https://github.com/catppuccin/tmux.git catppuccin-tmux
# In tmux.conf:
set -g @plugin 'catppuccin/tmux'
run '~/dotfiles/tmux/plugins/catppuccin-tmux/catppuccin.tmux'
```

## Notes
- tpm uses the `@plugin` value to determine install directory, but sometimes the clone fails silently
- Always verify the plugin directory exists after `install_plugins`
- Some plugins require configuration variables set BEFORE the `run` line
- Check plugin README for required configuration order
