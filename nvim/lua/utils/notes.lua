-- Project hub + board scaffolding for the notes system (see GLOSSARY.md).
local M = {}

local SYSTEM_VAULT = vim.fn.expand("~/.llm-wiki/wiki")

---@param path string?
---@return string?
local function real(path)
  return path and vim.uv.fs_realpath(path) or nil
end

---@return obsidian.Workspace?
local function system_workspace()
  for _, ws in ipairs(Obsidian and Obsidian.workspaces or {}) do
    if ws.name == "system" then
      return ws
    end
  end
end

--- Add a vault to obsidian.nvim's workspaces unless it is already known.
---@param vault string vault root (a wiki's `wiki/` directory)
---@return obsidian.Workspace?
function M.register_vault(vault)
  vault = real(vault) or vault
  for _, ws in ipairs(Obsidian.workspaces) do
    if real(tostring(ws.root)) == vault then
      return ws
    end
  end
  local ws = require("obsidian.workspace").new({
    name = vim.fs.basename(vim.fs.dirname(vim.fs.dirname(vault))),
    path = vault,
    strict = true,
    overrides = { daily_notes = { enabled = false } },
  })
  if ws then
    table.insert(Obsidian.workspaces, ws)
  end
  return ws
end

--- `<dir>/.llm-wiki/wiki` of the project wiki nearest to the current buffer or cwd, ignoring the
--- system wiki. At each directory from the start up to (excluding) $HOME it checks the directory
--- itself and its immediate children, so a repo finds its own wiki, one in a subdirectory (docs/),
--- or one in a sibling directory shared by several repos.
---@return string?
local function project_wiki_dir()
  local system = real(SYSTEM_VAULT)
  local home = real(vim.env.HOME)
  local function accept(dir)
    local vault = real(dir)
    return vault ~= system and vault or nil
  end
  local function wiki_near(start)
    if not start or start == "" then
      return nil
    end
    local first = vim.fn.isdirectory(start) == 1 and start or vim.fs.dirname(start)
    local dirs = { first }
    vim.list_extend(dirs, vim.iter(vim.fs.parents(first)):totable())
    for _, dir in ipairs(dirs) do
      if real(dir) == home then
        return nil
      end
      local found = accept(dir .. "/.llm-wiki/wiki")
      for _, child in ipairs(found and {} or vim.fn.glob(dir .. "/*/.llm-wiki/wiki", false, true)) do
        found = found or accept(child)
      end
      if found then
        return found
      end
    end
  end
  return wiki_near(vim.api.nvim_buf_get_name(0)) or wiki_near(vim.uv.cwd())
end

--- The repo's own vault directory: the current buffer's vault when it is not the system vault,
--- otherwise the project wiki found from the buffer or cwd. Nil when there is none.
---@return string?
local function local_vault_dir()
  local buf_name = vim.api.nvim_buf_get_name(0)
  if Obsidian and buf_name ~= "" then
    local ws = require("obsidian.api").find_workspace(buf_name)
    if ws and ws.name ~= "system" then
      return tostring(ws.root)
    end
  end
  return project_wiki_dir()
end

--- Make sure a project wiki has been layered with the notes template, running `newvault` if not.
---@param vault string
---@return boolean ok
local function ensure_seeded(vault)
  if vim.fn.isdirectory(vault .. "/.obsidian") == 1 then
    return true
  end
  local exe = vim.fn.exepath("newvault")
  if exe == "" then
    vim.notify("newvault is not on PATH; run it in " .. vim.fs.dirname(vim.fs.dirname(vault)), vim.log.levels.ERROR)
    return false
  end
  vim.notify("Setting up the project vault with newvault...")
  local result = vim.system({ exe, vim.fs.dirname(vim.fs.dirname(vault)) }, { text = true }):wait(120000)
  if result.code ~= 0 then
    vim.notify("newvault failed:\n" .. (result.stderr or ""), vim.log.levels.ERROR)
    return false
  end
  return true
end

--- Template from the vault, falling back to the system vault's templates.
---@param root string
---@param name string
---@return string?
local function template_path(root, name)
  local system = system_workspace()
  for _, dir in ipairs({ root, system and tostring(system.root) }) do
    local path = ("%s/templates/%s"):format(dir, name)
    if dir and vim.fn.filereadable(path) == 1 then
      return path
    end
  end
end

---@param path string
---@param vars table<string, string>
---@return string[]
local function render_template(path, vars)
  local lines = vim.fn.readfile(path)
  for i, line in ipairs(lines) do
    lines[i] = line:gsub("{{(%w+)}}", function(key)
      return vars[key]
    end)
  end
  return lines
end

--- Vault root + display name for a new project: the repo's vault (seeded on demand) or the system vault.
---@return string? root
---@return string? name
local function target_vault()
  local dir = local_vault_dir()
  if dir then
    if not ensure_seeded(dir) then
      return nil
    end
    local ws = M.register_vault(dir)
    return dir, ws and ws.name or "repo"
  end
  local system = system_workspace()
  if system then
    return tostring(system.root), system.name
  end
  vim.notify("No vault configured", vim.log.levels.ERROR)
end

--- Create projects/<slug>/<slug>.md (hub) and projects/<slug>/board.md in the repo's vault,
--- or in the system vault when no project wiki is found.
function M.new_project()
  local root, vault_name = target_vault()
  if not root then
    return
  end
  vim.ui.input({ prompt = ("Project name (%s vault): "):format(vault_name) }, function(name)
    name = name and vim.trim(name) or ""
    if name == "" then
      return
    end
    local slug = require("obsidian.builtin").title_to_slug(name)
    local dir = ("%s/projects/%s"):format(root, slug)
    if vim.fn.isdirectory(dir) == 1 then
      return vim.notify(("Project '%s' already exists in %s"):format(slug, vault_name), vim.log.levels.WARN)
    end
    local vars = { title = name, slug = slug, date = os.date("%Y-%m-%d") }
    local files = { ["project-hub.md"] = slug .. ".md", ["board.md"] = "board.md" }
    local rendered = {}
    for template, target in pairs(files) do
      local path = template_path(root, template)
      if not path then
        return vim.notify(("Template %s not found; run newvault"):format(template), vim.log.levels.ERROR)
      end
      rendered[target] = render_template(path, vars)
    end
    vim.fn.mkdir(dir, "p")
    for target, lines in pairs(rendered) do
      vim.fn.writefile(lines, ("%s/%s"):format(dir, target))
    end
    vim.notify(("Created project '%s' in %s vault (%s)"):format(slug, vault_name, root))
    vim.cmd.edit(vim.fn.fnameescape(("%s/%s.md"):format(dir, slug)))
  end)
end

---@param root string?
---@return string[]
local function boards_in(root)
  return root and vim.fn.glob(root .. "/projects/*/board.md", false, true) or {}
end

--- Pick a project board: the repo vault's boards when it has any, otherwise the system vault's.
function M.open_board()
  local root, vault_name = local_vault_dir(), "repo"
  local boards = boards_in(root)
  if #boards == 0 then
    local system = system_workspace()
    root, vault_name = system and tostring(system.root), "system"
    boards = boards_in(root)
  end
  if #boards == 0 then
    return vim.notify("No project boards yet; create one with <leader>oN", vim.log.levels.INFO)
  end
  vim.ui.select(boards, {
    prompt = ("Board (%s vault)"):format(vault_name),
    format_item = function(path)
      return vim.fs.basename(vim.fs.dirname(path))
    end,
  }, function(path)
    if path then
      vim.cmd.edit(vim.fn.fnameescape(path))
    end
  end)
end

return M
