hs.hotkey.alertDuration = 0
hs.hints.showTitleThresh = 0
hs.window.animationDuration = 0
hs.logger.defaultLogLevel = "info"

local window = require "hs.window"

hyper = { "cmd", "alt", "shift", "ctrl" }
-- meh = { "alt", "shift", "ctrl" }

hs.loadSpoon "SpoonInstall"

Install = spoon.SpoonInstall

Install:andUse("Reload", {
	hotkeys = { reload = { { "cmd", "shift", "ctrl" }, "R" } },
})
--[[ Install:andUse("Tunnelblick", {
	config = {
		username = "tyler.thrailkill",
		password_fn = function()
			return spoon.Keychain:login_keychain "token_tunnel_pass" .. spoon.Token:get_token()
		end,
		connection_name = "promontech-openvpn",
	},
}) ]]

-- hs.loadSpoon "Ki"
-- spoon.Ki.workflowEvents = { ... } -- configure `spoon.Ki` here

--[[ wm = require "wm"
layout = require "wm.layout"
local utils = require "wm.utils" ]]

--[[ local direction = utils.direction
local orientation = utils.orientation ]]

--[[ function l()
	return wm.controller.screenLayout
end
function w()
	return wm.controller.screenLayout:selectedWorkspace()
end ]]

hs.window.animationDuration = 0

--[[ units = {
	left = { x = 0.00, y = 0.00, w = 0.50, h = 1.00 },
	right = { x = 0.50, y = 0.00, w = 0.50, h = 1.00 },
	up = { x = 0.00, y = 0.00, w = 1.00, h = 0.50 },
	down = { x = 0.00, y = 0.50, w = 1.00, h = 0.50 },

	topleft = { x = 0.00, y = 0.00, w = 0.50, h = 0.50 },
	topright = { x = 0.50, y = 0.00, w = 0.50, h = 0.50 },
	bottomleft = { x = 0.00, y = 0.50, w = 0.50, h = 0.50 },
	bottomright = { x = 0.50, y = 0.50, w = 0.50, h = 0.50 },

	left13 = { x = 0.00, y = 0.00, w = 0.33, h = 1.00 },
	left23 = { x = 0.00, y = 0.00, w = 0.67, h = 1.00 },
	center13 = { x = 0.33, y = 0.00, w = 0.33, h = 1.00 },
	right23 = { x = 0.33, y = 0.00, w = 0.67, h = 1.00 },
	right13 = { x = 0.67, y = 0.00, w = 0.33, h = 1.00 },

	center = { x = 0.20, y = 0.10, w = 0.60, h = 0.80 },
	maximum = { x = 0.00, y = 0.00, w = 1.00, h = 1.00 },
}

mash = { "ctrl", "alt" }
hs.hotkey.bind(mash, "left", function()
	hs.window.focusedWindow():move(units.left, nil, true)
end)
hs.hotkey.bind(mash, "right", function()
	hs.window.focusedWindow():move(units.right, nil, true)
end)
hs.hotkey.bind(mash, "up", function()
	hs.window.focusedWindow():move(units.up, nil, true)
end)
hs.hotkey.bind(mash, "down", function()
	hs.window.focusedWindow():move(units.down, nil, true)
end)

hs.hotkey.bind(mash, "u", function()
	hs.window.focusedWindow():move(units.topleft, nil, true)
end)
hs.hotkey.bind(mash, "i", function()
	hs.window.focusedWindow():move(units.topright, nil, true)
end)
hs.hotkey.bind(mash, "j", function()
	hs.window.focusedWindow():move(units.bottomleft, nil, true)
end)
hs.hotkey.bind(mash, "k", function()
	hs.window.focusedWindow():move(units.bottomright, nil, true)
end)

hs.hotkey.bind(mash, "d", function()
	hs.window.focusedWindow():move(units.left13, nil, true)
end)
hs.hotkey.bind(mash, "e", function()
	hs.window.focusedWindow():move(units.left23, nil, true)
end)
hs.hotkey.bind(mash, "f", function()
	hs.window.focusedWindow():move(units.center13, nil, true)
end)
hs.hotkey.bind(mash, "g", function()
	hs.window.focusedWindow():move(units.right23, nil, true)
end)
hs.hotkey.bind(mash, "t", function()
	hs.window.focusedWindow():move(units.right13, nil, true)
end)

hs.hotkey.bind(mash, "c", function()
	hs.window.focusedWindow():move(units.center, nil, true)
end)
hs.hotkey.bind(mash, "return", function()
	hs.window.focusedWindow():move(units.maximum, nil, true)
end) ]]

