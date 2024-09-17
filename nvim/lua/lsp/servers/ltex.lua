local M = {}

local spellFile = io.open(vim.fn.stdpath("config") .. "/spell/en.utf-8.add", "r")
local words = {}
if spellFile ~= nil then
  for word in spellFile:lines() do
    table.insert(words, word)
  end
end

local settings = {
  ltex = {
    dictionary = {
      ["en-US"] = words,
    },
  },
}


M.words = words
M.settings = settings

return M
