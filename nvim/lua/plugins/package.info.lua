local mapping_key_prefix = vim.g.ai_prefix_key or "<leader>c"

return {
  "vuki656/package-info.nvim",
  requires = "MunifTanjim/nui.nvim",

  config = function()
    require("package-info").setup()
  end,

  keys = {

    {
      mapping_key_prefix .. "ns",
      "<cmd>lua require('package-info').show({ force = true })<CR>",
      desc = "Show dependency versions",
    },

    {
      mapping_key_prefix .. "nh",
      "<cmd>lua require('package-info').hide<CR>",
      desc = "Hide dependency versions",
    },

    {
      mapping_key_prefix .. "nt",
      "<cmd>lua require('package-info').toggle<CR>",
      desc = "Toggle dependency versions",
    },

    {
      mapping_key_prefix .. "nu",
      "<cmd>lua require('package-info').update<CR>",
      desc = "Update dependency on the line",
    },

    {
      mapping_key_prefix .. "nd",
      "<cmd>lua require('package-info').delete<CR>",
      desc = "Delete dependency on the line",
    },

    {
      mapping_key_prefix .. "ni",
      "<cmd>lua require('package-info').install<CR>",
      desc = "Install a new dependency",
    },

    {
      mapping_key_prefix .. "nc",
      "<cmd>lua require('package-info').change_version<CR>",
      desc = "Install a different dependency version",
    },
  },
}
