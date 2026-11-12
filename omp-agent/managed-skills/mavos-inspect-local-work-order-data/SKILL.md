---
name: mavos-inspect-local-work-order-data
description: "Use to inspect raw work order and service item data (tireInfo, itemNotes, itemSelected) for a local mavOS work order when debugging order summary or tire/service item UI bugs."
---

# Inspect raw local work order data

1. Confirm services: `curl -s -o /dev/null -w '%{http_code}' localhost:3000` and `lsof -iTCP -sTCP:LISTEN -nP | grep -E ':(3000|7071)'`. `.env.local` NEXT_PUBLIC_SERVER_API should be `http://localhost:7071/api`.
2. The local backend (7071) answers without auth headers. Use `curl` from bash, not `fetch` from the browser tab (the tab may be mid-login/redirect and fetch fails).
3. `GET /api/workorders/<id>` returns the work order with `Services[]` but NO service items. Service items come from `GET /api/workorders/<id>/services` (each service has `ServiceItems[]`). Pipe through `node -e` to print per item: serviceItemId, itemType, itemSelected, itemQuantity, parentServiceItemId, unitPrice, itemDetail, itemSize, and parsed `itemNotes`.
4. `itemNotes` format: free text, then `\n---MAVOS-data: {json}`. Tire metadata lives in `data.tireInfo` (manufacturer, model, position, mpn, ...). Missing `tireInfo` means the FE selection logic (`unpackNotes`, `defaultTireItemSelectedState`, `isSameTire`, the `!!item.model` tire classification in orderSummaryServiceTires.tsx) will not recognise the line as a tire with brand/model/position. Web Orders (source `WO`) are known to have this shape.
5. Visual check: open `http://localhost:3000/check-in/<id>` in the persistent `mavos` browser tab (see skill mavos-local-browser-verify for auth: ask the user to log in; never type credentials). After login the app may redirect to /check-in; navigate to the order URL again and screenshot the right-hand order summary.
