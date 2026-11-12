-- vim: tabstop=2 shiftwidth=2 expandtab

local wezterm = require("wezterm")
local config = wezterm.config_builder()
local appearance = require("appearance")
local projects = require("projects")

config.set_environment_variables = {
	PATH = "/opt/homebrew/bin:" .. os.getenv("PATH"),
}
------------------------------------------------------------------------------
-- Theme: Tokyo Night
--
-- Description:
-- The Tokyo Night theme is a color scheme inspired by the aesthetic of neon
-- lights in Tokyo. It provides high contrast and visually appealing colors
-- for coding environments.
------------------------------------------------------------------------------
if appearance.is_dark() then
	config.color_scheme = "Catppuccin Mocha"
else
	config.color_scheme = "Catppuccin Latte"
end

-- Make colors bright and vibrant like Alacritty
config.bold_brightens_ansi_colors = "BrightAndBold"

config.font = wezterm.font("GeistMono Nerd Font")
config.font_size = 13.5

config.line_height = 1.5

-- Slightly transparent and blurred background
config.window_background_opacity = 0.95
config.macos_window_background_blur = 20
-- Removes the title bar, leaving only the tab bar. Keeps
-- the ability to resize by dragging the window's edges.
-- On macOS, 'RESIZE|INTEGRATED_BUTTONS' also looks nice if
-- you want to keep the window controls visible and integrate
-- them into the tab bar.
config.window_decorations = "RESIZE"
-- Sets the font for the window frame (tab bar)
config.window_frame = {
	-- Berkeley Mono for me again, though an idea could be to try a
	-- serif font here instead of monospace for a nicer look?
	-- font = wezterm.font({ family = "JetBrainsMono Nerd Font", weight = "Bold" }),
	font_size = 11,
}

-- Configure window padding settings
-- The values represent the number of spaces added around the content within a window.
config.window_padding = {
	left = 5, -- Padding on the left side of the window
	right = 5, -- Padding on the right side of the window
	top = 0, -- Padding at the top of the window
	bottom = 0, -- Padding at the bottom of the window
}

config.enable_tab_bar = false


local function move_pane(key, direction)
	return {
		key = key,
		mods = "LEADER",
		action = wezterm.action.ActivatePaneDirection(direction),
	}
end

local function resize_pane(key, direction)
	return {
		key = key,
		action = wezterm.action.AdjustPaneSize({ direction, 3 }),
	}
end

-- If you're using emacs you probably wanna choose a different leader here,
-- since we're gonna be making it a bit harder to CTRL + A for jumping to
-- the start of a line
config.leader = { key = "a", mods = "CTRL", timeout_milliseconds = 1000 }

-- Table mapping keypresses to actions
config.keys = {
	-- Sends ESC + b and ESC + f sequence, which is used
	-- for telling your shell to jump back/forward.
	{
		-- When the left arrow is pressed
		key = "LeftArrow",
		-- With the "Option" key modifier held down
		mods = "OPT",
		-- Perform this action, in this case - sending ESC + B
		-- to the terminal
		action = wezterm.action.SendString("\x1bb"),
	},
	{
		key = "RightArrow",
		mods = "OPT",
		action = wezterm.action.SendString("\x1bf"),
	},

	{
		key = ",",
		mods = "SUPER",
		action = wezterm.action.SpawnCommandInNewTab({
			cwd = wezterm.home_dir,
			args = { "nvim", wezterm.config_file },
		}),
	},
	{
		key = "R",
		mods = "SUPER",
		action = wezterm.action.ReloadConfiguration,
	},

	{
		-- I'm used to tmux bindings, so am using the quotes (") key to
		-- split horizontally, and the percent (%) key to split vertically.
		key = '"',
		-- Note that instead of a key modifier mapped to a key on your keyboard
		-- like CTRL or ALT, we can use the LEADER modifier instead.
		-- This means that this binding will be invoked when you press the leader
		-- (CTRL + A), quickly followed by quotes (").
		mods = "LEADER",
		action = wezterm.action.SplitHorizontal({ domain = "CurrentPaneDomain" }),
	},
	{
		key = "%",
		mods = "LEADER",
		action = wezterm.action.SplitVertical({ domain = "CurrentPaneDomain" }),
	},

	{
		key = "a",
		-- When we're in leader mode _and_ CTRL + A is pressed...
		mods = "LEADER|CTRL",
		-- Actually send CTRL + A key to the terminal
		action = wezterm.action.SendKey({ key = "a", mods = "CTRL" }),
	},

	move_pane("j", "Down"),
	move_pane("k", "Up"),
	move_pane("h", "Left"),
	move_pane("l", "Right"),

	{
		-- When we push LEADER + R...
		key = "r",
		mods = "LEADER",
		-- Activate the `resize_panes` keytable
		action = wezterm.action.ActivateKeyTable({
			name = "resize_panes",
			-- Ensures the keytable stays active after it handles its
			-- first keypress.
			one_shot = false,
			-- Deactivate the keytable after a timeout.
			timeout_milliseconds = 1000,
		}),
	},

	{
		key = "p",
		mods = "LEADER",
		-- Present in to our project picker
		action = projects.choose_project(),
	},
	{
		key = "f",
		mods = "LEADER",
		-- Present a list of existing workspaces
		action = wezterm.action.ShowLauncherArgs({ flags = "FUZZY|WORKSPACES" }),
	},
}

config.key_tables = {
	resize_panes = {
		resize_pane("j", "Down"),
		resize_pane("k", "Up"),
		resize_pane("h", "Left"),
		resize_pane("l", "Right"),
	},
}

-- Graphics config
config.front_end = "WebGpu"
config.cursor_blink_ease_in = "Constant"
config.cursor_blink_ease_out = "Constant"

-- Controls how WezTerm handles notification escape sequences
-- Options: 'AlwaysShow', 'NeverShow', 'SuppressFromFocusedPane', 'SuppressFromFocusedTab', 'SuppressFromFocusedWindow'
config.notification_handling = "AlwaysShow"
config.audible_bell = "SystemBeep"

return config
