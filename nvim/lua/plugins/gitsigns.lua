  return {
  "lewis6991/gitsigns.nvim",
  event = "LazyFile",
  opts = {
    signs = {
      add = { text = "", hl = "GitSignsAdd" },
      change = { text = "", hl = "GitSignsChange" },
      delete = { text = "", hl = "GitSignsDelete" },
      topdelete = { text = "", hl = "GitSignsDelete" },
      changedelete = { text = "", hl = "GitSignsDelete" },
      untracked = { text = "?", hl = "GitSignsUntracked" },
    },
    signs_staged = {
      add = { text = "", hl = "GitSignsStaged" },
      change = { text = "", hl = "GitSignsStaged" },
      delete = { text = "", hl = "GitSignsStaged" },
      topdelete = { text = "", hl = "GitSignsStaged" },
      changedelete = { text = "", hl = "GitSignsStaged" },
    },
    signcolumn = true,
    numhl = false,
    linehl = false,
    signhl = true,
    word_diff = false,
    watch_gitdir = {
      interval = 1000,
      follow_files = true,
    },
    attach_to_untracked = true,
    current_line_blame = false,
    current_line_blame_opts = {
      virt_text = true,
      virt_text_pos = "eol",
      delay = 1000,
      ignore_whitespace = false,
    },
    max_file_length = 40000,
    preview_config = {
      border = "rounded",
      style = "minimal",
      relative = "cursor",
      row = 0,
      col = 1,
    },
    yadm = { enable = false },
    on_attach = function()
      -- Custom highlight groups with vivid colors
      vim.api.nvim_set_hl(0, "GitSignsAdd", { fg = "#98C379", bold = true, ctermfg = "green" })
      vim.api.nvim_set_hl(0, "GitSignsChange", { fg = "#E5C07B", bold = true, ctermfg = "magenta" })
      vim.api.nvim_set_hl(0, "GitSignsDelete", { fg = "#E06C75", bold = true, ctermfg = "red" })
      vim.api.nvim_set_hl(0, "GitSignsUntracked", { fg = "#61AFEF", bold = true, ctermfg = "blue" })
      vim.api.nvim_set_hl(0, "GitSignsStaged", { fg = "#C678DD", bold = true, ctermfg = "purple" })
    end,
  },
}

