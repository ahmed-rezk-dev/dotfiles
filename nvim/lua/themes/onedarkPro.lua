local M = {}

function M.setup()
  local onedarkpro = require "onedarkpro"
  onedarkpro.setup {
    theme = function()
      if vim.o.background == "dark" then
        return "onedark"
      else
        return "onelight"
      end
    end,
    colors = {
      onelight = {
        bg = "#f5f5f5", -- green
      },
      --[[ onedark = {
        color_column = "#61afef",
        cursorline = "#61afef",
      }, ]]
    }, -- Override default colors by specifying colors for 'onelight' or 'onedark' themes
    hlgroups = {
      PmenuSel = { bg = "#282C34", fg = "NONE" },
      Pmenu = { fg = "#C5CDD9", bg = "#22252A" },

      -- Start of cmp highlights
      CmpItemAbbrDeprecated = { fg = "#7E8294", bg = "NONE", fmt = "strikethrough" },
      CmpItemAbbrMatch = { fg = "#82AAFF", bg = "NONE", fmt = "bold" },
      CmpItemAbbrMatchFuzzy = { fg = "#82AAFF", bg = "NONE", fmt = "bold" },
      CmpItemMenu = { fg = "#C792EA", bg = "NONE", fmt = "italic" },

      CmpItemKindField = { fg = "#EED8DA", bg = "#B5585F" },
      CmpItemKindProperty = { fg = "#EED8DA", bg = "#B5585F" },
      CmpItemKindEvent = { fg = "#EED8DA", bg = "#B5585F" },

      CmpItemKindText = { fg = "#C3E88D", bg = "#9FBD73" },
      CmpItemKindEnum = { fg = "#C3E88D", bg = "#9FBD73" },
      CmpItemKindKeyword = { fg = "#C3E88D", bg = "#9FBD73" },

      CmpItemKindConstant = { fg = "#FFE082", bg = "#D4BB6C" },
      CmpItemKindConstructor = { fg = "#FFE082", bg = "#D4BB6C" },
      CmpItemKindReference = { fg = "#FFE082", bg = "#D4BB6C" },

      CmpItemKindFunction = { fg = "#EADFF0", bg = "#A377BF" },
      CmpItemKindStruct = { fg = "#EADFF0", bg = "#A377BF" },
      CmpItemKindClass = { fg = "#EADFF0", bg = "#A377BF" },
      CmpItemKindModule = { fg = "#EADFF0", bg = "#A377BF" },
      CmpItemKindOperator = { fg = "#EADFF0", bg = "#A377BF" },

      CmpItemKindVariable = { fg = "#C5CDD9", bg = "#7E8294" },
      CmpItemKindFile = { fg = "#C5CDD9", bg = "#7E8294" },

      CmpItemKindUnit = { fg = "#F5EBD9", bg = "#D4A959" },
      CmpItemKindSnippet = { fg = "#F5EBD9", bg = "#D4A959" },
      CmpItemKindFolder = { fg = "#F5EBD9", bg = "#D4A959" },

      CmpItemKindMethod = { fg = "#DDE5F5", bg = "#6C8ED4" },
      CmpItemKindValue = { fg = "#DDE5F5", bg = "#6C8ED4" },
      CmpItemKindEnumMember = { fg = "#DDE5F5", bg = "#6C8ED4" },

      CmpItemKindInterface = { fg = "#D8EEEB", bg = "#58B5A8" },
      CmpItemKindColor = { fg = "#D8EEEB", bg = "#58B5A8" },
      CmpItemKindTypeParameter = { fg = "#D8EEEB", bg = "#58B5A8" },
      -- End of cmp highlights

      FloatBorder = {
        fg = "#61afef",
      },
      TelescopeBorder = {
        fg = "#61afef",
      },
      TelescopePromptBorder = {
        fg = "#61afef",
      },
      TelescopePreviewBorder = {
        fg = "#61afef",
      },

      VertSplit = {
        fg = "${purple}",
        -- bg = "${red}",
      },
      TSProperty = {
        fg = (vim.o.background == "dark" and "${white}" or "${black}"),
      },
      TSTagAttribute = {
        fg = "${purple}",
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
      comments = "italic",
      keywords = "bold", -- change style of keywords to be bold
      functions = "italic,bold", -- styles can be a comma separated list
      strings = "none",
      variables = "none",
    },
    options = {
      bold = true, -- Use the themes opinionated bold styles?
      italic = true, -- Use the themes opinionated italic styles?
      underline = true, -- Use the themes opinionated underline styles?
      undercurl = true, -- Use the themes opinionated undercurl styles?
      cursorline = true, -- Use cursorline highlighting?
      transparency = false, -- Use a transparent background?
      terminal_colors = true, -- Use the theme's colors for Neovim's :terminal?
      window_unfocussed_color = true, -- When the window is out of focus, change the normal background?
    },
  }
  onedarkpro.load()
end

return M
