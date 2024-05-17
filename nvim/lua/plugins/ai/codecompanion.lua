-- local present, codecompanion = pcall(require, "codecompanion")
-- if not present then
--   return
-- end
--
-- local config = require("codecompanion").setup({
--   adapters = {
--     chat = "ollama",
--     inline = "ollama",
--   }
-- })

return {
  "olimorris/codecompanion.nvim",
  lazy = false,
  enable = true,
  dependencies = {
    "nvim-lua/plenary.nvim",
    "nvim-treesitter/nvim-treesitter",
    "nvim-telescope/telescope.nvim", -- Optional
    {
      "stevearc/dressing.nvim",      -- Optional: Improves the default Neovim UI
      opts = {},
    },
  },
  config = function()
    return require("codecompanion").setup({
      adapters = {
        chat = "ollama",
        inline = "ollama",
      }
    })
  end

}

