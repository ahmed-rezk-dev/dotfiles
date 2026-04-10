return {
  "akinsho/git-conflict.nvim",
  version = "*",
  event = "BufRead",
  config = function()
    require("git-conflict").setup({
      default_commander = {
        { key = "co", label = "Accept Ours", cmd = "GitConflictChooseOurs" },
        { key = "ct", label = "Accept Theirs", cmd = "GitConflictChooseTheirs" },
        { key = "cb", label = "Accept Both", cmd = "GitConflictChooseBoth" },
        { key = "c0", label = "Accept None", cmd = "GitConflictChooseNone" },
        { key = "q", label = "Quit", cmd = "GitConflictQuit" },
      },
      default_mappings = true,
      highlights = {
        incoming = "DiffAdd",
        current = "DiffText",
      },
    })
  end,
}
