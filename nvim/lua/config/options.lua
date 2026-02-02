-- Options are automatically loaded before lazy.nvim startup
-- Default options that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/options.lua
-- Add any additional options here
local opt = vim.opt

vim.lsp.inlay_hint.enable(false)

-- Spell check
opt.spell = true
opt.spelllang = "en_us"
opt.spellsuggest = "best,9"
opt.laststatus = 3 -- global statusline
opt.wrap = true -- Wrap lines at convenient points

vim.opt.tabstop = 4
vim.opt.shiftwidth = 4
vim.opt.softtabstop = 4
vim.opt.expandtab = true -- Use spaces instead of tabs
