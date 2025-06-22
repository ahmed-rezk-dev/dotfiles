-- local prefix = "<Leader>a"
return {
  -- {
  --   "zbirenbaum/copilot.lua",
  --   opts = function(_, opts)
  --     opts.suggestion = opts.suggestion or {}
  --     opts.suggestion.debounce = 200
  --     return opts
  --   end,
  -- },
  -- {
  --   "yetone/avante.nvim",
  --   event = "VeryLazy",
  --   lazy = true,
  --   version = false, -- set this if you want to always pull the latest change
  --   opts = {
  --     hints = { enabled = false },
  --     -- add any opts here
  --     mappings = {
  --       ask = prefix .. "<CR>",
  --       edit = prefix .. "e",
  --       refresh = prefix .. "r",
  --       focus = prefix .. "f",
  --       toggle = {
  --         default = prefix .. "t",
  --         debug = prefix .. "d",
  --         hint = prefix .. "h",
  --         suggestion = prefix .. "s",
  --         repomap = prefix .. "R",
  --       },
  --       diff = {
  --         next = "]c",
  --         prev = "[c",
  --       },
  --       files = {
  --         add_current = prefix .. ".",
  --       },
  --     },
  --     auto_suggestions_provider = "ollama",
  --     behaviour = {
  --       auto_suggestions = true,
  --     },
  --     provider = "ollama",
  --     ollama = {
  --       model = "llama3",
  --       endpoint = "192.168.50.252:11434",
  --       -- temperature = 0,
  --       -- max_tokens = 8192,
  --     },
  --     file_selector = {
  --       --- @alias FileSelectorProvider "native" | "fzf" | "mini.pick" | "snacks" | "telescope" | string | fun(params: avante.file_selector.IParams|nil): nil
  --       provider = "fzf",
  --       -- Options override for custom providers
  --       provider_opts = {},
  --     },
  --   },
  --   -- if you want to build from source then do `make BUILD_FROM_SOURCE=true`
  --   -- dynamically build it, taken from astronvim
  --   build = vim.fn.has("win32") == 1 and "powershell -ExecutionPolicy Bypass -File Build.ps1 -BuildFromSource false"
  --     or "make",
  --   dependencies = {
  --     -- "stevearc/dressing.nvim",
  --     "nvim-lua/plenary.nvim",
  --     "MunifTanjim/nui.nvim",
  --     {
  --       -- support for image pasting
  --       "HakonHarnes/img-clip.nvim",
  --       event = "VeryLazy",
  --       opts = {
  --         -- recommended settings
  --         default = {
  --           embed_image_as_base64 = false,
  --           prompt_for_file_name = false,
  --           drag_and_drop = {
  --             insert_mode = true,
  --           },
  --           -- required for Windows users
  --           use_absolute_path = true,
  --         },
  --       },
  --     },
  --     {
  --       -- Make sure to set this up properly if you have lazy=true
  --       "MeanderingProgrammer/render-markdown.nvim",
  --       dependencies = {
  --         -- make sure rendering happens even without opening a markdown file first
  --         "yetone/avante.nvim",
  --       },
  --       opts = function(_, opts)
  --         opts.file_types = opts.file_types or { "markdown", "norg", "rmd", "org" }
  --         vim.list_extend(opts.file_types, { "Avante" })
  --       end,
  --     },
  --   },
  -- },
  -- {
  --   "saghen/blink.compat",
  --   lazy = true,
  --   opts = {},
  --   config = function()
  --     -- monkeypatch cmp.ConfirmBehavior for Avante
  --     require("cmp").ConfirmBehavior = {
  --       Insert = "insert",
  --       Replace = "replace",
  --     }
  --   end,
  -- },
  -- {
  --   "saghen/blink.cmp",
  --   lazy = true,
  --   opts = {
  --     sources = {
  --       default = { "avante_commands", "avante_mentions", "avante_files" },
  --       compat = {
  --         "avante_commands",
  --         "avante_mentions",
  --         "avante_files",
  --       },
  --       providers = {
  --         -- LSP is typically ~60
  --         avante_commands = {
  --           name = "avante_commands",
  --           module = "blink.compat.source",
  --           score_offset = 90, -- show at a higher priority than lsp
  --           opts = {},
  --         },
  --         avante_files = {
  --           name = "avante_files",
  --           module = "blink.compat.source",
  --           score_offset = 100, -- ~40 points higher than LSP ()
  --           opts = {},
  --         },
  --         avante_mentions = {
  --           name = "avante_mentions",
  --           module = "blink.compat.source",
  --           score_offset = 1000, -- show at a higher priority than lsp
  --           opts = {},
  --         },
  --       },
  --     },
  --   },
  -- },
  {
    "yetone/avante.nvim",
    event = "VeryLazy",
    dependencies = {
      "stevearc/dressing.nvim",
    },
    opts = function(_, opts)
      -- Default configuration
      opts.hints = { enabled = true }

      -- File selector configuration
      --- @alias FileSelectorProvider "native" | "fzf" | "mini.pick" | "snacks" | "telescope" | string
      opts.file_selector = {
        provider = "fzf",
        provider_opts = {},
      }

      opts.provider = "ollama"
      opts.ollama = {
        model = "qwen2.5-coder:14b",
        endpoint = "192.168.50.252:11434",
        temperature = 0,
        timeout = 30000,
        options = {
          num_ctx = 32768,
        },
        -- max_tokens = 8192,
      }

      opts.auto_suggestions_provider = "ollama"
      opts.behaviour = {
        auto_suggestions = true,
      }

      -- Blink.cmp integration
      -- LSP score_offset is typically 60
      opts.providers = {
        avante_commands = {
          name = "avante_commands",
          module = "blink.compat.source",
          score_offset = 90, -- show at a higher priority than lsp
          opts = {},
        },
        avante_files = {
          name = "avante_files",
          module = "blink.compat.source",
          score_offset = 100, -- show at a higher priority than lsp
          opts = {},
        },
        avante_mentions = {
          name = "avante_mentions",
          module = "blink.compat.source",
          score_offset = 1000, -- show at a higher priority than lsp
          opts = {},
        },
      }

      opts.compat = {
        "avante_commands",
        "avante_mentions",
        "avante_files",
      }
    end,
    build = LazyVim.is_win() and "powershell -ExecutionPolicy Bypass -File Build.ps1 -BuildFromSource false" or "make",
  },
  {
    "MeanderingProgrammer/render-markdown.nvim",
    optional = true,
    ft = function(_, ft)
      vim.list_extend(ft, { "Avante" })
    end,
    opts = function(_, opts)
      opts.file_types = vim.list_extend(opts.file_types or {}, { "Avante" })
    end,
  },
  {
    "folke/which-key.nvim",
    optional = true,
    opts = {
      spec = {
        { "<leader>a", group = "ai" },
      },
    },
  },
}
