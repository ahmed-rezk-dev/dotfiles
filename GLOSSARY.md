# Notes System

A Neovim-and-Obsidian notes system that shares its vaults with the LLM wiki: projects are tracked on boards and linked to reusable atomic notes.

## Language

**Vault**:
A directory of markdown notes that Obsidian and Neovim both open as one linked collection. Every vault is a wiki's `wiki/` directory.
_Avoid_: Notebook, workspace, folder

**Wiki**:
The agent-maintained knowledge base managed by the LLM wiki extension. Humans and agents share its vaults.
_Avoid_: Knowledge base, second brain

**System vault**:
The one personal vault, available from anywhere, holding cross-project knowledge, Daily notes, and the Projects created outside a repository.
_Avoid_: Global vault, personal vault, default vault

**Project vault**:
A vault that lives inside one repository and holds notes and Projects specific to that repository. Kept local, never committed.
_Avoid_: Repo notes, local vault

**Atomic note**:
A note that captures one reusable idea. It is a wiki concept page, and it may serve several projects.
_Avoid_: Zettel, card, snippet

**Project**:
A unit of tracked work identified by a slug, with one Project hub and one Board, living in the Project vault of its repository or, when created outside one, in the System vault.
_Avoid_: Initiative, epic

**Project hub**:
The single note that describes a Project: its status, goal, tracker key, target date, tags, and repository.
_Avoid_: Project note, index, MOC

**Board**:
A Kanban note belonging to one Project, with columns of cards that link to Atomic notes.
_Avoid_: Tracker, task list

**Daily note**:
A note for one date in the System vault, with an Inbox section for quick capture before ideas become Atomic notes.
_Avoid_: Journal, scratch note

**Human-owned note**:
A note agents read but do not edit: Project hubs, Boards, and Daily notes.
_Avoid_: Private note

**Wiki-owned note**:
A note of a wiki page type that agents may create and edit, including Atomic notes.
_Avoid_: Agent note
