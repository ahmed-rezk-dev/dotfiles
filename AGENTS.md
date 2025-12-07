# Agent Guidelines for dotfiles Repository

## Build/Lint/Test Commands
- **Python (dotbot)**: `cd dotbot && python -m pytest tests/` (single test: `python -m pytest tests/test_file.py::test_name`)
- **Lint Python**: `cd dotbot && black --check --diff .`
- **Format Python**: `cd dotbot && black .`
- **Lua**: `stylua --check --color never .` (format: `stylua .`)
- **Multi-env test**: `cd dotbot && tox`

## Code Style Guidelines
- **Python**: Black formatting (100 char lines), 4-space indentation, UTF-8, LF endings
- **Lua**: 2-space indentation, 120 column width, stylua formatting
- **General**: Trim trailing whitespace, insert final newline, snake_case for Python functions/variables
- **Imports**: Standard library first, then third-party, then local (alphabetical within groups)
- **Error handling**: Use try/except with specific exceptions, log errors appropriately
- **Types**: Use type hints where beneficial, avoid over-typing for clarity
- **Naming**: descriptive names, avoid abbreviations except well-known ones (e.g., `cfg` for config)

## Testing
- Use pytest fixtures and parametrize for comprehensive coverage
- Mock external dependencies, test edge cases and error conditions
- Follow existing test patterns in `tests/` directory

## Lua Type Checking
- Use .luarc.json globals: `log`, `services`, `service`, `Settings`, `bindings`, `spoon`, `hs`