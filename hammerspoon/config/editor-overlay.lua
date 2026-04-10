local log = require("logger")

local M = {
  watchTimer = nil,
  tempFilePath = nil,
}

-- Create a temporary file
local function createTempFile(content)
  local tempDir = os.getenv("TMPDIR") or "/tmp"
  local tempPath = tempDir .. "/nvim-overlay-" .. os.time() .. ".txt"
  local file = io.open(tempPath, "w")
  if file then
    file:write(content or "")
    file:close()
  end
  return tempPath
end

-- Open Neovim in Terminal.app
function M.openEditor()
  if M.watchTimer then
    M.watchTimer:stop()
    M.watchTimer = nil
  end

  local content = hs.pasteboard.getContents() or ""
  local tempFile = createTempFile(content)
  M.tempFilePath = tempFile

  log.i("Opening Neovim in Terminal. :wq to save and exit.")
  hs.alert.show("Editing in Neovim... :wq to finish", 2)

  local nvimCmd = string.format('nvim %s', tempFile)
  local asCmd = string.format(
    "osascript -e 'tell application \"Terminal\" to activate' -e 'tell application \"Terminal\" to do script \"%s\"'",
    nvimCmd
  )

  hs.execute(asCmd, false)

  M.watchTimer = hs.timer.new(1.0, function()
    local term = hs.application.find("Terminal")
    if not term then
      if M.watchTimer then M.watchTimer:stop() end
      M.watchTimer = nil
      M.finishEditing()
      return
    end

    local wins = term:allWindows()
    if wins and #wins == 0 then
      if M.watchTimer then M.watchTimer:stop() end
      M.watchTimer = nil
      M.finishEditing()
    end
  end)
  M.watchTimer:start()
end

-- Open Neovim in WezTerm
function M.openEditorWezterm()
  if M.watchTimer then
    M.watchTimer:stop()
    M.watchTimer = nil
  end

  local content = hs.pasteboard.getContents() or ""
  local tempFile = createTempFile(content)
  M.tempFilePath = tempFile

  log.i("Opening WezTerm Neovim. :wq to save and exit.")
  hs.alert.show("Editing in WezTerm Neovim... :wq to finish", 2)

  local cmd = string.format('open -a WezTerm --args nvim %s', tempFile)
  hs.execute(cmd, false)

  M.watchTimer = hs.timer.new(1.0, function()
    local wez = hs.application.find("WezTerm")
    if not wez then
      if M.watchTimer then M.watchTimer:stop() end
      M.watchTimer = nil
      M.finishEditing()
      return
    end

    local wins = wez:allWindows()
    if wins and #wins == 0 then
      if M.watchTimer then M.watchTimer:stop() end
      M.watchTimer = nil
      M.finishEditing()
    end
  end)
  M.watchTimer:start()
end

-- Finish editing - read file and copy to clipboard
function M.finishEditing()
  if M.tempFilePath then
    local file = io.open(M.tempFilePath, "r")
    if file then
      local content = file:read("*a")
      file:close()

      if content and #content > 0 then
        hs.pasteboard.setContents(content)
        hs.alert.show("Edited text copied to clipboard!", 2)
        log.i("Content copied to clipboard")
      end

      os.remove(M.tempFilePath)
      M.tempFilePath = nil
    end
  end
end

function M.start()
  hs.hotkey.bind({ "cmd", "shift" }, "e", function()
    log.i("Hotkey Cmd+Shift+E pressed")
    M.openEditor()
  end)
  hs.hotkey.bind({ "cmd", "shift" }, "g", function()
    log.i("Hotkey Cmd+Shift+G pressed")
    M.openEditorWezterm()
  end)

  log.i("EditorOverlay loaded. Cmd+Shift+E = Terminal, Cmd+Shift+G = WezTerm")
end

function M.stop()
  if M.watchTimer then
    M.watchTimer:stop()
    M.watchTimer = nil
  end
end

return M