---
name: obsidian-excalidraw-generated-diagram
description: "Use when asked to draw a diagram/ER diagram/UI prototype in Obsidian Excalidraw and verify it renders, generating the .excalidraw.md file programmatically."
---

# Generate an Obsidian Excalidraw drawing programmatically

1. Find the vault: read `~/Library/Application Support/obsidian/obsidian.json` (vault paths, `open:true` = active). Confirm `.obsidian/plugins/obsidian-excalidraw-plugin` exists in it. `vault://` may list none; use filesystem paths. Prefer a non-registry folder (e.g. `outputs/`) in LLM-wiki vaults, not `wiki/`.
2. Build elements in a Python eval cell (keep state across cells): rectangles (table boxes grouped with title/body text via `groupIds`), `text` (fontFamily 3 monospace for columns, 2 for UI-like text), `arrow`/`line` with `points`, `startBinding`/`endBinding` to box ids and matching `boundElements`. Use roughness 0, dashed `strokeStyle` for soft links, colors per domain area.
3. Text elements: set `width` generously (chars * fontSize * 0.66) or glyphs get clipped on render (e.g. pill labels 'NEW' -> 'NEV').
4. File format (uncompressed works): frontmatter `excalidraw-plugin: parsed` + `tags: [excalidraw]`, the '==⚠ Switch to EXCALIDRAW VIEW ...==' line, `# Excalidraw Data`, `## Text Elements` (each `text ^id`), then `%%`, `## Drawing`, a ```json fence with `{type:'excalidraw',version:2,elements,appState,files:{}}`, closing fence, `%%`. Build fences with `'`'*3` in code to avoid cell-parser issues with triple-quoted f-strings.
5. Verify render without Obsidian: browser.open https://excalidraw.com, `localStorage.setItem('excalidraw', JSON.stringify(elements))` and `excalidraw-state` ({scrollX,scrollY,zoom:{value}}), reload, screenshot at several zoom/scroll values; fix overlapping labels; close the tab. Say plainly it was not verified inside Obsidian itself.
6. Tell the user the file path and 'Open as Excalidraw drawing' if it opens as markdown.
