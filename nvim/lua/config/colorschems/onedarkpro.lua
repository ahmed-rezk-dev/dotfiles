local ondDarkPro = require "onedarkpro"
ondDarkPro.setup {
  colors = {
    onelight = {
      -- bg = "#f5f5f5", -- green
    },
  },          -- Override default colors by specifying colors for 'onelight' or 'onedark' themes
  plugins = { -- Override which plugins highlight groups are loaded
    all = true,
  },

  styles = {
    comments = "italic",
    keywords = "bold",         -- change style of keywords to be bold
    functions = "italic,bold", -- styles can be a comma separated list
  },

  options = {
    bold = true,                       -- Use the themes opinionated bold styles?
    italic = true,                     -- Use the themes opinionated italic styles?
    underline = true,                  -- Use the themes opinionated underline styles?
    undercurl = true,                  -- Use the themes opinionated undercurl styles?
    cursorline = true,                 -- Use cursorline highlighting?
    transparency = false,              -- Use a transparent background?
    terminal_colors = false,           -- Use the theme's colors for Neovim's :terminal?
    highlight_inactive_windows = false, -- When the window is out of focus, change the normal background?
  },

  highlights = {
    -- Commend line groups
    PmenuSel = { bg = "#282C34", fg = "NONE" },
    Pmenu = { fg = "#C5CDD9", bg = "#22252A" },
    NormalFloat = { fg = "#C5CDD9", bg = "${bg}" },
    FloatBorder = { fg = "#61afef", bg = "NONE" },
    -- IncSearch = { fg = "#EED8DA", cterm = "${red}" },

    -- Fold groups
    Folded = { bg = "#30363d", fg = "" },          -- line used for closed folds
    FoldedNC = { bg = "#30363d", fg = "#D4A959" }, -- Folded for inactive windows
    FoldColumn = { bg = "", fg = "#FFFFFF" },      -- 'foldcolumn on the line numbers'

    TelescopeBorder = { fg = "#61afef" },
    TelescopePromptBorder = { fg = "#61afef" },
    TelescopePreviewBorder = { fg = "#61afef" },
    VertSplit = { fg = "${purple}" },
    TSProperty = { fg = (vim.o.background == "dark" and "${white}" or "${black}") },
    TSTagAttribute = { fg = "${purple}" },
    LspDiagnosticsDefaultWarning = { fg = "${white}", bg = "${yellow}" },

    -- Customization for Pmenu
    CmpItemAbbrDeprecated = { fg = "#7E8294", bg = "NONE", strikethrough = true },
    CmpItemAbbrMatch = { fg = "#82AAFF", bg = "NONE", bold = true },
    CmpItemAbbrMatchFuzzy = { fg = "#82AAFF", bg = "NONE", bold = true },
    CmpItemMenu = { fg = "#C792EA", bg = "NONE", italic = true },

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

    --[[ UfoFoldedBg = {bg= "#58B5A8"}, ]]
    --[[ UfoFoldedFg = {fg= "#58B5A8"} ]]
    --[[ CmpDocumentation = {
        bg = "#61afef",
        fg = "#61afef",
    },]]
  },
}
