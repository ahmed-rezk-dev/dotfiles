local present, wk = pcall(require, "which-key")
if not present then
  return
end


return function(bufnr)
  wk.register({
    c = {
      name = "LSP",
      e = { '<cmd>TSC<CR>', 'workspace errors (TSC)' },
      F = { '<cmd>TypescriptFixAll<CR>', 'fix all' },
      i = { '<cmd>TypescriptAddMissingImports<CR>', 'import all' },
      o = { '<cmd>TypescriptOrganizeImports<CR>', 'organize imports' },
      u = { '<cmd>TypescriptRemoveUnused<CR>', 'remove unused' },
    }
  }, {
    buffer = bufnr,
    mode = "n",     -- NORMAL mode
    prefix = "<leader>",
    silent = true,  -- use `silent` when creating keymaps
    noremap = true, -- use `noremap` when creating keymaps
    nowait = true,  -- use `nowait` when creating keymaps
  })
end
