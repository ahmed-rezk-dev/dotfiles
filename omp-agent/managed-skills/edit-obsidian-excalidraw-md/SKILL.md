---
name: edit-obsidian-excalidraw-md
description: "Use when modifying an existing Obsidian .excalidraw.md drawing programmatically (rerouting arrows, adding badges/legends) and verifying it renders."
---

# Editing an existing .excalidraw.md

1. **Back up** the file (`cp x.excalidraw.md x.before-<change>.bak`). The user edits in Obsidian between turns: always re-read current state first.
2. **Extract JSON**: file may be ```compressed-json (lz-string `decompressFromBase64`, strip newlines) or ```json. Filter `isDeleted`.
3. **Rebuild with a script** (node): remove old elements by id, append new ones. Do not touch the user's other elements.
   - New element `index`: use fractional keys `'c'+3 base62 chars` ('c000','c001',...) appended at array end (existing keys start with 'b').
   - Text: set `text` and `originalText`, estimate width (mono ff3 ~0.6*fs, Helvetica ff2 ~0.53*fs), lineHeight 1.25. Centre badge digits by computing x = cx - width/2.
   - Elbow arrow = `arrow` with points [[0,0],[dx1,0],[dx1,dy],[dx2,dy]], roundness null.
   - Use `endArrowhead:'triangle'` when targets are ~17px apart; 'arrow' heads merge into big chevrons.
4. **Write the file**: header up to `## Text Elements`, then every text element as `text ^id` + blank line, then `%%\n## Drawing\n```json\n{...}\n```\n%%`. Text Elements must match the drawing JSON or Obsidian restores stale text. Round-trip parse the JSON afterwards.
5. **Connector layout (UI -> table diagrams)**: number badge at both ends (same number); orthogonal routes via one vertical lane per arrow; crossings = inversions between source-y order and target-y order, so reorder target rows (e.g. columns in a table copy) and brute-force/local-search lane x order. Per-table colours. Replace text legends with a table (badge, source, column, example).
6. **Verify visually**: open https://excalidraw.com in a browser tab, set localStorage `excalidraw` (elements array JSON) and `excalidraw-state` (scrollX/scrollY/zoom), reload, screenshot at several zooms, close the tab. State that it was rendered on excalidraw.com, not Obsidian.
