# Zsh Local Env Template Design

## Purpose

Create a template for machine-specific secrets and local environment variables, enabling easy setup on new machines without committing sensitive data to the dotfiles repo.

## Approach

- Track `.zshrc.local.example` in the repo as a template with placeholder values
- Add `.zshrc.local` to `.gitignore` to prevent secrets from being committed
- No changes to `.zshrc` — it already sources `~/.zshrc.local` on line 15

## Files

### `.zshrc.local.example` (new, tracked)

Contains organized sections with commented placeholders:

1. **API Tokens & Secrets** — FIGMA_ACCESS_TOKEN
2. **Local Service URLs** — VALKEY_URL
3. **Machine-specific PATH additions** — LM Studio, Docker completions, hardcoded `/Users/ahmed.rezk/` paths

### `.gitignore` (updated)

Add `.zshrc.local` to prevent accidental commits.

## Setup on New Machine

```bash
cp .zshrc.local.example ~/.zshrc.local
# Edit ~/.zshrc.local and fill in actual values
```
