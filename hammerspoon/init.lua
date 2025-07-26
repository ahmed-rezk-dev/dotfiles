spoon = spoon
hs = hs

Settings = require("settings")
log = require("logger")
require("ext")
require("ai.init")
bindings = require("bindings")

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

-- bindings
bindings.enabled = {}

-- start/stop modules
local modules = { bindings }

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

-- Thie plugin generates EmmyLua annotations for Hammerspoon and any installed Spoons.
hs.loadSpoon("EmmyLua")

--------------------------------
-- START VIM CONFIG
--------------------------------
local VimMode = hs.loadSpoon("VimMode")
local vim = VimMode:new()

-- Configure apps you do *not* want Vim mode enabled in
-- For example, you don't want this plugin overriding your control of Terminal
-- vim
vim
  :disableForApp("Code")
  :disableForApp("zoom.us")
  :disableForApp("iTerm")
  :disableForApp("iTerm2")
  :disableForApp("Terminal")

-- If you want the screen to dim (a la Flux) when you enter normal mode
-- flip this to true.
vim:shouldDimScreenInNormalMode(false)

-- If you want to show an on-screen alert when you enter normal mode, set
-- this to true
vim:shouldShowAlertInNormalMode(true)

-- You can configure your on-screen alert font
vim:setAlertFont("Courier New")

-- Enter normal mode by typing a key sequence
vim:enterWithSequence("jk")

-- if you want to bind a single key to entering vim, remove the
-- :enterWithSequence('jk') line above and uncomment the bindHotKeys line
-- below:
--
-- To customize the hot key you want, see the mods and key parameters at:
--   https://www.hammerspoon.org/docs/hs.hotkey.html#bind
--
vim:bindHotKeys({ enter = { Settings.keys.ULTRA, "." } })

--------------------------------
-- END VIM CONFIG
--------------------------------
