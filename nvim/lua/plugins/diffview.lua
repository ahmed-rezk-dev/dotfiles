return {
  "sindrets/diffview.nvim",
  config = function()
    require("diffview").setup({})
  end,

  keys = {
    { "<leader>gdd", "<cmd>DiffviewOpen<CR>", mode = { "n" }, desc = "Diffview Open" },
    {

      "<leader>gdc",
      "<cmd>DiffviewClose<CR>",
      mode = { "n" },
      desc = "Diffview Close",
    },
  },
}
