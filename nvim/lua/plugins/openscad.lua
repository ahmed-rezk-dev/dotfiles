return {
  "salkin-mada/openscad.nvim",
  config = function()
    vim.g.openscad_load_snippets = true
    vim.g.openscad_pdf_cmd = "open"
    require("openscad")
  end,
  lazy = false,
  dependencies = {
    "ibhagwan/fzf-lua",
    "L3MON4D3/LuaSnip", -- optional
  },
  keys = {
    { "<leader>3c", "<cmd>OpenscadCheatsheet<CR>", mode = { "n" }, desc = "OpenSCAD Toggle Cheatsheet" },
    { "<leader>3h", "<cmd>OpenscadHelp<CR>", mode = { "n" }, desc = "OpenSCAD Help" },
    { "<leader>3m", "<cmd>OpenscadManual<CR>", mode = { "n" }, desc = "OpenSCAD Manual" },
    { "<leader>3o", "<cmd>OpenscadExecFile<CR>", mode = { "n" }, desc = "OpenSCAD Execute" },
  },
}
