#!/bin/bash
# =============================================================================
# Theme Switcher - Syncs all tools with system dark/light mode
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TUI_CONFIG="$HOME/.config/opencode/tui.json"
NVIM_STATE_FILE="$HOME/.local/share/nvim/theme_state"
LAZYGIT_CONFIG="$HOME/.config/lazygit/config.yml"
FZF_COLORS_FILE="$HOME/.config/fzf/colors.env"
TMUX_CONF="$HOME/dotfiles/tmux/tmux.conf"

# Edit config file (handles symlinks and special filesystems)
edit_config() {
  local file="$1"
  local old_pattern="$2"
  local new_value="$3"
  
  # If it's a symlink, resolve it
  if [[ -L "$file" ]]; then
    local resolved
    resolved="$(readlink -f "$file")"
    if [[ -f "$resolved" ]]; then
      file="$resolved"
    fi
  fi
  
  # Skip if not a regular file
  if [[ ! -f "$file" ]]; then
    return 1
  fi
  
  # Create temp file and replace
  local tmp_file
  tmp_file="$(mktemp)"
  sed "s|$old_pattern|$new_value|g" "$file" > "$tmp_file" && cp "$tmp_file" "$file" && rm -f "$tmp_file"
}

# Get current system appearance
get_system_appearance() {
  if [[ "$(defaults read -g AppleInterfaceStyle 2>/dev/null)" == "Dark" ]]; then
    echo "dark"
  else
    echo "light"
  fi
}

# Switch tmux theme
switch_tmux_theme() {
  local appearance="$1"
  local flavor=""
  
  if [[ "$appearance" == "dark" ]]; then
    flavor="mocha"
  else
    flavor="latte"
  fi
  
  # Update tmux config
  edit_config "$TMUX_CONF" '@catppuccin_flavor "[^"]*"' "@catppuccin_flavor \"$flavor\""
  
  # If tmux is running, reload with run-shell
  if tmux has-session 2>/dev/null; then
    tmux set -g @catppuccin_flavor "$flavor"
    tmux run-shell "source-file $TMUX_CONF"
  fi
  
  echo "✓ tmux: $flavor"
}

# Switch OpenCode theme
switch_opencode_theme() {
  local appearance="$1"
  local theme_name=""
  
  if [[ "$appearance" == "dark" ]]; then
    theme_name="onedarkpro-vaporwave"
  else
    theme_name="onedarkpro-onelight"
  fi
  
  # Update tui.json
  if [[ -f "$TUI_CONFIG" ]]; then
    sed -i '' "s/\"theme\": \"[^\"]*\"/\"theme\": \"$theme_name\"/" "$TUI_CONFIG"
    echo "✓ OpenCode: $theme_name"
  fi
}

# Switch Lazygit theme
switch_lazygit_theme() {
  local appearance="$1"
  
  if [[ "$appearance" == "dark" ]]; then
    edit_config "$LAZYGIT_CONFIG" 'lightTheme:.*' "lightTheme: false"
    edit_config "$LAZYGIT_CONFIG" 'delta --light' "delta --dark"
  else
    edit_config "$LAZYGIT_CONFIG" 'lightTheme:.*' "lightTheme: true"
    edit_config "$LAZYGIT_CONFIG" 'delta --dark' "delta --light"
  fi
  
  echo "✓ Lazygit: $appearance"
}

# Switch FZF colors
switch_fzf_theme() {
  local appearance="$1"
  
  mkdir -p "$HOME/.config/fzf"
  
  if [[ "$appearance" == "dark" ]]; then
    cat > "$FZF_COLORS_FILE" << 'FZFEOF'
# FZF Dark Theme - Vaporwave colors
export FZF_DEFAULT_COMMAND='fzf --height 50% --layout=reverse --border'
export FZF_DEFAULT_OPTS='--color=bg:#222435,fg:#B4B7CF,hl:#c678dd,hl+:#c678dd,spinner:#EAA041,info:#EAA041,pointer:#25ABE4,marker:#75BE78,border:#585B89,header:#585B89'
FZFEOF
  else
    cat > "$FZF_COLORS_FILE" << 'FZFEOF'
# FZF Light Theme - OneLight colors
export FZF_DEFAULT_COMMAND='fzf --height 50% --layout=reverse --border'
export FZF_DEFAULT_OPTS='--color=bg:#fafafa,fg:#6a6a6a,hl:#9a77cf,hl+:#9a77cf,spinner:#ee9025,info:#ee9025,pointer:#118dc3,marker:#1da912,border:#bebebe,header:#9b9fa6'
FZFEOF
  fi
  
  # Source for current session
  source "$FZF_COLORS_FILE"
  
  echo "✓ FZF: $appearance (sourced)"
}

# Update nvim theme state file
update_nvim_state() {
  local appearance="$1"
  echo "export NVIM_THEME=$appearance" > "$NVIM_STATE_FILE"
}

# Switch all themes
switch_theme() {
  local appearance="$1"
  
  echo "Switching to $appearance mode..."
  echo ""
  
  switch_tmux_theme "$appearance"
  switch_opencode_theme "$appearance"
  switch_lazygit_theme "$appearance"
  switch_fzf_theme "$appearance"
  update_nvim_state "$appearance"
  
  echo ""
  echo "Done! Switched to $appearance mode."
  echo ""
  echo "Note: Reload tmux manually with: tmux source ~/.tmux.conf"
}

# Main - auto detect
main() {
  local appearance
  appearance="$(get_system_appearance)"
  switch_theme "$appearance"
}

# Handle arguments
case "${1:-}" in
  dark)
    switch_theme "dark"
    ;;
  light)
    switch_theme "light"
    ;;
  toggle)
    local current
    current="$(get_system_appearance)"
    if [[ "$current" == "dark" ]]; then
      switch_theme "light"
    else
      switch_theme "dark"
    fi
    ;;
  status)
    local lg_theme
    lg_theme="$(grep "lightTheme:" "$LAZYGIT_CONFIG" 2>/dev/null | awk '{print $2}')"
    [[ "$lg_theme" == "true" ]] && lg_theme="light" || lg_theme="dark"
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  Theme Status"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  System:      $(get_system_appearance)"
    echo "  Neovim:      $(cat "$NVIM_STATE_FILE" 2>/dev/null | cut -d= -f2 || echo 'unknown')"
    echo "  OpenCode:    $(grep '"theme"' "$TUI_CONFIG" 2>/dev/null | sed 's/.*: "\([^"]*\)".*/\1/' || echo 'unknown')"
    echo "  tmux:        $(tmux show -gv @catppuccin_flavor 2>/dev/null || echo 'unknown')"
    echo "  Lazygit:     $lg_theme"
    echo "  FZF:         $(grep "bg:#1e1f23" "$FZF_COLORS_FILE" >/dev/null 2>&1 && echo 'dark' || grep "bg:#fafafa" "$FZF_COLORS_FILE" >/dev/null 2>&1 && echo 'light' || echo 'unknown')"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    ;;
  *)
    main
    ;;
esac
