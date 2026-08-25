# Ahmed Rezk — Resume Source Profile

> Working notes for resume/interview prep. Assembled Aug 2026. Trim per target role; do not paste verbatim.

## Identity & Employment

- **Employer arrangement:** Lead Software Engineer at **Method** (method.com) — a global strategic design & product development consultancy founded in 1999, **acquired by GlobalLogic in 2011** (GlobalLogic itself is a Hitachi Group company). Method operates independently within GlobalLogic, with offices in New York, Charlotte, Atlanta, Denver, and London. Staffed onto Method client teams as a GlobalLogic contractor.
- **Role pattern:** Frontend Engineer — React/Next.js, design systems, component libraries, delivered as consulting engagements across multiple client industries

---

## Platform & Industry Context

### Employer: Method (via GlobalLogic)

**Industry:** Digital product design & engineering consultancy (experience design, digital strategy, technology engineering). Clients span financial services, consumer, healthcare, and industrial sectors. The role means shipping production work across *different client domains* rather than a single product — hence the varied platform list below.

### Client: FIS (Fidelity National Information Services)

**Industry:** Financial services technology (fintech) — FIS is one of the world's largest banking and payments technology providers. **Digital One** is FIS's digital banking experience platform, delivered to regional bank clients.
**Platform:** FIS's internal web component library and design system (React + TypeScript, Storybook) for the Digital One platform. Worked embedded with the FIS Web Application Team; Method provided engineering alongside FIS engineers ramping up on React/TypeScript.

### Client: Mavis ("Mavis Discount Tire")

**Industry:** Automotive aftermarket retail — tire sales and auto service. Mavis is the **largest tire retailer in North America**: 2,300+ retail locations across 39 states, ~23,000 employees, 70+ years in business.
**Platform:** **MavOS** — the company's in-store point-of-service retail platform used by store employees across all locations. Next.js frontend on Vercel, Azure Functions + APIM backend, Datadog observability. Work includes payment integrations (fleet card payments), tire catalog/order workflows, and multi-tenant theming across Mavis's brands (multi-tenant color usage migrated to Tailwind classes).

### Client: Hotwire Communications

**Industry:** Telecommunications — fiber-optic ISP (dba **Fision**), founded 2002, headquartered in Fort Lauderdale, FL. Owns and operates a fully redundant fiber network serving multi-family residential communities, hospitality, and campus environments with internet, TV, digital phone, and home security.
**Platform:** **Fision** customer-facing web + mobile app, and **hotwirecore** — the shared UI component library (design tokens, inputs, buttons, text links) powering it. Built greenfield from POC through publishing.

### Client: ed2go (Cengage Group)

