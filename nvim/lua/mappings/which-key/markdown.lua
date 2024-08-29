local present, wk = pcall(require, "which-key")
if not present then
  return
end

return function(bufnr)
  wk.add({
    a = {
      name = "Actions",
      m = { '<cmd>MarkdownPreviewToggle<CR>', 'markdown preview' },
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
