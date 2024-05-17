------------------------------------------------
--                                            --
--    This is a main configuration file for    --
--                    EcoVim                  --
--      Change variables which you need to    --
--                                            --
------------------------------------------------

local icons = require("utils.icons")

EcoVim = {
	-- colorscheme = "onedark_vivid",
	colorscheme = "onedark_vivid",
	-- colorscheme = "gruvbox",
	-- colorscheme = "catppuccin",
	-- colorscheme = "github_light",
	ui = {
		float = {
			border = "rounded",
		},
	},
	plugins = {
		ai = {
			chatgpt = {
				enabled = true,
			},
			codeium = {
				enabled = true,
			},
			copilot = {
				enabled = true,
			},
			tabnine = {
				enabled = true,
			},
		},
		completion = {
			select_first_on_enter = false,
		},
		-- Completely replaces the UI for messages, cmdline and the popupmenu
		experimental_noice = {
			enabled = true,
		},
		-- Enables moving by subwords and skips significant punctuation with w, e, b motions
		jump_by_subwords = {
			enabled = true,
		},
		rooter = {
			-- Removing package.json from list in Monorepo Frontend Project can be helpful
			-- By that your live_grep will work related to whole project, not specific package
			patterns = { ".git", "package.json", "_darcs", ".bzr", ".svn", "Makefile" }, -- Default
		},
		-- <leader>z
		zen = {
			kitty_enabled = true,
			enabled = true, -- sync after change
		},
	},
	-- Please keep it
	icons = icons,
	-- Statusline configuration
	statusline = {
		path_enabled = false,
		path = "relative", -- absolute/relative
	},
	lsp = {
		virtual_text = false, -- show virtual text (errors, warnings, info) inline messages
	},
}
