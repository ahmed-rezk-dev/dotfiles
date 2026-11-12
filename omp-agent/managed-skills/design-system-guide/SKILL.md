---
name: design-system-guide
description: "Use for any mavos-frontend UI work or PR review involving Figma designs, shared components (Button etc.), variants/sizes, design tokens, or prop/!-override styling; living guide for design-system architecture and best practices."
---

# Design system guide (living)

Owner rule: the user is following the design system and wants to stay consistent with **Variants**. This guide grows over time; add new architecture notes and best practices to the sections below (update this skill, do not create a sibling).

## 1. Core rule: suggest options, never patch with props or overrides
When Figma differs from a shared component (Button, TextField wrappers, tags, modals...):
1. Compare the Figma values with the component's existing variants and sizes FIRST.
2. If everything fits, use the variant/size as is.
3. If something does not fit, STOP. Do NOT apply it with a prop, a `!` Tailwind override, an inline `sx`, or an arbitrary class (`tracking-[...]`, `w-[...]`).
4. Present a table (Figma value vs component value) and options, then wait for the user's pick:
   - keep as-is (use the standard variant; note the visual delta),
   - add a new Variant or Size to the component (shared change, state the API shape),
   - ask Design (the Figma itself may be inconsistent),
   - one-off override (only if the user explicitly chooses it; add a comment saying it is deliberate).
5. Layout-only classes around a component (margins, flex, widths of the container) are fine; styling INSIDE the component (colour, padding, typography, border) is what this rule covers.

## 2. PR reviews
Flag `!`-overrides, arbitrary-value classes, and colour/padding props on shared components as design-system questions (suggest the same options). Also run the `check-ts-deprecation-hints` skill. Only comment on lines the PR adds or changes.

## 3. Verified facts (mavos-frontend)
- `src/components/shared/button.tsx`
  - Variants: FILLED (teal-500), OUTLINED (teal-900 text and border, 2px), GHOST, UNDERLINED.
  - Sizes: SMALL `px-6 py-2`, MEDIUM `px-6 py-4`, LARGE `px-8 py-5`, XLARGE `px-6 py-6`. Base is `rounded-full font-bold text-sm`, no letter spacing.
  - Existing `!` overrides on Button are rare (`!border-teal-800` in two modals). Do not treat them as precedent for new ones.
- Tailwind (`tailwind.config.js`) is NOT default: fontSize `xs 12/14, sm 14/16, base 16/19, lg 24/28, xl 28/33`. `text-xl` is 28px, not 20px. Check the scale before picking a class for a Figma font size. Figma text style `Desktop/XL` is 20px/1.1 (name clash with Tailwind `xl`); no 20px token exists in code.
- Teal tokens: 50 #E9FDFF, 100 #B0E4E8, 200 #85CCD1, 300 #5AB3BA, 400 #2C98A0, 500 #00818A, 600 #006970, 700 #004C52, 800 #003538, 900 #00181A. Figma `Teal/Teal-N` maps to `teal-N`. Figma Teal-100 style is #C4ECEF, which differs from the config's teal-100 #B0E4E8 (code drifted from design), so do not map it blindly.
- Figma `Grayscale/Gray-500` (#A1A1A1) = `text-gray-500` (verified in browser), Gray-300 #DEDEDE.
- Figma outline buttons in the real frames use Teal-800 stroke + text, 2px, `Button/Medium` text, 8/24 padding; code OUTLINED is teal-900. The design system itself has gaps; surface them rather than hide them.
- MUI is v7: use `slotProps` (`input`, `htmlInput`), not `InputProps`/`inputProps` (see `check-ts-deprecation-hints`).

## 4. How the design team's token system works (checked 2026-11-12, file fHwHjIRgPtQ9nHkU66Kghe)
- They use Figma **styles** from a remote library (`remote: true`): colour styles `Teal/Teal-600`, `Grayscale/Gray-500`; text styles `Desktop/Body`, `Desktop/Body Bold`, `Desktop/XL`, `Button/Medium`. No node has `boundVariables`. The variables API returns 403 ("Limited by Figma plan"), so existence of variables is unknown. The file's own `/styles` list is empty (library file key unknown), and the `Button` component set `1:1535` has no readable children here.
- How to check: `GET /v1/files/<key>/nodes?ids=<id>&depth=30`, read each node's `styles` map (id -> name/styleType/remote) and `componentId`. Node type FRAME named like a component (e.g. `.Base Button`) with no `componentId` is a DETACHED copy (a likely one-off, not a variant); INSTANCE nodes are real component usages.
- Use this to decide between "add a variant" and "ask Design": detached or hand-edited values are usually one-offs.

## 5. Worked example (MV-13935, open Work Orders empty state)
"Reload Data" button: Figma = Teal-600 outline, padding 16/32, 0.0536em tracking (`Button/Medium`). It is a detached `.Base Button` frame (node 11735:520696), not a component instance. Code OUTLINED/MEDIUM = teal-900, px-6, no tracking. The first attempt used `!border-teal-600 !text-teal-600 !px-8 tracking-[0.0536em]` and the user objected. Correct move: show the table and options (ask Design / add variant / use standard OUTLINED), wait for the choice.

## 6. Reading Figma
Use `mavos-figma-rest-read` / `mavos-read-figma-node-rest` for exact values (padding, stroke, text style, icon nodes). Download vector icons with the figma image tool (path must be relative to /Users/ahmed.rezk/method/mavos).

## 7. Add new architecture and best-practice notes here
(Examples to grow into: when a new variant is justified, naming conventions for variants/sizes, token mapping table, icon sourcing rules, empty-state/loading-state patterns, component API stability.)
