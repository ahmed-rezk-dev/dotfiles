local present, wk = pcall(require, "which-key")
if not present then
  return
end


return function(bufnr)
  wk.register({
    j = {
      name = "Jest",
      f = { '<cmd>lua require("neotest").run.run(vim.fn.expand("%"))<CR>', 'run current file' },
      i = { '<cmd>lua require("neotest").summary.toggle()<CR>', 'toggle info panel' },
      j = { '<cmd>lua require("neotest").run.run()<CR>', 'run nearest test' },
      l = { '<cmd>lua require("neotest").run.run_last()<CR>', 'run last test' },
      o = { '<cmd>lua require("neotest").output.open({ enter = true })<CR>', 'open test output' },
      s = { '<cmd>lua require("neotest").run.stop()<CR>', 'stop' },
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
