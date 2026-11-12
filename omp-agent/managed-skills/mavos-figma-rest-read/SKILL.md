---
name: mavos-figma-rest-read
description: "Use when a MavOS Jira ticket links a Figma frame and you need the exact design (text, colors, pill styles, rendered image) via the Figma REST API. Read it before grilling or planning a ticket."
---

# Reading a Figma design via REST

0. Do this BEFORE the first grilling/planning round on any ticket that links Figma. Do not wait to be asked.
1. Fetch the ticket with `getJiraIssue` and `fields: ["*all"]`. Read `customfield_11302` (Acceptance Criteria) and `customfield_11862` (Reference Links, holds the Figma URL). The default fetch omits both.
2. Figma URLs return a login page when read directly. Use the REST API.
3. Load the token inside the command, never print it: `source ~/.zshrc.local; echo len ${#FIGMA_API_KEY}`. The omp process env can be stale or expired (HTTP 403 `Token expired`). `FIGMA_ACCESS_TOKEN` may be set but empty. Run the token check and the curl as separate bash calls; chaining them once returned no output.
4. Node tree: `curl -s -o /tmp/n.json -w '%{http_code}' -H "X-Figma-Token: $FIGMA_API_KEY" "https://api.figma.com/v1/files/<fileKey>/nodes?ids=<8051:159641>&depth=30"` (URL `node-id=8051-159641` becomes `8051:159641`).
5. Image: `GET /v1/images/<fileKey>?ids=<id>&format=png&scale=1`, then download the returned URL and `read` the PNG. The render is the source of truth for what is visible.
6. A node-id in a shared link can be a child (for example the top nav). Walk the whole page canvas for TEXT nodes (e.g. count every `Late`) before concluding what the design shows. `GET /v1/files/<fileKey>?depth=1` lists pages.
7. Frames carry many hidden layers (`visible: false` on the node or any ancestor). Walk the tree carrying a `hidden` flag and report hidden TEXT separately; never treat it as part of the design. Also compare to the render.
8. Extract fills with `round(c*255)` per channel; pill radius 32 means fully rounded.
9. Report what Figma does NOT cover (open dropdown option lists, other panels) so those decisions go to the user.
10. Delete temp JSON/PNG files after use. Never commit or echo the token; if a token appears in an example file, tell the user to revoke it.
