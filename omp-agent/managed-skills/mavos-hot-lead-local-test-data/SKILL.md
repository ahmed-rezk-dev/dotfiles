---
name: mavos-hot-lead-local-test-data
description: "Use when testing MavOS hot leads (Reservations tab Hot Leads rows, call logging) locally and no hot lead data exists, or when the frontend shows Network Error against localhost:7071."
---

# Hot lead test data for local MavOS

## Preconditions
- Backend: `cd mavos-store-services && npm run dev` (tsc watch + func on :7071). `curl -i localhost:7071/api/` returning 404 means it is up; connection refused (curl exit 7) means axios `Network Error`.
- CORS already allows http://localhost:3000 with credentials (local.settings.json Host block).
- Local backend talks to the SHARED QA DB (see skill mavos-db-query-qa-sqlit). Writes are visible to others: keep to one row and revert.

## Hot lead definition
Draft work order with cc_quote_id not null (`isHotLeadDraft` in src/utils/workOrderHelper.ts). BE query (`packages/core/src/data/reservations.ts`) includes them only when the HOT_LEADS flag (id 21) is on, sent via header `MavOS-Feature-Flag-Ids` (frontend reads localStorage LocalStorage.FeatureFlags).

## Steps
1. Check none exist: `sqlit query -c "Mavos QA" -q "SELECT store_id,current_status,COUNT(*) FROM dbo.work_orders WHERE cc_quote_id IS NOT NULL GROUP BY store_id,current_status"` (status values are lowercase: draft, confirmed...).
2. Pick an empty draft at store 1: `SELECT TOP 5 work_order_id FROM dbo.work_orders WHERE store_id=1 AND current_status='draft' AND cc_quote_id IS NULL ORDER BY work_order_id DESC`. QA drafts have NULL customer_name/phone/reservation_time.
3. Tag it: `UPDATE dbo.work_orders SET cc_quote_id=99999001, customer_name='Hotlead Tester', primary_phone='5555550123' WHERE work_order_id=<id> AND store_id=1 AND current_status='draft' AND cc_quote_id IS NULL`.
4. Verify: `curl -s localhost:7071/api/stores/1/reservations -H 'MavOS-Feature-Flag-Ids: 21'` shows the row with ccQuoteId; without the header it does not.
5. UI: sign in as a store 1 user, flag 21 on, Orders > Reservations, Hot Leads section, open /check-in/<id>.
6. Revert when done: `UPDATE dbo.work_orders SET cc_quote_id=NULL, customer_name=NULL, primary_phone=NULL WHERE work_order_id=<id>`.

## Gotchas
- Real hot leads come from staging.hot_leads_queue (cc_quote_id) via func-timer-sync-hot-leads; queue rows in QA have work_order_id NULL.
- sqlit queries take 2-170s on a cold connection; run long ones with a generous timeout.
- Never print local.settings.json values: it holds QA/on-prem DB passwords (redact by key name before output).
