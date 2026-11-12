---
name: mavos-staging-hot-leads
description: "Use when asked to get hot leads into MavOS staging/QA, or when Reservations shows no Hot Leads outside local dev: diagnose the EAC - sync pipeline and request CallCenter test quotes."
---

# Hot leads in staging/QA

Hot Lead = draft `dbo.work_orders` with `cc_quote_id`, created by `func-timer-sync-hot-leads` (cron `0 */30 * * * *`, enabled in staging/QA) from EAC `GET /quotes/hotleadsList` + `POST /quotes/hotleadsDetails`. EAC test gateway `mavinfratestapigw.azure-api.net/v1` is shared by QA and staging. CallCenter (`[CallCenter].[dbo].tbl_Quote_Header/Lines/Customer_Master`) is reachable only through EAC; no repo holds it and EAC has no quote-create endpoint.

## Do NOT seed work orders directly
The sync deletes any WO with `cc_quote_id IS NOT NULL AND updated_by IS NULL` absent from the EAC list (`queryDeleteHotLeadWorkOrders`), and Decline/Convert call EAC `/quotes/updateHotLead` (404 for fake ids). Local one-row seeding for UI work is fine (see skill mavos-seed-test-hot-lead). A `mavos-db` seed must be gated with `IF N'$(Environment)' = 'staging'` because cd-release deploys staging then production from one artifact.

## Procedure
1. Probe EAC read-only: `node /Users/ahmed.rezk/method/mavos/docs/.scratch/hot-leads-staging/probe.js <store>` (reads creds from `mavos-store-services/packages/automations/local.settings.json`, never prints secrets/PII). 0 leads = source empty, not necessarily a broken sync.
2. Staging DB is `mavos-staging` on `mavis-azure-qa.database.windows.net` (same server as QA; the sqlit `Mavos QA` connection does not reach it). Run section A of `staging-checks.sql`: store `mavos_active=1`, HOT_LEADS flag 21 enabled for the store (`dbo.feature_flag_is_enabled_for_store`), line itemNumbers exist in `dbo.item_categories`.
3. Send `request.md` to CallCenter/EAC owners: quotes need store, customer, >=1 line, `Reservation<>'Y'`, `TMaxOrderNumberMade IS NULL`, not declined; required EAC fields quoteID/store/firstName/lastName/areaCode/phoneNumber; saleQuantity>0.
4. Re-run the probe, wait for the next :00/:30 sync, run section B (queue rows complete, drafts exist, services created; `last_failure_detail` explains failures), then check Orders > Reservations > Hot Leads.
5. To reuse a quote after Decline/Convert: reset it in CallCenter AND delete its old work order + `staging.hot_leads_queue` row in the target DB.

Key code: `mavos-store-services/packages/core/src/{services,data}/hot-leads-sync.ts`, `data/mavis_eac/reservations.ts`, `schemas/reservations-schemas.ts` (validation).
