---
name: mavos-seed-local-hot-lead
description: "Use when you need a hot lead (draft work order with ccQuoteId) to test MavOS Reservations/hot-lead UI or call logging/decline locally, or when no QA store shows hot leads."
---

# Seed a hot lead for local testing

Local backend (`localhost:7071`) uses the shared QA DB, so seeding = a small reversible write to QA. Ask the user before writing.

1. Confirm backend is up: `curl -i localhost:7071/api/` (404 is fine). If refused, start it: Azurite first (`azurite --silent --location . --skipApiVersionCheck` from the BE repo root), then `func start` in `mavos-store-services/packages/http-api`. After a `git pull` of the BE, rebuild first (`npm run build-core && npm run build-http-api`) or the host serves stale `dist`.
2. Check for existing hot leads (sqlit, connection `Mavos QA`; first query can take minutes, later ~2s):
   `SELECT store_id, current_status, COUNT(*) FROM dbo.work_orders WHERE cc_quote_id IS NOT NULL GROUP BY store_id, current_status`
   A hot lead = `current_status='draft' AND cc_quote_id IS NOT NULL` (FE `isHotLeadDraft`). Statuses are lowercase.
3. If none: pick a draft (`SELECT TOP 8 work_order_id, store_id, customer_id FROM dbo.work_orders WHERE store_id=1 AND current_status='draft' AND cc_quote_id IS NULL ORDER BY work_order_id DESC`; QA drafts usually already have a customer and may have services, so they are not truly empty and can open extra modals like 'Select OEM options') and run, with a guard on `cc_quote_id IS NULL`:
   `UPDATE dbo.work_orders SET cc_quote_id=99999001, customer_name='Hotlead Tester', primary_phone='5555550123', updated_by=-1 WHERE work_order_id=<id> AND store_id=<s> AND current_status='draft' AND cc_quote_id IS NULL`
   Set `updated_by` (-1): the hot-leads sync purge deletes cc_quote_id rows with `updated_by IS NULL`, and an earlier seeded row vanished within a day. Record the original `updated_by` first so you can restore it.
4. Verify: `curl localhost:7071/api/stores/<s>/reservations -H 'MavOS-Feature-Flag-Ids: 21'` must list it; without the header it must not (BE gates on HOT_LEADS flag id 21).
5. UI: sign in as that store, set localStorage `featureFlags`=`21` (the `featureFlagOverrides` key alone was not enough), open `/check-in/<id>`.
6. Declines (`noshow`/`invalid_contact` PATCH): the local login is 'Unknown Employee' (confirmedBy -1) so the BE returns 500 'Employee Number Not Found'; a real employee id (e.g. 9990300, store 1) gets to EAC, which returns 404 for the fake quote. A full decline needs a real EAC test quote; otherwise stub the PATCH in the browser.
7. Revert when done: `UPDATE dbo.work_orders SET cc_quote_id=NULL, customer_name=NULL, primary_phone=NULL, reservation_notes='' WHERE work_order_id=<id>` (also restore `updated_by`; an audit row from Save Call remains).

Never `cat` local.settings.json unfiltered (plaintext secrets); `staging.hot_leads_queue` is the real sync source but its rows have work_order_id NULL in QA.
