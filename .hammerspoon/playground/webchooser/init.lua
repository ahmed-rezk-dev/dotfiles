-- https://github.com/asmagill/hammerspoon-config/blob/07adccec1ba6b773fccddbaefb5321c5733ed310/_scratch/dash.lua
-- https://github.com/asmagill/hammerspoon-config/blob/07adccec1ba6b773fccddbaefb5321c5733ed310/utils/prompter.lua
--

local webview      = require("hs.webview")
local usercontent  = webview.usercontent

local cache        = {}
local module       = { cache = cache }

local WIDTH        = 360
local HEIGHT       = 480

local script       = [[
]]

local htmlFilePath = os.getenv "HOME" .. "/.hammerspoon/playground/webchooser/index.html"
print(htmlFilePath)
local htmlFile = assert(io.open(htmlFilePath, "rb"))
local html = htmlFile:read "*all"
htmlFile:close()

-- local html = [[
--
-- ]]


local view
local ucc = usercontent.new("webchooserContent"):injectScript({ source = html })
module.run = function()
  local frame = hs.mouse.getCurrentScreen():frame()
  local frameSettings = {
    x = frame.x + frame.w / 2 - WIDTH / 2,
    y = frame.y + frame.h / 2 - HEIGHT / 2,
    w = WIDTH,
    h = HEIGHT
  }

  print(ucc)
  cache.webview = webview.new(frameSettings, { developerExtrasEnabled = true }, ucc)

  cache.webview:allowTextEntry(true)
  cache.webview:shadow(true)
  cache.webview:html(html)

  cache.webview:show(0.5)
end

return module
