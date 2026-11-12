-- Zen mode: hide all other regular apps and dim the screen behind the
-- focused (zen) window. Driven externally via the `hs` CLI from AeroSpace's
-- alt-ctrl-z binding (see aerospace/aerospace.toml) — AeroSpace itself has
-- no native "hide other windows" or "dim background" command, so this
-- module is required (`require("config.zen")`) once at Hammerspoon startup
-- and then toggled with:
--   hs -c "require('config.zen').enable()"
--   hs -c "require('config.zen').disable()"
--   hs -c "require('config.zen').toggle()"

local log = require("logger")

local M = {
  overlays = {},
  hiddenApps = {},
  active = false,
  originalWindow = nil, -- stores {app=app, win=window, frame=frame, wasFloating=bool}
}

-- Apps we never want to hide even though they report kind() == 1
local EXCLUDED_TITLES = {
  ["Finder"] = true,
}

local DIM_ALPHA = 0.55

local function buildOverlays()
  local canvases = {}
  for _, screen in ipairs(hs.screen.allScreens()) do
    local frame = screen:fullFrame()
    local c = hs.canvas.new(frame)
    c:appendElements({
      type = "rectangle",
      action = "fill",
      fillColor = { red = 0, green = 0, blue = 0, alpha = DIM_ALPHA },
      frame = { x = 0, y = 0, w = frame.w, h = frame.h },
    })
    -- Sit above the (now-hidden) desktop/background, below normal app windows
    c:level(hs.canvas.windowLevels.desktopIcon)
    c:clickActivating(false)
    c:canvasMouseEvents(false, false, false, false)
    c:show()
    table.insert(canvases, c)
  end
  return canvases
end

function M.prepare()
  local zenApp = hs.application.frontmostApplication()
  local zenWin = zenApp:mainWindow()
  if zenWin then
    M.originalWindow = { app = zenApp, win = zenWin, frame = zenWin:frame() }
  else
    M.originalWindow = nil
  end
end

function M.enable()
  if M.active then return end
  M.active = true
  local zenApp = hs.application.frontmostApplication()
  M.hiddenApps = {}
  for _, app in ipairs(hs.application.runningApplications()) do
    local title = app:title()
    if app:kind() == 1 and app ~= zenApp and not app:isHidden() and not EXCLUDED_TITLES[title] then
      app:hide()
      table.insert(M.hiddenApps, app)
    end
  end
  M.overlays = buildOverlays()
  log.i("Zen mode enabled")
end

function M.disable()
  if not M.active then return end
  M.active = false
  if M.originalWindow and M.originalWindow.win then
    local win, frame = M.originalWindow.win, M.originalWindow.frame
    pcall(function() win:setFrame(frame) end)
    M.originalWindow = nil
  end
  for _, app in ipairs(M.hiddenApps) do
    if app then app:unhide() end
  end
  M.hiddenApps = {}
  for _, c in ipairs(M.overlays) do c:delete() end
  M.overlays = {}
  log.i("Zen mode disabled")
end

function M.toggle()
  if M.active then
    M.disable()
  else
    M.enable()
  end
end

return M
