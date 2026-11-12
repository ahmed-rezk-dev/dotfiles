---
status: accepted
---
# Share vaults with the LLM wiki and adopt its conventions

Human notes live inside the wiki's `wiki/` directories (`~/.llm-wiki/wiki` as the System vault, `<repo>/.llm-wiki/wiki` as Project vaults) instead of a separate Obsidian vault, so agent recall and Obsidian's graph see one body of knowledge. Humans therefore follow the wiki's conventions: kebab-case filenames, root-relative markdown links, wiki frontmatter, and plain slug lists in `projects:`; this deliberately overrides Obsidian's usual Title filenames and wikilinks.

## Considered Options

- Separate human vault with an ingest bridge: keeps ownership clean, but gives two graphs and no shared backlinks.
- Symlinking the wiki into a human vault: root-relative links break against the new vault root.

## Consequences

- Agents write only wiki page types; Project hubs, Boards, and Daily notes are human-owned.
- The wiki parses every `.md` under `wiki/` (new folders such as `projects/` and `daily/` are accepted) and blocks its metadata rebuild if one lacks a frontmatter `type`; Kanban boards therefore carry `type: board`, and templates are symlinked into the vault because the wiki skips symlinks.
