---
name: mavos-seed-test-hot-lead
description: "Use when you need a hot lead (draft work order with cc_quote_id) to test Reservations Hot Leads UI or call logging locally, since QA has none."
---

# Seed a test hot lead in QA

Hot lead = `dbo.work_orders` with `current_status='draft'` AND `cc_quote_id IS NOT NULL` (`isHotLeadDraft` in frontend `src/utils/workOrderHelper.ts`). The local backend (`localhost:7071`) reads the SHARED QA DB, so any write is visible to others: use one row and revert afterwards.

1. Confirm none exist: `sqlit query -c "Mavos QA" -q "SELECT store_id,current_status,COUNT(*) FROM work_orders WHERE cc_quote_id IS NOT NULL GROUP BY store_id,current_status"` (sqlit can take minutes on first call; later ~2s).
2. Ask the user before writing. Pick an empty draft: `SELECT TOP 5 work_order_id FROM dbo.work_orders WHERE store_id=1 AND current_status='draft' ORDER BY work_order_id DESC`.
3. Tag it (drafts have no customer/phone, so set them too):
   `UPDATE dbo.work_orders SET cc_quote_id=99999001, customer_name='Hotlead Tester', primary_phone='5555550123' WHERE work_order_id=<id> AND store_id=1 AND current_status='draft' AND cc_quote_id IS NULL`
4. Verify: `curl localhost:7071/api/stores/1/reservations -H 'MavOS-Feature-Flag-Ids: 21'` must list it with `ccQuoteId`. Without flag 21 the BE returns no hot leads.
5. UI: sign in as a store 1 user, HOT_LEADS flag on in localStorage, Orders > Reservations. reservation_time stays NULL; no services/vehicle.
6. Revert: `UPDATE dbo.work_orders SET cc_quote_id=NULL, customer_name=NULL, primary_phone=NULL WHERE work_order_id=<id>` (all were NULL before).

Real hot leads come from func-timer-sync-hot-leads: staging.hot_leads_queue -> dbo.work_orders. Never print local.settings.json values (contains QA/on-prem secrets).
