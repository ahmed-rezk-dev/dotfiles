---
name: mavos-reservation-missing-triage
description: Use when a reservation/web order does not show in the MavOS Orders Reservations tab; read-only QA DB checklist to find where it was lost.
---

# Reservation missing from Reservations tab

Frontend only renders `GET /stores/:n/reservations`; do not debug UI first.

## Backend filter (mavos-store-services `packages/core/src/data/reservations.ts`)
`store_id = n` AND `reservation_time >= yesterday 00:00 UTC` AND status IN draft, quote, unconfirmed, confirmed, invalid_contact, noshow. `checked_in` / `ready_pickup` are never shown. Limit 100, ordered by reservation_time DESC.

## Read-only checks (`sqlit query -c "Mavos QA" -q "..."`, ~3s each; never write to shared QA)
1. Does the order exist? Search `dbo.work_orders` by `primary_phone`, `customer_name LIKE`, `reservation_time`, and ids `tiremax_id`, `ecomm_id`, `import_order_number`, `partner_order_code`. Web orders have `source='WO'`; MavOS-created are `'OS'`.
2. Newest web orders: `SELECT TOP 10 ... WHERE source='WO' ORDER BY work_order_id DESC` (check which stores still receive them).
3. Sync queue: `staging.tiremax_work_order_queue` by store_id/tiremax_id; look at `last_message_at`, `processing_failed_at`, `failure_count`, `last_failure_detail`. Rows eligible for next run: `function_invocation_id IS NULL OR (processing_failed_at IS NOT NULL AND failure_count < 3)`.
4. If not in work_orders AND not in queue: Tiremax never emitted it (web checkout -> Tiremax handoff failed, or wrong store). Not a frontend or MavOS sync bug.

## Facts
- Sync (`func-timer-tiremax-workorder-queue`) only consumes the queue; queue is fed by Kafka consumers. Running it locally is pointless and mutates shared QA.
- Web-site order numbers (e.g. 5096246) are not Tiremax ids; store 1 Tiremax ids are ~1.12M.
- Tiremax live DB (`dbo.Poshdr`, host 10.199.0.29) is on-prem; needs VPN. Dry run: `queueActiveWorkOrders(store, false)` in `core/src/services/stores.ts`.
- QA store 1 = Mount Kisco; 6001/6061/16 are other brands receiving WO orders.
- `staging.ecomm_work_orders` is dead (2023).
