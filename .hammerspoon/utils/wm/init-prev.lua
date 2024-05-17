local log = hs.logger.new("hhtwm", "debug")

local hhtwm = require "hhtwm"
local cache = { hhtwm = hhtwm }
local module = { cache = cache }

-- grabs screen with active window, unless it's Finder's desktop
-- then we use mouse position
local activeScreen = function()
    local activeWindow = hs.window.focusedWindow()

    if activeWindow and activeWindow:role() ~= "AXScrollArea" then
        return activeWindow:screen()
    else
        return hs.mouse.getCurrentScreen()
    end
end

local calculateDisplayLayouts = function()
    local leftScreen = nil
    local rightScreen = nil

    for screen, position in pairs(hs.screen.screenPositions()) do
        if position.x == -1 then
            leftScreen = screen
        end
        if position.x == 0 then
            rightScreen = screen
        end
    end

    local displayLayouts = { ["C49RG9x"] = "cards" }

    --[[ log.d('LOGLOGLOGLOGLOGLOGLOGLOGLOGLOGLOGLOG') ]]
    --[[ PrintTable(leftScreen:id()) ]]
    if leftScreen then
        displayLayouts[leftScreen:id()] = "monocle"
    end
    if rightScreen then
        displayLayouts[rightScreen:id()] = "main-left"
    end

    print "DISPLAYLAYOUTS"
    PrintTable(displayLayouts)

    return displayLayouts
end

local screenWatcher = function(_, _, _, prevScreenCount, screenCount)
    if prevScreenCount ~= nil and prevScreenCount ~= screenCount then
        hhtwm.displayLayouts = calculateDisplayLayouts()
        hhtwm.resetLayouts()
        hhtwm.tile()
    end
end

local calcResizeStep = function(screen)
    return 1 / hs.grid.getGrid(screen).w
end

module.setLayout = function(layout)
    hhtwm.setLayout(layout)
    hhtwm.resizeLayout()

    hs.alert.show("Switching to: " .. layout)
end

