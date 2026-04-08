#!/bin/bash
# =============================================================================
# FZF Theme Switcher - Interactive fuzzy theme selection
# =============================================================================

THEME_SCRIPT="$HOME/dotfiles/scripts/opencode-theme-switcher.sh"

# Get current system appearance
get_current() {
  if [[ "$(defaults read -g AppleInterfaceStyle 2>/dev/null)" == "Dark" ]]; then
    echo "dark"
  else
    echo "light"
  fi
}

# Check if we're in tmux
in_tmux() {
  [[ -n "$TMUX" ]]
}

# Main menu
main() {
  local current
  current="$(get_current)"
  
  # Create menu options
  local options=(
    "🌙 Dark Mode: Switch everything to dark"
    "☀️ Light Mode: Switch everything to light"
    "🔄 Toggle: Switch to opposite of current ($current)"
    "📊 Status: Show current theme state"
  )
  
  # Use fzf for selection
  local choice
  choice=$(printf '%s\n' "${options[@]}" | fzf --prompt="Theme Switcher > " --height=~50% --border --ansi --preview-window=down:3)
  
  if [[ -z "$choice" ]]; then
    echo "No selection made"
    return
  fi
  
  # Handle selection
  if [[ "$choice" == *"Dark Mode"* ]]; then
    "$THEME_SCRIPT" dark
  elif [[ "$choice" == *"Light Mode"* ]]; then
    "$THEME_SCRIPT" light
  elif [[ "$choice" == *"Toggle"* ]]; then
    "$THEME_SCRIPT" toggle
  elif [[ "$choice" == *"Status"* ]]; then
    "$THEME_SCRIPT" status
  fi
  
  # Refresh prompt if in tmux
  if in_tmux; then
    tmux refresh-client -S
  fi
}

# Quick switch without fzf (for keybindings)
quick_switch() {
  "$THEME_SCRIPT" toggle
}

# Show current theme info
show_status() {
  local appearance
  appearance="$(get_current)"
  
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  Theme Status"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  System:      $appearance"
  echo "  Neovim:      $(cat ~/.local/share/nvim/theme_state 2>/dev/null | cut -d= -f2 || echo 'unknown')"
  echo "  OpenCode:    $(grep '"theme"' ~/.config/opencode/tui.json | sed 's/.*: "\([^"]*\)".*/\1/')"
  echo "  tmux:        $(tmux show -gv @catppuccin_flavor 2>/dev/null || echo 'unknown')"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

# Handle arguments
case "${1:-}" in
  -s|--status)
    show_status
    ;;
  -q|--quick)
    quick_switch
    ;;
  *)
    main
    ;;
esac
