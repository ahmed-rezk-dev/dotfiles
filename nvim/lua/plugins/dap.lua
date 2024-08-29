local present_dapui, dapui = pcall(require, "dapui")
local present_dap, dap = pcall(require, "dap")
local present_virtual_text, dap_vt = pcall(require, "nvim-dap-virtual-text")
local _, shade = pcall(require, "shade")
local keymap = vim.keymap.set
local opts = { noremap = true, silent = true }

if not present_dapui or not present_dap or not present_virtual_text then
  return
end

-- ╭──────────────────────────────────────────────────────────╮
-- │ DAP Virtual Text Setup                                   │
-- ╰──────────────────────────────────────────────────────────╯
dap_vt.setup({
  enabled = true,                        -- enable this plugin (the default)
  enabled_commands = true,               -- create commands DapVirtualTextEnable, DapVirtualTextDisable, DapVirtualTextToggle, (DapVirtualTextForceRefresh for refreshing when debug adapter did not notify its termination)
  highlight_changed_variables = true,    -- highlight changed values with NvimDapVirtualTextChanged, else always NvimDapVirtualText
  highlight_new_as_changed = false,      -- highlight new variables in the same way as changed variables (if highlight_changed_variables)
  show_stop_reason = true,               -- show stop reason when stopped for exceptions
  commented = false,                     -- prefix virtual text with comment string
  only_first_definition = true,          -- only show virtual text at first definition (if there are multiple)
  all_references = false,                -- show virtual text on all all references of the variable (not only definitions)
  filter_references_pattern = "<module", -- filter references (not definitions) pattern when all_references is activated (Lua gmatch pattern, default filters out Python modules)
  -- Experimental Features:
  virt_text_pos = "eol",                 -- position of virtual text, see `:h nvim_buf_set_extmark()`
  all_frames = false,                    -- show virtual text for all stack frames not only current. Only works for debugpy on my machine.
  virt_lines = false,                    -- show virtual lines instead of virtual text (will flicker!)
  virt_text_win_col = nil,               -- position the virtual text at a fixed window column (starting from the first text column) ,
})

-- ╭──────────────────────────────────────────────────────────╮
-- │ DAP UI Setup                                             │
-- ╰──────────────────────────────────────────────────────────╯
dapui.setup({
  icons = { expanded = "▾", collapsed = "▸" },
  mappings = {
    -- Use a table to apply multiple mappings
    expand = { "<CR>", "<2-LeftMouse>" },
    open = "o",
    remove = "d",
    edit = "e",
    repl = "r",
    toggle = "t",
  },
  -- Expand lines larger than the window
  -- Requires >= 0.7
  expand_lines = vim.fn.has("nvim-0.7"),
  -- Layouts define sections of the screen to place windows.
  -- The position can be "left", "right", "top" or "bottom".
  -- The size specifies the height/width depending on position. It can be an Int
  -- or a Float. Integer specifies height/width directly (i.e. 20 lines/columns) while
  -- Float value specifies percentage (i.e. 0.3 - 30% of available lines/columns)
  -- Elements are the elements shown in the layout (in order).
  -- Layouts are opened in order so that earlier layouts take priority in window sizing.
  layouts = {
    {
      elements = {
        -- Elements can be strings or table with id and size keys.
        { id = "scopes", size = 0.45 },
        -- "breakpoints",
        -- "stacks",
        "watches",
      },
      size = 80, -- 50 columns
      position = "right",
    },
    {
      elements = {
        "repl",
        "console",
      },
      size = 0.25, -- 25% of total lines
      position = "bottom",
    },
  },
  floating = {
    max_height = nil,                             -- These can be integers or a float between 0 and 1.
    max_width = nil,                              -- Floats will be treated as percentage of your screen.
    border = EcoVim.ui.float.border or "rounded", -- Border style. Can be "single", "double" or "rounded"
    mappings = {
      close = { "q", "<Esc>" },
    },
  },
  windows = { indent = 1 },
  render = {
    max_type_length = nil, -- Can be integer or nil.
  },
})

-- ╭──────────────────────────────────────────────────────────╮
-- │ DAP Setup                                                │
-- ╰──────────────────────────────────────────────────────────╯
dap.set_log_level("TRACE")

-- Automatically open UI
dap.listeners.after.event_initialized["dapui_config"] = function()
  dapui.open()
  -- shade.toggle()
end
dap.listeners.after.event_terminated["dapui_config"] = function()
  dapui.close()
  -- shade.toggle()
end
dap.listeners.before.event_exited["dapui_config"] = function()
  dapui.close()
  -- shade.toggle()
end

-- Enable virtual text
vim.g.dap_virtual_text = true

