local log = require("logger")

local geminiApiKey = "Gemini API Key"
hs.hotkey.bind({ "ctrl", "alt" }, "G", function()
	hs.eventtap.keyStroke({ "cmd" }, "C")

	hs.timer.doAfter(0.3, function()
		local input = hs.pasteboard.getContents()
		if not input or input == "" then
			hs.alert.show("📋 No text selected")
			return
		end

		-- ✅ Prompt that expects strict JSON response
		local prompt = [[
You are a grammar and punctuation checker. Use strict rules of written English.

Analyze the sentence below and return ONLY one of the following JSON responses:
- If the sentence is grammatically and punctuationally correct, reply with: {"result": "true"}
- If it is not correct, reply with: {"result": "corrected", "text": "<corrected version>"}

Sentence: "]] .. input .. [["
]]

		-- 🧾 Gemini API Payload
		local jsonBody = hs.json.encode({
			contents = {
				{
					parts = {
						{ text = prompt },
					},
				},
			},
		})
		-- curl 192.168.50.252:11434/api/chat -d '{ "model": "deepseek-r1", "prompt": "How are you today?", "stream": false}'
		local url = "http://********/api/chat"

		-- 🚀 Send Request to Gemini
		hs.http.asyncPost(url, jsonBody, {
			["Content-Type"] = "application/json",
		}, function(status, body)
			log.i(body)
			if status ~= 200 then
				hs.alert.show("❌ Gemini API error: " .. tostring(status))
				return
			end

			-- 🧩 Parse Gemini response structure
			local ok, response = pcall(hs.json.decode, body)
			if not ok or not response then
				hs.alert.show("❌ Failed to decode Gemini response")
				return
			end

			local textResponse = response.candidates
				and response.candidates[1]
				and response.candidates[1].content
				and response.candidates[1].content.parts
				and response.candidates[1].content.parts[1]
				and response.candidates[1].content.parts[1].text

			if not textResponse then
				hs.alert.show("❌ No valid content in Gemini response")
				return
			end

			-- 🧠 Decode Gemini's JSON-in-text reply
			local parsed = hs.json.decode(textResponse)
			if not parsed then
				hs.alert.show("❌ Failed to parse JSON from Gemini text response")
				return
			end

			-- ✅ Handle grammar correction logic
			if parsed.result == "true" then
				hs.alert.show("✅ Already correct!")
			elseif parsed.result == "corrected" and parsed.text then
				hs.pasteboard.setContents(parsed.text)
				hs.eventtap.keyStroke({}, "delete")
				hs.timer.doAfter(0.1, function()
					hs.eventtap.keyStroke({ "cmd" }, "v")
				end)
				hs.alert.show("✅ Grammar corrected!")
			else
				hs.alert.show("❌ Unexpected format in response")
			end
		end)
	end)
end)
