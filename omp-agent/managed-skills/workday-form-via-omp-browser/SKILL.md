---
name: workday-form-via-omp-browser
description: "Fill Workday (or similar SSO-gated web form) via omp browser tool: sign-in handoff, keyboard/coordinate quirks, save-not-submit rules."
---

# Filling Workday forms with the omp `browser` tool

1. Relay (`app:{relay:true}`) often times out (extension not connected). Fall back to `browser.open({name, url, headed:true, persist:true, timeout:60000})`; it lands on the SSO login page.
2. NEVER enter credentials. Tell the user to sign in in the opened Chromium window (SSO + MFA), wait for "done", then `browser.tab(name)` and check `tab.url()`/`title()`.
3. Workday renders in an iframe and `tab.observe()`/`ariaSnapshot` miss most form fields. Use screenshots + coordinates: screenshot is 1024x790 displayed, original 1701x1312 -> multiply coordinates by 1.66 for `tab.clickAt` / `page.mouse.click`.
4. `tab.type(text)` times out; `tab.press('Meta+a')` is invalid. Use `tab.run(async ({page}) => {...})` with `page.mouse.click`, `page.keyboard.down('Meta'); press('KeyA'); up('Meta')` to select-all, then `page.keyboard.type(text,{delay:1})`. Date fields: click, type `MMDDYYYY`, press Tab.
5. Prompt lists (Category) need clicking the row label text, not just the checkbox; close the popup by clicking blank space.
6. Layout shifts after each edit/save: re-screenshot before every click. The Related Information side panel may cover the form; close it with its X.
7. Click `Save` for drafts only. NEVER click Next through to Review and Submit / Submit without explicit user approval. Leave weights (must total 100%) and placeholders like `[approver]` for the user.
8. Form steps for goal setting: Goals, Competencies, Development Items, Review and Submit. Courses fit Development Items; project work fits Goals.
