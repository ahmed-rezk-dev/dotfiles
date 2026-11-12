-- Helpers for Obsidian Kanban boards (https://github.com/mgmeyers/obsidian-kanban).
-- A board is a markdown file: `## Column` headings, `- [ ] card` list items (optionally with
-- indented continuation lines), and a trailing `%% kanban:settings` block.
local M = {}

local CARD = "^%- %[[ xX]%] "
local SETTINGS = "^%%%% kanban:settings"

---@class utils.board.Column
---@field name string
---@field heading integer 1-based line of the `## ` heading
---@field last integer 1-based last non-blank line of the column (the heading when empty)

---@param lines string[]
---@return utils.board.Column[]
function M.columns(lines)
  local columns = {}
  for i, line in ipairs(lines) do
    if line:match(SETTINGS) then
      break
    end
    local name = line:match("^## (.+)$")
    if name then
      table.insert(columns, { name = name, heading = i, last = i })
    elseif #columns > 0 and line:match("%S") then
      columns[#columns].last = i
    end
  end
  return columns
end

---@param lines string[]
---@param lnum integer
---@return integer? index into columns()
local function column_at(columns, lnum)
  local found
  for idx, col in ipairs(columns) do
    if lnum >= col.heading then
      found = idx
    end
  end
  return found
end

--- Line range `[first, last]` of the card containing `lnum`, or nil when not on a card.
---@param lines string[]
---@param lnum integer
---@return integer? first
---@return integer? last
function M.card_range(lines, lnum)
  local first = lnum
  while first >= 1 and not lines[first]:match(CARD) do
    if lines[first]:match("^#") or not lines[first]:match("^%s+%S") then
      return nil
    end
    first = first - 1
  end
  if first < 1 then
    return nil
  end
  local last = first
  while lines[last + 1] and lines[last + 1]:match("^%s+%S") do
    last = last + 1
  end
  if lnum > last then
    return nil
  end
  return first, last
end

--- Insert `card` lines at the end of column `idx`.
---@param lines string[] mutated
---@param columns utils.board.Column[]
---@return integer first line of the inserted card
local function append_to_column(lines, columns, idx, card)
  local col = columns[idx]
  local at = col.last
  if col.last == col.heading then
    -- Empty column: keep the blank line Kanban writes after the heading.
    table.insert(lines, at + 1, "")
    at = at + 1
  end
  for offset, text in ipairs(card) do
    table.insert(lines, at + offset, text)
  end
  return at + 1
end

--- Move the card under `lnum` into the neighbouring column.
---@param lines string[]
---@param lnum integer
---@param delta integer 1 = next column, -1 = previous column
---@return string[]? new_lines nil when nothing can move
---@return integer|string? cursor_line or an error message
function M.move_card(lines, lnum, delta)
  local first, last = M.card_range(lines, lnum)
  if not first then
    return nil, "Cursor is not on a card"
  end
  local columns = M.columns(lines)
  local idx = column_at(columns, first)
  local target = idx and idx + delta
  if not target or not columns[target] then
    return nil, "No column in that direction"
  end
  local card = vim.list_slice(lines, first, last)
  local out = vim.deepcopy(lines)
  for _ = first, last do
    table.remove(out, first)
  end
  return out, append_to_column(out, M.columns(out), target, card)
end

--- Append a new unchecked card to the column at `lnum` (first column when outside any).
---@param lines string[]
---@param lnum integer
---@param text string
---@return string[]? new_lines
---@return integer|string? cursor_line or an error message
function M.add_card(lines, lnum, text)
  local columns = M.columns(lines)
  if #columns == 0 then
    return nil, "Board has no columns"
  end
  local out = vim.deepcopy(lines)
  return out, append_to_column(out, M.columns(out), column_at(columns, lnum) or 1, { "- [ ] " .. text })
end

---@param buf integer
function M.is_board(buf)
  for _, line in ipairs(vim.api.nvim_buf_get_lines(buf, 0, 8, false)) do
    if line:match("^kanban%-plugin:") then
      return true
    end
  end
  return false
end

local function apply(buf, new_lines, cursor_line)
  vim.api.nvim_buf_set_lines(buf, 0, -1, false, new_lines)
  vim.api.nvim_win_set_cursor(0, { cursor_line, 0 })
end

--- Buffer-local keymaps on Kanban board buffers.
function M.setup()
  vim.api.nvim_create_autocmd("FileType", {
    group = vim.api.nvim_create_augroup("notes_board_keymaps", { clear = true }),
    pattern = "markdown",
    callback = function(ev)
      if not M.is_board(ev.buf) then
        return
      end
      local function move(delta)
        return function()
          local lines = vim.api.nvim_buf_get_lines(ev.buf, 0, -1, false)
          local new_lines, cursor = M.move_card(lines, vim.api.nvim_win_get_cursor(0)[1], delta)
          if new_lines then
            apply(ev.buf, new_lines, cursor --[[@as integer]])
          else
            vim.notify(cursor --[[@as string]], vim.log.levels.WARN)
          end
        end
      end
      local opts = { buffer = ev.buf }
      vim.keymap.set("n", "<leader>o]", move(1), vim.tbl_extend("force", opts, { desc = "Move card to next column" }))
      vim.keymap.set(
        "n",
        "<leader>o[",
        move(-1),
        vim.tbl_extend("force", opts, { desc = "Move card to previous column" })
      )
      vim.keymap.set("n", "<leader>oa", function()
        vim.ui.input({ prompt = "Card: " }, function(text)
          if not text or text == "" then
            return
          end
          local lines = vim.api.nvim_buf_get_lines(ev.buf, 0, -1, false)
          local new_lines, cursor = M.add_card(lines, vim.api.nvim_win_get_cursor(0)[1], text)
          if new_lines then
            apply(ev.buf, new_lines, cursor --[[@as integer]])
          else
            vim.notify(cursor --[[@as string]], vim.log.levels.WARN)
          end
        end)
      end, vim.tbl_extend("force", opts, { desc = "Add card to column" }))
    end,
  })
end

return M
