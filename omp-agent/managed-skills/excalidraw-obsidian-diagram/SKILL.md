---
name: excalidraw-obsidian-diagram
description: "Generate an Excalidraw diagram (tables, UI mock-ups, labelled arrows) as an Obsidian .excalidraw.md file via a Python script and verify it renders."
---

# Generate an Obsidian Excalidraw diagram programmatically

1. Pick the vault: read ~/Library/Application Support/obsidian/obsidian.json, choose the open vault whose `.obsidian/community-plugins.json` lists `obsidian-excalidraw-plugin`. Put the file in a non-wiki folder (e.g. `outputs/`) if the vault is an LLM wiki.
2. Build elements in Python (eval py cell): helpers for `rectangle`, `text` (fontFamily 3 monospace for columns, 2 for UI), `line`, `arrow` (points relative to x,y), `ellipse` badges. Every element needs the full prop set (id, seed, version, versionNonce, isDeleted, boundElements, updated, link, locked, groupIds, roundness...). Text: set width generously (`len*fontSize*0.66`) or glyphs get clipped on render. Group a table's rect+header+text with one groupId.
3. File format (use uncompressed JSON): frontmatter `excalidraw-plugin: parsed` + `tags: [excalidraw]`, the `==⚠ Switch to EXCALIDRAW VIEW...==` line, `# Excalidraw Data`, `## Text Elements` (each `text ^id`), then `%%\n## Drawing\n` + a ```json fence + doc + closing fence + `%%`. Build the fence with `"`"*3` in Python (literal backticks break the eval cell).
4. Verify without Obsidian: save doc JSON to /tmp, open https://excalidraw.com in the browser tool, set `localStorage.excalidraw` = JSON of elements and `excalidraw-state` = {scrollX, scrollY, zoom:{value}}, reload, screenshot at several zooms; fix overlaps/clipping; close the tab.
5. Layout tips: color-code by table group; solid arrows = real FKs (child -> parent), dashed red = soft links (same value, no FK); keep arrows unbound if placed manually; order target tables to match the vertical order of the UI pieces to limit crossings; number badges at both ends of UI->source arrows plus a legend.
6. Tell the user the file path and that it was verified on excalidraw.com, not inside Obsidian.