module.cycleLayout = function()
    local screen = activeScreen()

    local layouts = hhtwm.enabledLayouts

    local currentLayout = hhtwm.getLayout()
    local currentLayoutIndex = hs.fnutils.indexOf(layouts, currentLayout) or 0

    local nextLayoutIndex = (currentLayoutIndex % #layouts) + 1
    local nextLayout = layouts[nextLayoutIndex]

    module.setLayout(nextLayout)
end

module.start = function()
    --[[ local axuiWindowElement = require('hs.axuielement').windowElement ]]
    --[[ local spaces       = require('hs._asm.undocumented.spaces') ]]
    local filters = {
        { app = "AppCleaner", tile = false },
        { app = "Application Loader", tile = true },
        { app = "Activity Monitor", tile = false },
        { app = "Archive Utility", tile = false },
        { app = "DiskImages UI Agent", tile = false },
        { app = "FaceTime", tile = false },
        { app = "Microsoft Teams", title = "Microsoft Teams", tile = false },
        { app = "Finder", title = "Finder", tile = false },
        { app = "Finder", title = "Copy", tile = false },
        { app = "Finder", title = "Move", tile = false },
        { app = "Hammerspoon", title = "Hammerspoon Console", tile = true },
        { app = "Photo Booth", tile = false },
        { app = "QuickTime Player", tile = false },
        { app = "Reminders", tile = false },
        { app = "Simulator", tile = false },
        { app = "System Preferences", tile = false },
        { app = "iTerm", subrole = "AXDialog", tile = false },
        { app = "iTerm2", subrole = "AXDialog", tile = false },
        { app = "iTunes", title = "Mini Player", tile = false },
        { app = "iTunes", title = "Multiple Song Info", tile = false },
        { app = "iTunes", title = "Song Info", tile = false },
        { app = "books", tile = true },
        { title = "Quick Look", tile = false },
        { app = "1Password", title = "1Password", tile = false },
        { app = "Chrome", title = "DevTools", tile = false },
        { app = "Zoom", title = "Zoom", tile = false },
    }

    hhtwm.margin = 15 -- Merge around all window
    hhtwm.screenMargin = { top = 15, bottom = 15, right = 15, left = 15 }
    hhtwm.filters = filters
    hhtwm.calcResizeStep = calcResizeStep
    hhtwm.displayLayouts = calculateDisplayLayouts()
    hhtwm.defaultLayout = "main-right"
    hhtwm.enabledLayouts = { "main-left", "monocle", "equal-left", "equal-right", "main-right", "side-by-side", "main-center" }

    --[[ hhtwm.displayLayouts = { ]]
    --[[     [3] = { "main-right", "main-right", "side-by-side" }, ]]
    --[[     [5] = { "main-right", "main-center", "side-by-side" }, ]]
    --[[ } ]]
    hhtwm.start()

    --[[ TODO ]]
    --[[ log.d "LOGLOG" ]]
    --[[ PrintTable(hhtwm) ]]
end

module.stop = function()
    cache.watcher:release()
    hhtwm.stop()
end

return module

--[[ local activeScreen = require("ext.screen").activeScreen ]]
--[[ local table        = require('ext.table') ]]
--[[ local hhtwm        = require('hhtwm') ]]
--[[ local log          = hs.logger.new('wm', 'debug') ]]
--[[]]
--[[ local cache        = { hhtwm = hhtwm } ]]
--[[ local module       = { cache = cache } ]]
--[[]]
--[[ local IMAGE_PATH   = os.getenv('HOME') .. '/.hammerspoon/assets/modal.png' ]]
--[[]]
--[[ local notify = function(text) ]]
--[[   hs.notify.new({ ]]
--[[     title        = 'Tiling', ]]
--[[     subTitle     = text, ]]
--[[     contentImage = IMAGE_PATH ]]
--[[   }):send() ]]
--[[ end ]]
--[[]]
--[[ local screenWatcher = function(_, _, _, prevScreens, screens) ]]
--[[   if prevScreens == nil or #prevScreens == 0 then ]]
--[[     return ]]
--[[   end ]]
--[[]]
--[[   if table.equal(prevScreens, screens) then ]]
--[[     return ]]
--[[   end ]]
--[[]]
--[[   log.d('resetting display layouts') ]]
--[[]]
--[[   hhtwm.displayLayouts = config.wm.defaultDisplayLayouts ]]
--[[   hhtwm.resetLayouts() ]]
--[[   hhtwm.tile() ]]
--[[ end ]]
--[[]]
--[[ local calcResizeStep = function(screen) ]]
--[[   return 1 / hs.grid.getGrid(screen).w ]]
--[[ end ]]
--[[]]
--[[ module.setLayout = function(layout) ]]
--[[   hhtwm.setLayout(layout) ]]
--[[   hhtwm.resizeLayout() ]]
--[[]]
--[[   notify('Switching to: ' .. layout) ]]
--[[ end ]]
--[[]]
--[[ module.cycleLayout = function() ]]
--[[   local screen = activeScreen() ]]
--[[]]
--[[   local layouts = config.wm.displayLayouts[screen:name()] ]]
--[[]]
--[[   local currentLayout = hhtwm.getLayout() ]]
--[[   local currentLayoutIndex = hs.fnutils.indexOf(layouts, currentLayout) or 0 ]]
--[[]]
--[[   local nextLayoutIndex = (currentLayoutIndex % #layouts) + 1 ]]
--[[   local nextLayout = layouts[nextLayoutIndex] ]]
--[[]]
--[[   module.setLayout(nextLayout) ]]
--[[ end ]]
--[[]]
--[[ module.start = function() ]]
--[[   cache.watcher = hs.watchable.watch('status.connectedScreenIds', screenWatcher) ]]
--[[]]
--[[   local filters = { ]]
--[[     { app = 'AppCleaner', tile = false                                }, ]]
--[[     { app = 'Application Loader', tile = true                         }, ]]
--[[     { app = 'Archive Utility', tile = false                           }, ]]
--[[     { app = 'DiskImages UI Agent', tile = false                       }, ]]
--[[     { app = 'FaceTime', tile = false                                  }, ]]
--[[     { app = 'Finder', title = 'Copy', tile = false                    }, ]]
--[[     { app = 'Finder', title = 'Move', tile = false                    }, ]]
--[[     { app = 'Focus', tile = false                                     }, ]]
--[[     { app = 'GIF Brewery 3', tile = false                             }, ]]
--[[     { app = 'Hammerspoon', title = 'Hammerspoon Console', tile = false }, ]]
--[[     { app = 'Helium', tile = false                                    }, ]]
--[[     { app = 'Kap', tile = false                                       }, ]]
--[[     { app = 'Max', tile = true                                        }, ]]
--[[     { app = 'Messages', tile = false                                  }, ]]
--[[     { app = 'Photo Booth', tile = false                               }, ]]
--[[     { app = 'Pixelmator', subrole = 'AXDialog', tile = false          }, ]]
--[[     { app = 'Pixelmator', subrole = 'AXUnknown', tile = false         }, ]]
--[[     { app = 'QuickTime Player', tile = false                          }, ]]
--[[     { app = 'Reminders', tile = false                                 }, ]]
--[[     { app = 'Simulator', tile = false                                 }, ]]
--[[     { app = 'System Preferences', tile = false                        }, ]]
--[[     { app = 'The Unarchiver', tile = false                            }, ]]
--[[     { app = 'Transmission', tile = false                              }, ]]
--[[     { app = 'Tweetbot', tile = false                                  }, ]]
--[[     { app = 'UnmountAssistantAgent', tile = false                     }, ]]
--[[     { app = 'Viscosity', tile = false                                 }, ]]
--[[     { app = 'iTerm', subrole = 'AXDialog', tile = false               }, ]]
--[[     { app = 'iTerm2', subrole = 'AXDialog', tile = false              }, ]]
--[[     { app = 'iTunes', title = 'Mini Player', tile = false             }, ]]
--[[     { app = 'iTunes', title = 'Multiple Song Info', tile = false      }, ]]
--[[     { app = 'iTunes', title = 'Song Info', tile = false               }, ]]
--[[     { title = 'Little Snitch Configuration', tile = true              }, ]]
--[[     { title = 'Little Snitch Network Monitor', tile = false           }, ]]
--[[     { title = 'Quick Look', tile = false                              }, ]]
--[[     { title = 'TeamViewer', tile = true                               }, ]]
--[[   } ]]
--[[]]
--[[   local isMenubarVisible = hs.screen.primaryScreen():frame().y > 0 ]]
--[[]]
--[[   local fullMargin = 12 ]]
--[[   local halfMargin = fullMargin / 2 ]]
--[[]]
--[[   local screenMargin = { ]]
--[[     top    = (isMenubarVisible and 22 or 0) + halfMargin, ]]
--[[     bottom = halfMargin, ]]
--[[     left   = halfMargin, ]]
--[[     right  = halfMargin ]]
--[[   } ]]
--[[]]
--[[   hhtwm.margin         = fullMargin ]]
--[[   hhtwm.screenMargin   = screenMargin ]]
--[[   hhtwm.filters        = filters ]]
--[[   hhtwm.calcResizeStep = calcResizeStep ]]
--[[   hhtwm.displayLayouts = DEFAULT_DISPLAY_LAYOUTS ]]
--[[   hhtwm.defaultLayout  = 'monocle' ]]
--[[]]
--[[   hhtwm.start() ]]
--[[ end ]]
--[[]]
--[[ module.stop = function() ]]
--[[   cache.watcher:release() ]]
--[[   hhtwm.stop() ]]
--[[ end ]]
--[[]]
--[[ return module ]]
