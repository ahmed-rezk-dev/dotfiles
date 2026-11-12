# LLM Wiki

## First — What Is an LLM Wiki, Actually?

Karpathy’s pattern is deceptively simple. Three layers:

1. Raw sources — articles, transcripts, threads you save. Immutable. Never edited.

2. Pages — an interlinked set of markdown notes that the LLM owns and maintains. It summarizes sources, creates entity pages, and links everything together.

3. A schema file — instructions (usually CLAUDE.md) that turn the agent into a disciplined librarian instead of a chatbot.

Three operations: ingest (feed it a source), query (ask it anything), and lint (it cleans itself up).

The pitch: your notes stop rotting. Every source you add compounds, because the agent reweaves old knowledge with new knowledge. That’s the part every productivity nerd — me included — has failed to do manually for years.
