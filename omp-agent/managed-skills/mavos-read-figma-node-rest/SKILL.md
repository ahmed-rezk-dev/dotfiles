---
name: mavos-read-figma-node-rest
description: "Use when a MavOS Jira ticket links a Figma frame and you need exact layout, text, colors, or a rendered image via the Figma REST API with the token from ~/.zshrc.local."
---

# Reading a MavOS Figma node via REST

1. Get the link from the Jira field `customfield_11862` (Reference Links). Fetch the ticket with `fields: ["*all"]`; the default fetch hides it. Acceptance Criteria are in `customfield_11302`.
2. A plain `read` of a figma.com URL returns the login page. Use the REST API.
3. Load the token inside each bash command; do NOT print it:
   `source ~/.zshrc.local 2>/dev/null; echo len ${#FIGMA_API_KEY}`
   The omp process env may hold an older expired `FIGMA_API_KEY` (403 `Token expired`). `FIGMA_ACCESS_TOKEN` may be empty.
4. File key for MavOS (2026): `fHwHjIRgPtQ9nHkU66Kghe`. Convert URL node-id `8051-159641` to `8051:159641`.
5. Node tree: `curl -s -H "X-Figma-Token: $FIGMA_API_KEY" "https://api.figma.com/v1/files/<key>/nodes?ids=<id>&depth=30" > /tmp/node.json`
6. Render: `GET /v1/images/<key>?ids=<id>&format=png&scale=1`, download the returned URL, then `read` the PNG.
7. Walk the JSON in python: TEXT nodes give `characters`, `style.fontSize/fontWeight`, `fills` (r,g,b *255 -> hex); parent frames give pill fill and `cornerRadius`.
8. Check what the node is: a link may point to a child such as `nav` only. To find every use of a label (e.g. "Late"), walk the whole page canvas (`ids=<page id>&depth=60`) and print each match's path. `GET /v1/files/<key>?depth=1` lists pages.
9. Never reuse tokens found in transcripts or example files. Tell the user if a plaintext token is found (e.g. `~/dotfiles/.zshrc.local.example`).

## Local UI check without DB changes
The left panel loads `GET /stores/<n>/workorders` (SWR, 60s refresh). Store 46 has one `unconfirmed` card locally. To preview other cards, open the app headed (user logs in via Entra SSO), then `tab.addInitScript` that patches `XMLHttpRequest.prototype.responseText` for that URL and appends fake cards (`workOrderCardType`: `unconfirmed` or `todays_reservations`). Remove with `tab.removeInitScript(id)` and close the tab afterwards.
