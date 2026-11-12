---
name: mavos-goodyear-customer-item-override
description: "Use when a MavOS ticket asks to map a job code (e.g. CKB) to a different Goodyear item or force a price (e.g. $0) for one fleet customer like ERAC; the fix is mavos-db seed data, not frontend."
---

# Per-customer Goodyear item/price override (mavos-db)

Frontend only knows the job code (e.g. `BRAKE_CHECKS_ID = 'CKB'`). Mapping + price live in `mavos-db/scripts/seed_data/`. Lookup (`mavos-store-services/.../data/nationalaccounts.ts` `queryGoodyearItemsByCustomer`) ranks customer-specific rows above `customer_id IS NULL`, read live on each Goodyear sync (no backfill of open orders).

## Steps
1. Create a worktree off `origin/main` in mavos-db: `git worktree add ../mavos-db__worktrees/<name> -b feature/MV-XXXX-... origin/main` (branch MUST start with `feature/`, per mavos-db AGENTS.md).
2. Edit three seed files together (loaded in this order by `post_deploy.sql`):
   - `add_goodyear_items_v2.sql`: add the new item (FK target; `item_description` NOT NULL, display only). Copy type/qty/labor_action from the sibling item.
   - `add_goodyear_item_prices.sql`: customer row, e.g. `('<item>', @eracPrice, NULL, 0.00, 'flat')`. Both prices NULL gives unitPrice NULL, NOT $0. Remove dead old customer rows.
   - `add_goodyear_item_mappings.sql`: `('<JOB>', '<item>', @eracMap, NULL)`; keep the default NULL-customer row.
   Each file is a full-sync MERGE with `WHEN NOT MATCHED BY SOURCE THEN DELETE`: removing a row deletes it on deploy.
3. Never repoint the shared default item to change one customer.
4. Customers: ERAC tiremax_id 82807, Enterprise Truck 82805, Commute 87150, Avis 80870 (see `declare` lines at the top of each seed). Frontend `ERAC_ACCOUNT_NUMBER` ('0002807') is a different identifier.
5. Verify: `npm run build:sql` and `npm run check-license-header` in mavos-db. QA read-only checks via `sqlit query -c "Mavos QA" -q ...`; `sqlit` only surfaces results/errors of the first DML statement in a batch, so a multi-statement BEGIN TRAN simulation proves little. Real proof = QA deploy + ERAC work order with the job showing the new item at the expected price after a Goodyear sync.
6. PR: confirm title+body draft with the user BEFORE `gh pr create`; keep the template's two Checklist lines unchanged (extra items go below); no "Additional Notes" section.
