---
name: workday-goal-entry-via-browser
description: "Enter or edit goal cards in a Hitachi Workday goal-setting task through the omp browser tool, after the user completes SSO login. Use when asked to fill Workday goals, KPIs, due dates or weights."
---

# Workday goal entry via omp browser

## Login
- Workday needs SSO/MFA. NEVER handle credentials. Open the task URL with `browser.open({name:'workday', url, headed:true, persist:true})`; it lands on the sign-in page. Tell the user to sign in, wait for them to say done, then check `tab.url()` and `tab.title()`.
- `app.relay` (attach to the user's own Chrome) timed out when tried; the managed window worked once the user signed in.

## Flow
1. The task opens on a 'Set Review Content' intro page. `tab.observe()`, then click the 'Get Started' button by id.
2. Steps: Goals, Competencies, Development Items, Review and Submit. Goals are cards with rich-text Goal and KPI, Due Date, Category (Hitachi FY2026, usually pre-filled), Organization Alignment, Status and Weighting. Weights across cards must total 100%.
3. A side panel 'Organization Goals' may open on load. Close it with its X before typing.
4. The form sits in an iframe and `observe` does not list its fields. Use screenshots and coordinates: the screenshot is displayed at 1024px wide, so multiply by 1.66 for real click coordinates.
5. Type through `tab.run(async ({page}) => ...)`: `page.mouse.click(x*1.66, y*1.66)`, select-all with `keyboard.down('Meta')`, `press('KeyA')`, `up('Meta')`, then `keyboard.type(text)`. `tab.type` without a selector times out. `tab.press('Meta+a')` is an unknown key.
6. Click into the editor BODY text, not the toolbar. A mis-click on the link icon opened a Link dialog and swallowed the typed text; press Escape to dismiss it. Re-screenshot after every scroll because coordinates shift.
7. Date field: click it and type MMDDYYYY, then Tab. Status is a native dropdown; click it and choose the option. Weighting: triple-click, type the number, Tab.
8. Click Save (bottom bar) after edits. It saves a draft only. NEVER click Next through Review and Submit without the user's explicit OK.
9. Add another goal card with the blue Add link above the cards; the new card appears at the top.

Close the tab when the user is done.
