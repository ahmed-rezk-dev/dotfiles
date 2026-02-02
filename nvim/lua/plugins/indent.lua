return {
  "nvim-mini/mini.indentscope",
  version = "*",
  event = "VeryLazy",
  opts = {
    symbol = "❘",
    options = {
      try_as_border = true,
      indent_at_cursor = true,
      border = "both",
      n_lines = 100,
    },
    mappings = {
      object_scope = "ii",
      object_scope_with_border = "ai",
      goto_top = "[i",
      goto_bottom = "]i",
    },
    draw = {
      delay = 50,
      animation = require("mini.indentscope").gen_animation.cubic(),
      priority = 2,
    },
  },
  config = function(_, opts)
    require("mini.indentscope").setup(opts)

    vim.api.nvim_create_autocmd("FileType", {
      pattern = {
        "Trouble",
        "alpha",
        "dashboard",
        "fzf",
        "help",
        "lazy",
        "mason",
        "neo-tree",
        "notify",
        "sidekick_terminal",
        "snacks_dashboard",
        "snacks_notif",
        "snacks_terminal",
        "snacks_win",
        "toggleterm",
        "trouble",
      },
      callback = function()
        vim.b.miniindentscope_disable = true
      end,
    })
    vim.api.nvim_create_autocmd("User", {
      pattern = "SnacksDashboardOpened",
      callback = function(data)
        vim.b[data.buf].miniindentscope_disable = true
      end,
    })
    -- Set up colors for indentscope AFTER plugin setup
    vim.api.nvim_set_hl(0, "MiniIndentscopeSymbol", { fg = "#E06C75", nocombine = true })
    vim.api.nvim_set_hl(0, "MiniIndentscopeSymbolOff", { fg = "#E06C75", nocombine = true })
  end,
}

