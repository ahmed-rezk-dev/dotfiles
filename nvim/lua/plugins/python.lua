return {
  {
    "neovim/nvim-lspconfig",
    opts = {
      servers = {
        pyright = {
          settings = {
            python = {
              analysis = {
                autoImportCompletions = true,
                autoSearchPaths = true,
                diagnosticMode = "workspace", -- openFilesOnly, workspace
                typeCheckingMode = "basic", -- off, basic, strict
                useLibraryCodeForTypes = true,
              },
            },
          },
        },
      },
    },
  },
  {
    "benomahony/uv.nvim",
    opts = {},
  },
}
