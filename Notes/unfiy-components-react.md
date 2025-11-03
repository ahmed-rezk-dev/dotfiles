---
id: unfiy-components-react
aliases: []
tags: []
---

-   First thing I noticed there is no NextJS in.
-   using `import *`.
-   Components has multiple responsibility.

#APP

-   Server/built `Vite`.
-   declaration type generator `vite-plugin-dts`
-   documentation `storybook`
-   UI libraries
    -   CSS utilities `tailwindCSS`
    -   Components library `radix-ui`
    -   carousel `embla-carousel`
    -   Theme switcher `next-themes`, reduce package watch & size by using `tailwindCSS` solution.
    -   [!CAUTION] Icons `hugeicons`, `Lucide` #duplication
    -   resizable panels components `react-resizable-panels`
    -   chats component `recharts`
    -   toast components `sonner`
    -   animations `tailwindCSS-animate`
    -   drawer components `vaul`
-   Testing
    -   `vitest` Unit testing
    -   `playwright` Automate browser interactions testing framework
-   Tools
    -   Husky
    -   `eslint`
    -   `git-cz` combined with `commmitlint` to set rules for commit messages.
    -   `commitizen` a standard way of committing
    -   `cz-conventional-changelog` Like commitizen, you specify the configuration of cz-conventional-changelog through the package.json's config.commitizen key.

# TODO ✅

-   [ ] Check the commend component PR and if it related to `cmdk` package.

in24015381089
