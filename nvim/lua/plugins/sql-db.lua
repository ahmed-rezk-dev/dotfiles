return {
  "kndndrj/nvim-dbee",
  dependencies = {
    "MunifTanjim/nui.nvim",
  },
  build = function()
    -- Install tries to automatically detect the install method.
    -- if it fails, try calling it with one of these parameters:
    --    "curl", "wget", "bitsadmin", "go"
    require("dbee").install()
  end,
  config = function()
    require("dbee").setup({
      sources = {
        require("dbee.sources").MemorySource:new({
          {
            name = "DotNetCourseDatabase",
            type = "sqlserver",
            url = "jdbc:sqlserver://localhost;Database=DotNetCourseDatabase;TrustServerCertificate=True;Trusted_Connection=falseencrypt=true;user=sa;password=SQLConnect1;"
          },
        }),
      },
    })
  end,
}
