# =============================================================================
# POWERLEVEL10K CONFIGURATION
# =============================================================================
# Place this file at ~/.p10k.zsh or symlink: ln -sf ~/dotfiles/p10k.zsh ~/.p10k.zsh
# =============================================================================

# Enable Powerlevel10k instant prompt
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# =============================================================================
# THEME INDICATOR FUNCTION
# =============================================================================

# Source theme state from nvim if available
# Neovim stdpath("data"): ~/.local/share/nvim
NVIM_STATE_FILE="$HOME/.local/share/nvim/theme_state"
if [[ -f "$NVIM_STATE_FILE" ]]; then
  source "$NVIM_STATE_FILE"
fi

# Function to detect current theme
function _get_theme() {
  # Priority 1: Check NVIM_THEME environment variable (set by nvim)
  if [[ -n "$NVIM_THEME" ]]; then
    echo "$NVIM_THEME"
    return
  fi
  
  # Priority 2: Fall back to system appearance
  if [[ "$(defaults read -g AppleInterfaceStyle 2>/dev/null)" == "Dark" ]]; then
    echo "dark"
  else
    echo "light"
  fi
}

# Function to reload theme state manually
function reload-theme-state() {
  if [[ -f "$NVIM_STATE_FILE" ]]; then
    source "$NVIM_STATE_FILE"
  fi
  # Force p10k to refresh
  zle && zle reset-prompt
}

# =============================================================================
# THEME INDICATOR SEGMENT
# =============================================================================

prompt_theme_indicator() {
  local theme=$(_get_theme)
  local icon=""
  local fg_color=""
  
  case "$theme" in
    dark)
      icon="🌙"
      fg_color="cyan"
      ;;
    light)
      icon="☀️"
      fg_color="yellow"
      ;;
    *)
      icon="⚡"
      fg_color="white"
      ;;
  esac
  
  p10k segment -f 015 -b 000 -i "$icon" -c "$icon %F{${fg_color}}${theme}%f"
}

# =============================================================================
# P10K CONFIGURATION
# =============================================================================

# Use extended color palette
typeset -g POWERLEVEL9K_ICON_PALETTE='extended'

# Prompt elements
typeset -g POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(
  context
  theme_indicator
  dir
  vcs
  newline
  prompt_char
)

typeset -g POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(
  status
  command_execution_time
  background_jobs
  virtualenv
  pyenv
  nodeenv
  nvm
  goenv
  rustenv
  docker_context
  newline
  time
)

# Context styling
typeset -g POWERLEVEL9K_CONTEXT_TEMPLATE='%F{082}%n%f%F{226}@%f%F{082}%m%f'

# Directory styling
typeset -g POWERLEVEL9K_DIR_TRUNCATE_BEFORE_FIRST_MATCHED_FOLDER_ABBREVIATION_FROM_RIGHT=3
typeset -g POWERLEVEL9K_DIR_MIN_COMMAND_ELEMENTS=2
typeset -g POWERLEVEL9K_DIR_MAX_LENGTH=40

# VCS styling
typeset -g POWERLEVEL9K_VCS_BACKENDS=(git)
typeset -g POWERLEVEL9K_VCS_SHORTENED_NAME_LENGTH=32

# Command execution time
typeset -g POWERLEVEL9K_COMMAND_EXECUTION_TIME_THRESHOLD=5
typeset -g POWERLEVEL9K_COMMAND_EXECUTION_TIME_FORMAT='d h m s'

# Status segment
typeset -g POWERLEVEL9K_STATUS_EXTENDED_STATES=true
typeset -g POWERLEVEL9K_STATUS_VERBOSE=true

# Default colors
typeset -g POWERLEVEL9K_COLOR_SCHEME='dark'
typeset -g POWERLEVEL9K_DEFAULT_FOREGROUND=015
typeset -g POWERLEVEL9K_DEFAULT_BACKGROUND=000

# Theme indicator colors
typeset -g POWERLEVEL9K_THEME_INDICATOR_FOREGROUND=015
typeset -g POWERLEVEL9K_THEME_INDICATOR_BACKGROUND=000
typeset -g POWERLEVEL9K_THEME_INDICATOR_VISUAL_IDENTIFIER_COLOR=cyan

# Prompt options
typeset -g POWERLEVEL9K_TRANSIENT_PROMPT=always
typeset -g POWERLEVEL9K_INSTANT_PROMPT=quiet
typeset -g POWERLEVEL9K_MULTILINE_FIRST_PROMPT_PREFIX=
typeset -g POWERLEVEL9K_MULTILINE_LAST_PROMPT_PREFIX=" %F{008}❯%f "

# Reload p10k when theme changes
function reload-p10k() {
  source ~/.p10k.zsh
}

# Command to toggle theme (can be used in shell)
function toggle-theme() {
  # Toggle the NVIM_THEME env var
  if [[ "$NVIM_THEME" == "dark" ]]; then
    export NVIM_THEME="light"
  else
    export NVIM_THEME="dark"
  fi
  
  # If nvim is running, send it the toggle command
  if pgrep -x nvim > /dev/null 2>&1; then
    nvim --headless -c "ToggleTheme" -c "qa" 2>/dev/null
  fi
  
  # Also switch OpenCode theme
  ~/dotfiles/scripts/opencode-theme-switcher.sh "$NVIM_THEME"
  
  # Refresh p10k
  reload-p10k
  
  echo "Theme switched to $NVIM_THEME"
}
