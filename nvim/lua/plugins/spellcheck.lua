return {
  "neovim/nvim-lspconfig",
  opts = {
    servers = {
      harper_ls = {
        settings = {
          ["harper-ls"] = {
            userDictPath = "",
            workspaceDictPath = "",
            fileDictPath = "",
            linters = {
              SpellCheck = true,
              SpelledNumbers = false,
              AnA = true,
              SentenceCapitalization = true,
              UnclosedQuotes = true,
              WrongQuotes = false,
              LongSentences = true,
              RepeatedWords = true,
              Spaces = true,
              Matcher = true,
              CorrectNumberSuffix = true,
            },
            codeActions = {
              ForceStable = false,
            },
            markdown = {
              IgnoreLinkTitle = false,
            },
            diagnosticSeverity = "hint",
            isolateEnglish = false,
            dialect = "American",
            maxFileLength = 120000,
          },
        },
      },
    },
  },
}

-- return {
--   "neovim/nvim-lspconfig",
--   opts = {
--     setup = {
--       harper_ls = function(_, opts)
--         -- Additional settings for Phoenix projects
--         opts.settings = {
--           ["harper-ls"] = {
--             userDictPath = "",
--             workspaceDictPath = "",
--             fileDictPath = "",
--             linters = {
--               SpellCheck = true,
--               SpelledNumbers = false,
--               AnA = true,
--               SentenceCapitalization = true,
--               UnclosedQuotes = true,
--               WrongQuotes = false,
--               LongSentences = true,
--               RepeatedWords = true,
--               Spaces = true,
--               Matcher = true,
--               CorrectNumberSuffix = true,
--             },
--             codeActions = {
--               ForceStable = false,
--             },
--             markdown = {
--               IgnoreLinkTitle = false,
--             },
--             diagnosticSeverity = "hint",
--             isolateEnglish = false,
--             dialect = "American",
--             maxFileLength = 120000,
--           },
--         }
--       end,
--     },
--   },
-- }
