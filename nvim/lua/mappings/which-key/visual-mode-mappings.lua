return {

  mode = { "v" },
  { "<leader>a",   group = "Actions",          nowait = true, remap = false },
  { "<leader>ac",  desc = "comment box",       nowait = true, remap = false },

  { "<leader>c",   group = "LSP",              nowait = true, remap = false },
  { "<leader>ca",  desc = "range code action", nowait = true, remap = false },
  { "<leader>cf",  desc = "range format",      nowait = true, remap = false },

  { "<leader>g",   group = "Git",              nowait = true, remap = false },
  { "<leader>gh",  group = "Hunk",             nowait = true, remap = false },
  { "<leader>ghr", desc = "reset hunk",        nowait = true, remap = false },
  { "<leader>ghs", desc = "stage hunk",        nowait = true, remap = false },

  { "<leader>p",   group = "Project",          nowait = true, remap = false },
  { "<leader>pr",  desc = "refactor",          nowait = true, remap = false },
  { "<leader>s",   "<cmd>'<,'>sort<CR>",       desc = "sort", nowait = true, remap = false },

  { "<leader>t",   group = "Table Mode",       nowait = true, remap = false },
  { "<leader>tt",  desc = "tableize",          nowait = true, remap = false },
}
