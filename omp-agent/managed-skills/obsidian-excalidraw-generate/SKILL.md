---
name: obsidian-excalidraw-generate
description: Programmatically generate an Obsidian Excalidraw drawing (.excalidraw.md) from Python and visually verify it via excalidraw.com in the managed browser.
---

## When
User wants a diagram/ER map/UI mock-up "in Obsidian Excalidraw". Prefer extending ONE existing file; add sections instead of new files.

## Find the vault
`~/Library/Application Support/obsidian/obsidian.json` lists vaults (`"open":true` = active). Check `<vault>/.obsidian/community-plugins.json` for `obsidian-excalidraw-plugin`. `vault://` tool may list none; use paths. For MavOS: `/Users/ahmed.rezk/method/mavos/docs/.llm-wiki` (put drawings in `outputs/`, not `wiki/`, which is registry-tracked). Existing drawing: `outputs/mavos-engine-checkbox-tables.excalidraw.md`.

## File format (uncompressed works)
```
---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW ... ⚠==

# Excalidraw Data

## Text Elements
<text> ^<id>   (one per text element)

%%
## Drawing
```json
{"type":"excalidraw","version":2,"elements":[...],"appState":{...},"files":{}}
```
%%
```

## Generate (python in `eval`)
- In the eval kernel, avoid triple-quoted f-strings containing backtick fences; build the fence as `"`"*3` and concatenate.
- State persists across eval cells (els list, boxes dict, helpers) so you can patch/append later; re-write file + `/tmp/*.excalidraw` each time.
- Element needs full props (id, seed, version, versionNonce, isDeleted, boundElements, updated, link, locked, roundness...). Text: containerId None, lineHeight 1.25, autoResize. Arrow: points, startBinding/endBinding {elementId, focus:0, gap:2}; also append {"type":"arrow","id"} to both boxes' boundElements. Use roughness 0, fontFamily 3 (mono) for column lists, 2 for UI text.
- Set text width generously (len*fontSize*0.66+4) or glyphs get clipped (e.g. pill labels).
- Table box = rect + colored header rect + title/subtitle/body text in one groupId. Compute anchors from rect geometry; place labels near arrow midpoint with manual offsets and re-check.
- Multi-point arrows (polyline) work: points list, roundness None.
- Keep soft links (no FK) as dashed red, real FKs solid blue, external services teal; mark deduced facts "[inferred]".

## Verify visually (no Obsidian needed)
1. `browser.open({name:"xd", url:"https://excalidraw.com/", viewport:{width:1700,height:1000}})`
2. `tab.evaluate(` localStorage.setItem('excalidraw', JSON.stringify(elements)); localStorage.setItem('excalidraw-state', JSON.stringify({viewBackgroundColor:'#ffffff',scrollX,scrollY,zoom:{value:z}})) `)` then `tab.reload()`, wait ~5s, `tab.screenshot({format:"png"})`.
3. Pan/zoom by changing scrollX/scrollY (scene coords) and zoom, reload. Close tab afterwards.
Caveat: verified in excalidraw.com, not in Obsidian; the plugin may recompress on first save.
