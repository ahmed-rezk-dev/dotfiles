return {
  "jake-stewart/multicursor.nvim",
  branch = "1.0",
  config = function()
    local mc = require("multicursor-nvim")

    mc.setup()

    -- Add key mappings
    local set = vim.keymap.set

    -- Add cursors above/below the main cursor
    set({"n", "x"}, "<c-k>", function() mc.addCursor("k") end)
    set({"n", "x"}, "<c-j>", function() mc.addCursor("j") end)

    -- Add a cursor and jump to the next word under cursor
    set({"n", "x"}, "<c-n>", function() mc.addCursor("*") end)

    -- Jump to the next word under cursor but do not add a cursor
    set({"n", "x"}, "<c-s>", function() mc.skipCursor("*") end)

    -- Rotate the main cursor
    set({"n", "x"}, "<left>", mc.nextCursor)
    set({"n", "x"}, "<right>", mc.prevCursor)

    -- Delete the main cursor
    set({"n", "x"}, "<leader>x", mc.deleteCursor)

    -- Add and remove cursors with mouse
    set("n", "<c-leftmouse>", mc.handleMouse)

    -- Easy way to add and remove cursors using the main cursor
    set({"n", "x"}, "<c-q>", mc.toggleCursor)

    -- Clone every cursor and disable the originals
    set({"n", "x"}, "<leader><c-q>", mc.duplicateCursors)

    -- Align cursor columns
    set("n", "<leader>a", mc.alignCursors)

    -- Split visual selections by regex
    set("x", "S", mc.splitCursors)

    -- Append/insert for each line of visual selections
    set("x", "I", mc.insertVisual)
    set("x", "A", mc.appendVisual)

    -- Match new cursors within visual selections by regex
    set("x", "M", mc.matchCursors)

    -- Rotate visual selection contents
    set("x", "<leader>t", function() mc.transposeCursors(1) end)
    set("x", "<leader>T", function() mc.transposeCursors(-1) end)

    -- Jumplist support
    set({"n", "x"}, "<c-o>", mc.jumpForward)
    set({"n", "x"}, "<c-i>", mc.jumpBackward)

    -- Customize how cursors look
    local hl = vim.api.nvim_set_hl
    hl(0, "MultiCursorCursor", { link = "Cursor" })
    hl(0, "MultiCursorVisual", { link = "Visual" })
    hl(0, "MultiCursorSign", { link = "SignColumn"})
    hl(0, "MultiCursorDisabledCursor", { link = "Visual" })
    hl(0, "MultiCursorDisabledVisual", { link = "Visual" })
    hl(0, "MultiCursorDisabledSign", { link = "SignColumn"})
  end,
}