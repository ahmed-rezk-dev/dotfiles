-- Function to load HTML content from a URL
function loadHTMLFromURL(url)
	-- Get the current screen's frame
	local screenFrame = hs.screen.primaryScreen():frame()
	-- print("screenFrame " .. hs.screen.primaryScreen():frame())

	-- Define desired webview dimensions
	local webviewWidth = 1800
	local webviewHeight = 800

	-- Calculate the position to center the webview
	local webviewX = screenFrame.x + (screenFrame.w - webviewWidth) / 2
	local webviewY = screenFrame.y + (screenFrame.h - webviewHeight) / 2

	-- Create a new webview
	local webviewRect = hs.geometry.rect(webviewX, webviewY, webviewWidth, webviewHeight)

	local webview = hs.webview.new(webviewRect)
	webview:closeOnEscape()
	kwebview:url(url)
	webview
		:bringToFront(true)
		:windowStyle({ "HUD", "utility", "titled", "closable" })
		:shadow(true)
		:closeOnEscape(true)
		:allowGestures(true)
		:allowNewWindows(false)
		:windowTitle("ddddddd")
		:deleteOnClose(true)

	webview:show()

	--NOTE: WOW What a good meanbar
	-- local closeButton = hs.menubar.new()
	-- closeButton:setTitle("X")
	-- closeButton:setClickCallback(function()
	-- 	webview:delete() -- Close the webview
	-- 	closeButton:delete() -- Remove the menubar item
	-- end)
end

-- Bind a key to trigger the function
hs.hotkey.bind(Settings.keys.ULTRA, "m", function()
	local url = "https://github.com/ahmed-rezk-dev/zmk-keyboard/blob/main/config/cradio.keymap"
	loadHTMLFromURL(url)
end)
