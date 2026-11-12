---
name: verify-terminal-configs-safely
description: "When verifying terminal multiplexer/emulator configs (tmux, wezterm, ghostty, starship) after editing, to avoid destroying user sessions or crashing their workflow"
---

# Verify Terminal Configs Safely

When editing terminal multiplexer/emulator configs (tmux, wezterm, ghostty, etc.), NEVER destroy active sessions or crash the user's workflow during verification.

## Critical Rules

### tmux
- **NEVER** run `tmux kill-server` or `tmux start-server \; kill-server` — this destroys all active sessions and loses user work
- **Safe reload**: `tmux source-file ~/.config/tmux/tmux.conf` — reloads config in running server without killing it
- **Syntax check (only if no server running)**: `tmux -f <config> start-server \; kill-server` — only safe when no sessions exist
- **Resurrect saves location**: `~/.local/share/tmux/resurrect/` (not `~/.tmux/resurrect/`)

### WezTerm
- **visual_bell**: NOT a string — it's a table/struct. Omit or use correct syntax. Safe: `config.audible_bell = "SystemBeep"`
- **Reload**: WezTerm auto-reloads on config save; no manual reload needed
- **Syntax check**: `luac -p wezterm.lua` catches syntax errors but not type mismatches

### Ghostty
- **Themes**: Check available themes with `ghostty +list-themes | grep -i <name>`
- **Config keys**: Only use well-documented keys; experimental keys may cause crashes
- **Reload**: Requires app restart or Cmd+Shift+Comma

### Starship
- **Palette duplicates**: Presets with `[palettes.*]` (plural) cannot have `[palette]` (singular) appended — causes "duplicate key" error
- **Test**: `STARSHIP_CONFIG=<path> starship prompt` — ignore "dumb terminal" warnings in non-TTY shells

### General
- Always checkpoint files before editing (file-level snapshot, not git commit if tree is dirty)
- Test configs incrementally: apply one change, verify, then next
- Never force-reload in user's active session — let them restart manually
- If verification fails, revert immediately from checkpoint before diagnosing
