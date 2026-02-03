# Agent Guidelines for dotfiles Repository

This repository contains personal dotfiles including dotbot (Python), Hammerspoon (Lua), and Neovim (Lua) configurations.

## Repository Structure
- `dotbot/` - Python dotfiles management tool (submodule)
- `hammerspoon/` - Hammerspoon macOS automation config
- `nvim/` - Neovim/LazyVim configuration
- `tmux/`, `wezterm/`, `ghostty/` - Terminal configurations
- `aichat/`, `opencode/` - AI and development tools

## Build/Lint/Test Commands

### Python (dotbot)
- **Run all tests**: `cd dotbot && python -m pytest tests/`
- **Run single test**: `cd dotbot && python -m pytest tests/test_file.py::test_name`
- **Run with coverage**: `cd dotbot && coverage run -m pytest tests/ && coverage report`
- **Lint Python**: `cd dotbot && black --check --diff .`
- **Format Python**: `cd dotbot && black .`
- **Multi-env test**: `cd dotbot && tox`

### Lua (Hammerspoon/Neovim)
- **Check formatting**: `stylua --check --color never .`
- **Format Lua**: `stylua .`
- **Type check**: Requires LuaLS with globals from `.luarc.json`

## Code Style Guidelines

### Python (dotbot)
- **Formatter**: Black with 100 character line length
- **Indentation**: 4 spaces
- **Encoding**: UTF-8, LF line endings
- **Naming**: snake_case for functions/variables, PascalCase for classes
- **Imports**: Standard library → third-party → local (alphabetical within groups)
- **Type hints**: Use where beneficial, avoid over-typing
- **Error handling**: Use try/except with specific exceptions, log errors appropriately
- **Classes**: Inherit from `object` (Python 2 compatibility pattern), use `_directive` class variable for plugins
- **Logging**: Use Messenger class with levels: lowinfo, info, warning, error, debug

### Lua (Hammerspoon/Neovim)
- **Formatter**: stylua with 2-space indentation, 120 column width
- **Indentation**: 2 spaces
- **Encoding**: UTF-8, LF line endings
- **Module pattern**: Use `local M = {}` and `return M` for modules
- **Imports**: Use `require()` with relative paths for local modules
- **Comments**: Use `--` for single-line, `--[[` `--]]` for multi-line
- **Tables**: Use `{}` for tables, `key = value` syntax
- **Functions**: Prefer `local function name()` over `name = function()`
- **String concatenation**: Use `..` operator
- **Boolean literals**: Use lowercase `true`, `false`, `nil`
- **Error handling**: Use `pcall()` for error recovery, log via custom logger module

### General Rules
- **Whitespace**: Trim trailing whitespace, insert final newline
- **File naming**: snake_case for Python, lowercase for Lua files
- **Descriptive names**: Avoid abbreviations except well-known ones (e.g., `cfg` for config, `msg` for message)
- **Docstrings**: Python modules and classes use triple-quoted strings

## Testing Guidelines

### Python (pytest)
- **Fixtures**: Use pytest fixtures for test setup (see `tests/conftest.py`)
- **Patterns**: Follow existing test patterns in `tests/` directory
- **Mocking**: Mock external dependencies using `unittest.mock`
- **Edge cases**: Test edge cases and error conditions
- **Parametrize**: Use `@pytest.mark.parametrize` for data-driven tests
- **Assertions**: Use descriptive assertion messages

### Lua
- **Testing**: Manual testing via Hammerspoon console, use `hs.reload()` for hot reload
- **Logging**: Use `log.d()`, `log.i()`, `log.w()`, `log.e()` for debug/info/warn/error
- **Key bindings**: Test hotkey bindings in actual application

## Lua Type Checking
- **Globals** (`.luarc.json`): `log`, `services`, `service`, `Settings`, `bindings`, `spoon`, `hs`
- **Neovim**: Use `---@diagnostic` comments for type assertions
- **Hammerspoon**: EmmyLua spoon generates type annotations

## Common Patterns

### Python Plugin Pattern (dotbot)
```python
from ..plugin import Plugin

class MyPlugin(Plugin):
    _directive = "myplugin"

    def can_handle(self, directive):
        return directive == self._directive

    def handle(self, directive, data):
        if directive != self._directive:
            raise ValueError("MyPlugin cannot handle directive %s" % directive)
        return self._process_data(data)
```

### Lua Module Pattern
```lua
local M = {}

function M.someFunction()
  -- code here
end

return M
```

### Hammerspoon Configuration
- Use `hs.loadSpoon()` to load Spoons
- Define bindings in `bindings` module
- Use `Settings` module for shared configuration
- Load configuration modules with `require()`

## Project-Specific Notes

### Dotbot
- Changes should follow existing plugin patterns
- Tests must run on Linux, macOS, and Windows
- Use `os.path.expanduser()` and `os.path.expandvars()` for paths
- Maintain backward compatibility with older Python versions

### Hammerspoon
- Use custom logger module instead of `hs.logger` for consistency
- Define key bindings in `config/bindings.lua` or `Settings.keys`
- Use `hs.hotkey.bind()` for hotkey registration
- Spoon files in `Spoons/` directory

### Neovim (LazyVim)
- Use `vim.opt` for options
- Lazy load plugins where possible
- Follow LazyVim conventions for plugin configuration
- Use `:Lazy sync` to update plugins