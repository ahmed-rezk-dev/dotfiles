return {
  {
    "catppuccin/nvim",
    lazy = false,
    enabled = true,
    priority = 150,
    name = "catppuccin",
    config = function()
      require("config.colorschems.catppuccin")
    end,
  },
  -- {
  --   'sainnhe/gruvbox-material',
  --   enabled = true,
  --   priority = 500,
  --   config = function()
  --     require("config.colorschems.gruvbox_material")
  --   end,
  -- },
  {
    'projekt0n/github-nvim-theme',
    lazy = false,    -- make sure we load this during startup if it is your main colorscheme
    priority = 1000, -- make sure to load this before all the other start plugins
    config = function()
      require("config.colorschems.github")
    end,
  },
  -- {
  --   'sainnhe/everforest',
  --   priority = 1000,
  --   config = function()
  --     require("config.colorschems.everforest")
  --   end
  -- },
  -- {
  --   'morhetz/gruvbox',
  --   priority = 1000,
  --   config = function()
  --     require("config.colorschems.gruvbox")
  --   end
  -- },
  {
    "olimorris/onedarkpro.nvim",
    lazy = false,
    priority = 100, -- Ensure it loads first
    config = function()
      require("config.colorschems.onedarkpro")
    end,
  },
  -- {
  --   'ribru17/bamboo.nvim',
  --   lazy = false,
  --   priority = 1000,
  --   config = function()
  --     require("config.colorschems.bamboo")
  --   end,
  -- },
  -- {
  --   'navarasu/onedark.nvim',
  --   lazy = false,
  --   priority = 100,
  --   config = function()
  --     require("config.colorschems.onedark")
  --   end,
  -- }
}
