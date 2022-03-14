vim.cmd([[
try
  colorschem nightfoxe
catch /^Vim\%((\a\+)\)\=:E185/
  colorscheme default
  set background=dark
endtry
]])
