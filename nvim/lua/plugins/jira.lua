return {
  "shcode/jira.nvim",
  opts = {
    -- Your setup options...
    jira = {
      base = "https://jira.cengage.com", -- Base URL of your Jira instance
      email = "ahmed.rezk@cengage.com",           -- Your Jira email (Optional for PAT)
      -- email = "arezk48437 ",           -- Your Jira email (Optional for PAT)
      token = "***REMOVED***",                   -- Your Jira API token or PAT
      auth_type = "bearer",                        -- "basic" (default) or "bearer"
      api_version = "2",                          -- Jira API version: "2" or "3" (default: "3")
      use_jql_post = false,                        -- Use /search/jql endpoint (default: true). Set to false for /search
      resolve_current_user = false,               -- Replace currentUser() with accountId in JQL (default: false)
      debug = true,                              -- Enable debug logging for API calls (default: false)
      limit = 500,                                -- Global limit of tasks per view
    },

-- Saved JQL queries for the JQL tab
  -- Use %s as a placeholder for the project key
  queries = {
    ["Backlog"] = "project = 'E2G' AND statusCategory != Done ORDER BY Rank ASC",
    ["My Tasks"] = "assignee = currentUser() ORDER BY updated DESC",
    ["Kanban Board"] = "project = 'E2G' AND labels = 'Shopper_Acc' ORDER BY Rank ASC"
  },

  -- Project-specific overrides
  -- Still think about this config, maybe not good enough
  -- projects = {
  --   ["E2G"] = {
  --     story_point_field = "customfield_10035",      -- Custom field ID for story points
  --     custom_fields = { -- Custom field to display in markdown view
  --       { key = "customfield_10016", label = "Acceptance Criteria" }
  --     },
  --   }
  -- }
  },

  keys = { { "<leader>sJ", "<cmd>Jira E2G<CR>", mode = { "n" }, desc = "Open Jira" } },
}
