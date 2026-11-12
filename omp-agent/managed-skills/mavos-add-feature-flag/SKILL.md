---
name: mavos-add-feature-flag
description: Use when adding a new MavOS feature flag (enum in mavos-types + seed in mavos-db) for a Jira ticket.
---

# Add a MavOS feature flag

1. Pick ID: fetch both `mavos-types` and `mavos-db`; grep ALL remote branches (incl. `origin/release/*`) for `FeatureFlag` enum values and `add_feature_flags.sql` rows. Take next free ID; never reuse commented-out IDs.
2. Create worktrees off `origin/main`: `git -C mavos-types worktree add -b <branch> ../mavos-types__worktrees/<slug> origin/main` (same for `mavos-db`).
3. `mavos-types/src/core/stores.ts`: add `NAME = '<id>'` at end of `FeatureFlag` enum (SCREAMING_SNAKE_CASE).
4. `mavos-db/scripts/seed_data/add_feature_flags.sql`: add row `(id, 'NAME', 'description', 0)` (mind trailing commas; name<=50, desc<=250 chars). Do NOT add a `feature_flag_stores` row (e.g. `(id, 1011)`) by default: store 1011 is a PILOT store and that row turns the flag ON there (MV-13056 had to be reverted for this). Add a store row only if the ticket explicitly asks for a pilot store.
5. Verify types: `ln -s ../../mavos-types/node_modules node_modules`; `npx prettier --check src/core/stores.ts`; `npm run check-license-header`; remove symlink. (tsc errors about *AutoGen.json are unrelated, need build.)
6. Commit `feat: MV-XXXX add NAME feature flag` in each repo; do not touch package.json version (CI auto-tags on merge). Open PRs types first, then db.
7. FE: no work until first consumer; that PR bumps `mavos-types` tag in package.json and uses `checkFeatureFlag(FeatureFlag.NAME)` from `src/utils/featureFlags`, mocking it in jest tests.
8. BE reads flag via `dbo.feature_flag_is_enabled_for_store(storeId, id)`; ID is the contract.
9. Removing a store row later: delete the line from the `feature_flag_stores` MERGE; NOT MATCHED BY SOURCE soft-deletes it, and `post_deploy.sql` re-runs the seed each deploy. Fix every branch that carries it (main and active `release/*`).
