local fn = require("utils.fn")
local present, wk = pcall(require, "which-key")
if not present then
  return
end



-- local cmd = function()
--   vim.api.nvim_create_autocmd("FileType", {
--     pattern = "NvimTree",
--     callback = function()
--       fn.log("NvimTree")
--     end
--   })
-- end
--
return function(bufnr)
  fn.log(bufnr)
  wk.add({
    {
      "<leader>=",
      "<cmd>NvimTreeResize +5<CR>",
      desc = "resize +5",
      silent = true, -- use `silent` when creating keymaps
      remap = false, -- use `noremap` when creating keymaps
      nowait = true, -- use `nowait` when creating keymaps
      cond = bufnr,
      mode = "n",  -- NORMAL mode
    },
    {
      "<leader>-",
      "<cmd>NvimTreeResize -5<CR>",
      desc = "resize -5",
      silent = true, -- use `silent` when creating keymaps
      remap = false, -- use `noremap` when creating keymaps
      nowait = true, -- use `nowait` when creating keymaps
      cond = bufnr,
      mode = "n",  -- NORMAL mode
    } })
end
