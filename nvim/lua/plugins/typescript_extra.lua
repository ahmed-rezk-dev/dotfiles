return {
  "piersolenski/wtf.nvim",
  dependencies = {
    "nvim-lua/plenary.nvim",
    "MunifTanjim/nui.nvim",
    "nvim-telescope/telescope.nvim", -- Optional: For WtfGrepHistory
  },
  opts = {
    popup_type = "popup",
    provider = "ollama",
    providers = {
      ollama = {
        api_key = "http://192.168.50.252:11434",
        -- An alternative way to set your API key
        -- api_key =         -- Your preferred model
        model_id = "qwen2.5-coder:7b",
      },
    },
  },
  keys = {
    {
      "<leader>wd",
      mode = { "n", "x" },
      function()
        require("wtf").diagnose()
      end,
      desc = "Debug diagnostic with AI",
    },
    {
      "<leader>wf",
      mode = { "n", "x" },
      function()
        require("wtf").fix()
      end,
      desc = "Fix diagnostic with AI",
    },
    {
      mode = { "n" },
      "<leader>ws",
      function()
        require("wtf").search()
      end,
      desc = "Search diagnostic with Google",
    },
    {
      mode = { "n" },
      "<leader>wp",
      function()
        require("wtf").pick_provider()
      end,
      desc = "Pick provider",
    },
    {
      mode = { "n" },
      "<leader>wh",
      function()
        require("wtf").history()
      end,
      desc = "Populate the quickfix list with previous chat history",
    },
    {
      mode = { "n" },
      "<leader>wg",
      function()
        require("wtf").grep_history()
      end,
      desc = "Grep previous chat history with Telescope",
    },
  },
  -- {
  --   "https://git.sr.ht/~whynothugo/lsp_lines.nvim",
  --   config = function()
  --     vim.diagnostic.config({
  --       virtual_text = false,
  --     })
  --     vim.diagnostic.config({ virtual_lines = { only_current_line = true } })
  --     require("lsp_lines").setup()
  --   end,
  -- },
}
