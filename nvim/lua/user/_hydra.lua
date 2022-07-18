local M = {}

local Hydra = require "hydra"

M.setup = function()
  local gitsigns = require "gitsigns"

  local hint = [[
     _R_: get from REMOTE     _B_: get from BASE        _L_: get from LOCAL 
            _a_: blame line                _A_: blame show full
    ^ ^            _<Enter>_: Neogit          _q_: exit
    ]]

  Hydra {
    name = "Git Merge Conflicts",
    hint = hint,
    config = {
      buffer = bufnr,
      color = "pink",
      invoke_on_body = true,
      hint = {
        border = "rounded",
      },
      on_enter = function()
        vim.cmd "silent! %foldopen!"
        vim.bo.modifiable = false
        gitsigns.toggle_signs(true)
        gitsigns.toggle_linehl(true)
      end,
      on_exit = function()
        gitsigns.toggle_signs(false)
        gitsigns.toggle_linehl(false)
        gitsigns.toggle_deleted(false)
      end,
    },
    mode = { "n", "x" },
    body = "<leader>gm",
    heads = {
      { "R", ":diffg RE<cr>", { expr = true, desc = "Merged from REMOTE" } },
      { "B", ":diffg BA<cr>" },
      { "L", ":diffg LO<cr>" },
      { "a", gitsigns.blame_line, { desc = "blame" } },
      {
        "A",
        function()
          gitsigns.blame_line { full = true }
        end,
      },
      { "<Enter>", "<Cmd>Neogit<CR>", { exit = true, desc = "Neogit" } },
      { "q", nil, { exit = true, nowait = true, desc = "exit" } },
    },
  }
end
return M
