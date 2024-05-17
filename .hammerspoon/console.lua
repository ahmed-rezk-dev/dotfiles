local axuiWindowElement = require('hs.axuielement').windowElement
local reloadHS          = require('ext.system').reloadHS

local module = {}

module.init = function()
    -- some global functions for console
    inspect = hs.inspect
    reload  = reloadHS

    dumpWindows = function()
        hs.fnutils.each(hs.window.allWindows(), function(win)
            print(hs.inspect({
                id               = win:id(),
                title            = win:title(),
                app              = win:application():name(),
                role             = win:role(),
                subrole          = win:subrole(),
                frame            = win:frame(),
                buttonZoom       = axuiWindowElement(win):attributeValue('AXZoomButton'),
                buttonFullScreen = axuiWindowElement(win):attributeValue('AXFullScreenButton'),
                isResizable      = axuiWindowElement(win):isAttributeSettable('AXSize')
            }))
        end)
    end

    dumpScreens = function()
        hs.fnutils.each(hs.screen.allScreens(), function(s)
            print(s:id(), s:position(), s:frame(), s:name())
        end)
    end

    timestamp = function(date)
        date = date or hs.timer.secondsSinceEpoch()
        return os.date("%F %T" .. ((tostring(date):match("(%.%d+)$")) or ""), math.floor(date))
    end

    -- console styling
    local grayColor = {
        red   = 24 * 4 / 255,
        green = 24 * 4 / 255,
        blue  = 24 * 4 / 255,
        alpha = 1
    }

    local blackColor = {
        red   = 24 / 255,
        green = 24 / 255,
        blue  = 24 / 255,
        alpha = 1
    }

    hs.console.consoleCommandColor(blackColor)
    hs.console.consoleResultColor(grayColor)
    hs.console.consolePrintColor(grayColor)

    -- no toolbar
    hs.console.toolbar(nil)


    function PrintTable(node)
        local cache, stack, output = {}, {}, {}
        local depth = 1
        local output_str = "{\n"

        while true do
            local size = 0
            for k, v in pairs(node) do
                size = size + 1
            end

            local cur_index = 1
            for k, v in pairs(node) do
                if (cache[node] == nil) or (cur_index >= cache[node]) then

                    if (string.find(output_str, "}", output_str:len())) then
                        output_str = output_str .. ",\n"
                    elseif not (string.find(output_str, "\n", output_str:len())) then
                        output_str = output_str .. "\n"
                    end

                    -- This is necessary for working with HUGE tables otherwise we run out of memory using concat on huge strings
                    table.insert(output, output_str)
                    output_str = ""

                    local key
                    if (type(k) == "number" or type(k) == "boolean") then
                        key = "[" .. tostring(k) .. "]"
                    else
                        key = "['" .. tostring(k) .. "']"
                    end

                    if (type(v) == "number" or type(v) == "boolean") then
                        output_str = output_str .. string.rep('\t', depth) .. key .. " = " .. tostring(v)
                    elseif (type(v) == "table") then
                        output_str = output_str .. string.rep('\t', depth) .. key .. " = {\n"
                        table.insert(stack, node)
                        table.insert(stack, v)
                        cache[node] = cur_index + 1
                        break
                    else
                        output_str = output_str .. string.rep('\t', depth) .. key .. " = '" .. tostring(v) .. "'"
                    end

                    if (cur_index == size) then
                        output_str = output_str .. "\n" .. string.rep('\t', depth - 1) .. "}"
                    else
                        output_str = output_str .. ","
                    end
                else
                    -- close the table
                    if (cur_index == size) then
                        output_str = output_str .. "\n" .. string.rep('\t', depth - 1) .. "}"
                    end
                end

                cur_index = cur_index + 1
            end

            if (size == 0) then
                output_str = output_str .. "\n" .. string.rep('\t', depth - 1) .. "}"
            end

            if (#stack > 0) then
                node = stack[#stack]
                stack[#stack] = nil
                depth = cache[node] == nil and depth + 1 or depth - 1
            else
                break
            end
        end

        -- This is necessary for working with HUGE tables otherwise we run out of memory using concat on huge strings
        table.insert(output, output_str)
        output_str = table.concat(output)

        print(output_str)
    end
end

return module
