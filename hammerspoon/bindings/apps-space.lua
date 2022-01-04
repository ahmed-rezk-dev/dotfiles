local module = {}

module.start = function()
	Install:andUse("RecursiveBinder", {
		fn = function(s)
			-- Curried function so it isn't called immediately
			local id = function(id)
				return function()
					hs.application.launchOrFocusByBundleID(id)
				end
			end

			local app_keymap = {
				[s.singleKey("s", "Slack")] = id "com.tinyspeck.slackmacgap",
				[s.singleKey("d", "Discord")] = id "com.hnc.Discord",
				[s.singleKey("f", "Firefox")] = id "org.mozilla.firefox",
				[s.singleKey("t", "iTerm")] = id "com.googlecode.iterm2",
				[s.singleKey("e", "Postbox")] = id "com.postbox-inc.postbox",
				[s.singleKey("l", "Sublime Text")] = id "com.sublimetext.3",
				[s.singleKey("m", "Messages")] = id "com.apple.MobileSMS",
				[s.singleKey("y", "Spotify")] = id "com.spotify.client",
				[s.singleKey("i", "IDEA")] = id "com.jetbrains.intellij-EAP",
				[s.singleKey("r", "RubyMine")] = id "com.jetbrains.rubymine",
				[s.singleKey("v", "VS Code")] = id "com.microsoft.VSCode",
				[s.singleKey("p", "Postman")] = id "com.postmanlabs.mac",
				[s.singleKey("o", "OneNote")] = id "com.microsoft.onenote.mac",
				[s.singleKey("n", "Notion")] = id "notion.id",
				[s.singleKey("c", "Chrome")] = id "com.google.Chrome",
				[s.singleKey("k", "Kitty Terminal")] = id "net.kovidgoyal.kitty",
				[s.singleKey("g", "Safari")] = id "com.apple.Safari",
			}
			hs.hotkey.bind(Config.keymap.hyper, "]", "f", s.recursiveBind(app_keymap))
		end,
	})
end

module.stop = function() end

return module
