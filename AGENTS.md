# Agent Guidelines for dotfiles Repository

## Build/Lint/Test Commands

### Python (dotbot/)
- **Test all**: `tox`
- **Test single file**: `python -m pytest tests/test_file.py`
- **Test single function**: `python -m pytest tests/test_file.py::test_function_name`
- **Format**: `black .` (line length: 100)
- **Import sorting**: `isort .`
- **Coverage report**: `tox -e coverage_report`

### Lua (hammerspoon/, nvim/)
- **Format**: `stylua .` (2 spaces, column width: 120)

## Code Style Guidelines

### Python
- **Formatting**: Black with 100 character line length
- **Indentation**: 4 spaces
- **Encoding**: UTF-8, LF line endings
- **Imports**: Standard library → third-party → local (sorted with isort)
- **Naming**: snake_case for functions/variables, PascalCase for classes
- **Error handling**: Use try/except with specific exceptions
- **Types**: Use type hints when beneficial

### Lua
- **Formatting**: stylua with 2-space indentation, 120 column width
- **Naming**: camelCase for functions/variables
- **Error handling**: Use pcall for protected calls

### General
- Trim trailing whitespace
- Insert final newlines
- No unused imports
- Follow existing patterns in each project