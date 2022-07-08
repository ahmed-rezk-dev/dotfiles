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
	keymap = {
		hyper = { "cmd", "alt", "shift", "ctrl" },
		mash = { "alt", "shift", "ctrl" },
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

hs.hotkey.bind(Config.keymap.mash, "left", function()
	hs.window.focusedWindow():move(units.left, nil, true)
end)
hs.hotkey.bind(Config.keymap.mash, "right", function()
	hs.window.focusedWindow():move(units.right, nil, true)
end)
hs.hotkey.bind(Config.keymap.mash, "up", function()
	hs.window.focusedWindow():move(units.up, nil, true)
end)
hs.hotkey.bind(Config.keymap.mash, "down", function()
	hs.window.focusedWindow():move(units.down, nil, true)
end)

hs.hotkey.bind(Config.keymap.mash, "u", function()
	hs.window.focusedWindow():move(units.topleft, nil, true)
end)
hs.hotkey.bind(Config.keymap.mash, "i", function()
	hs.window.focusedWindow():move(units.topright, nil, true)
end)
hs.hotkey.bind(Config.keymap.mash, "j", function()
	hs.window.focusedWindow():move(units.bottomleft, nil, true)
end)
hs.hotkey.bind(Config.keymap.mash, "k", function()
	hs.window.focusedWindow():move(units.bottomright, nil, true)
end)

hs.hotkey.bind(Config.keymap.mash, "1", function()
	hs.window.focusedWindow():move(units.left33, nil, true)
end)
hs.hotkey.bind(Config.keymap.mash, "3", function()
	hs.window.focusedWindow():move(units.left50, nil, true)
end)
hs.hotkey.bind(Config.keymap.mash, "2", function()
	hs.window.focusedWindow():move(units.left67, nil, true)
end)

hs.hotkey.bind(Config.keymap.mash, "f", function()
	hs.window.focusedWindow():move(units.center13, nil, true)
end)
hs.hotkey.bind(Config.keymap.mash, "8", function()
	hs.window.focusedWindow():move(units.right67, nil, true)
end)
hs.hotkey.bind(Config.keymap.mash, "7", function()
	hs.window.focusedWindow():move(units.right50, nil, true)
end)
hs.hotkey.bind(Config.keymap.mash, "6", function()
	hs.window.focusedWindow():move(units.right33, nil, true)
end)

hs.hotkey.bind(Config.keymap.mash, "c", function()
	hs.window.focusedWindow():move(units.center, nil, true)
end)
hs.hotkey.bind(Config.keymap.mash, "return", function()
	hs.window.focusedWindow():move(units.maximum, nil, true)
end)

--[[ local VimMode = hs.loadSpoon "VimMode"
local vim = VimMode:new() ]]

--[[ vim:enterWithSequence "jk"
vim:bindHotKeys { enter = { { "ctrl" }, ";" } } ]]

local function openChromeWithDeb()
	hs.execute("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome --remote-debugging-port=9222", true)

	-- /Applications/Google Chrome.app/Contents/MacOS/Google Chrome --remote-debugging-port=9222
end

hs.hotkey.bind(hyper, "d", function()
	openChromeWithDeb()
end)

local cheatsheet = require "utils.cheatsheet"

hs.hotkey.bind(hyper, "h", function()
	local commonDirectoryShortcuts = {
		{
			nil,
			"t",
			function() end,
			{ "Help", "Open File in Folder with App" },
		},
	}

	cheatsheet:init("Help", "VIM / Hammerspoon Shortcuts", commonDirectoryShortcuts)

	cheatsheet:show()
end)

------------------------------------------------------------------------------------------
-- AUTOSCROLL WITH MOUSE WHEEL BUTTON
-- timginter @ GitHub
------------------------------------------------------------------------------------------

-- id of mouse wheel button
local mouseScrollButtonId = 2

-- scroll speed and direction confi
local scrollSpeedMultiplier = 0.1
local scrollSpeedSquareAcceleration = true
local reverseVerticalScrollDirection = false
local mouseScrollTimerDelay = 0.01

-- circle config
local mouseScrollCircleRad = 10
local mouseScrollCircleDeadZone = 5

------------------------------------------------------------------------------------------

local mouseScrollCircle = nil
local mouseScrollTimer = nil
local mouseScrollStartPos = 0
local mouseScrollDragPosX = nil
local mouseScrollDragPosY = nil

overrideScrollMouseDown = hs.eventtap.new({ hs.eventtap.event.types.otherMouseDown }, function(e)
	-- uncomment line below to see the ID of pressed button
	--print(e:getProperty(hs.eventtap.event.properties['mouseEventButtonNumber']))

	if e:getProperty(hs.eventtap.event.properties["mouseEventButtonNumber"]) == mouseScrollButtonId then
		-- remove circle if exists
		if mouseScrollCircle then
			mouseScrollCircle:delete()
			mouseScrollCircle = nil
		end

		-- stop timer if running
		if mouseScrollTimer then
			mouseScrollTimer:stop()
			mouseScrollTimer = nil
		end

		-- save mouse coordinates
		mouseScrollStartPos = hs.mouse.getAbsolutePosition()
		mouseScrollDragPosX = mouseScrollStartPos.x
		mouseScrollDragPosY = mouseScrollStartPos.y

		-- start scroll timer
		mouseScrollTimer = hs.timer.doAfter(mouseScrollTimerDelay, mouseScrollTimerFunction)

		-- don't send scroll button down event
		return true
	end
end)

overrideScrollMouseUp = hs.eventtap.new({ hs.eventtap.event.types.otherMouseUp }, function(e)
	if e:getProperty(hs.eventtap.event.properties["mouseEventButtonNumber"]) == mouseScrollButtonId then
		-- send original button up event if released within 'mouseScrollCircleDeadZone' pixels of original position and scroll circle doesn't exist
		mouseScrollPos = hs.mouse.getAbsolutePosition()
		xDiff = math.abs(mouseScrollPos.x - mouseScrollStartPos.x)
		yDiff = math.abs(mouseScrollPos.y - mouseScrollStartPos.y)
		if (xDiff < mouseScrollCircleDeadZone and yDiff < mouseScrollCircleDeadZone) and not mouseScrollCircle then
			-- disable scroll mouse override
			overrideScrollMouseDown:stop()
			overrideScrollMouseUp:stop()

			-- send scroll mouse click
			hs.eventtap.otherClick(e:location(), mouseScrollButtonId)

			-- re-enable scroll mouse override
			overrideScrollMouseDown:start()
			overrideScrollMouseUp:start()
		end

		-- remove circle if exists
		if mouseScrollCircle then
			mouseScrollCircle:delete()
			mouseScrollCircle = nil
		end

		-- stop timer if running
		if mouseScrollTimer then
			mouseScrollTimer:stop()
			mouseScrollTimer = nil
		end

		-- don't send scroll button up event
		return true
	end
end)

overrideScrollMouseDrag = hs.eventtap.new({ hs.eventtap.event.types.otherMouseDragged }, function(e)
	-- sanity check
	if mouseScrollDragPosX == nil or mouseScrollDragPosY == nil then
		return true
	end

	-- update mouse coordinates
	mouseScrollDragPosX = mouseScrollDragPosX + e:getProperty(hs.eventtap.event.properties["mouseEventDeltaX"])
	mouseScrollDragPosY = mouseScrollDragPosY + e:getProperty(hs.eventtap.event.properties["mouseEventDeltaY"])

	-- don't send scroll button drag event
	return true
end)

function mouseScrollTimerFunction()
	-- sanity check
	if mouseScrollDragPosX ~= nil and mouseScrollDragPosY ~= nil then
		-- get cursor position difference from original click
		xDiff = math.abs(mouseScrollDragPosX - mouseScrollStartPos.x)
		yDiff = math.abs(mouseScrollDragPosY - mouseScrollStartPos.y)

		-- draw circle if not yet drawn and cursor moved more than 'mouseScrollCircleDeadZone' pixels
		if mouseScrollCircle == nil and (xDiff > mouseScrollCircleDeadZone or yDiff > mouseScrollCircleDeadZone) then
			mouseScrollCircle = hs.drawing.circle(
				hs.geometry.rect(
					mouseScrollStartPos.x - mouseScrollCircleRad,
					mouseScrollStartPos.y - mouseScrollCircleRad,
					mouseScrollCircleRad * 2,
					mouseScrollCircleRad * 2
				)
			)
			mouseScrollCircle:setStrokeColor { ["red"] = 0.3, ["green"] = 0.3, ["blue"] = 0.3, ["alpha"] = 1 }
			mouseScrollCircle:setFill(false)
			mouseScrollCircle:setStrokeWidth(1)
			mouseScrollCircle:show()
		end

		-- send scroll event if cursor moved more than circle's radius
		if xDiff > mouseScrollCircleRad or yDiff > mouseScrollCircleRad then
			-- get real xDiff and yDiff
			deltaX = mouseScrollDragPosX - mouseScrollStartPos.x
			deltaY = mouseScrollDragPosY - mouseScrollStartPos.y

			-- use 'scrollSpeedMultiplier'
			deltaX = deltaX * scrollSpeedMultiplier
			deltaY = deltaY * scrollSpeedMultiplier

			-- square for better scroll acceleration
			if scrollSpeedSquareAcceleration then
				-- mod to keep negative values
				deltaXDirMod = 1
				deltaYDirMod = 1

				if deltaX < 0 then
					deltaXDirMod = -1
				end
				if deltaY < 0 then
					deltaYDirMod = -1
				end

				deltaX = deltaX * deltaX * deltaXDirMod
				deltaY = deltaY * deltaY * deltaYDirMod
			end

			-- math.ceil / math.floor - scroll event accepts only integers
			deltaXRounding = math.ceil
			deltaYRounding = math.ceil

			if deltaX < 0 then
				deltaXRounding = math.floor
			end
			if deltaY < 0 then
				deltaYRounding = math.floor
			end

			deltaX = deltaXRounding(deltaX)
			deltaY = deltaYRounding(deltaY)

			-- reverse Y scroll if 'reverseVerticalScrollDirection' set to true
			if reverseVerticalScrollDirection then
				deltaY = deltaY * -1
			end

			-- send scroll event
			hs.eventtap.event.newScrollEvent({ -deltaX, deltaY }, {}, "pixel"):post()
		end
	end

	-- restart timer
	mouseScrollTimer = hs.timer.doAfter(mouseScrollTimerDelay, mouseScrollTimerFunction)
end

-- start override functions
overrideScrollMouseDown:start()
overrideScrollMouseUp:start()
overrideScrollMouseDrag:start()

------------------------------------------------------------------------------------------
-- END OF AUTOSCROLL WITH MOUSE WHEEL BUTTON
------------------------------------------------------------------------------------------
