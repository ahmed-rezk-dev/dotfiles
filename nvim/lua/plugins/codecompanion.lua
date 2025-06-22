---@diagnostic disable-next-line: unused-local
local function generate_slash_commands()
  local commands = {}
  for _, command in ipairs({ "buffer", "file", "help", "symbols" }) do
    commands[command] = {
      opts = {
        provider = LazyVim.pick.picker.name, -- dynamically resolve the provider
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
          show_header_separator = true, -- Show header separators in the chat buffer? Set this to false if you're using an external markdown formatting plugin
          auto_scroll = true,
        },
      },
      adapters = {
        ollama = function()
          return require("codecompanion.adapters").extend("ollama", {
            env = {
              url = "http://192.168.50.252:11434",
              endpoint = "http://192.168.50.252:11434",
            },
            schema = {
              model = {
                default = "deepseek-r1",
              },
              num_ctx = {
                default = 20000,
              },
            },
          })
        end,
      },
      strategies = {
        chat = {
          adapter = "ollama",
          opts = {
            log_level = "DEBUG",
          },
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
        },
      },
      inline = {
        adapter = "ollama",
      },
      prompt_library = {
        ["Generate documentation in JSDoc"] = {
          strategy = "inline",
          prompts = {
            {
              role = "user",
              content = "Generate documentation in JSDoc format for a complex JavaScript API client",
              opts = {
                auto_submit = true,
              },
            },
          },
        },
      },
    },
    keys = {
      { "<leader>a", "", desc = "+ai", mode = { "n", "v" } },
      { "<leader>aa", "<cmd>CodeCompanionChat Toggle<cr>", mode = { "n", "v" }, desc = "Toggle (CodeCompanion)" },
      { "<leader>ap", "<cmd>CodeCompanionActions<cr>", mode = { "n", "v" }, desc = "Prompt Actions (CodeCompanion)" },
      { "<leader>ac", "<cmd>CodeCompanionAdd<cr>", mode = "v", desc = "Add code to CodeCompanion" },
      { "<leader>ai", "<cmd>'<,'>CodeCompanion<cr>", mode = { "n", "v" }, desc = "Inline prompt (CodeCompanion)" },
      -- {
      --   "<leader>ac",
      --   "<cmd>CodeCompanionChat Toggle<cr>",
      --   mode = { "n", "v" },
      --   noremap = true,
      --   silent = true,
      --   desc = "CodeCompanion chat",
      -- },
      -- {
      --   "<leader>ad",
      --   "<cmd>CodeCompanionChat Add<cr>",
      --   mode = "v",
      --   noremap = true,
      --   silent = true,
      --   desc = "CodeCompanion add to chat",
      -- },
    },
  },
  {
    "MeanderingProgrammer/render-markdown.nvim",
    ft = { "markdown", "codecompanion" },
  },
}
