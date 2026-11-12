return {
  "sindrets/diffview.nvim",
  config = function()
    require("diffview").setup({
      file_panel = {
        win_config = {
          position = "right",
          width = 50, -- Set a fixed column width (default is 35)
          -- width = "auto",     -- Alternatively, uncomment this to scale automatically
        },
      },
    })
  end,

  keys = {
    { "<leader>gdd", "<cmd>DiffviewOpen<CR>", mode = { "n" }, desc = "Diffview Open" },
    { "<leader>gdm", "<cmd>DiffviewOpen main<CR>", mode = { "n" }, desc = "Diffview main" },
    {

      "<leader>gdc",
      "<cmd>DiffviewClose<CR>",
      mode = { "n" },
      desc = "Diffview Close",
    },
  },
}
