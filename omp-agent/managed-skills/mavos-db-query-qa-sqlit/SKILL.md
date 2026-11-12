---
name: mavos-db-query-qa-sqlit
description: "Use when you need to inspect MavOS DB data (store_jobs, item_categories, goodyear mappings, part_categories) on QA via the sqlit CLI, or verify what the local MavOS backend actually serves."
---

# Inspect MavOS QA data with sqlit

- Saved connection: `Mavos QA` (mavis-azure-qa, Entra default CLI auth). List with `sqlit connections list`.
- Run read-only queries: `sqlit query -c "Mavos QA" -q "SELECT ..."`. Expect ~3s latency.
- The LOCAL backend (`localhost:7071`, functions) points at the SAME shared QA DB (`MSSQL_SERVER=mavis-azure-qa...` in `mavos-store-services/packages/http-api/local.settings.json`). Never write to it casually; test seeds inside `BEGIN TRAN ... ROLLBACK` or via CI deploy.
- Local frontend: `http://localhost:3000/check-in/<workOrderId>`; if a fresh browser hits Microsoft Entra SSO, ask the user to sign in (do not type credentials).
- Local API needs no auth headers for GET: `curl http://localhost:7071/api/stores/1/jobs?group=engine` returns the job list (jobId, code, description, requiresParts, isAboveFold, order).

## Useful checks
- Checkbox exists? `store_jobs` row + matching `item_categories.item_id` (INNER JOIN in store-services `jobs.ts`; missing row = silent drop).
- `requiresParts` = `epicor_job_code IS NOT NULL`.
- Goodyear: `goodyear_item_mappings` (job_code -> goodyear_item_id), `goodyear_fluids` (per-quart / service increments), `goodyear_items_v2`.
- Bruno CLI (`bru`) collections live in `mavos-store-services/bruno`; Epicor requests need `QA_EPICOR_PASSWORD` in `bruno/Epicor/.env` (absent by default).