**Industry:** Education technology / online continuing education. ed2go, founded in 1997 and part of **Cengage Group**, is a leading online career-training and certification-prep provider with 600+ courses distributed through a network of 2,300+ academic institution partners across the US and 16+ countries.
**Platform:** **ed2go shopper** — the course catalog / enrollment e-commerce experience (Next.js), plus **product-data-service** and **shared-components** (built on **react-magma**, Cengage's open-source design system). Work included third-party integration evaluations: ChiliPiper (scheduling/forms) and Optimizely (experimentation).

## Current Work — Mavis / MavOS (2026)

> Automotive retail · in-store point-of-service platform · Next.js + Azure

**MavOS** — in-store retail platform (Next.js + MUI + Tailwind + SWR/Axios, TypeScript). Frontend deployed on Vercel; backend is Azure Functions behind Azure APIM; observability via Datadog.

**Current focus:** bug fixes and payment-type integration work (fleet card payments, tire model selection rules).

**Stack highlights (from team onboarding docs):**

- Next.js (pages router), TypeScript, MUI + Tailwind CSS
- SWR / SWR-mutation wrappers for data fetching; Axios for HTTP
- Jest + Playwright + MSW (Mock Service Worker) testing
- Storybook-style internal UI library
- Conventional commits (Commitizen); Bitbucket + Vercel CI/CD
- Performance tooling: react-scan; validation: JSON Schema + ajv
- Shared types package (private Bitbucket npm)

## First Engagement at Method — FIS / Digital One (mid 2023)

> Fintech / digital banking · component library + design system · React + TypeScript

First project after joining Method, embedded with FIS's Web Application Team on the **Digital One** digital banking platform:

- Component library development in React + TypeScript — props modeled on FIS's **Rix** design-system base
- **Storybook engineering**: atomic story structure, category organization, viewport testing, and **320px accessibility baseline**; standardized story documentation and **dynamic prop definitions derived from TypeScript types**
- Shipped components (e.g. Star Rating input with clear-value behavior)
- Team process contributions: PR review template, branch hygiene, advocated trunk-based branching and tracked the team's **GitHub migration**

**Resume bullet candidates:**

- "Built React + TypeScript components for a fintech giant's digital banking design system, establishing Storybook standards (atomic structure, 320px accessibility baseline, type-driven prop documentation) adopted by an embedded cross-company team."
- "First consulting engagement: embedded with the client's web application team, contributing process improvements (PR review templates, trunk-based branching, GitHub migration) alongside component library work."

## Prior Work — Hotwire Communications / hotwirecore (Jan–Mar 2025)

> Telecom / fiber ISP · customer-facing web + mobile app · design system

Built **hotwirecore**, the shared UI component library for Hotwire's Fision app (web + mobile):

- SPIKE: Shared UI Component POC — evaluated and set up Vitest, Storybook, Tailwind with shadcnUI utils, and design tokens
- Package publishing pipeline for the library
- Design Tokens (Web) — color, typography, text sizing specs
- Core module library setup
- Input Fields components: Sensitive Info, Formatted (Web), Simple Text (Mobile & Web)
- Buttons and Text Link components (Web)

**Resume bullet candidates:**

- "Designed and shipped a multi-brand shared React component library (design tokens, inputs, buttons, links) powering web and mobile experiences; established the toolchain (Vitest, Storybook, Tailwind + shadcn) from a greenfield POC to a published package."
- "Implemented design tokens as the single source of truth for color/typography across component surfaces."

## Other Work — ed2go / Cengage (~2024)

> EdTech / online continuing education · e-commerce catalog · Cengage design system

Frontend work on ed2go shopper (Next.js) and product-data-service; shared-components and react-magma (Cengage's open-source React component library).

- Third-party integration research artifacts: ChiliPiper (forms/scheduling vendor evaluation), Optimizely (experimentation)
- **Resume bullet candidate:** "Evaluated third-party integrations (ChiliPiper scheduling/forms, Optimizely experimentation) with detailed field-level and capability comparison docs that fed adoption decisions."
- **Resume bullet candidate:** "Shipped features on an e-commerce course-enrollment platform built on Cengage's react-magma open-source design system."

## Skills Inventory (evidence-backed)

**Languages:** TypeScript, JavaScript, Python (personal tooling), Lua (Hammerspoon/Neovim config)

**Frontend:**

- React, Next.js, MUI, Tailwind CSS, shadcn/ui
- Design systems: design tokens, Storybook, multi-tenant theming
- Data: SWR, Axios; validation with JSON Schema + ajv

**Testing:** Jest, Playwright, Vitest, MSW (mock service worker), Testing Library

**Platform/Infra exposure:** Vercel, Azure (APIM, Functions), Bitbucket, GitHub, CI/CD gates, license/copyright automation

**Observability:** Datadog (logs, metrics, RUM, trace correlation)

**AI/Tooling engineering (differentiator):**

- Built an agent-tooling setup with MCP (Model Context Protocol): official Atlassian remote MCP, dynamic local-model provider extension (auto-discovers LM Studio models), context-management hooks
- Studied multiple Jira MCP server implementations (open source)
- Maintains dotfiles repo: Neovim/LazyVim, Hammerspoon, tmux/wezterm/ghostty, zsh; uses Commitizen, stylua, black
- CLI workflow authoring for observability tooling (log search/agg/tail/trace/pattern workflows)

## Career Narrative (one paragraph)

Frontend engineer specializing in **design systems and shared component libraries**, delivered through consulting engagements across industries: a fintech digital-banking component library (FIS Digital One), a published component library for a national fiber ISP (Hotwire/Fision), e-commerce features for an online education platform (ed2go/Cengage), and production work on an in-store retail platform used across 2,300+ North American automotive service locations (Mavis/MavOS). Comfortable across the full toolchain — Vitest/Storybook/Jest/Playwright testing, Vercel/Azure deployment, Datadog observability — with a strong sideline in AI-assisted developer tooling (MCP servers, local LLM providers, agent configuration).

## Gaps / Growth Areas (for honest interview answers)

- Documentation/visibility footprint is thin — few authored pages or filed tickets at clients; mostly an assignee
- Current MavOS throughput not yet demonstrated in ticket history (early in the engagement)
- Specialization skews frontend; Python/Lua only in personal tooling
