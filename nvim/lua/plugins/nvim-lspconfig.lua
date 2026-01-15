return {
  "neovim/nvim-lspconfig",
  opts = {
    diagnostics = {
      virtual_text = false,
    },
     servers = {
       eslint = {
         cmd_env = { ESLINT_USE_FLAT_CONFIG = "false" },
         settings = {
           workingDirectories = { mode = "auto" },
         },
       },
       tailwindcss = {
         -- exclude a filetype from the default_config
         filetypes_exclude = { "markdown" },
         -- add additional filetypes to the default_config
         filetypes_include = {},
         -- to fully override the default_config, change the below
         -- filetypes = {}
         settings = {
           tailwindCSS = {
             includeLanguages = {
               elixir = "html-eex",
               eelixir = "html-eex",
               heex = "html-eex",
             },
             experimental = {
               classRegex = {
                 "tw`([^`]*)",
                 'tw="([^"]*)',
                 'tw={"([^"}]*)',
                 "tw\\.\\w+`([^`]*)",
                 "tw\\(.*?\\)`([^`]*)",
                 { "clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)" },
                 { "classnames\\(([^)]*)\\)", "'([^']*)'" },
                 { "cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]" },
                 { "cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)" },
                 { "cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]" },
                 { "([a-zA-Z0-9\\-:]+)" },
               },
             },
           },
         },
       },
     },
  },
}
