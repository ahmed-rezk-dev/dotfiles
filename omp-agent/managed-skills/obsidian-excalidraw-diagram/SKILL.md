---
name: obsidian-excalidraw-diagram
description: Generate an Obsidian Excalidraw (.excalidraw.md) diagram programmatically (e.g. table/ER relationship maps) and visually verify it in the browser.
---

# Obsidian Excalidraw diagram from code

1. Find the vault: `~/Library/Application Support/obsidian/obsidian.json` (vaults, `open:true` = active). Pick one whose `.obsidian/community-plugins.json` lists `obsidian-excalidraw-plugin`. Put non-wiki drawings in `outputs/` (not `wiki/`, which is registry-tracked in LLM-wiki vaults).
2. Build elements in Python (via eval): each box = rectangle (id `box_<name>`) + header rectangle + text elements sharing a groupId; arrows = type `arrow` with `points`, `startBinding`/`endBinding` to `box_*` ids, and push `{type:'arrow',id}` into each box's `boundElements`. Use roughness 0, fontFamily 3 (mono) for column lists, ~18px per line, ~0.6*fontSize per char width. Solid = real FK (child -> referenced), dashed red = soft link (no FK).
3. File format: frontmatter `excalidraw-plugin: parsed` + `tags: [excalidraw]`, the standard warning line, `# Excalidraw Data`, `## Text Elements` (`text ^id` per text element), then `%%\n## Drawing\n` + a json code fence with `{type:'excalidraw',version:2,elements,appState,files:{}}` + `\n%%`. Build the fence with `chr(96)*3` / `'`'*3` concatenation, NOT inside a triple-quoted f-string (breaks the eval cell).
4. Verify visually without Obsidian: open https://excalidraw.com in the browser tool, set `localStorage.excalidraw` = JSON of elements and `localStorage['excalidraw-state']` = `{scrollX,scrollY,zoom:{value}}`, reload, screenshot at ~0.55 (overview) and ~0.9 (readability). Fix overlapping labels by editing text x/y in-kernel, rewrite the file, re-render. Close the tab after.
5. Tell the user the path and to use 'Open as Excalidraw drawing' if it opens as markdown; note it was verified on excalidraw.com, not inside Obsidian.
