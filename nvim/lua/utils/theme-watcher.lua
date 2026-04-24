-- Theme watcher for Neovim - automatically switches colorscheme based on theme file
-- Uses built-in libuv (no plugins required)
local M = {}

local theme_file = vim.fn.stdpath("config") .. "/../dotfiles/theme"
local current_theme = nil

-- Read theme from file
local function read_theme()
  local file = io.open(theme_file, "r")
  if file then
    local theme = file:read("*a"):match("^%s*(.-)%s*$")
    file:close()
    if theme == "dark" or theme == "light" then
      return theme
    elseif theme == "auto" then
      -- Time-based detection
      local hour = tonumber(os.date("%H"))
      if hour >= 18 or hour < 7 then
        return "dark"
      else
        return "light"
      end
    end
  end
  return nil
end

-- Get time-based theme (for initial load)
local function get_time_based_theme()
  local hour = tonumber(os.date("%H"))
  if hour >= 18 or hour < 7 then
    return "dark"
  else
    return "light"
  end
end

-- Apply the colorscheme based on theme
local function apply_theme(theme)
  if theme == current_theme then
    return
  end

  current_theme = theme

  -- Set neovim background option
  if theme == "dark" then
    vim.opt.background = "dark"
  else
    vim.opt.background = "light"
  end

  -- Refresh syntax/colors
  vim.cmd("hi clear")
  if vim.fn.exists("syntax_on") == 1 then
    vim.cmd("syntax reset")
  end

  -- Reload the colorscheme
  local ok, _ = pcall(vim.cmd, "colorscheme tokyonight")
  if not ok then
    -- Fallback if tokyonight not available
    vim.cmd("colorscheme default")
  end

  vim.defer_fn(function()
    vim.cmd("redrawstatus")
    vim.cmd("redrawtabline")
  end, 0)
end

-- Watch for theme file changes
local function watch_theme()
  local uv = vim.loop
  local handle = uv.new_fs_event()

  local function callback(err)
    if err then
      vim.notify("Theme watcher error: " .. err, vim.log.levels.ERROR)
      return
    end

    vim.schedule(function()
      local theme = read_theme()
      if theme then
        apply_theme(theme)
      end
    end)
  end

  -- Start watching the theme file
  uv.fs_event_start(handle, theme_file, { watch_entry = false, stat = false }, callback)
end

-- Initialize theme on startup
function M.init()
  -- First, determine the theme
  local theme = read_theme()

  if not theme then
    -- No theme file, use time-based or default
    theme = get_time_based_theme()
  end

  -- Apply initial theme
  vim.schedule(function()
    apply_theme(theme)
  end)

  -- Start watching for changes
  vim.schedule(function()
    watch_theme()
  end)
end

-- Manual toggle function (can be called from keymap)
function M.toggle()
  local theme = read_theme()

  local new_theme
  if theme == "dark" then
    new_theme = "light"
  else
    new_theme = "dark"
  end

  -- Write to theme file
  local file = io.open(theme_file, "w")
  if file then
    file:write(new_theme)
    file:close()
  end

  apply_theme(new_theme)
end

-- Get current theme
function M.get_theme()
  return current_theme or read_theme() or get_time_based_theme()
end

return M