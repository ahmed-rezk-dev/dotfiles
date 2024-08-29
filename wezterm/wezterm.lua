-- Pull in the wezterm API
local wezterm = require 'wezterm'

-- This will hold the configuration.
local config = wezterm.config_builder()

-- This is where you actually apply your config choices

-- For example, changing the color scheme:
config.color_scheme = 'Catppuccin Mocha'

config.enable_tab_bar = false
config.font = wezterm.font 'JetBrainsMono Nerd Font'

config.font_size = 14
config.line_height = 1.5
config.use_cap_height_to_scale_fallback_fonts = true


config.window_padding = {
  left = 0,
  right = 0,
  top = 0,
  bottom = 0,
}

config.initial_rows = 50

-- and finally, return the configuration to wezterm
return config
