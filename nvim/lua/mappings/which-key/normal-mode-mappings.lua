return {
  -- ignore
  { "<leader>1", hidden = true, nowait = true, remap = false },
  { "<leader>2", hidden = true, nowait = true, remap = false },
  { "<leader>3", hidden = true, nowait = true, remap = false },
  { "<leader>4", hidden = true, nowait = true, remap = false },
  { "<leader>5", hidden = true, nowait = true, remap = false },
  { "<leader>6", hidden = true, nowait = true, remap = false },
  { "<leader>7", hidden = true, nowait = true, remap = false },
  { "<leader>8", hidden = true, nowait = true, remap = false },
  { "<leader>9", hidden = true, nowait = true, remap = false },

  -- Home
  { "<leader>A", "<cmd>qa<CR>", desc = "Quit All", nowait = true, remap = false },
  { "<leader>V", "<C-W>s", desc = "split below", nowait = true, remap = false },
  { "<leader>q", "<cmd>q!<CR>", desc = "Quit", nowait = true, remap = false },
  --{ "<leader>z", "<cmd>ZenMode<CR>", buffer = 69, desc = "zen", nowait = true, remap = false },

  -- Config
  { "<leader>/", group = "Config", nowait = true, remap = false },
  { "<leader>//", "<cmd>Alpha<CR>", desc = "open dashboard", nowait = true, remap = false },
  { "<leader>/c", "<cmd>e $MYVIMRC<CR>", desc = "open config", nowait = true, remap = false },
  { "<leader>/i", "<cmd>Lazy<CR>", desc = "manage plugins", nowait = true, remap = false },
  { "<leader>/u", "<cmd>Lazy update<CR>", desc = "update plugins", nowait = true, remap = false },


  -- Actions
  { "<leader>a", group = "Actions", nowait = true, remap = false },
  { "<leader>ac", desc = "comment box", nowait = true, remap = false },
  { "<leader>an", "<cmd>set nonumber!<CR>", desc = "line numbers", nowait = true, remap = false },
  { "<leader>ar", "<cmd>set norelativenumber!<CR>", desc = "relative number", nowait = true, remap = false },
  { "<leader>at", "<cmd>ToggleTerm direction=float<CR>", desc = "terminal float", nowait = true, remap = false },

  -- Buffer
  { "<leader>b", group = "Buffer", nowait = true, remap = false },
  { "<leader>bP", "<cmd>BufferLineTogglePin<CR>", desc = "Pin/Unpin Buffer", nowait = true, remap = false },
  { "<leader>bb", "<cmd>BufferLineMovePrev<CR>", desc = "Move back", nowait = true, remap = false },
  { "<leader>bc", '<cmd>lua require("utils").closeOtherBuffers()<CR>', desc = "Close but current", nowait = true, remap = false },
  { "<leader>bd", "<cmd>BufferOrderByDirectory<CR>", desc = "Order by directory", nowait = true, remap = false },
  { "<leader>bf", "<cmd>bfirst<CR>", desc = "First buffer", nowait = true, remap = false },
  { "<leader>bl", "<cmd>BufferLineCloseLeft<CR>", desc = "Close Left", nowait = true, remap = false },
  { "<leader>bn", "<cmd>BufferLineMoveNext<CR>", desc = "Move next", nowait = true, remap = false },
  { "<leader>bp", "<cmd>BufferLinePick<CR>", desc = "Pick Buffer", nowait = true, remap = false },
  { "<leader>br", "<cmd>BufferLineCloseRight<CR>", desc = "Close Right", nowait = true, remap = false },
  -- Sort Buffers
  { "<leader>bs", group = "Sort", nowait = true, remap = false },
  { "<leader>bsd", "<cmd>BufferLineSortByDirectory<CR>", desc = "Sort by directory", nowait = true, remap = false },
  { "<leader>bse", "<cmd>BufferLineSortByExtension<CR>", desc = "Sort by extension", nowait = true, remap = false },
  { "<leader>bsr", "<cmd>BufferLineSortByRelativeDirectory<CR>", desc = "Sort by relative dir", nowait = true, remap = false },

  -- LSP
  { "<leader>c", group = "LSP", nowait = true, remap = false },
  { "<leader>cD", "<cmd>Telescope diagnostics wrap_results=true<CR>", desc = "workspace diagnostics", nowait = true, remap = false },
  { "<leader>cR", desc = "structural replace", nowait = true, remap = false },
  { "<leader>ca", desc = "code action", nowait = true, remap = false },
  { "<leader>cd", "<cmd>TroubleToggle<CR>", desc = "local diagnostics", nowait = true, remap = false },
  { "<leader>cf", desc = "format", nowait = true, remap = false },
  { "<leader>cl", desc = "line diagnostics", nowait = true, remap = false },
  { "<leader>cr", desc = "rename", nowait = true, remap = false },
  { "<leader>cs", "<cmd>LspRestart<CR>", desc = "Restart LSP", nowait = true, remap = false },
  { "<leader>ct", "<cmd>LspToggleAutoFormat<CR>", desc = "toggle format on save", nowait = true, remap = false },
  { "<leader>al", "<cmd>:put =printf('console.log('' 🔔 %s 👉 %s 👉 %s:'', %s);', line('.'), expand('%:t'), expand('<cword>'), expand('<cword>'))<cr>", desc = "Javascript Log", nowait = true, remap = false },

  { "<leader>d", group = "Debug", nowait = true, remap = false },
  { "<leader>dC", desc = "close UI", nowait = true, remap = false },
  { "<leader>dO", desc = "step out", nowait = true, remap = false },
  { "<leader>dV", desc = "log variable above", nowait = true, remap = false },
  { "<leader>da", desc = "attach", nowait = true, remap = false },
  { "<leader>db", desc = "breakpoint", nowait = true, remap = false },
  { "<leader>dc", desc = "continue", nowait = true, remap = false },
  { "<leader>dd", desc = "continue", nowait = true, remap = false },
  { "<leader>dh", desc = "visual hover", nowait = true, remap = false },
  { "<leader>di", desc = "step into", nowait = true, remap = false },
  { "<leader>do", desc = "step over", nowait = true, remap = false },
  { "<leader>dr", desc = "repl", nowait = true, remap = false },
  { "<leader>ds", desc = "scopes", nowait = true, remap = false },
  { "<leader>dt", desc = "terminate", nowait = true, remap = false },
  { "<leader>dv", desc = "log variable", nowait = true, remap = false },
  { "<leader>dw", desc = "watches", nowait = true, remap = false },
  { "<leader>e", "<cmd>NvimTreeToggle<cr>", desc = "Files Explorer", nowait = true, remap = false },
  { "<leader>f", "<cmd>Telescope find_files<cr>", desc = "Find files", nowait = true, remap = false },

  { "<leader>g", group = "Git", nowait = true, remap = false },
  { "<leader>gA", "<cmd>!git add .<CR>", desc = "add all", nowait = true, remap = false },
  { "<leader>gB", "<cmd>Telescope git_branches<CR>", desc = "branches", nowait = true, remap = false },
  { "<leader>gS", "<cmd>Telescope git_status<CR>", desc = "telescope status", nowait = true, remap = false },
  { "<leader>ga", "<cmd>!git add %:p<CR>", desc = "add current", nowait = true, remap = false },
  { "<leader>gb", '<cmd>lua require("internal.blame").open()<CR>', desc = "blame", nowait = true, remap = false },

  { "<leader>gc", group = "Conflict", nowait = true, remap = false },
  { "<leader>gcb", "<cmd>GitConflictChooseBoth<CR>", desc = "choose both", nowait = true, remap = false },
  { "<leader>gcn", "<cmd>GitConflictNextConflict<CR>", desc = "move to next conflict", nowait = true, remap = false },
  { "<leader>gco", "<cmd>GitConflictChooseOurs<CR>", desc = "choose ours", nowait = true, remap = false },
  { "<leader>gcp", "<cmd>GitConflictPrevConflict<CR>", desc = "move to prev conflict", nowait = true, remap = false },
  { "<leader>gct", "<cmd>GitConflictChooseTheirs<CR>", desc = "choose theirs", nowait = true, remap = false },
  { "<leader>gdf", '<cmd>lua require("plugins.git.diffview").toggle_file_history()<CR>', desc = "diff file", nowait = true, remap = false },
  { "<leader>gdh", "<cmd>DiffviewFileHistory %<cr>", desc = "File History / Current File", nowait = true, remap = false },
  { "<leader>gdo", "<cmd>DiffviewOpen<cr>", desc = "Open Diffview", nowait = true, remap = false },
  { "<leader>gdq", "<cmd>DiffviewClose<cr>", desc = "Close Diffview", nowait = true, remap = false },
  { "<leader>gdr", "<cmd>DiffviewRefresh<cr>", desc = "Refresh Diffview", nowait = true, remap = false },
  { "<leader>gg", "<cmd>LazyGit<CR>", desc = "lazygit", nowait = true, remap = false },

  { "<leader>gh", group = "Hunk", nowait = true, remap = false },
  { "<leader>ghR", desc = "reset buffer", nowait = true, remap = false },
  { "<leader>ghS", desc = "stage buffer", nowait = true, remap = false },
  { "<leader>ghd", desc = "diff hunk", nowait = true, remap = false },
  { "<leader>ghp", desc = "preview", nowait = true, remap = false },
  { "<leader>ghr", desc = "reset hunk", nowait = true, remap = false },
  { "<leader>ghs", desc = "stage hunk", nowait = true, remap = false },
  { "<leader>ght", desc = "toggle deleted", nowait = true, remap = false },
  { "<leader>ghu", desc = "undo stage", nowait = true, remap = false },

  { "<leader>gl", group = "Log", nowait = true, remap = false },
  { "<leader>glA", '<cmd>lua require("plugins.telescope").my_git_commits()<CR>', desc = "commits (Telescope)", nowait = true, remap = false },
  { "<leader>glC", '<cmd>lua require("plugins.telescope").my_git_bcommits()<CR>', desc = "buffer commits (Telescope)", nowait = true, remap = false },
  { "<leader>gla", "<cmd>LazyGitFilter<CR>", desc = "commits", nowait = true, remap = false },
  { "<leader>glc", "<cmd>LazyGitFilterCurrentFile<CR>", desc = "buffer commits", nowait = true, remap = false },
  { "<leader>gm", desc = "blame line", nowait = true, remap = false },
  { "<leader>gn", "<cmd>Neogit<CR>", desc = "Neogit", nowait = true, remap = false },
  { "<leader>gs", '<cmd>lua require("plugins.git.diffview").toggle_status()<CR>', desc = "status", nowait = true, remap = false },

  { "<leader>gw", group = "Worktree", nowait = true, remap = false },
  { "<leader>gwc", desc = "create worktree", nowait = true, remap = false },
  { "<leader>gww", desc = "worktrees", nowait = true, remap = false },
  { "<leader>h", '<cmd>let @/=""<CR>', desc = "No Highlight", nowait = true, remap = false },
  { "<leader>l", ":SessionRestore<cr>", desc = "Load Session", nowait = true, remap = false },

  { "<leader>p", group = "Project", nowait = true, remap = false },
  { "<leader>pf", desc = "file", nowait = true, remap = false },
  { "<leader>pl", "<cmd>lua require'telescope'.extensions.repo.cached_list{file_ignore_patterns={'/%.cache/', '/%.cargo/', '/%.local/', '/%timeshift/', '/usr/', '/srv/', '/%.oh%-my%-zsh', '/Library/', '/%.cocoapods/'}}<CR>", desc = "list", nowait = true, remap = false },

  { "<leader>pr", group = "Search & Replace", nowait = true, remap = false },
  { "<leader>prf", "<cmd>lua require('spectre').open_file_search()<cr>", desc = "Search current file", nowait = true, remap = false },
  { "<leader>prs", "<cmd>lua require('spectre').open_visual()<cr>", desc = "Search panel", nowait = true, remap = false },
  { "<leader>prw", "<cmd>lua require('spectre').open_visual({select_word=true})<cr>", desc = "Search current word", nowait = true, remap = false },

  { "<leader>ps", group = "Sessions", nowait = true, remap = false },
  { "<leader>psG", "<cmd>lua require('nvim-possession').update()<cr>", desc = "update", nowait = true, remap = false },
  { "<leader>psS", ":Telescope session-lens search_session<cr>", desc = "All Sessions", nowait = true, remap = false },
  { "<leader>psf", "<cmd>lua require('nvim-possession').list()<cr>", desc = "list", nowait = true, remap = false },
  { "<leader>psg", "<cmd>lua require('nvim-possession').new()<cr>", desc = "new", nowait = true, remap = false },
  { "<leader>psl", ":SessionRestore<cr>", desc = "Load Session", nowait = true, remap = false },
  { "<leader>pss", ":SessionSave<cr>", desc = "Save Session", nowait = true, remap = false },
  { "<leader>pt", "<cmd>TodoTrouble<CR>", desc = "todo", nowait = true, remap = false },
  { "<leader>pw", desc = "word", nowait = true, remap = false },

  -- Search
  { "<leader>s", group = "Search", nowait = true, remap = false },
  { "<leader>sD", group = "Devdocs", nowait = true, remap = false },
  { "<leader>sDC", ":DevdocsOpenCurrentFloat<cr>", desc = "Devdocs Open Current Float", nowait = true, remap = false },
  { "<leader>sDO", ":DevdocsOpenFloat<cr>", desc = "Devdocs Open Float", nowait = true, remap = false },
  { "<leader>sDU", ":DevdocsUpdateAll<cr>", desc = "Devdocs Update All", nowait = true, remap = false },
  { "<leader>sDc", ":DevdocsOpenCurrent<cr>", desc = "Devdocs Open Current", nowait = true, remap = false },
  { "<leader>sDf", ":DevdocsFetch<cr>", desc = "Devdocs Fetch", nowait = true, remap = false },
  { "<leader>sDi", ":DevdocsInstall<cr>", desc = "Devdocs Install", nowait = true, remap = false },
  { "<leader>sDo", ":DevdocsOpen<cr>", desc = "Devdocs Open", nowait = true, remap = false },
  { "<leader>sDr", ":DevdocsUninstall<cr>", desc = "Devdocs Unistall", nowait = true, remap = false },
  { "<leader>sDu", ":DevdocsUpdate<cr>", desc = "Devdocs Update", nowait = true, remap = false },
  { "<leader>sH", '<cmd>lua require("plugins.telescope").command_history()<CR>', desc = "command history", nowait = true, remap = false },
  { "<leader>sM", "<cmd>Telescope marks theme=dropdown<CR>", desc = "Marks", nowait = true, remap = false },
  { "<leader>sR", "<cmd>Telescope registers<CR>", desc = "Registers", nowait = true, remap = false },
  { "<leader>sS", "<cmd>Telescope search_history theme=dropdown<CR>", desc = "search history", nowait = true, remap = false },
  { "<leader>sc", "<cmd>Telescope colorscheme<CR>", desc = "color schemes", nowait = true, remap = false },
  { "<leader>sd", '<cmd>lua require("plugins.telescope").edit_neovim()<CR>', desc = "dotfiles", nowait = true, remap = false },
  { "<leader>sf", "<cmd>FzfLua files<cr>", desc = "Files", nowait = true, remap = false },
  { "<leader>sh", "<cmd>Telescope oldfiles hidden=true<CR>", desc = "file history", nowait = true, remap = false },
  { "<leader>sr", "<cmd>FzfLua lsp_references<cr>", desc = "References", nowait = true, remap = false },
  { "<leader>ss", "<cmd>FzfLua live_grep<cr>", desc = "Live Grep", nowait = true, remap = false },
  { "<leader>sw", "<cmd>Telescope live_grep<cr>", desc = "Find words", nowait = true, remap = false },

  { "<leader>t", group = "Table Mode", nowait = true, remap = false },
  { "<leader>tm", desc = "toggle", nowait = true, remap = false },
  { "<leader>tt", desc = "tableize", nowait = true, remap = false },
  { "<leader>v", "<C-W>v", desc = "split right", nowait = true, remap = false },
}
