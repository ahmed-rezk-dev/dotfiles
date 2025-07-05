return {
  -- add gruvbox
  { "ellisonleao/gruvbox.nvim" },
  {
    "neanias/everforest-nvim",
    version = false,
    lazy = false,
    priority = 1000, -- make sure to load this before all the other start plugins
    -- Optional; default configuration will be used if setup isn't called.
    config = function()
      require("everforest").setup({
        background = "hard",
        ui_contrast = "low",
      })
    end,
  },
  -- {
  --   "lunarvim/synthwave84.nvim",
  -- },

  {
    "folke/tokyonight.nvim",
    lazy = true,
    opts = {
      style = "night",
      transparent = true,
      styles = {
        comments = { italic = true },
        keywords = { italic = true },
        functions = { bold = true },
        -- Background styles. Can be "dark", "transparent" or "normal"
        sidebars = "transparent", -- style for sidebars, see below
        floats = "dark", -- style for floating windows variables = { bold = true },
      },
    },
  },
  { "EdenEast/nightfox.nvim" },
  { "rose-pine/neovim", name = "rose-pine" },

  -- Configure LazyVim to load gruvbox
  {
    "LazyVim/LazyVim",
    opts = {
      -- colorscheme = "tokyonight",
      colorscheme = "rose-pine",
    },
  },
}