-- ╭──────────────────────────────────────────────────────────╮
-- │ Icons                                                    │
-- ╰──────────────────────────────────────────────────────────╯
vim.fn.sign_define("DapBreakpoint", { text = "🟥", texthl = "", linehl = "", numhl = "" })
vim.fn.sign_define("DapStopped", { text = "⭐️", texthl = "", linehl = "", numhl = "" })

-- ╭──────────────────────────────────────────────────────────╮
-- │ Keybindings                                              │
-- ╰──────────────────────────────────────────────────────────╯
keymap("n", "<Leader>db", "<CMD>lua require('dap').toggle_breakpoint()<CR>", opts)
keymap("n", "<Leader>dc", "<CMD>lua require('dap').continue()<CR>", opts)
keymap("n", "<Leader>dd", "<CMD>lua require('dap').continue()<CR>", opts)
keymap("n", "<Leader>dh", "<CMD>lua require('dapui').eval()<CR>", opts)
keymap("n", "<Leader>di", "<CMD>lua require('dap').step_into()<CR>", opts)
keymap("n", "<Leader>do", "<CMD>lua require('dap').step_out()<CR>", opts)
keymap("n", "<Leader>dO", "<CMD>lua require('dap').step_over()<CR>", opts)
keymap("n", "<Leader>dt", "<CMD>lua require('dap').terminate()<CR>", opts)
keymap("n", "<Leader>dC", "<CMD>lua require('dapui').close()<CR>", opts)

keymap("n", "<Leader>dw", "<CMD>lua require('dapui').float_element('watches', { enter = true })<CR>", opts)
keymap("n", "<Leader>ds", "<CMD>lua require('dapui').float_element('scopes', { enter = true })<CR>", opts)
keymap("n", "<Leader>dr", "<CMD>lua require('dapui').float_element('repl', { enter = true })<CR>", opts)

-- ╭──────────────────────────────────────────────────────────╮
-- │ Adapters                                                 │
-- ╰──────────────────────────────────────────────────────────╯

-- NODE
dap.adapters.node2 = {
  type = "executable",
  command = "node",
  args = { vim.fn.stdpath("data") .. "/mason/packages/node-debug2-adapter/out/src/nodeDebug.js" },
}

-- Chrome
dap.adapters.chrome = {
  type = "executable",
  command = "node",
  args = { vim.fn.stdpath("data") .. "/mason/packages/chrome-debug-adapter/out/src/chromeDebug.js" },
}

-- Chrome
dap.adapters.firefox = {
  type = "executable",
  command = "node",
  args = { vim.fn.stdpath("data") .. "/mason/packages/firefox-debug-adapter/dist/adapter.bundle.js" },
}

-- VSCODE JS
require("dap-vscode-js").setup({
  debugger_path = vim.fn.stdpath("data") .. "/mason/packages/js-debug-adapter",
  debugger_cmd = { "js-debug-adapter" },
  adapters = { "pwa-node", "pwa-chrome", "pwa-msedge", "node-terminal", "pwa-extensionHost", "firefox" },
})

-- C#
dap.adapters.coreclr = {
  type = 'executable',
  command = vim.fn.stdpath("data") .. "/mason/packages/netcoredbg/netcoredbg",
  args = { '--interpreter=vscode' }
}

-- ╭──────────────────────────────────────────────────────────╮
-- │ Configurations                                           │
-- ╰──────────────────────────────────────────────────────────╯
dap.configurations.javascript = {
  {
    name = "Node.js",
    type = "node2",
    request = "launch",
    program = "${file}",
    cwd = vim.fn.getcwd(),
    sourceMaps = true,
    protocol = "inspector",
    console = "integratedTerminal",
  },
}

dap.configurations.javascript = {
  {
    name = "Chrome (9222)",
    type = "chrome",
    request = "attach",
    program = "${file}",
    cwd = vim.fn.getcwd(),
    sourceMaps = true,
    protocol = "inspector",
    port = 9222,
    webRoot = "${workspaceFolder}",
  },
}

dap.configurations.javascriptreact = {
  {
    name = "Chrome (9222)",
    type = "chrome",
    request = "attach",
    program = "${file}",
    cwd = vim.fn.getcwd(),
    sourceMaps = true,
    protocol = "inspector",
    port = 9222,
    webRoot = "${workspaceFolder}",
  },
}