bindings = require "bindings"
wm = require "utils.wm"

-- bindings
bindings.enabled = { "focus", "global", "tiling" }

-- start/stop modules
local modules = { bindings, wm }

hs.fnutils.each(modules, function(module)
	if module then
		module.start()
	end
end)

-- stop modules on shutdown
hs.shutdownCallback = function()
	hs.fnutils.each(modules, function(module)
		if module then
			module.stop()
		end
	end)
end

--[[ local hhtwm = require "hhtwm"
hhtwm.start() ]]

--[[ hs.hotkey.bind({ "alt" }, "h", function()
	w():focus(direction.left)
end)
hs.hotkey.bind({ "alt" }, "j", function()
	w():focus(direction.down)
end) ]]

--[[
hs.hotkey.bind({ "alt" }, "k", function()
	w():focus(direction.up)
end)
hs.hotkey.bind({ "alt" }, "l", function()
	w():focus(direction.right)
end)

hs.hotkey.bind({ "alt" }, "a", function()
	w():selectParent()
end)
hs.hotkey.bind({ "alt" }, "d", function()
	w():selectChild()
end)
hs.hotkey.bind({ "alt", "shift" }, "f", function()
	w():showFocus()
end)
hs.hotkey.bind({ "alt", "shift" }, "q", function()
	w():closeSelected()
end)

hs.hotkey.bind({ "alt", "shift" }, "h", function()
	w():move(direction.left)
end)
hs.hotkey.bind({ "alt", "shift" }, "j", function()
	w():move(direction.down)
end)
hs.hotkey.bind({ "alt", "shift" }, "k", function()
	w():move(direction.up)
end)
hs.hotkey.bind({ "alt", "shift" }, "l", function()
	w():move(direction.right)
end)

hs.hotkey.bind({ "alt" }, "y", function()
	w():resize(direction.left, 0.1)
end)
hs.hotkey.bind({ "alt" }, "u", function()
	w():resize(direction.down, 0.1)
end)
hs.hotkey.bind({ "alt" }, "i", function()
	w():resize(direction.up, 0.1)
end)
hs.hotkey.bind({ "alt" }, "o", function()
	w():resize(direction.right, 0.1)
end)
hs.hotkey.bind({ "alt", "shift" }, "y", function()
	w():resize(direction.left, -0.1)
end)
hs.hotkey.bind({ "alt", "shift" }, "u", function()
	w():resize(direction.down, -0.1)
end)
hs.hotkey.bind({ "alt", "shift" }, "i", function()
	w():resize(direction.up, -0.1)
end)
hs.hotkey.bind({ "alt", "shift" }, "o", function()
	w():resize(direction.right, -0.1)
end)

hs.hotkey.bind({ "alt" }, "s", function()
	w():setMode(layout.mode.stacked)
end)
hs.hotkey.bind({ "alt" }, "t", function()
	w():setMode(layout.mode.tabbed)
end)
hs.hotkey.bind({ "alt" }, "e", function()
	w():setMode(layout.mode.default)
end)

hs.hotkey.bind({ "alt" }, "x", function()
	l():addWindow(hs.window.focusedWindow())
end)
hs.hotkey.bind({ "alt", "cmd" }, "x", function()
	l():removeWindow(hs.window.focusedWindow())
end)
hs.hotkey.bind({ "alt", "shift" }, "space", function()
	w():toggleFloating()
end)
hs.hotkey.bind({ "alt" }, "space", function()
	w():toggleFocusMode()
end)

hs.hotkey.bind({ "alt" }, "f", function()
	w():toggleFullscreen()
end)

hs.hotkey.bind({ "alt" }, "z", function()
	wm.tracker:stop()
end)
hs.hotkey.bind({ "alt", "shift" }, "z", function()
	wm.tracker:start()
end)

hs.hotkey.bind({ "alt" }, "-", function()
	w():splitCurrent(orientation.vertical)
end)
hs.hotkey.bind({ "alt" }, "\\", function()
	w():splitCurrent(orientation.horizontal)
end)

hs.hotkey.bind({ "shift", "alt" }, "s", function()
	hs.spotify.displayCurrentTrack()
end) ]]

--[[ hs.notify.new({
	title = "Succuss",
	informativeText = "Loaded",
	autoWithdraw = false,
	withdrawAfter = 0,
}):send() ]]
