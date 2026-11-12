---
name: workday-goal-entry-browser
description: "Enter or edit goals in a Workday (SSO) goal-setting task using the omp browser tool; covers login handoff, iframe/rich-text quirks, and field coordinates workflow."
---

# Entering goals in Workday via omp `browser`

1. `browser.open({name:'workday', url:<task url>, headed:true, persist:true, timeout:60000})`. Redirects to SSO login: NEVER handle credentials; tell the user to sign in in that window, wait for 'done', then re-screenshot. Relay (`app:{relay:true}`) times out unless the omp Chrome extension is connected.
2. Landing page is 'Set Review Content'; click the `Get Started` button (use `tab.observe()` id; text-selector click may miss). Steps: Goals, Competencies, Development Items, Review and Submit. NEVER submit without user OK; `Save` only keeps a draft.
3. `tab.observe()`/`ariaSnapshot` do NOT expose the goal form fields (only the side 'Organization Goals' panel). Drive it by screenshot coordinates: screenshot is 1024x790 displayed, original is 1701x1312, so multiply by 1.66 and use `page.mouse.click(x*1.66, y*1.66)` inside `tab.run`.
4. `tab.type` times out and `tab.press('Meta+a')` is invalid. Inside `tab.run` use `page.keyboard.type(text,{delay:1})`; select-all with `keyboard.down('Meta'); press('KeyA'); up('Meta')` (Mac). Define constants like `S` inside the run callback (closures are not captured).
5. Layout shifts after every scroll/add: re-screenshot before each click. A wrong click on the rich-text toolbar opens a Link dialog: press Escape (do not confirm).
6. Fields per goal card: Goal (rich text), KPI (rich text), Due Date (type MMDDYYYY then Tab), Category (list icon -> click label 'Hitachi FY2026' row, then click blank area to close), Organization Alignment (list icon -> search text -> pick result; loading takes ~3s), Status (native dropdown: Not Started), Weighting (triple-click, type number). `Add` link inserts a new card at TOP. Weights across goals must total 100.
7. Close the side 'Organization Goals' modal (X top right) if it covers the form. Verify with a final screenshot after `Save` (Save button greys out when saved).
