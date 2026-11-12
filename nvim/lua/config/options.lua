-- Options are automatically loaded before lazy.nvim startup
-- Default options that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/options.lua
-- Add any additional options here
local opt = vim.opt

-- Fix for Neovim GUI apps not finding NVM Node.js
-- This error occurs because GUI apps don't inherit shell PATH
vim.opt.shell = "/bin/zsh"
vim.env.PATH = "/Users/ahmed.rezk/.nvm/versions/node/v22.22.2/bin:" .. vim.env.PATH

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

-- Fix .env file detection: the built-in 'env' filetype has no treesitter
-- parser, so files like .local.env render without syntax highlighting.
-- Override all built-in env detection methods (filename, pattern, extension).
-- Note: vim.filetype.add() auto-wraps patterns with ^...$, so don't include anchors.
-- Pattern priority must be > 0 to beat the built-in ^%.env%. pattern (priority 0).
vim.filetype.add({
  filename = { [".env"] = "sh" },
  extension = { env = "sh" },
  pattern = {
    ["%.env%..*"] = { "sh", { priority = 1 } },
  },
})
