return {
  settings = {
    html = {
      diagnostics = {
        globals = { "vim" },
      },
      workspace = {
        library = {
          [vim.fn.expand "$VIMRUNTIME/snap"] = true,
          [vim.fn.stdpath "config" .. "/snap"] = true,
					[vim.fn.expand("$VIMRUNTIME/html")] = true,
					[vim.fn.stdpath("config") .. "/html"] = true,
        },
      },
      filetypes = { "html", "*.snap", "*.js", "*.jsx", "*.ts", "*.tsx", "typescriptreact", "typescript.tsx" },
    },
  },
}
