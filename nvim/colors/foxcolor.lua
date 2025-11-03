local lw = require("little-wonder")

local color = {
  white = { gui = "#DCE0DD", cterm = 249 },
  black = { gui = "#2F343F", cterm = 234 },
  green = { gui = "#87D37C", cterm = 108 },
  blue = { gui = "#89C4F4", cterm = 75 },
  cyan = { gui = "#50C6D8", cterm = 73 },
  red = { gui = "#FC8680", cterm = 168 },
  magenta = { gui = "#DDA0DD", cterm = 139 },
  yellow = { gui = "#F2CA27", cterm = 173 },
  orange = { gui = "#FF9966", cterm = 208 },
  pink = { gui = "#FFB6C1", cterm = 205 },

  bright_black = { gui = "#5F6672", cterm = 242 },
  bright_white = { gui = "#DADFE1", cterm = 253 },

  dark_gray = { gui = "#939393", cterm = 246 },
  gray = { gui = "#8893A6", cterm = 103 },
  light_gray = { gui = "#404750", cterm = 238 },
  wild_red = { gui = "#DF334A", cterm = 167 },
  dark_blue = { gui = "#242830", cterm = 235 },
  darkness = { gui = "#3B4252", cterm = 238 },
}

local theme = {
  globals = {
    type = "dark",
    foreground = color.white,
    background = color.black,
  },
  syntax = {
    comment = color.pink,
    string = color.green,
    jsx_text = color.green,
    constant = color.magenta,
    storage = color.blue,
    special = color.dark_gray,
    error = color.wild_red,
    error_bg = nil,
  },
  ui = {
    cursorline = color.dark_blue,
    selection = color.light_gray,
    colorcolumn = color.bright_black,
    dark_text = color.dark_gray,
    line_nr = color.dark_gray,
    line_bg = color.darkness,
    folds = color.dark_gray,
    menu_item = color.dark_blue,
    menu_selected = color.bright_black,
    search = color.yellow,
    matchparen = color.yellow,
    info = color.cyan,
    warning = color.yellow,
    error = color.red,
  },
  terminal = {
    white = color.white.gui,
    bright_white = color.bright_white.gui,
    black = color.black.gui,
    bright_black = color.bright_black.gui,
    red = color.red.gui,
    green = color.green.gui,
    blue = color.blue.gui,
    magenta = color.magenta.gui,
    yellow = color.yellow.gui,
    cyan = color.cyan.gui,
  },
}

lw.apply("foxcolor", theme)

---
-- Custom rules
--

-- do whatever you want...
