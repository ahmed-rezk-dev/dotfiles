---
name: mavos-missing-reservation-trace
description: Use when a reservation/web order does not appear in the MavOS Orders Reservations tab; traces web - Tiremax - sync queue - work_orders - endpoint filter with read-only queries.
---

# Trace a missing reservation (read-only)

Frontend is rarely the cause: `ordersWrapper.tsx` -> `useGetReservations` -> `GET /stores/:n/reservations` renders what the API returns (only drops null `reservationTime`). Trace upstream in this order, stop at the first miss.

## 1. MavOS QA DB (`sqlit query -c "Mavos QA" -q ...`)
- Search `dbo.work_orders` by `primary_phone LIKE '%last7%'`, `customer_name`, `tiremax_id`, `ecomm_id`, `import_order_number`, and by `reservation_time` slot. Web orders have `source='WO'`; MavOS-created are `OS`. Web order numbers shown to customers are NOT Tiremax ids (store 1 Tiremax ids ~1.12M).
- Endpoint filter (mavos-store-services `core/src/data/reservations.ts`): `store_id` match AND `reservation_time >= yesterday 00:00 UTC` AND status in draft/quote/unconfirmed/confirmed/invalid_contact/noshow. `checked_in`/`ready_pickup` never appear. Replicate it as a SELECT to know exactly what the tab shows.
- Store ids: 1 = Mount Kisco (QA), 6001/6041 = Pep Boys.

## 2. Sync queue
- `staging.tiremax_work_order_queue` (store_id, tiremax_id, last_message_at, processing_completed_at, processing_failed_at, failure_count, last_failure_detail). Healthy = recent store rows have `processing_completed_at` within seconds. Eligible-to-run set: `function_invocation_id IS NULL OR (processing_failed_at IS NOT NULL AND failure_count < 3)`; if 0, running the timer job does nothing. The job only consumes the queue (fed by Kafka from Tiremax); it never polls the web site. Do not run it locally against shared QA.
- Old `Changeset ID Discrepancy` failures (failure_count 10) are a separate known backlog.

## 3. Tiremax itself (needs VPN; host from `ON_PREM_MSSQL_6_IP` in `mavos-store-services/packages/http-api/local.settings.json`, db `TireMaxLive`)
- Check reachability: `nc -z -G 3 <ip> 1433`.
- Read-only SELECT on `dbo.Poshdr` (cols: Pstor, Pordr, Pswi, Pname, Pphon, Podat, Prdate, Prtim). Use the `eval` tool with `mssql` from `mavos-store-services/node_modules`, creds read from local.settings.json, never print them, `readOnlyIntent`, close the pool after. `console.table` can crash on Date/BigInt; print `JSON.stringify` rows.
- Dry run of store-level queueing: `queueActiveWorkOrders(store, commitChanges=false)` (services/stores.ts) reads Poshdr Pswi 2..4 for 2 weeks, returns count only.
- `WebData` DB login fails for the svc account; do not try other creds.

## Conclusions seen
- Order absent from Poshdr => web checkout never wrote to Tiremax; escalate to web/e-commerce owners with order #s, store, appointment time, phone. Not a MavOS/frontend bug.
- Order in Poshdr but not work_orders => inspect queue row/Kafka consumers.
- To test frontend changes without web QA, create the reservation inside MavOS (source `OS`, status unconfirmed/confirmed, reservation date >= yesterday).
