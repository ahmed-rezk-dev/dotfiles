local tripleModifiers = { "cmd", "shift", "ctrl" }
local doubleModifiers = { "cmd", "shift" }

-- DISABLED: WinWin and WindowHalfsAndThirds spoons are not installed
-- hs.loadSpoon("WinWin")
-- hs.hotkey.bind(tripleModifiers, "Right", function()
--     spoon.WinWin:moveToScreen("right")
-- end)
-- hs.hotkey.bind(tripleModifiers, "Left", function()
--     local win = hs.window.focusedWindow()
--     local beforeScreen = win:screen()
--     spoon.WinWin:moveToScreen("left")
--     local afterScreen = win:screen()
--     if beforeScreen ~= afterScreen then
--         return
--     end
--     spoon.WinWin:moveToScreen("right")
-- end)

-- hs.loadSpoon("WindowHalfsAndThirds")
-- spoon.WindowHalfsAndThirds:bindHotkeys({...})

return {} -- return empty module since functionality is disabled

