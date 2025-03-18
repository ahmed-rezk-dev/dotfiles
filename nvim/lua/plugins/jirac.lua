return {
  "janBorowy/jirac.nvim",
  dependencies = {
    "MunifTanjim/nui.nvim",
    "grapp-dev/nui-components.nvim",
    "nvim-lua/plenary.nvim",
  },

  config = function()
    require("jirac").setup({
      email = "ahmed.rezk+hwc@method.com",
      jira_domain = "jira.gethotwired.com",
      api_key = "",
      config = {
        default_project_key = "FISPRG",
        keymaps = {
          ["keymap_name"] = {
            mode = "n",
            key = "q",
          },
        },
        window_width = 150,
        window_height = 50,
      },
    })
  end,
}
