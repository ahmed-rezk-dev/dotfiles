-- Notes system: obsidian.nvim on the LLM wiki's two vault tiers.
--   system vault  = ~/.llm-wiki/wiki           (Project hubs + boards, daily notes, atomic notes)
--   project vault = <repo>/.llm-wiki/wiki      (repo-specific atomic notes; found via .obsidian/)
-- Conventions follow the wiki (see docs/adr/0001): kebab-case files, root-relative markdown links.
local SYSTEM_VAULT = vim.fn.expand("~/.llm-wiki/wiki")

local function is_vault(dir)
  return vim.fn.isdirectory(dir .. "/.obsidian") == 1
end

--- Workspaces known at startup: the system vault plus the project vault of the cwd's repo.
local function startup_workspaces()
  local workspaces = {}
  local cwd_root = vim.fs.root(vim.uv.cwd() or ".", ".llm-wiki")
  local cwd_vault = cwd_root and cwd_root .. "/.llm-wiki/wiki"
  if cwd_vault and cwd_vault ~= SYSTEM_VAULT and is_vault(cwd_vault) then
    table.insert(workspaces, {
      name = vim.fs.basename(cwd_root),
      path = cwd_vault,
      strict = true,
      overrides = { daily_notes = { enabled = false } },
    })
  end
  if is_vault(SYSTEM_VAULT) then
    table.insert(workspaces, { name = "system", path = SYSTEM_VAULT, strict = true })
  end
  return workspaces
end

--- Register any vault (dir containing .obsidian/) the first time one of its notes is opened.
local function register_vault_on_open()
  vim.api.nvim_create_autocmd("FileType", {
    group = vim.api.nvim_create_augroup("notes_vault_discovery", { clear = true }),
    pattern = "markdown",
    callback = function(ev)
      local root = vim.fs.root(ev.buf, ".obsidian")
      if not root or not Obsidian then
        return
      end
      require("utils.notes").register_vault(root)
    end,
  })
end

return {
  {
    "obsidian-nvim/obsidian.nvim",
    version = "*",
    cond = function()
      return #startup_workspaces() > 0
    end,
    cmd = "Obsidian",
    ft = "markdown",
    dependencies = { "folke/snacks.nvim" },
    keys = {
      { "<leader>on", "<cmd>Obsidian new<cr>", desc = "New atomic note" },
      {
        "<leader>oN",
        function()
          require("utils.notes").new_project()
        end,
        desc = "New project (hub + board)",
      },
      { "<leader>of", "<cmd>Obsidian quick_switch<cr>", desc = "Find note" },
      { "<leader>os", "<cmd>Obsidian search<cr>", desc = "Search notes" },
      { "<leader>ob", "<cmd>Obsidian backlinks<cr>", desc = "Backlinks" },
      { "<leader>ot", "<cmd>Obsidian template<cr>", desc = "Insert template" },
      { "<leader>oT", "<cmd>Obsidian new_from_template<cr>", desc = "New note from template" },
      { "<leader>od", "<cmd>Obsidian today<cr>", desc = "Today's daily note" },
      { "<leader>oD", "<cmd>Obsidian dailies<cr>", desc = "Daily notes" },
      { "<leader>og", "<cmd>Obsidian tags<cr>", desc = "Tags" },
      { "<leader>op", "<cmd>Obsidian properties<cr>", desc = "Properties" },
      { "<leader>ow", "<cmd>Obsidian workspace<cr>", desc = "Switch vault" },
      {
        "<leader>oB",
        function()
          require("utils.notes").open_board()
        end,
        desc = "Open project board",
      },
      { "<leader>oo", "<cmd>Obsidian open<cr>", desc = "Open in Obsidian app" },
    },
    ---@module 'obsidian'
    ---@type obsidian.config
    opts = function()
      return {
        legacy_commands = false,
        workspaces = startup_workspaces(),
        picker = { name = "snacks.picker" },
        -- Wiki conventions: kebab-case slug files, root-relative markdown links.
        note_id_func = function(title, dir)
          return require("obsidian.builtin").title_id(title, dir)
        end,
        link = {
          format = "absolute",
          style = function(link)
            link.path = "/" .. tostring(link.path):gsub("^/", "")
            return require("obsidian.builtin").markdown_link(link)
          end,
        },
        notes_subdir = "concepts",
        new_notes_location = "notes_subdir",
        note = { template = "atomic-note.md" },
        templates = { folder = "templates" },
        daily_notes = {
          folder = "daily",
          template = "daily-note.md",
          date_format = "YYYY-MM-DD",
          default_tags = {},
          workdays_only = false,
        },
        -- Wiki pages carry their own frontmatter (typed sources, etc.); never rewrite it on save.
        frontmatter = { enabled = false },
        -- render-markdown.nvim already renders the buffer.
        ui = { enable = false },
      }
    end,
    config = function(_, opts)
      require("obsidian").setup(opts)
      register_vault_on_open()
      require("utils.board").setup()
    end,
  },
  {
    "folke/which-key.nvim",
    opts = {
      spec = { { "<leader>o", group = "obsidian" } },
    },
  },
}
