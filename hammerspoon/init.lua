spoon = spoon
hs = hs

Settings = require("settings")
log = require("logger")
require("extra")
require("ai")

hs.loadSpoon("ReloadConfiguration")
spoon.ReloadConfiguration:start()
hs.alert.show("Config loaded 🔨🥄")

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

-- Thie plugin generates EmmyLua annotations for Hammerspoon and any installed Spoons.
hs.loadSpoon("EmmyLua")
