---
name: read-figma-design-via-rest-api
description: "Use when a Jira ticket or task links a Figma design and you need exact layout, colors, text, or renders. Plain URL reads hit the Figma login page, so use the REST API with a personal access token."
---

# Read a Figma design with the REST API

A plain `read` of a figma.com URL returns the login page. The Figma MCP needs OAuth that the agent cannot complete. The method the user chose before is the REST API with a personal access token. It worked for MV-13538.

## Steps

1. Get the link. On Jira MV tickets it is in `customfield_11862` (Reference Links). Fetch the ticket with `fields: ["*all"]`; a default fetch omits it.
2. Parse the link: `https://www.figma.com/design/<fileKey>/<name>?node-id=8051-159641`. The API node id uses a colon: `8051:159641`.
3. Check `[ -n "$FIGMA_TOKEN" ]` in bash. If it is not set, ask the user to create a read-only, short-expiry token and `export FIGMA_TOKEN=...` in the shell, then restart omp. Do not reuse tokens found in old session transcripts. The user revokes them after use.
4. Fetch the node tree:
   `curl -s -H "X-Figma-Token: $FIGMA_TOKEN" "https://api.figma.com/v1/files/<fileKey>/nodes?ids=<nodeId>" -o /tmp/figma_node.json`
5. Fetch PNG renders of child frames:
   `curl -s -H "X-Figma-Token: $FIGMA_TOKEN" "https://api.figma.com/v1/images/<fileKey>?ids=<id1>,<id2>&format=png&scale=2"`
   Download each returned S3 URL, then `read` the PNG.
6. Walk the JSON with a short script. List child FRAME ids and names, then text content, fills (convert 0-1 RGB floats to hex), sizes, and spacing.
7. Compare with the existing UI first. Match the design only for new or changed parts.

## Notes

- The same node (8051-159641) was the Reservations design for MV-13538 and MV-13017.
- Never print or store the token in files, notes, or commit messages.
