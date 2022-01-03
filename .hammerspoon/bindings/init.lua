local cache = {}
local module = { cache = cache }

-- modifiers in use:
-- * cltr+alt: move focus between windows
-- * ctrl+shift: do things to windows
-- * ultra: custom/global bindings

module.start = function()
	require("bindings.global").start()
	require("bindings.focus").start()
end

module.stop = function()
	require("bindings.global").stop()
	require("bindings.focus").stop()
end

return module
