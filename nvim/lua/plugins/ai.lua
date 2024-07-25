-- Minimal configuration
return {
  {
    "David-Kunz/gen.nvim",
    lazy = false,
    enabled = true,
    -- config = function()
    --   require('gen').prompts['Fix_Code'] = {
    --     prompt =
    --     "Fix the following code. Only ouput the result in format ```$filetype\n...\n```:\n```$filetype\n$text\n```",
    --     replace = true,
    --     extract = "```$filetype\n(.-)```"
    --   }
    --   require('gen').setup({
    --     model = "mistral",      -- The default model to use.
    --     display_mode = "split", -- The display mode. Can be "float" or "split".
    --     show_prompt = true,     -- Shows the Prompt submitted to Ollama.
    --     show_model = true,      -- Displays which model you are using at the beginning of your chat session.
    --     no_auto_close = false,  -- Never closes the window automatically.
    --     init = function(options) pcall(io.popen, "ollama serve > /dev/null 2>&1 &") end,
    --     -- Function to initialize Ollama
    --     command = function(options)
    --       local body = { model = 'mistral', stream = true }
    --       return "curl --silent --no-buffer -X POST http://" ..
    --           options.host .. ":" .. options.port .. "/api/chat -d $body"
    --     end,
    --     -- The command for the Ollama service. You can use placeholders $prompt, $model and $body (shellescaped).
    --     -- This can also be a lua function returning a command string, with options as the input parameter.
    --     -- The executed command must return a JSON object with { response, context }
    --     -- (context property is optional).
    --     list_models = '<function>', -- Retrieves a list of model names
    --     debug = false               -- Prints errors and the command which is run.
    --   })
    -- end
    --
    opts = {
      model = "codellama:7b-code",      -- The default model to use.
      display_mode = "split", -- The display mode. Can be "float" or "split".
      show_prompt = true,     -- Shows the Prompt submitted to Ollama.
      show_model = true,      -- Displays which model you are using at the beginning of your chat session.
      no_auto_close = false,  -- Never closes the window automatically.
      quit_map = "q",
      init = function(options) pcall(io.popen, "ollama serve > /dev/null 2>&1 &") end,
      -- Function to initialize Ollama
      command = function(options)
        local body = { model = 'mistral', stream = true }
        return "curl --silent --no-buffer -X POST http://" ..
            options.host .. ":" .. options.port .. "/api/chat -d $body"
      end,
      -- The command for the Ollama service. You can use placeholders $prompt, $model and $body (shellescaped).
      -- This can also be a lua function returning a command string, with options as the input parameter.
      -- The executed command must return a JSON object with { response, context }
      -- (context property is optional).
      list_models = '<function>', -- Retrieves a list of model names
      debug = false               -- Prints errors and the command which is run.
    }
  }
}
