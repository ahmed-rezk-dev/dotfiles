The tools to compare are:

1. graphify query - knowledge graph-based queries

2. symbol_search - BM25 identifier search

3. pi-worker - child agent investigation

4. project_report - project-level structural overview

5. module_report - file-level structural overview

6. read_symbol - read a single symbol's body

7. read_enclosing - read enclosing symbol around a line

8. lsp_navigation - IDE-style LSP navigation (definition, references, etc.)

9. ast_grep_search - AST-based structural code search

10. grep / bash - raw text search

11. ctx_search - knowledge base search (indexed content)

I'll explain each in simple English with practical examples of when to use each one.

Code Discovery Tools — Plain English Guide

Think of your codebase like a city. Each tool is a different way of finding things in that city.

────────────────────────────────────────────────────────────────────────────────

1. graphify query — The City Map

What it does: You built a knowledge graph of your entire codebase. It knows which files connect to which, which functions call which, and groups related code into "communities" (neighborhoods).

How it works: You ask a natural-language question like "How does authentication work?" and it walks the graph connections to find related files and functions.

Best for:

- "How does X relate to Y?"
- "What's the data flow from the API to the UI?"
- "What are the main parts of this codebase?"

Not good for:

- "Where is useFooStore defined?" (too specific — use symbol_search)
- "Show me every line that calls console.log" (use grep)

Analogy: Like asking a local guide "Where do people go for food around here?" — they'll tell you the restaurant district, not the exact address of one specific restaurant.

────────────────────────────────────────────────────────────────────────────────

1. symbol_search — The Phone Book

What it does: Searches for names — function names, variable names, class names, type names. Ranked by relevance.

How it works: You type useFooStore and it finds every file where that name appears, ranked by how important the match is (actual definitions rank higher than random mentions in comments).

Best for:

- "Where is useFooStore defined?"
- "Which files reference calculatePriceWithUnitDiscount?"
- Finding the right file when you know the name of something

Not good for:

- "How does the discount system work?" (too broad — use graphify)
- "Find all TODOs" (use grep)

Analogy: Like looking up a person's name in a phone directory. You get their address, not their life story.

────────────────────────────────────────────────────────────────────────────────

1. pi-worker — The Detective

What it does: Spawns a child agent that reads files, searches code, and comes back with just the answer — not the raw evidence.

How it works: You give it a task like "Find every place we log PII data" and it investigates across many files, then returns a clean summary.

Best for:

- Questions that span many files and you don't know where to start
- "Trace the flow from the router to the database"
- Audits: "Every place we use localStorage"
- Summarizing long test output or logs

Not good for:

- When you already know the exact file (just use read)
- When you need to edit files (it's read-only)

Analogy: Like hiring a private investigator. You say "Find out how the payment system works" and they come back with a report instead of handing you 50 boxes of documents.

────────────────────────────────────────────────────────────────────────────────

1. project_report — The City Aerial View

What it does: Gives you a bird's-eye structural overview of the entire project — which files are the most important hubs, which are entry points, which communities exist, and where the risk hotspots are.

How it works: Reads a cached graph of all file relationships (imports, dependencies) and ranks files by importance.

Best for:

- First time exploring a new codebase: "Orient me in this project"
- "What are the most important files?"
- "Where are the circular dependencies?"
- "What files have the most complexity?"

Not good for:

- Finding a specific function (use symbol_search)
- Understanding one file in detail (use module_report)

Analogy: Like looking at a city from a helicopter. You see the major highways, the downtown core, the industrial zone — but you can't read street signs.

────────────────────────────────────────────────────────────────────────────────

1. module_report — The Building Blueprint

What it does: Gives you a structured outline of one file — every function, class, type, and their relationships, without reading the whole file.

How it works: Parses the file's syntax tree and lists every symbol with its line numbers, who uses it, and what it depends on.

Best for:

- "What's in this file?" without reading 500 lines
- "Who calls handleFooValueChange?"
- "What does this file export?"
- Understanding a file's shape before diving in

Not good for:

- Reading the actual code inside a function (use read_symbol or read)
- Project-wide questions (use project_report)

Analogy: Like a building's floor plan. You see every room and where the doors are, but you don't see what's inside each room.

────────────────────────────────────────────────────────────────────────────────

1. read_symbol — Read One Room

What it does: Shows you the exact code of one function, class, or type — just that symbol, nothing else.

How it works: You say "Show me the body of useFooStore" and it extracts just that function's code.

Best for:

- "Show me what calculatePriceWithUnitDiscount actually does"
- Reading a specific function without loading the whole file

Not good for:

- Understanding the file structure (use module_report)
- Finding where something is (use symbol_search first)

Analogy: Like opening one specific room in the building. You see exactly what's inside, nothing more.

────────────────────────────────────────────────────────────────────────────────

1. read_enclosing — "What's Around This Line?"

What it does: You point at a line number and it shows you the smallest function/block that contains that line.

How it works: Useful when you see an error at line 142 and want to understand the function it's in.

Best for:

- "What function is line 142 inside?"
- After finding an error location, understanding its context

Not good for:

- Reading a whole file (use read)
- Getting a file overview (use module_report)

Analogy: Like dropping a pin on a map and asking "What building is this inside?"

────────────────────────────────────────────────────────────────────────────────

1. lsp_navigation — The IDE Superpowers

What it does: Exactly what your IDE does — Go to Definition, Find All References, Rename, Call Hierarchy.

How it works: Uses the TypeScript language server (or whatever language you're using) for precise, type-aware navigation.

Best for:

- "Where is this function defined?" (exact, type-aware)
- "Show me every place this function is called"
- "What does this type resolve to?"
- Renaming a symbol across the codebase

Not good for:

- Vague questions like "How does auth work?" (use graphify)
- Searching for patterns, not specific symbols (use ast_grep_search)

Analogy: Like right-clicking in your IDE and choosing "Go to Definition." It's precise but you need to know exactly what you're clicking on.

────────────────────────────────────────────────────────────────────────────────

1. ast_grep_search — Structural Pattern Matching

What it does: Searches for code patterns, not text. Understands the syntax tree.

How it works: Instead of searching for the text "useState" (which would match comments, strings, etc.), you search for the pattern of a useState call in the AST.

Best for:

- "Find every React component that uses useEffect"
- "Find all arrow functions that return JSX"
- "Find every API call that doesn't handle errors"
- Patterns that text grep would get wrong

Not good for:

- Simple text search (just use grep)
- Natural-language questions (use graphify)

Analogy: Like searching for "all red cars with 4 doors" instead of just "red." It understands the structure of what you're looking for.

────────────────────────────────────────────────────────────────────────────────

1. grep / bash — The Raw Text Search

What it does: Searches for exact text in files. Simple, fast, powerful.

How it works: grep -r "TODO" src/ finds every file containing "TODO."

Best for:

- "Find every file containing the string NO_OP_CACHE_KEY"
- "How many files have console.log?"
- Quick, exact text matches
- Counting things

Not good for:

- "Find all React hooks" (would match comments, strings — use ast_grep)
- "How does the payment flow work?" (use graphify or pi-worker)

Analogy: Like Ctrl+F across your entire codebase. Fast and exact, but dumb.

────────────────────────────────────────────────────────────────────────────────

1. ctx_search — Your Session Memory

What it does: Searches a knowledge base of things you've indexed — documentation, past session events, indexed files, API docs.

How it works: Full-text search with smart ranking. Finds snippets from things you've previously stored.

Best for:

- "What did we decide about caching?" (past session decisions)
- Recalling something from documentation you indexed earlier
- "What errors did we hit last session?"

Not good for:

- Finding code in the current codebase (use symbol_search)
- Questions about files you haven't indexed (use grep or pi-worker)

Analogy: Like searching your personal notebook. Only has what you've written down.

────────────────────────────────────────────────────────────────────────────────

Quick Decision Cheat Sheet

┌────────────────────────────────────┬──────────────────────────────────┐
│ You want to... │ Use this │
├────────────────────────────────────┼──────────────────────────────────┤
│ Understand the big picture │ project_report or graphify query │
├────────────────────────────────────┼──────────────────────────────────┤
│ Find a file by name │ symbol_search │
├────────────────────────────────────┼──────────────────────────────────┤
│ Understand one file's shape │ module_report │
├────────────────────────────────────┼──────────────────────────────────┤
│ Read one function's code │ read_symbol │
├────────────────────────────────────┼──────────────────────────────────┤
│ "What's around line X?" │ read_enclosing │
├────────────────────────────────────┼──────────────────────────────────┤
│ Go to definition / find references │ lsp_navigation │
├────────────────────────────────────┼──────────────────────────────────┤
│ Search a code pattern (not text) │ ast_grep_search │
├────────────────────────────────────┼──────────────────────────────────┤
│ Find exact text │ grep │
├────────────────────────────────────┼──────────────────────────────────┤
│ Investigate across many files │ pi-worker │
├────────────────────────────────────┼──────────────────────────────────┤
│ Ask a natural-language question │ graphify query │
├────────────────────────────────────┼──────────────────────────────────┤
│ Recall past session knowledge │ ctx_search │
└────────────────────────────────────┴──────────────────────────────────┘

────────────────────────────────────────────────────────────────────────────────

The Key Difference in One Sentence

- graphify = relationships and architecture (the map)
- symbol_search = find things by name (the phone book)
- pi-worker = delegate investigation to a child agent (the detective)
- project_report = bird's-eye structural overview (the helicopter)
- module_report = one file's outline (the blueprint)
- read_symbol = one function's code (the microscope)
- lsp_navigation = IDE-precise navigation (the right-click menu)
- ast_grep_search = structural code patterns (the smart filter)
- grep = exact text search (the Ctrl+F)
- ctx_search = your saved knowledge (the notebook)
