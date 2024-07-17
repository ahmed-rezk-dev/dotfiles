local fn = require("utils.fn")
local present, wk = pcall(require, "which-key")
if not present then
  return
end

local normal_mode_mappings = require("mappings.which-key.normal-mode-mappings")
local visual_mode_mappings = require("mappings.which-key.visual-mode-mappings")
local attach_markdown      = require("mappings.which-key.markdown")
local attach_typescript    = require("mappings.which-key.typescript")
local attach_npm           = require("mappings.which-key.npm")
local attach_zen           = require("mappings.which-key.zen")
local attach_jest          = require("mappings.which-key.jest")
local attach_spectre       = require("mappings.which-key.spectre")
local attach_nvim_tree     = require("mappings.which-key.nvim-tree")

wk.setup {
  plugins = {
    marks = true,     -- shows a list of your marks on ' and `
    registers = true, -- shows your registers on " in NORMAL or <C-r> in INSERT mode
    -- the presets plugin, adds help for a bunch of default keybindings in Neovim
    -- No actual key bindings are created
    spelling = {
      enabled = true,   -- enabling this will show WhichKey when pressing z= to select spelling suggestions
      suggestions = 20, -- how many suggestions should be shown in the list?
    },
    presets = {
      operators = false,    -- adds help for operators like d, y, ... and registers them for motion / text object completion
      motions = false,      -- adds help for motions text_objects = false, -- help for text objects triggered after entering an operator
      windows = true,       -- default bindings on <c-w>
      text_objects = false, -- help for text objects triggered after entering an operator
      nav = true,           -- misc bindings to work with windows
      z = true,             -- bindings for folds, spelling and others prefixed with z
      g = true,             -- bindings for prefixed with g
    },
  },
  icons = {
    breadcrumb = "»", -- symbol used in the command line area that shows your active key combo
    separator = "➜", -- symbol used between a key and it's label
    group = "+", -- symbol prepended to a group
  },
  win = {
    -- don't allow the popup to overlap with the cursor
    no_overlap = true,
    -- width = 1,
    -- height = { min = 4, max = 25 },
    -- col = 0,
    -- row = math.huge,
    border = EcoVim.ui.float.border or "rounded", -- none, single, double, shadow, rounded
    padding = { 2, 2, 2, 2 },                     -- extra window padding [top, right, bottom, left]
    title = true,
    title_pos = "center",
    zindex = 1000,
    -- Additional vim.wo and vim.bo options
    bo = {},
    wo = {
      -- winblend = 10, -- value between 0-100 0 for fully opaque and 100 for fully transparent
    },
  },
  layout = {
    height = { min = 4, max = 25 }, -- min and max height of the columns
    width = { min = 20, max = 50 }, -- min and max width of the columns
    spacing = 4,                    -- spacing between columns
    align = "left",                 -- align columns left, center or right
  },
  show_help = true,                 -- show help message on the command line when the popup is visible
  -- triggers = "auto", -- automatically setup triggers
  -- triggers = {"<leader>"}, -- or specify a list manually
}

local opts = {
  mode = "n",     -- NORMAL mode
  prefix = "<leader>",
  buffer = nil,   -- Global mappings. Specify a buffer number for buffer local mappings
  silent = true,  -- use `silent` when creating keymaps
  noremap = true, -- use `noremap` when creating keymaps
  nowait = true,  -- use `nowait` when creating keymaps
}

local visual_opts = {
  mode = "v",     -- NORMAL mode
  prefix = "<leader>",
  buffer = nil,   -- Global mappings. Specify a buffer number for buffer local mappings
  silent = true,  -- use `silent` when creating keymaps
  noremap = true, -- use `noremap` when creating keymaps
  nowait = true,  -- use `nowait` when creating keymaps
}

-- ╭──────────────────────────────────────────────────────────╮
-- │ Register                                                 │
-- ╰──────────────────────────────────────────────────────────╯

wk.add(normal_mode_mappings, opts)
wk.add(visual_mode_mappings, visual_opts)