dap.configurations.typescriptreact = {
  {
    name = "Chrome (9222)",
    type = "chrome",
    request = "attach",
    program = "${file}",
    cwd = vim.fn.getcwd(),
    sourceMaps = true,
    protocol = "inspector",
    port = 9222,
    webRoot = "${workspaceFolder}",
  },
  {
    name = "Launch Chrome",
    type = "chrome",
    request = "launch",
    program = "${file}",
    cwd = vim.fn.getcwd(),
    sourceMaps = true,
    protocol = "inspector",
    port = 9222,
    host = "https://localhost:5001",
    url = "https://localhost:5001",
    webRoot = "${workspaceFolder}",
  },
  {
    name = "React Native (8081) (Node2)",
    type = "node2",
    request = "attach",
    program = "${file}",
    cwd = vim.fn.getcwd(),
    sourceMaps = true,
    protocol = "inspector",
    console = "integratedTerminal",
    port = 8081,
  },
  {
    name = "Attach React Native (8081)",
    type = "pwa-node",
    request = "attach",
    processId = require('dap.utils').pick_process,
    cwd = vim.fn.getcwd(),
    rootPath = '${workspaceFolder}',
    skipFiles = { "<node_internals>/**", "node_modules/**" },
    sourceMaps = true,
    protocol = "inspector",
    console = "integratedTerminal",
  },
  --  ╭──────────────────────────────────────────────────────────╮
  --  │ Firefox                                                  │
  --  ╰──────────────────────────────────────────────────────────╯
  {
    name = "Launch With Firefox",
    type = "firefox",
    request = "launch",
    program = "${file}",
    cwd = vim.fn.getcwd(),
    sourceMaps = true,
    protocol = "inspector",
    webRoot = "${workspaceFolder}",
    host = "https://localhost:5001/",
    url = "https://localhost:5001/",
  },

  {
    name = "Attach To Firefox",
    type = "firefox",
    request = "attach",
    reAttach = true,
    program = "${file}",
    cwd = vim.fn.getcwd(),
    sourceMaps = true,
    protocol = "inspector",
    webRoot = "${workspaceFolder}",
    url = "https://localhost:5001",
  },

}

--  ╭──────────────────────────────────────────────────────────╮
--  │ C#                                                       │
--  ╰──────────────────────────────────────────────────────────╯
vim.g.dotnet_build_project = function()
  local default_path = vim.fn.getcwd() .. '/'
  if vim.g['dotnet_last_proj_path'] ~= nil then
    default_path = vim.g['dotnet_last_proj_path']
  end
  local path = vim.fn.input('Path to your *proj file', default_path, 'file')
  vim.g['dotnet_last_proj_path'] = path
  local cmd = 'dotnet build -c Debug ' .. path .. ' > /dev/null'
  print('')
  print('Cmd to execute: ' .. cmd)
  local f = os.execute(cmd)
  if f == 0 then
    print('\nBuild: ✅')
  else
    print('\nBuild: ❌ (code: ' .. f .. ')')
  end
end

vim.g.dotnet_get_dll_path = function()
  local request = function()
    return vim.fn.input('Path to dll', vim.fn.getcwd() .. '/bin/Debug/', 'file')
  end

  if vim.g['dotnet_last_dll_path'] == nil then
    vim.g['dotnet_last_dll_path'] = request()
  else
    if vim.fn.confirm('Do you want to change the path to dll?\n' .. vim.g['dotnet_last_dll_path'], '&yes\n&no', 2) == 1 then
      vim.g['dotnet_last_dll_path'] = request()
    end
  end

  return vim.g['dotnet_last_dll_path']
end

local config = {
  {
    type = "coreclr",
    name = "launch - netcoredbg",
    request = "launch",
    program = function()
      if vim.fn.confirm('Should I recompile first?', '&yes\n&no', 2) == 1 then
        vim.g.dotnet_build_project()
      end
      return vim.g.dotnet_get_dll_path()
    end,
  },
}

-- dap.configurations.cs = config
-- dap.configurations.fsharp = config

require('dap-cs').setup({
  -- Additional dap configurations can be added.
  -- dap_configurations accepts a list of tables where each entry
  -- represents a dap configuration. For more details do:
  -- :help dap-configuration
  dap_configurations = {
    {
      -- Must be "coreclr" or it will be ignored by the plugin
      type = "coreclr",
      name = "Attach remote",
      mode = "remote",
      request = "attach",
    },
  },
  netcoredbg = {
    -- the path to the executable netcoredbg which will be used for debugging.
    -- by default, this is the "netcoredbg" executable on your PATH.
    path = "netcoredbg"
  }
}
)


-- dap.configurations.cs = {
--   {
--     type = "coreclr",
--     name = "launch - netcoredbg",
--     request = "launch",
--     program = function()
--       return vim.fn.input('Path to dll', vim.fn.getcwd() .. '/bin/Debug/net8.0/DotnetAPI.dll', 'file')
--     end,
--   },
-- }
