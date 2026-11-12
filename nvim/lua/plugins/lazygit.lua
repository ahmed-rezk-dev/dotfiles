return {
  "kdheepak/lazygit.nvim",
  cmd = {
    "LazyGit",
    "LazyGitConfig",
    "LazyGitCurrentFile",
    "LazyGitFilter",
    "LazyGitFilterCurrentFile",
  },
  dependencies = {
    "nvim-lua/plenary.nvim",
  },
  keys = {
    { "<leader>gg", "<cmd>LazyGit<CR>", desc = "LazyGit" },
    { "<leader>gf", "<cmd>LazyGitFilter<CR>", desc = "LazyGit Filter" },
    { "<leader>gc", "<cmd>LazyGitCurrentFile<CR>", desc = "LazyGit Current File" },
  },
  config = function()
    vim.g.lazygit_floating_window_use_plenary = false
    vim.g.lazygit_floating_window_border_chars = { "╭", "─", "╮", "│", "╯", "─", "╰", "│" }
    vim.g.lazygit_floating_window_scaling_factor = 0.9
    vim.g.lazygit_floating_window_window_config = {
      border = "rounded",
    }
    -- Enable neovim remote for opening files in current session
    vim.g.lazygit_use_neovim_remote = 1
  end,
}
