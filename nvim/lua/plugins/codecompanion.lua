---@diagnostic disable-next-line: unused-local

local PROMPTS = require("utils.prompts")
local mapping_key_prefix = vim.g.ai_prefix_key or "<leader>a"

local function generate_slash_commands()
  local commands = {}
  for _, command in ipairs({ "buffer", "file", "help", "symbols" }) do
    commands[command] = {
      opts = {
        provider = "copilot",
      },
    }
  end
  return commands
end

return {
  {
    "olimorris/codecompanion.nvim",
    dependencies = {
      "nvim-lua/plenary.nvim",
      "nvim-treesitter/nvim-treesitter",
    },
    enabled = true,
    opts = {
      display = {
        chat = {
          intro_message = "Welcome to CodeCompanion ✨! Press ? for options",
          show_header_separator = true,
          auto_scroll = true,
        },
        diff = {
          provider = "inline",
        },
      },
      interactions = {
        inline = {
          keymaps = {
            accept_change = {
              modes = { n = "gda" },
              description = "Accept the suggested change",
            },
            reject_change = {
              modes = { n = "gdr" },
              description = "Reject the suggested change",
            },
          },
        },
      },
      adapters = {
        copilot = function()
          return require("codecompanion.adapters").extend("copilot", {
            name = "Copilot",
          })
        end,
      },
      strategies = {
        chat = {
          adapter = "copilot",
          roles = {
            llm = "CodeCompanion",
            user = "Me",
          },
          slash_commands = generate_slash_commands(),
          keymaps = {
            close = {
              modes = {
                n = "q",
              },
              index = 3,
              callback = "keymaps.close",
              description = "Close Chat",
            },
            stop = {
              modes = {
                n = "<C-c",
              },
              index = 4,
              callback = "keymaps.stop",
              description = "Stop Request",
            },
          },
          opts = {
            log_level = "DEBUG",
            system_prompt = PROMPTS.SYSTEM_PROMPT,
          },
          prompt_library = PROMPTS.PROMPT_LIBRARY,
        },

        inline = {
          adapter = "copilot",
          prompt_library = PROMPTS.PROMPT_LIBRARY,
        },
        cmd = {
          adapter = "copilot",
          prompt_library = PROMPTS.PROMPT_LIBRARY,
        },
      },
      prompt_library = PROMPTS.PROMPT_LIBRARY,

      extensions = {
        mcphub = {
          callback = "mcphub.extensions.codecompanion",
          opts = {
            make_tools = true, -- Make individual tools (@server__tool) and server groups (@server) from MCP servers
            show_server_tools_in_chat = true, -- Show individual tools in chat completion (when make_tools=true)
            add_mcp_prefix_to_tool_names = false, -- Add mcp__ prefix (e.g `@mcp__github`, `@mcp__neovim__list_issues`)
            show_result_in_chat = true, -- Show tool results directly in chat buffer
            format_tool = nil, -- function(tool_name:string, tool: CodeCompanion.Agent.Tool) : string Function to format tool names to show in the chat buffer
            -- MCP Resources
            make_vars = false, -- Convert MCP resources to #variables for prompts (disable if no MCP servers)
            -- MCP Prompts
            make_slash_commands = false, -- Add MCP prompts as /slash commands (disable if no MCP servers)
          },
        },
      },
    },
    keys = {
      { "<leader>a", "", desc = "+ai", mode = { "n", "v" } },
      {
        mapping_key_prefix .. "p",
        "<cmd>CodeCompanionActions<cr>",
        desc = "Code Companion - Prompt Actions",
      },
      {
        mapping_key_prefix .. "a",
        function()
          vim.cmd("CodeCompanionChat Toggle")
          vim.cmd("startinsert")
        end,
        desc = "Code Companion - Toggle",
        mode = { "n", "v" },
      },
      -- Inline Diff Mode (https://codecompanion.olimorris.dev/usage/inline.html)
      { "gda", "<cmd>CodeCompanionInlineInteractAccept<cr>", desc = "Accept inline edit", mode = { "n", "v" } },
      { "gdr", "<cmd>CodeCompanionInlineInteractReject<cr>", desc = "Reject inline edit", mode = { "n", "v" } },
      -- Some common usages with visual mode
      {
        mapping_key_prefix .. "e",
        "<cmd>CodeCompanion /explain<cr>",
        desc = "Code Companion - Explain code",
        mode = "v",
      },
      {
        mapping_key_prefix .. "E",
        "<cmd>CodeCompanion /english<cr>",
        desc = "Code Companion - English Review",
        mode = "v",
      },
      { mapping_key_prefix .. "g",
        function()
          vim.cmd("CodeCompanion /grammar")
          vim.cmd("startinsert")
        end,
        desc = "Code Companion - Grammar Fix",
        mode = { "n", "v" },
      },
      {
        mapping_key_prefix .. "f",
        "<cmd>CodeCompanion /fix<cr>",
        desc = "Code Companion - Fix code",
        mode = "v",
      },
      {
        mapping_key_prefix .. "l",
        "<cmd>CodeCompanion /lsp<cr>",
        desc = "Code Companion - Explain LSP diagnostic",
        mode = { "n", "v" },
      },
      {
        mapping_key_prefix .. "t",
        "<cmd>CodeCompanion /tests<cr>",
        desc = "Code Companion - Generate unit test",
        mode = "v",
      },
      {
        mapping_key_prefix .. "m",
        "<cmd>CodeCompanion /commit<cr>",
        desc = "Code Companion - Git commit message",
      },
      -- Custom prompts
      {
        mapping_key_prefix .. "M",
        "<cmd>CodeCompanion /staged-commit<cr>",
        desc = "Code Companion - Git commit message (staged)",
      },
      {
        mapping_key_prefix .. "d",
        "<cmd>CodeCompanion /inline-doc<cr>",
        desc = "Code Companion - Inline document code",
        mode = "v",
      },
      { mapping_key_prefix .. "D", "<cmd>CodeCompanion /doc<cr>", desc = "Code Companion - Document code", mode = "v" },
      {
        mapping_key_prefix .. "r",
        "<cmd>CodeCompanion /refactor<cr>",
        desc = "Code Companion - Refactor code",
        mode = "v",
      },
      {
        mapping_key_prefix .. "R",
        "<cmd>CodeCompanion /review<cr>",
        desc = "Code Companion - Review code",
        mode = "v",
      },
      {
        mapping_key_prefix .. "n",
        "<cmd>CodeCompanion /naming<cr>",
        desc = "Code Companion - Better naming",
        mode = "v",
      },
      -- Quick chat
      {
        mapping_key_prefix .. "q",
        function()
          local input = vim.fn.input("Quick Chat: ")
          if input ~= "" then
            vim.cmd("CodeCompanion " .. input)
          end
        end,
        desc = "Code Companion - Quick chat",
      },
    },
    config = function(_, opts)
      local spinner = require("utils.spinner")
      spinner:init()

      -- Setup the entire opts table
      require("codecompanion").setup(opts)
    end,
  },
  {
    "MeanderingProgrammer/render-markdown.nvim",
    ft = { "markdown", "codecompanion" },
  },
}
