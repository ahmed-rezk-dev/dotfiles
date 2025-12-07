return {
  "akinsho/bufferline.nvim",
  opts = {
    options = {
      always_show_bufferline = true,
      -- Prevent bufferline from forcing buffer switches when there are unsaved changes
      enforce_regular_tabs = false,
      -- Allow bufferline to handle modified buffers gracefully
      diagnostics = "nvim_lsp",
      offsets = {
        {
          filetype = "neo-tree",
          text = "Neo-tree",
          highlight = "Directory",
          text_align = "left",
        },
      },
    },
  },
}