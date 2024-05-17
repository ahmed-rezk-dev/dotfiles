-- local methods = vim.lsp.protocol.Methods

-- Diagnostic config

local codes = {
  -- Lua
  no_matching_function = {
    message = " Can't find a matching function",
    "redundant-parameter",
    "ovl_no_viable_function_in_call",
  },
  empty_block = {
    message = "󰂕 That shouldn't be empty here",
    "empty-block",
  },
  missing_symbol = {
    message = " Here should be a symbol",
    "miss-symbol",
  },
  expected_semi_colon = {
    message = " Please put the `;` or `,`",
    "expected_semi_declaration",
    "miss-sep-in-table",
    "invalid_token_after_toplevel_declarator",
  },
  redefinition = {
    message = "󰫧 That variable was defined before",
    icon = "󰫧 ",
    "redefinition",
    "redefined-local",
    "no-duplicate-imports",
    "@typescript-eslint/no-redeclare",
    "import/no-duplicates"
  },
  no_matching_variable = {
    message = " Can't find that variable",
    "undefined-global",
    "reportUndefinedVariable",
  },
  trailing_whitespace = {
    message = "  Whitespaces are useless",
    "trailing-whitespace",
    "trailing-space",
  },
  unused_variable = {
    message = "󱄑  Don't define variables you don't use",
    icon = "󱄑  ",
    "unused-local",
    "@typescript-eslint/no-unused-vars",
    "no-unused-vars"
  },
  unused_function = {
    message = "󰂭  Don't define functions you don't use",
    "unused-function",
  },
  useless_symbols = {
    message = " Remove that useless symbols",
    "unknown-symbol",
  },
  wrong_type = {
    message = " Try to use the correct types",
    "init_conversion_failed",
  },
  undeclared_variable = {
    message = " Have you delcared that variable somewhere?",
    "undeclared_var_use",
  },
  lowercase_global = {
    message = " Should that be a global? (if so make it uppercase)",
    "lowercase-global",
  },
  -- Typescript
  no_console = {
    icon = "  ",
    "no-console",
  },
  -- Prettier
  prettier = {
    icon = "  ",
    "prettier/prettier"
  }
}

-- FIX: the format does not catch prettier errors.
vim.diagnostic.config({
  float = {
    source = false,
    -- format = function(diagnostic)
    --   if not diagnostic.user_data.lsp then return end
    --
    --   local code = diagnostic.user_data.lsp.code
    --
    --
    --
    --   if not diagnostic.source or not code then
    --     return string.format('%s', diagnostic.message)
    --   end
    --
    --   if diagnostic.source == 'eslint' then
    --     for _, table in pairs(codes) do
    --       if vim.tbl_contains(table, code) then
    --         return string.format('%s [%s]', table.icon .. diagnostic.message, code)
    --       end
    --     end
    --
    --     return string.format('%s [%s]', diagnostic.message, code)
    --   end
    --
    --   for _, table in pairs(codes) do
    --     if vim.tbl_contains(table, code) then
    --       return table.message
    --     end
    --   end
    --
    --   return string.format('%s [%s]', diagnostic.message, diagnostic.source)
    -- end
  },
  severity_sort = true,
  signs = true,
  underline = true,
  update_in_insert = false,
  virtual_text = {
    prefix = EcoVim.icons.circle,
  },
})

-- UI

local signs = { Error = " ", Warn = " ", Hint = " ", Info = " " }

for type, icon in pairs(signs) do
  local hl = "DiagnosticSign" .. type
  vim.fn.sign_define(hl, { text = icon, texthl = hl, numhl = "" })
end

require('lspconfig.ui.windows').default_options.border = EcoVim.ui.float.border or 'rounded'

---LSP handler that adds extra inline highlights, keymaps, and window options.
---Code inspired from `noice`.
---@param handler fun(err: any, result: any, ctx: any, config: any): integer, integer
---@return function
-- local function enhanced_float_handler(handler)
--     return function(err, result, ctx, config)
--         local buf, win = handler(
--             err,
--             result,
--             ctx,
--             vim.tbl_deep_extend('force', config or {}, {
--                 border = 'rounded',
--                 max_height = math.floor(vim.o.lines * 0.5),
--                 max_width = math.floor(vim.o.columns * 0.4),
--             })
--         )
--
--         if not buf or not win then
--             return
--         end
--
--         -- Conceal everything.
--         vim.wo[win].concealcursor = 'n'
--
--         -- Extra highlights.
--         for l, line in ipairs(vim.api.nvim_buf_get_lines(buf, 0, -1, false)) do
--             for pattern, hl_group in pairs {
--                 ['|%S-|'] = '@text.reference',
--                 ['@%S+'] = '@parameter',
--                 ['^%s*(Parameters:)'] = '@text.title',
--                 ['^%s*(Return:)'] = '@text.title',
--                 ['^%s*(See also:)'] = '@text.title',
--                 ['{%S-}'] = '@parameter',
--             } do
--                 local from = 1 ---@type integer?
--                 while from do
--                     local to
--                     from, to = line:find(pattern, from)
--                     if from then
--                         vim.api.nvim_buf_set_extmark(buf, md_namespace, l - 1, from - 1, {
--                             end_col = to,
--                             hl_group = hl_group,
--                         })
--                     end
--                     from = to and to + 1 or nil
--                 end
--             end
--         end
--
--         -- Add keymaps for opening links.
--         if not vim.b[buf].markdown_keys then
--             vim.keymap.set('n', 'K', function()
--                 -- Vim help links.
--                 local url = (vim.fn.expand '<cWORD>' --[[@as string]]):match '|(%S-)|'
--                 if url then
--                     return vim.cmd.help(url)
--                 end
--
--                 -- Markdown links.
--                 local col = vim.api.nvim_win_get_cursor(0)[2] + 1
--                 local from, to
--                 from, to, url = vim.api.nvim_get_current_line():find '%[.-%]%((%S-)%)'
--                 if from and col >= from and col <= to then
--                     vim.system({ 'open', url }, nil, function(res)
--                         if res.code ~= 0 then
--                             vim.notify('Failed to open URL' .. url, vim.log.levels.ERROR)
--                         end
--                     end)
--                 end
--             end, { buffer = buf, silent = true })
--             vim.b[buf].markdown_keys = true
--         end
--     end
-- end

-- vim.lsp.handlers[methods.textDocument_signatureHelp] = enhanced_float_handler(vim.lsp.handlers.hover)
-- vim.lsp.handlers[methods.textDocument_signatureHelp] = enhanced_float_handler(vim.lsp.handlers.signature_help)
