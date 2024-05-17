require("nvim-devdocs").setup(
  {
    ensure_installed = { "html", "javascript", "typescript", "react" },
    telescope_alt = { -- when searching globally without preview
      layout_config = {
        width = 75,
      },
    },
    float_win = { -- passed to nvim_open_win(), see :h api-floatwin
      relative = "editor",
      height = 25,
      width = 100,
      border = "rounded",
    },
    wrap = false,        -- text wrap
    previewer_cmd = "glow", -- for example: "glow"
    cmd_args = { "-s", "dark", "-w", "80" },
    picker_cmd = true,
    picker_cmd_args = { "-p" },
  }
)

