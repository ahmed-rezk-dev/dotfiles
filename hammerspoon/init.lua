spoon = spoon
hs = hs

local log = require("logger")
local Config = require("config")
require("ai")

local mash = { "ctrl", "alt", "cmd" }

hs.loadSpoon("ReloadConfiguration")
spoon.ReloadConfiguration:start()
hs.alert.show("Config loaded 🔨🥄")

hs.loadSpoon("MicMute")

spoon.MicMute:bindHotkeys({
	toggle = { Config.keys.hyper, "m" },
})

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
