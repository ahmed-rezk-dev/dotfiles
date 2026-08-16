# Zsh Local Env Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a `.zshrc.local.example` template and gitignore the real `.zshrc.local` file for managing secrets and machine-specific environment variables.

**Architecture:** Add a tracked example file with placeholder values extracted from the current `.zshrc`, and update `.gitignore` to exclude the real secrets file.

**Tech Stack:** zsh, git

---

### Task 1: Create `.zshrc.local.example` template

**Files:**
- Create: `.zshrc.local.example`

- [ ] **Step 1: Write the example template file**

Create `.zshrc.local.example` with all secrets and machine-specific vars from `.zshrc`:

```bash
# ~/.zshrc.local — Machine-specific secrets and environment variables
# Copy this file to ~/.zshrc.local and fill in your values:
#   cp ~/.zshrc.local.example ~/.zshrc.local

# ──────────────────────────────────────────────
# API Tokens & Secrets
# ──────────────────────────────────────────────

# Figma MCP Server Access Token
# Get your token from: https://www.figma.com/developers/api#access-tokens
export FIGMA_ACCESS_TOKEN="your-figma-access-token-here"

# ──────────────────────────────────────────────
# Local Service URLs
# ──────────────────────────────────────────────

export VALKEY_URL="redis://localhost:6379"

# ──────────────────────────────────────────────
# Machine-specific PATH additions
# ──────────────────────────────────────────────

# LM Studio CLI
export PATH="$PATH:/Users/ahmed.rezk/.lmstudio/bin"

# Docker Desktop completions
fpath=(/Users/ahmed.rezk/.docker/completions $fpath)

# PNPM home
export PNPM_HOME="/Users/ahmed.rezk/Library/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac

# ──────────────────────────────────────────────
# Bun configuration
# ──────────────────────────────────────────────

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# ──────────────────────────────────────────────
# Cargo (Rust)
# ──────────────────────────────────────────────

export PATH="$HOME/.cargo/bin:$PATH"

# ──────────────────────────────────────────────
# NVM (Node Version Manager)
# ──────────────────────────────────────────────

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# ──────────────────────────────────────────────
# RVM (Ruby Version Manager)
# ──────────────────────────────────────────────

export PATH="$PATH:$HOME/.rvm/bin"
```

- [ ] **Step 2: Verify file was created**

Run: `ls -la .zshrc.local.example`
Expected: File exists with the content above

- [ ] **Step 3: Commit**

```bash
git add .zshrc.local.example
git commit -m "feat: add zshrc.local.example template for secrets and machine-specific env"
```

---

### Task 2: Update `.gitignore` to exclude `.zshrc.local`

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add `.zshrc.local` to `.gitignore`**

Current `.gitignore`:
```
gh
fish
nvim-1/

# OpenCode
opencode/node_modules/
opencode/.lock-*
opencode/*.bak
opencode/package-lock.json
```

Add the line `.zshrc.local` after the existing entries:

```
gh
fish
nvim-1/

# OpenCode
opencode/node_modules/
opencode/.lock-*
opencode/*.bak
opencode/package-lock.json

# Local secrets (never commit)
.zshrc.local
```

- [ ] **Step 2: Verify `.gitignore` works**

Run: `git check-ignore -v .zshrc.local`
Expected: `.gitignore:11:.zshrc.local	.zshrc.local`

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: gitignore .zshrc.local to prevent committing secrets"
```

---

### Task 3: Update `install.conf.yaml` to link the example file

**Files:**
- Modify: `install.conf.yaml`

- [ ] **Step 1: Add symlink for the example file**

Current `install.conf.yaml` ends with:
```yaml
    ~/.config/opencode: opencode
```

Add the example file link:
```yaml
    ~/.config/opencode: opencode
    ~/.zshrc.local.example: .zshrc.local.example
```

- [ ] **Step 2: Commit**

```bash
git add install.conf.yaml
git commit -m "chore: link .zshrc.local.example in dotbot install config"
```

---
