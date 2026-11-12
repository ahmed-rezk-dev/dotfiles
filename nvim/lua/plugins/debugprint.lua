return {
  "andrewferrier/debugprint.nvim",
  event = "LazyFile",
  config = function()
    require("debugprint").setup({
      filetypes = {
        ["javascript"] = {
          left = "console.log(`🔍 [DEBUG] ",
          right = "`);",
          mid_var = "=${",
          right_var = "}`);",
        },
        ["javascriptreact"] = {
          left = "console.log(`🔍 [DEBUG] ",
          right = "`);",
          mid_var = "=${",
          right_var = "}`);",
        },
        ["typescript"] = {
          left = "console.log(`🔍 [DEBUG] ",
          right = "`);",
          mid_var = "=${",
          right_var = "}`);",
        },
        ["typescriptreact"] = {
          left = "console.log(`🔍 [DEBUG] ",
          right = "`);",
          mid_var = "=${",
          right_var = "}`);",
        },
        ["lua"] = {
          left = "print('🔍 [DEBUG] ",
          right = "')",
          mid_var = "', ",
          right_var = "",
        },
        ["python"] = {
          left = 'print(f"🔍 [DEBUG] ',
          right = '")',
          mid_var = '={',
          right_var = '}")',
        },
      },
    })
  end,
}
