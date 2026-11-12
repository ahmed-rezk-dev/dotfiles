---
name: mavos-inspect-work-order-line-items
description: "Use when a MavOS work order behaves oddly in the UI (tires, selection, totals) and you need the raw service items, itemNotes, and DB row from the local backend and QA DB."
---

# Inspect raw work order line items (MavOS)

1. Local backend (localhost:7071) needs no auth for GET. `GET /api/workorders/{id}` returns the header and Services WITHOUT items. Use `GET /api/workorders/{id}/services` to get `ServiceItems` per service.
2. Dump items with notes:
   ```bash
   curl -s localhost:7071/api/workorders/<id>/services | node -e 'let s="";process.stdin.on("data",c=>s+=c).on("end",()=>{for(const sv of JSON.parse(s).data)for(const i of sv.ServiceItems)console.log(i.serviceItemId,i.itemType,i.itemSelected,i.itemQuantity,i.itemDetail,JSON.stringify(i.itemNotes))})'
   ```
   `itemNotes` format: `<text>\n---MAVOS-data: {json}`; tires should carry `tireInfo {manufacturer, model, position, mpn}`. Web Orders (`source: "WO"`) historically lack it.
3. Confirm the DB row with sqlit: `sqlit query -c "Mavos QA" -q "SELECT service_item_id, item_id, item_detail, item_selected, item_quantity, CAST(item_notes AS NVARCHAR(400)) FROM service_items WHERE service_item_id=<id>"`. The local backend uses the shared QA DB, so never write casually. Tire catalog lives in `unified_data.products_view` / `unified_data.tires`.
4. Backend writers of itemNotes: `setItemNotesFromTiremax` (core/src/services/tiremax.ts), `updateTireRebateItemNotes` (core/src/services/rebates.ts).
5. Frontend: before starting `next dev`, check `lsof -iTCP -sTCP:LISTEN -nP | grep :300` and each pid's cwd; other worktrees often hold 3000/3001. The browser SSO session is per-origin (port), so use the port the user is already logged in on.
6. Do not use `/workorders/{id}/resync` to test notes changes: existing items keep stored itemNotes; only newly imported lines get new notes.
