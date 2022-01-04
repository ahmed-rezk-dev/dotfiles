local cache = {}
local module = { cache = cache }

-- modifiers in use:
-- * cltr+alt: move focus between windows
-- * ctrl+shift: do things to windows
-- * ultra: custom/global bindings
-- * hyper+]: apps-sapce - apps finder

module.start = function()
	require("bindings.global").start()
	require("bindings.focus").start()
	require("bindings.tiling").start()
	require("bindings.apps-space").start()
end

module.stop = function()
	require("bindings.global").stop()
	require("bindings.focus").stop()
	require("bindings.tiling").stop()
	require("bindings.apps-space").stop()
end

return module
