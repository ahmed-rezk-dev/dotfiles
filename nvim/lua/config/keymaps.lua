-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here

-- Grammar check / English review with CopilotChat
-- <leader>sg - inline grammar fix (applies directly in-place)
vim.keymap.set({ "n", "x" }, "<leader>sg", function()
  vim.cmd("CopilotChat Grammar Fix")
end, { desc = "CopilotChat - Grammar Fix (inline)" })
-- local map = LazyVim.safe_keymap_set
-- map(
--   "s",
--   "<leader>sf",
--   "<cmd>:<C-u>lua require('grug-far').with_visual_selection({ prefills = { paths = vim.fn.expand(" % ") } })<cr>",
--   { desc = "Terminal (cwd)" }
-- )
