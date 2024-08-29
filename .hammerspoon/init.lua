-- global stuff
require("console").init()
require("overrides").init()

-- ensure IPC is there
hs.ipc.cliInstall()

-- lower logging level for hotkeys
require("hs.hotkey").setLogLevel "info"

-- Window highlight
hs.window.highlight.ui.overlay = false
hs.window.highlight.ui.flashDuration = 0
hs.window.highlight.ui.frameWidth = 10
--[[ hs.window.highlight.ui.frameColor = { 0, 0.6, 1, 0.5 } ]]
hs.window.highlight.start()
local highlightBorderColor = { red = 14 / 255, green = 196 / 255, blue = 23 / 255, alpha = 1.8 }

-- global config
config = {
  apps = {
    --[[ terms = { "kitty" }, ]]
    browsers = { "Google Chrome", "Safari" },
  },
  --[[ wm = { ]]
  --[[     defaultLayout = 'monocle', ]]
  --[[]]
  --[[     defaultDisplayLayouts = { ]]
  --[[         ['XDR Display']    = 'monocle', ]]
  --[[         ['C49RG9x'] = 'main-right', ]]
  --[[         [5] = 'main-right' ]]
  --[[     }, ]]
  --[[]]
  --[[     displayLayouts = { ]]
  --[[         ['XDR Display']    = { 'monocle', 'main-right', 'side-by-side' }, ]]
  --[[         ['C49RG9x'] = { 'main-right', 'main-center', 'side-by-side' } ]]
  --[[     } ]]
  --[[ }, ]]

  wm = {
    -- tilingMethod = 'hhtwm',
    tilingMethod = "yabai",
    -- tilingMethod = 'grid',
    -- tilingMethod = 'autogrid',

    defaultLayouts = { "monocle", "main-left" },
    displayLayouts = {
      ["XDR Display"] = { "monocle", "main-left" },
      ["C49RG9x"] = { "main-left", "main-right", "main-center", "monocle" },
    },
  },
  logger = {
    path = os.getenv "HOME" .. "/.logger/data.db",
  },
  window = {
    highlightBorder = true,
    highlightMouse = true,
    historyLimit = 0,
    highlightBorderColor = highlightBorderColor,
  },
  network = {
    home = "Skynet 5G",
  },
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
watchables = require "utils.watchables"
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
watchers.enabled = { "autoborder" }
watchers.urlPreference = config.apps.browsers

-- bindings
bindings.enabled = { "ask-before-quit", "block-hide", "ctrl-esc", "f-keys", "focus", "global", "tiling", "viscosity",
  "grid" }
bindings.askBeforeQuitApps = config.apps.browsers

-- start/stop modules
local modules = { bindings, controlplane, watchables, watchers, wm }

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

-- vim
--[[ local VimMode = hs.loadSpoon "VimMode" ]]
-- r-[[ local vim = VimMode:new() ]]









local ultra = { "ctrl", "alt", "cmd" }

local cssFilePath = os.getenv "HOME" .. "/.hammerspoon/Spoons/Ki.spoon/cheatsheet.css"
local cssFile = assert(io.open(cssFilePath, "rb"))
local css = cssFile:read "*all"
cssFile:close()


local htmlFilePath = os.getenv "HOME" .. "/.hammerspoon/Spoons/Ki.spoon/cheatsheet.html"
print(htmlFilePath)
local htmlFile = assert(io.open(htmlFilePath, "rb"))
local html = htmlFile:read "*all"
htmlFile:close()


local prompt = require("playground/prompter").prompt
local webChooser = require("playground/webChooser").run
hs.hotkey.bind(ultra, "o", function()
  -- local frame = hs.screen.mainScreen():fullFrame()
  -- frame {
  --   x = frame.x + frame.w * 0.15 / 2,
  --   y = frame.y + frame.h * 0.25 / 2,
  --   w = frame.w * 0.85,
  --   h = frame.h * 0.75,
  --
  -- }


  webChooser()
  -- prompt("sfsfsfsdsfsf")
end)

-- testCallbackFn = function(result) print("Callback Result: " .. result) end
-- testWebviewA = hs.webview.newBrowser(hs.geometry.rect(250, 250, 250, 250)):show()
-- testWebviewB = hs.webview.newBrowser(hs.geometry.rect(450, 450, 450, 450)):show()
-- hs.dialog.webviewAlert(testWebviewA, testCallbackFn, "Message", "Informative Text", "Button One", "Button Two",
--   "NSCriticalAlertStyle")
-- hs.dialog.webviewAlert(testWebviewB, testCallbackFn, "Message", "Informative Text", "Single Button")
