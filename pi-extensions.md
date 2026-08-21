# Pi Agent Extensions

Installed extensions on this pi agent. Update this file when adding or removing extensions.

## Installed Extensions

| # | Extension | Source | What it does |
| --- | ----------- | -------- | ------------- |
| 1 | **pi-mcp-adapter** | `npm:pi-mcp-adapter` | Token-efficient MCP adapter — lets pi use MCP servers without bloating the context window. Provides `mcp` and `mcpScript` tools. |
| 2 | **pi-web-access** | `npm:pi-web-access` | Web search & content extraction — 20+ search providers (Brave, Tavily, Kagi, etc.), URL fetching, PDF extraction, YouTube analysis. Registers `web_search`, `fetch_content`, `source_check`. |
| 3 | **rpiv-ask-user-question** | `npm:@juicesharp/rpiv-ask-user-question` | Structured questionnaire tool — presents 2–4 options with descriptions/previews instead of free-form replies. Supports i18n and single/multi-select. |
| 4 | **rpiv-todo** | `npm:@juicesharp/rpiv-todo` | Persistent task list overlay — TUI widget that survives `/reload` and compaction. Registers the `todo` tool and `/todos` command. |
| 5 | **pi-memory** | `npm:pi-memory` | Persistent memory with semantic search (via qmd) — daily logs, long-term memory (MEMORY.md), scratchpad, auto-generated session summaries on exit. |
| 6 | **pi-message-queue** | `npm:@matheusbbarni/pi-message-queue` | FIFO message queue — queue "steering" messages (after current turn) and "follow-up" messages (after all work) without interrupting the agent mid-task. |
| 7 | **pi-lens** | `npm:pi-lens` | Real-time code diagnostics — LSP errors, tree-sitter structural rules, ast-grep security rules, complexity checks, impact cascade analysis. Provides `lens_diagnostics` and `lsp_diagnostics`. |
| 8 | **pi-undo** | `npm:@davideasden/pi-undo` | Persistent workspace undo/redo — checkpoints capturing file states with `/undo` and `/redo` commands. Works without Git. |
| 9 | **pi-starship** | `npm:@narumitw/pi-starship` | Starship-style statusline — renders a TOML-configured prompt natively inside pi's TUI, no external Starship binary needed. |
| 10 | **pi-rewind** | `npm:pi-rewind` | Checkpoint & rewind — git-based snapshots per tool, `/rewind` command with redo stack. Restores files and conversation state after AI mistakes. |
| 11 | **context-mode** | `npm:context-mode` | Context window optimizer — ~98% savings via FTS5 knowledge base, intent-driven search, sandboxed code execution (`ctx_execute`, `ctx_search`, `ctx_index`). |
| 12 | **pi-task** | `npm:@mjasnikovs/pi-task` | Deterministic task planning — crash-safe `/task` pipelines with verify/enforce gates, subagent tools, remote web view. |
| 13 | **ui-customization** | `+extensions/ui-customization/index.ts` *(local)* | Custom TUI theme — animated gradient "pi" header, footer with directory/git/model/context info, hides default themes section. |

## Extension Categories

### Core / Infrastructure

- **pi-mcp-adapter** — MCP server integration
- **context-mode** — context window management
- **pi-lens** — code quality & diagnostics

### Web & Search

- **pi-web-access** — web search, fetching, content extraction

### Memory & State

- **pi-memory** — persistent memory & daily logs
- **pi-rewind** — git-based checkpoint/rewind
- **pi-undo** — file-level undo/redo

### Task Management

- **rpiv-todo** — persistent task list overlay
- **pi-task** — deterministic task pipelines

### User Interaction

- **rpiv-ask-user-question** — structured questionnaires
- **pi-message-queue** — message queuing for steering

### UI Customization

- **pi-starship** — Starship-style statusline
- **ui-customization** — custom header/footer/theme

## How to Install

```bash
pi install npm:<package-name>
```

## Changelog

- **2025-01-21** — Initial list created with 13 extensions
