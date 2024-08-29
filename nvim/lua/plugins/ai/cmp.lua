local config = function()
  local notify_msg = nil;
  local cmp_ai = require('cmp_ai.config')
  cmp_ai:setup({
    max_lines = 100,
    -- provider = 'Ollama',
    provider = 'HF',
    -- provider_options = {
    --   model = 'codellama',
    --   stream = true,
    -- },
    notify = true,
    notify_callback = function(msg)

      if notify_msg == nil then
        vim.notify(msg)
        notify_msg = msg
      end
    end,
    run_on_every_keystroke = true,
    ignored_file_types = {
      -- default is not to ignore
      -- uncomment to ignore in lua:
      -- lua = true
    },
  })
end

-- /Users/ahmed/work/neovim-plugins/cmp-ai
return {
  -- 'tzachar/cmp-ai',
  dir = '~/work/neovim-plugins/cmp-ai-org',
  -- 'ahmed-rezk-dev/cmp-ai',
  dependencies = 'nvim-lua/plenary.nvim',
  lazy = false,
  enabled = true,
  config = config
}
