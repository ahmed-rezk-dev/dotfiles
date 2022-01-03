-- global stuff
require("console").init()
require("overrides").init()

--[[ hs.hotkey.alertDuration = 0
hs.hints.showTitleThresh = 0 ]]
-- hs.window.animationDuration = 0
-- hs.logger.defaultLogLevel = "info"

hs.loadSpoon "SpoonInstall"

Install = spoon.SpoonInstall

Install:andUse("Reload", {
	hotkeys = { reload = { { "cmd", "shift", "ctrl" }, "R" } },
})

-- ensure IPC is there
hs.ipc.cliInstall()

-- lower logging level for hotkeys
-- require("hs.hotkey").setLogLevel "warning"

-- global config
Config = {
	apps = {
		terms = { "kitty" },
		browsers = { "Google Chrome", "Safari" },
	},

	wm = {
		defaultDisplayLayouts = {
			["Color LCD"] = "monocle",
			["DELL U3818DW"] = "main-center",
		},

		displayLayouts = {
			["Color LCD"] = { "monocle", "main-right", "side-by-side" },
			["DELL U3818DW"] = { "main-center", "main-right", "side-by-side" },
		},
	},

	window = {
		highlightBorder = true,
		highlightMouse = true,
		historyLimit = 0,
	},

	--[[ network = {
		home = "Skynet 5G",
	}, ]]

	homebridge = {
		studioSpeakers = { aid = 10, iid = 11, name = "Studio Speakers" },
		studioLights = { aid = 9, iid = 11, name = "Studio Lights" },
		tvLights = { aid = 6, iid = 11, name = "TV Lights" },
	},
}

-- requires
bindings = require "bindings"
controlplane = require "utils.controlplane"
-- watchables = require "utils.watchables"
watchers = require "utils.watchers"
wm = require "utils.wm"

-- no animations
hs.window.animationDuration = 0.0

-- hints
hs.hints.fontName = "Helvetica-Bold"
hs.hints.fontSize = 22
hs.hints.hintChars = { "A", "S", "D", "F", "J", "K", "L", "Q", "W", "E", "R", "Z", "X", "C" }
hs.hints.iconAlpha = 1.0
hs.hints.showTitleThresh = 0

-- controlplane
controlplane.enabled = { "autohome", "automount" }

-- watchers
watchers.enabled = { "urlevent" }
watchers.urlPreference = Config.apps.browsers

-- bindings
bindings.enabled = {
	"ask-before-quit",
	"block-hide",
	"ctrl-esc",
	"f-keys",
	"focus",
	"global",
	"tiling",
	"term-ctrl-i",
	"viscosity",
	"gird",
}
bindings.askBeforeQuitApps = Config.apps.browsers

-- start/stop modules
local modules = { bindings, controlplane, watchers }

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

--[[ hs.notify.new({
	title = "Succuss",
	informativeText = "Loaded",
	autoWithdraw = false,
	withdrawAfter = 0,
}):send() ]]

units = {
	left = { x = 0.00, y = 0.00, w = 0.50, h = 1.00 },
	right = { x = 0.50, y = 0.00, w = 0.50, h = 1.00 },
	up = { x = 0.00, y = 0.00, w = 1.00, h = 0.50 },
	down = { x = 0.00, y = 0.50, w = 1.00, h = 0.50 },

	topleft = { x = 0.00, y = 0.00, w = 0.50, h = 0.50 },
	topright = { x = 0.50, y = 0.00, w = 0.50, h = 0.50 },
	bottomleft = { x = 0.00, y = 0.50, w = 0.50, h = 0.50 },
	bottomright = { x = 0.50, y = 0.50, w = 0.50, h = 0.50 },

	left33 = { x = 0.00, y = 0.00, w = 0.33, h = 1.00 },
	left67 = { x = 0.00, y = 0.00, w = 0.67, h = 1.00 },
	left50 = { x = 0.00, y = 0.00, w = 0.50, h = 1.00 },
	center13 = { x = 0.33, y = 0.00, w = 0.33, h = 1.00 },
	right33 = { x = 0.67, y = 0.00, w = 0.33, h = 1.00 },
	right50 = { x = 0.50, y = 0.00, w = 0.50, h = 1.00 },
	right67 = { x = 0.33, y = 0.00, w = 0.67, h = 1.00 },

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

hs.hotkey.bind(mash, "1", function()
	hs.window.focusedWindow():move(units.left33, nil, true)
end)
hs.hotkey.bind(mash, "3", function()
	hs.window.focusedWindow():move(units.left50, nil, true)
end)
hs.hotkey.bind(mash, "2", function()
	hs.window.focusedWindow():move(units.left67, nil, true)
end)

hs.hotkey.bind(mash, "f", function()
	hs.window.focusedWindow():move(units.center13, nil, true)
end)
hs.hotkey.bind(mash, "8", function()
	hs.window.focusedWindow():move(units.right67, nil, true)
end)
hs.hotkey.bind(mash, "7", function()
	hs.window.focusedWindow():move(units.right50, nil, true)
end)
hs.hotkey.bind(mash, "6", function()
	hs.window.focusedWindow():move(units.right33, nil, true)
end)

hs.hotkey.bind(mash, "c", function()
	hs.window.focusedWindow():move(units.center, nil, true)
end)
hs.hotkey.bind(mash, "return", function()
	hs.window.focusedWindow():move(units.maximum, nil, true)
end)
