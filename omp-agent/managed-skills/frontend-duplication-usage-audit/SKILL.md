---
name: frontend-duplication-usage-audit
description: "Use when asked to find duplicated code, V1/V2 forks, append-style helpers, or dead/unused exports in mavos-frontend src/ and report usage per item."
---

# Duplication + usage audit (mavos-frontend)

Read-only. Report in chat unless told otherwise. `task` subagents fail here ("No model selected"), so do it inline.

## Steps
1. Clones: `npx --yes jscpd@4 src --min-tokens 70 --min-lines 8 --reporters json --output /tmp/jscpd-out --ignore "**/*.test.*"` (about 10s).
2. List clones: `jq -r '.duplicates | sort_by(-.lines)[] | "\(.lines)L \(.firstFile.name):\(.firstFile.startLoc.line) <> \(.secondFile.name):\(.secondFile.startLoc.line)"' /tmp/jscpd-out/jscpd-report.json`. Filter by `src/(utils|queries|store|hooks)/` for non-component clones.
3. Semantic dupes and append-style helpers: use `grep` on `duplicat|clone|append|packNotes|URLSearchParams`, then read the cited lines.
4. Usage report: use `eval` (py) to read all `.ts/.tsx` in `src/` and `__tests__/`.
   - Importers of a module: regex `from '.../<basename>'`.
   - Symbol refs: `\bsym\b` counts per file.
   - A symbol with 1 ref (its own definition) or a file with no importers is dead.
5. V1/V2 forks: open the switch site and name the feature flag. Known sites:
   - `baseContainer/index.tsx`: DISCOUNTS and MANUALLY_ADD_LOCAL_ITEMS
   - `tireGridFilters.tsx`: PURCHASE_REQUESTS
   - `estimateOutsidePurchaseTab.tsx`: PURCHASE_REQUESTS
   - `quickJobs/index.tsx`: OIL_CHANGE_V2 and STATE_INSPECTIONS_REWORK
   - `orderSummary.tsx`: MAIN_WORK_ORDER_ACTION
   - `customerInfoModal.tsx`: INTEGRATED_POS
   Before deleting V1, check who imports shared types from it (e.g. PartSearchRequestBody from outsidePurchaseTab).

## Output
Tables per category (V1/V2, components, helpers/queries, append-style), with file:line, ref counts, and a dead-code candidates list.
