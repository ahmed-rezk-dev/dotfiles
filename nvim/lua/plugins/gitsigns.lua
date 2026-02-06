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
      add = { text = "", hl = "GitSignsAdd" },
      change = { text = "", hl = "GitSignsChange" },
      delete = { text = "", hl = "GitSignsDelete" },
      topdelete = { text = "", hl = "GitSignsDelete" },
      changedelete = { text = "", hl = "GitSignsDelete" },
      untracked = { text = "?", hl = "GitSignsUntracked" },
    },
    signs_staged_enable = true,
    signcolumn = true,
    numhl = false,
    linehl = false,
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
  },
}
