spoon = spoon
hs = hs

log = require("logger")
local Settings = require("settings")
require("ai")

hs.loadSpoon("ReloadConfiguration")
spoon.ReloadConfiguration:start()
hs.alert.show("Config loaded 🔨🥄")

-- Thie plugin generates EmmyLua annotations for Hammerspoon and any installed Spoons.
hs.loadSpoon("EmmyLua")

hs.loadSpoon("MicMute")

spoon.MicMute:bindHotkeys({
	toggle = { Settings.keys.HYPER, "m" },
})

hs.ipc.cli = true -- early so hs CLI always works

require("config.ax.helpers")
require("config.spoons")

local streamStdout = require("config.tests.stream-stdout").streamStdout
hs.hotkey.bind({ "cmd", "alt", "ctrl" }, "z", streamStdout)

AskOpenAIStreaming = require("config.ask.ask").AskOpenAIStreaming
GrammerCheck = require("config.ask.ask").grammerCheck

hs.hotkey.bind(Settings.keys.HYPER, "z", function()
	-- hs.dialog.textPrompt("Test", "informativeText", " defaultText", "buttonOne", "buttonTwo")
	-- Focus the last used window.

	local function focusLastFocused()
		local wf = hs.window.filter
		local lastFocused = wf.defaultCurrentSpace:getWindows(wf.sortByFocusedLast)
		if #lastFocused > 0 then
			lastFocused[1]:focus()
		end
	end
	-- On selection, copy the text and type it into the focused application.

	local chooser = hs.chooser.new(function(choice)
		if not choice then
			focusLastFocused()
			return
		end
		hs.pasteboard.setContents(choice["subText"])
		focusLastFocused()
		hs.eventtap.keyStrokes(hs.pasteboard.getContents())
	end)
	chooser:choices({
		{
			["text"] = "Browser\n",
			["subText"] = "I used these browsers",
		},
		{
			["text"] = "Device\n",
			["subText"] = "I used these devices",
		},
	})
	chooser:show()
end)

hs.hotkey.bind({ "cmd", "alt", "ctrl" }, "r", AskOpenAIStreaming)
hs.hotkey.bind(Settings.keys.HYPER, "c", GrammerCheck)
-- test w/ T
hs.hotkey.bind(Settings.keys.MEH, "b", function()
	hs.alert.show("Config loaded 🔨🥄")
	local result = require("config.ask.selection").getSelectedText()
	log.i("result:\n ", result)
end)

require("config.uielements")
require("config.ui_callouts")
require("config.observer")

-- local end_time = hs.timer.secondsSinceEpoch()
-- print("init.lua took", end_time - start_time, "seconds")
--
-- caffeine = hs.menubar.new()
-- function setCaffeineDisplay(state)
-- 	if state then
-- 		caffeine:setTitle("🚀 AWAKE")
-- 	else
-- 		caffeine:setTitle("🚀 SLEEPY")
-- 	end
-- end
--
-- function caffeineClicked()
-- 	setCaffeineDisplay(hs.caffeinate.toggle("displayIdle"))
-- end
--
-- if caffeine then
-- 	caffeine:setClickCallback(caffeineClicked)
-- 	setCaffeineDisplay(hs.caffeinate.get("displayIdle"))
-- end
--
--

-- Function to load HTML content from a URL
function loadHTMLFromURL(url)
	-- Get the current screen's frame
	local screenFrame = hs.screen.primaryScreen():frame()
	-- print("screenFrame " .. hs.screen.primaryScreen():frame())

	-- Define desired webview dimensions
	local webviewWidth = 1800
	local webviewHeight = 800

	-- Calculate the position to center the webview
	local webviewX = screenFrame.x + (screenFrame.w - webviewWidth) / 2
	local webviewY = screenFrame.y + (screenFrame.h - webviewHeight) / 2

	-- Create a new webview
	local webviewRect = hs.geometry.rect(webviewX, webviewY, webviewWidth, webviewHeight)

	local webview = hs.webview.new(webviewRect)
	webview:closeOnEscape()
	webview:url(url)
	webview
		:bringToFront(true)
		:windowStyle({ "HUD", "utility", "titled", "closable" })
		:shadow(true)
		:closeOnEscape(true)
		:allowGestures(true)
		:allowNewWindows(false)
		:windowTitle("ddddddd")
		:deleteOnClose(true)

	webview:show()

	--NOTE: WOW What a good meanbar
	-- local closeButton = hs.menubar.new()
	-- closeButton:setTitle("X")
	-- closeButton:setClickCallback(function()
	-- 	webview:delete() -- Close the webview
	-- 	closeButton:delete() -- Remove the menubar item
	-- end)
end

-- Bind a key to trigger the function
hs.hotkey.bind(Settings.keys.ULTRA, "m", function()
	local url = "https://github.com/ahmed-rezk-dev/zmk-keyboard/blob/main/config/cradio.keymap"
	loadHTMLFromURL(url)
end)
