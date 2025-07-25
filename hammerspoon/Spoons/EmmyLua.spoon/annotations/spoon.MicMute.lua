--# selene: allow(unused_variable)
---@diagnostic disable: unused-local

-- Microphone Mute Toggle and status indicator
--
-- Download: [https://github.com/Hammerspoon/Spoons/raw/master/Spoons/MicMute.spoon.zip](https://github.com/Hammerspoon/Spoons/raw/master/Spoons/MicMute.spoon.zip)
---@class spoon.MicMute
local M = {}
spoon.MicMute = M

-- Binds hotkeys for MicMute
--
-- Parameters:
--  * mapping - A table containing hotkey modifier/key details for the following items:
--   * toggle - This will cause the microphone mute status to be toggled. Hold for momentary, press quickly for toggle.
--  * latch_timeout - Time in seconds to hold the hotkey before momentary mode takes over, in which the mute will be toggled again when hotkey is released. Latch if released before this time. 0.75 for 750 milliseconds is a good value.
function M:bindHotkeys(mapping, latch_timeout, ...) end

-- Toggle mic mute on/off
--
-- Parameters:
--  * None
function M:toggleMicMute() end

