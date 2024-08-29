local present, wk = pcall(require, "which-key")
if not present then
  return
end


return function(bufnr)
  wk.register({
    ["R"] = { '[SPECTRE] Replace all' },
    ["o"] = { '[SPECTRE] Show options' },
    ["q"] = { '[SPECTRE] Send all to quicklist' },
    ["v"] = { '[SPECTRE] Change view mode' },
  }, {
    buffer = bufnr,
    mode = "n",     -- NORMAL mode
    prefix = "<leader>",
    silent = true,  -- use `silent` when creating keymaps
    noremap = true, -- use `noremap` when creating keymaps
    nowait = true,  -- use `nowait` when creating keymaps
  })
end
