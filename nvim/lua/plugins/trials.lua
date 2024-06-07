return { {
  "shellRaining/hlchunk.nvim",
  event = { "UIEnter" },
  lazy = false,
  enabled = false,
  config = function()
    require("hlchunk").setup({
      blank = {
        enable = false,
      },
      chunk = {
        chars = {
          horizontal_line = "─",
          vertical_line = "│",
          left_top = "┌",
          left_bottom = "└",
          right_arrow = "─",
        },
        style = "#00ffff",
      },
    })
  end
},
}
