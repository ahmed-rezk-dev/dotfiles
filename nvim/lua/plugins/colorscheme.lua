local M = {
  mode = "auto", -- "auto" | "time" | "os" | "dark" | "light"
  dark_hours = { start = 19, ["end"] = 7 }, -- Dark mode from 7PM to 7AM
}

return {
  {
    "olimorris/onedarkpro.nvim",
    priority = 1000,
    build = ":OneDarkProExtras",
    opts = {
      colors = {
        vaporwave = {
          codeblock = "require('onedarkpro.helpers').lighten('bg', 2, 'vaporwave')",
          statusline_bg = "require('onedarkpro.helpers').lighten('bg', 4, 'vaporwave')",
          statuscolumn_border = "require('onedarkpro.helpers').lighten('bg', 4, 'vaporwave')",
          ellipsis = "require('onedarkpro.helpers').lighten('bg', 4, 'vaporwave')",
          picker_results = "require('onedarkpro.helpers').darken('bg', 4, 'vaporwave')",
          picker_selection = "require('onedarkpro.helpers').darken('bg', 8, 'vaporwave')",
          copilot = "require('onedarkpro.helpers').darken('gray', 8, 'vaporwave')",
          breadcrumbs = "require('onedarkpro.helpers').darken('gray', 10, 'vaporwave')",
          light_gray = "require('onedarkpro.helpers').darken('gray', 7, 'vaporwave')",
        },
        onedark = {
          codeblock = "require('onedarkpro.helpers').lighten('bg', 2, 'onedark')",
          statusline_bg = "#2e323b",
          statuscolumn_border = "#4b5160",
          ellipsis = "#808080",
          picker_results = "require('onedarkpro.helpers').darken('bg', 4, 'onedark')",
          picker_selection = "require('onedarkpro.helpers').darken('bg', 8, 'onedark')",
          copilot = "require('onedarkpro.helpers').darken('gray', 8, 'onedark')",
          breadcrumbs = "require('onedarkpro.helpers').darken('gray', 10, 'onedark')",
          light_gray = "require('onedarkpro.helpers').darken('gray', 7, 'onedark')",
        },
        light = {
          codeblock = "require('onedarkpro.helpers').darken('bg', 3, 'onelight')",
          comment = "#bebebe",
          statusline_bg = "#f0f0f0",
          statuscolumn_border = "#e7e7e7",
          ellipsis = "#808080",
          git_add = "require('onedarkpro.helpers').get_preloaded_colors('onelight').green",
          git_change = "require('onedarkpro.helpers').get_preloaded_colors('onelight').yellow",
          git_delete = "require('onedarkpro.helpers').get_preloaded_colors('onelight').red",
          picker_results = "require('onedarkpro.helpers').darken('bg', 5, 'onelight')",
          picker_selection = "require('onedarkpro.helpers').darken('bg', 9, 'onelight')",
          copilot = "require('onedarkpro.helpers').lighten('gray', 8, 'onelight')",
          breadcrumbs = "require('onedarkpro.helpers').lighten('gray', 8, 'onelight')",
          light_gray = "require('onedarkpro.helpers').lighten('gray', 10, 'onelight')",
        },
        rainbow = {
          "${green}",
          "${blue}",
          "${purple}",
          "${red}",
          "${orange}",
          "${yellow}",
          "${cyan}",
        },
      },
      highlights = {
        CodeCompanionChatIcon = { fg = "${green}" },
        CodeCompanionChatToolFailure = { fg = "${gray}", italic = true },
        CodeCompanionChatToolSuccess = { fg = "${gray}", bg = "NONE", italic = true },
        CodeCompanionTokens = { fg = "${gray}", italic = true },
        CodeCompanionVirtualText = { fg = "${gray}", italic = true },

        ["@markup.raw.block.markdown"] = { bg = "${codeblock}" },
        ["@markup.quote.markdown"] = { italic = true, extend = true },

        EdgyNormal = { bg = "${bg}" },
        EdgyTitle = { fg = "${purple}", bold = true },

        EyelinerPrimary = { fg = "${green}" },
        EyelinerSecondary = { fg = "${blue}" },

        NormalFloat = { bg = "${bg}" },
        FloatBorder = { fg = "${gray}", bg = "${bg}" },

        CursorLineNr = { bg = "${bg}", fg = "${fg}", italic = true },
        MatchParen = { fg = "${cyan}" },
        ModeMsg = { fg = "${gray}" },
        Search = { bg = "${selection}", fg = "${yellow}", underline = true },
        VimLogo = { fg = { dark = "#81b766", light = "#029632" } },

        SnacksDashboardDesc = { fg = "${blue}", bold = true },
        SnacksDashboardKey = { fg = "${orange}", bold = true, italic = true },
        SnacksDashboardIcon = { fg = "${blue}" },

        CopilotSuggestion = { fg = "${copilot}", italic = true },

        DebugBreakpoint = { fg = "${red}", italic = true },
        DebugHighlightLine = { fg = "${purple}", italic = true },
        NvimDapVirtualText = { fg = "${cyan}", italic = true },

        DapUIBreakpointsCurrentLine = { fg = "${yellow}", bold = true },

        Heirline = { bg = "${statusline_bg}" },
        HeirlineStatusColumn = { fg = "${statuscolumn_border}" },
        HeirlineBufferline = { fg = { dark = "#939aa3", light = "#6a6a6a" } },
        HeirlineWinbar = { fg = "${breadcrumbs}", italic = true },
        HeirlineWinbarEmphasis = { fg = "${fg}", italic = true },

        LuaSnipChoiceNode = { fg = "${yellow}" },
        LuaSnipInsertNode = { fg = "${yellow}" },

        NeotestAdapterName = { fg = "${purple}", bold = true },
        NeotestFocused = { bold = true },
        NeotestNamespace = { fg = "${blue}", bold = true },

        UfoFoldedEllipsis = { fg = "${yellow}" },

        SnacksPicker = { bg = "${picker_results}" },
        SnacksPickerDir = { fg = "${gray}", italic = true },
        SnacksPickerBorder = { fg = "${picker_results}", bg = "${picker_results}" },
        SnacksPickerListCursorLine = { bg = "${picker_selection}" },
        SnacksPickerPrompt = { bg = "${picker_results}", fg = "${purple}", bold = true },
        SnacksPickerSelected = { bg = "${picker_results}", fg = "${orange}" },
        SnacksPickerTitle = { bg = "${purple}", fg = "${picker_results}", bold = true },
        SnacksPickerToggle = { bg = "${purple}", fg = "${picker_results}", italic = true },
        SnacksPickerTotals = { bg = "${picker_results}", fg = "${purple}", bold = true },
        SnacksPickerUnselected = { bg = "${picker_results}" },

        SnacksPickerPreview = { bg = "${bg}" },
        SnacksPickerPreviewBorder = { fg = "${bg}", bg = "${bg}" },
        SnacksPickerPreviewTitle = { bg = "${green}", fg = "${bg}", bold = true },

        VirtColumn = { fg = "${indentline}" },
      },

      caching = false,
      cache_path = vim.fn.expand(vim.fn.stdpath("cache") .. "/onedarkpro_dotfiles"),

      plugins = {
        barbar = false,
        lsp_saga = false,
        marks = false,
        polygot = false,
        startify = false,
        telescope = false,
        trouble = false,
        vim_ultest = false,
        which_key = false,
      },
      styles = {
        tags = "italic",
        methods = "bold",
        functions = "bold",
        keywords = "italic",
        comments = "italic",
        parameters = "italic",
        conditionals = "italic",
        virtual_text = "italic",
      },
      options = {
        cursorline = true,
      },
    },
    config = function(_, opts)
      -- ============================================
      -- THEME SWITCHING LOGIC
      -- ============================================

      -- Check macOS appearance preference
      local function is_os_dark()
        local handle = io.popen("defaults read -g AppleInterfaceStyle 2>/dev/null")
        if handle then
          local result = handle:read("*a")
          handle:close()
          return result:match("Dark") ~= nil
        end
        return true
      end

      -- Check if current hour is in dark hours
      local function is_time_dark()
        local hour = tonumber(os.date("%H"))
        local start = M.dark_hours.start
        local end_hour = M.dark_hours["end"]

        if start > end_hour then
          return hour >= start or hour < end_hour
        else
          return hour >= start and hour < end_hour
        end
      end

      -- Get current theme
      local function get_current_theme()
        return vim.g.colors_name or ""
      end

      -- Set theme
      local function set_theme(dark)
        if dark then
          vim.cmd("colorscheme vaporwave")
        else
          vim.cmd("colorscheme onelight")
        end
      end

      -- Get target theme based on mode
      local function get_target_dark()
        local mode = M.mode
        if mode == "dark" then
          return true
        elseif mode == "light" then
          return false
        elseif mode == "os" then
          return is_os_dark()
        elseif mode == "time" then
          return is_time_dark()
        else
          return is_os_dark()
        end
      end

      -- Export theme state to file for shell integration
      local function export_theme_state()
        local theme_state = get_current_theme() == "vaporwave" and "dark" or "light"
        local state_file = vim.fn.stdpath("data") .. "/theme_state"
        local f = io.open(state_file, "w")
        if f then
          f:write("export NVIM_THEME=" .. theme_state .. "\n")
          f:close()
        end
        
        -- Also update OpenCode theme
        vim.defer_fn(function()
          vim.fn.system("~/dotfiles/scripts/opencode-theme-switcher.sh " .. theme_state .. " &")
        end, 100)
      end

      -- Set initial theme
      set_theme(get_target_dark())
      export_theme_state()

      -- Manual toggle command
      vim.api.nvim_create_user_command("ToggleTheme", function()
        local current = get_current_theme()
        if current == "vaporwave" then
          vim.cmd("colorscheme onelight")
          vim.notify("Switched to light mode 🌙", vim.log.levels.INFO, { title = "Theme" })
        else
          vim.cmd("colorscheme vaporwave")
          vim.notify("Switched to dark mode ☀️", vim.log.levels.INFO, { title = "Theme" })
        end
        export_theme_state()
      end, {})

      -- Set theme mode command
      vim.api.nvim_create_user_command("ThemeMode", function(cmd_opts)
        local new_mode = cmd_opts.args
        if vim.tbl_contains({ "auto", "time", "os", "dark", "light" }, new_mode) then
          M.mode = new_mode
          set_theme(get_target_dark())
          local mode_names = {
            os = "OS-based",
            time = "Time-based",
            dark = "Dark",
            light = "Light",
            auto = "Auto",
          }
          vim.notify("Theme mode set to: " .. mode_names[new_mode], vim.log.levels.INFO, { title = "Theme" })
        else
          vim.notify("Invalid mode. Use: auto, os, time, dark, light", vim.log.levels.WARN, { title = "Theme" })
        end
      end, { nargs = 1 })

      -- Get current mode
      vim.api.nvim_create_user_command("ThemeStatus", function()
        local mode = M.mode
        local is_dark = get_current_theme() == "vaporwave"
        local mode_names = {
          os = "OS-based",
          time = "Time-based",
          dark = "Dark",
          light = "Light",
          auto = "Auto",
        }
        local status = is_dark and "Dark" or "Light"
        vim.notify("Mode: " .. mode_names[mode] .. " | Current: " .. status, vim.log.levels.INFO, { title = "Theme" })
      end, {})

      -- Keyboard shortcuts
      vim.keymap.set("n", "<leader>tt", ":ToggleTheme<CR>", { silent = true, desc = "Toggle colorscheme" })
      vim.keymap.set("n", "<leader>td", ":colorscheme vaporwave<CR>", { silent = true, desc = "Set dark theme" })
      vim.keymap.set("n", "<leader>tl", ":colorscheme onelight<CR>", { silent = true, desc = "Set light theme" })
      vim.keymap.set("n", "<leader>to", ":ThemeMode os<CR>", { silent = true, desc = "OS-based theme" })
      vim.keymap.set("n", "<leader>ti", ":ThemeMode time<CR>", { silent = true, desc = "Time-based theme" })
      vim.keymap.set("n", "<leader>ts", ":ThemeStatus<CR>", { silent = true, desc = "Show theme status" })

      -- Auto-switch based on current mode (checks every 30 seconds)
      local timer = vim.loop.new_timer()
      timer:start(0, 30000, vim.schedule_wrap(function()
        local current_scheme = get_current_theme()
        local should_be_dark = get_target_dark()
        local is_currently_dark = current_scheme == "vaporwave"

        if should_be_dark ~= is_currently_dark then
          set_theme(should_be_dark)
        end

        -- Export theme state to file for shell integration
        local theme_state = should_be_dark and "dark" or "light"
        local state_file = vim.fn.stdpath("data") .. "/theme_state"
        local f = io.open(state_file, "w")
        if f then
          f:write("NVIM_THEME=" .. theme_state .. "\n")
          f:close()
        end
      end))
    end,
  },
}
