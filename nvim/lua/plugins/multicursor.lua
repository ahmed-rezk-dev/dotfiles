return {
  "jake-stewart/multicursor.nvim",
  branch = "1.0",
  keys = {
    {
      "<Up>",
      function()
        require("multicursor-nvim").lineAddCursor(-1)
      end,
      mode = { "n", "x" },
      desc = "Add cursor above",
    },
    {
      "<down>",
      function()
        require("multicursor-nvim").lineAddCursor(1)
      end,
      mode = { "n", "x" },
      desc = "Add cursor below",
    },
    {
      "<leader><S-up>",
      function()
        require("multicursor-nvim").lineSkipCursor(-1)
      end,
      mode = { "n", "x" },
      desc = "Skip cursor above",
    },
    {
      "<leader><S-down>",
      function()
        require("multicursor-nvim").lineSkipCursor(1)
      end,
      mode = { "n", "x" },
      desc = "Skip cursor below",
    },
    {
      "<leader>n",
      function()
        require("multicursor-nvim").matchAddCursor(1)
      end,
      mode = { "n", "x" },
      desc = "Match add cursor forward",
    },
    {
      "<leader>s",
      function()
        require("multicursor-nvim").matchSkipCursor(1)
      end,
      mode = { "n", "x" },
      desc = "Match skip cursor forward",
    },
    {
      "<leader>N",
      function()
        require("multicursor-nvim").matchAddCursor(-1)
      end,
      mode = { "n", "x" },
      desc = "Match add cursor backward",
    },
    {
      "<leader>S",
      function()
        require("multicursor-nvim").matchSkipCursor(-1)
      end,
      mode = { "n", "x" },
      desc = "Match skip cursor backward",
    },
    {
      "<c-leftmouse>",
      function()
        require("multicursor-nvim").handleMouse()
      end,
      mode = "n",
      desc = "Mouse add cursor",
    },
    {
      "<c-leftdrag>",
      function()
        require("multicursor-nvim").handleMouseDrag()
      end,
      mode = "n",
      desc = "Mouse drag cursor",
    },
    {
      "<c-leftrelease>",
      function()
        require("multicursor-nvim").handleMouseRelease()
      end,
      mode = "n",
      desc = "Mouse release cursor",
    },
    {
      "<c-q>",
      function()
        require("multicursor-nvim").toggleCursor()
      end,
      mode = { "n", "x" },
      desc = "Toggle cursor",
    },
  },
  config = function()
    local mc = require("multicursor-nvim")
    mc.setup()

    -- Mappings defined in a keymap layer only apply when there are
    -- multiple cursors. This lets you have overlapping mappings.
    mc.addKeymapLayer(function(layerSet)
      -- Add cursors above/below (only when multicursor active)
      layerSet({ "n", "x" }, "<Up>", function()
        mc.lineAddCursor(-1)
      end)
      layerSet({ "n", "x" }, "<Down>", function()
        mc.lineAddCursor(1)
      end)

      -- Select a different cursor as the main one.
      layerSet({ "n", "x" }, "<left>", mc.prevCursor)
      layerSet({ "n", "x" }, "<right>", mc.nextCursor)

      -- Delete the main cursor.
      layerSet({ "n", "x" }, "<leader>x", mc.deleteCursor)

      -- Enable and clear cursors using escape.
      layerSet("n", "<esc>", function()
        if not mc.cursorsEnabled() then
          mc.enableCursors()
        else
          mc.clearCursors()
        end
      end)
    end)

    -- Customize how cursors look.
    local hl = vim.api.nvim_set_hl
    hl(0, "MultiCursorCursor", { reverse = true })
    hl(0, "MultiCursorVisual", { link = "Visual" })
    hl(0, "MultiCursorSign", { link = "SignColumn" })
    hl(0, "MultiCursorMatchPreview", { link = "Search" })
    hl(0, "MultiCursorDisabledCursor", { reverse = true })
    hl(0, "MultiCursorDisabledVisual", { link = "Visual" })
    hl(0, "MultiCursorDisabledSign", { link = "SignColumn" })
  end,
}
