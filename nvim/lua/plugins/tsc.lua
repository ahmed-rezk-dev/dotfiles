return {
  "dmmulroy/tsc.nvim",
  cmd = { "TSC" },
  config = function()
    require("tsc").setup({
      use_trouble_qflist = true,
    })
  end,

  keys = { { "<leader>ct", "<cmd>TSC<CR>", mode = { "n" }, desc = "Project wide type checking" } },
}
