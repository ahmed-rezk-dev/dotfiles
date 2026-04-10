services = require("config.ask.services")
service = services.getService()
require("ai.chat")
require("ai.tasks")

-- playground modules not in repo
-- local prompt = require("playground/prompter").prompt
-- local webChooser = require("playground.webchooser").run

hs.hotkey.bind(Settings.keys.ULTRA, "k", function()
  log.d("inininin")
  -- local frame = hs.screen.mainScreen():fullFrame()
  -- frame {
  --   x = frame.x + frame.w * 0.15 / 2,
  --   y = frame.y + frame.h * 0.25 / 2,
  --   w = frame.w * 0.85,
  --   h = frame.h * 0.75,
  --
  -- }

  -- webChooser()
  -- prompt("sfsfsfsdsfsf")
end)
