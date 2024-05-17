-- https://github.com/lukas-reineke/indent-blankline.nvim

-- vim.opt.list = true
-- vim.opt.listchars:append("space:⋅")
-- vim.opt.listchars:append("eol:↴")

-- require("ibl").setup {
--   -- buftype_exclude = {"terminal", "telescope", "nofile"},
--   -- filetype_exclude = {"help", "dashboard", "packer", "NvimTree", "Trouble", "TelescopePrompt", "Float"},
--   -- show_current_context = true,
--   -- show_current_context_start = false,
--   -- show_end_of_line = false,
--   -- remove_blankline_trail = true,
--   -- space_char_blankline = " ",
--   -- use_treesitter = true,
--   -- indent = {
--   --   char = "│",
--   -- },
--   scope = {
--     show_start = true,
--     show_end = true,
--     -- enabled = ture,
--     exclude = { language = { "lua", "tsserver" } }
--   },
--   whitespace = {
--     highlight = "Whitespace",
--     remove_blankline_trail = true,
--   },
--   exclude = {
--     -- filetypes = {
--     --   "lspinfo",
--     --   "packer",
--     --   "checkhealth",
--     --   "help",
--     --   "man",
--     --   "gitcommit",
--     --   "TelescopePrompt",
--     --   "TelescopeResults",
--     --   "",
--     -- },
--     filetypes = { "help", "dashboard", "packer", "NvimTree", "Trouble", "TelescopePrompt", "Float" },
--     buftypes = {
--       -- "terminal",
--       -- "nofile",
--       -- "quickfix",
--       -- "prompt",
--       "terminal", "telescope", "nofile"
--     },
--   },
-- }
--

local highlight = {
  "RainbowRed",
  "RainbowYellow",
  "RainbowBlue",
  "RainbowOrange",
  "RainbowGreen",
  "RainbowViolet",
  "RainbowCyan",
}
local hooks = require "ibl.hooks"
-- create the highlight groups in the highlight setup hook, so they are reset
-- every time the colorscheme changes
hooks.register(hooks.type.HIGHLIGHT_SETUP, function()
  vim.api.nvim_set_hl(0, "RainbowRed", { fg = "#E06C75" })
  vim.api.nvim_set_hl(0, "RainbowYellow", { fg = "#E5C07B" })
  vim.api.nvim_set_hl(0, "RainbowBlue", { fg = "#61AFEF" })
  vim.api.nvim_set_hl(0, "RainbowOrange", { fg = "#D19A66" })
  vim.api.nvim_set_hl(0, "RainbowGreen", { fg = "#98C379" })
  vim.api.nvim_set_hl(0, "RainbowViolet", { fg = "#C678DD" })
  vim.api.nvim_set_hl(0, "RainbowCyan", { fg = "#56B6C2" })
end)

vim.g.rainbow_delimiters = { highlight = highlight }
require("ibl").setup {
  -- indent = { highlight = { "LineNr" }, char = "│" },
  scope = {
    enabled = true,
    highlight = highlight,
    include = {
      node_type = {
        ["*"] = {
          "argument",
          "expression",
          "for",
          "if",
          "import",
          "type",
          "arguments",
          "block",
          "bracket",
          "declaration",
          "field",
          "func_literal",
          "function",
          "import_spec_list",
          "List",
          "return_statement",
          "short_var_declaration",
          "statement",
          "switch_body",
          "try"
        }
      }
    }
  },
  whitespace = {
    remove_blankline_trail = true,
  },

  exclude = {
    filetypes = {
      "help",
      "dashboard",
      "packer",
      "NvimTree",
      "Trouble",
      "TelescopePrompt",
      "Float",
      "lspinfo",
      "checkhealth",
      "man",
      "gitcommit",
      "TelescopeResults",
    },
    buftypes = {
      "terminal", "telescope", "nofile", "quickfix", "prompt"
    },
  },
}

hooks.register(hooks.type.SCOPE_HIGHLIGHT, hooks.builtin.scope_highlight_from_extmark)
