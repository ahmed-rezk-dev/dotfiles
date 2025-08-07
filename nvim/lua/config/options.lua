-- Options are automatically loaded before lazy.nvim startup
-- Default options that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/options.lua
-- Add any additional options here
local opt = vim.opt

vim.lsp.inlay_hint.enable(false)

-- Spell check
opt.spell = true
opt.spelllang = "en_us"
opt.spellsuggest = "best,9"
