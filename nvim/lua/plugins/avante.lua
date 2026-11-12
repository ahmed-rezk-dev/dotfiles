return {
  "yetone/avante.nvim",
  build = vim.fn.has("win32") ~= 0 and "powershell -ExecutionPolicy Bypass -File Build.ps1 -BuildFromSource false"
    or "make",
  event = "VeryLazy",
  dependencies = {
    "nvim-treesitter/nvim-treesitter",
    "nvim-lua/plenary.nvim",
    "MunifTanjim/nui.nvim",
    -- avante.nvim >= 0.5 requires these Lua rocks. Adding the upstream repos as
    -- regular plugins keeps `require("mega.cmdparse")` working without luarocks.
    {
      "ColinKennedy/mega.cmdparse",
      lazy = true,
      dependencies = { "ColinKennedy/mega.logging" },
    },
  },
  opts = {
    provider = "copilot",
    providers = {
      copilot = {
        endpoint = "https://api.githubcopilot.com",
        proxy = nil,
        allow_insecure = false,
        timeout = 30000,
      },
    },
    selection = {
      -- valid values: "delayed" | "immediate" | "none"
      hint_display = "immediate",
    },
    behaviour = {
      auto_set_keymaps = false,
    },
  },
}
