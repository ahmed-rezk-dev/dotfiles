local M = {}

function M.setup()
  local onedarkpro = require "onedarkpro"
  onedarkpro.setup {
    -- Theme can be overwritten with 'onedark' or 'onelight' as a string
    theme = function()
      if vim.o.background == "dark" then
        return "onedark"
      else
        return "onelight"
      end
    end,
    colors = {
      --[[ onedark = {
        color_column = "#61afef",
        cursorline = "#61afef",
      }, ]]
    }, -- Override default colors by specifying colors for 'onelight' or 'onedark' themes
    hlgroups = {
      FloatBorder = {
        fg = "#61afef",
      },
      TelescopeBorder = {
        fg = "#61afef",
      },
      VertSplit = {
        fg = "${purple}",
        -- bg = "${red}",
      },
      -- LspDiagnosticsDefaultWarning = { fg = "${white}", bg = "${yellow}" },
      --[[ CmpDocumentation = {
        bg = "#61afef",
        fg = "#61afef",
      },
      CmpDocumentationBorder = {
        bg = "#61afef",
        fg = "#61afef",
      }, ]]
    },
    filetype_hlgroups = {}, -- Override default highlight groups for specific filetypes
    plugins = { -- Override which plugins highlight groups are loaded
      all = true,
      native_lsp = true,
      polygot = true,
      treesitter = true,
    },
    styles = {
      strings = "NONE", -- Style that is applied to strings
      comments = "NONE", -- Style that is applied to comments
      keywords = "NONE", -- Style that is applied to keywords
      functions = "NONE", -- Style that is applied to functions
      variables = "NONE", -- Style that is applied to variables
    },
    options = {
      bold = false, -- Use the themes opinionated bold styles?
      italic = false, -- Use the themes opinionated italic styles?
      underline = false, -- Use the themes opinionated underline styles?
      undercurl = false, -- Use the themes opinionated undercurl styles?
      cursorline = false, -- Use cursorline highlighting?
      transparency = false, -- Use a transparent background?
      terminal_colors = false, -- Use the theme's colors for Neovim's :terminal?
      window_unfocussed_color = false, -- When the window is out of focus, change the normal background?
    },
  }
  onedarkpro.load()
end

return M
