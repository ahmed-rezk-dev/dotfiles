---
name: check-ts-deprecation-hints
description: "Use on every mavos-frontend change set and every PR review to surface deprecated-API hints (TS 6385, e.g. MUI InputProps/inputProps) that tsc and eslint miss."
---

# Check deprecated-API hints (TS 6385)

User requirement: run this on our own changes AND during PR reviews (mavos-frontend). `tsc --noEmit` and eslint do NOT report these; they are editor suggestion diagnostics. The `lsp` tool usually has no server ("No language server found"), so use the TypeScript language service directly.

## Steps
1. Get changed TS/TSX files: `git status --short` (own work) or `git diff --name-only origin/<base>...<head>` (PR review, in a worktree of the PR head with node_modules).
2. Write the script below to `.deprecated-check.tmp.js` in the repo root (needs the repo's `typescript`), run `node .deprecated-check.tmp.js <files...>`, then DELETE it.
3. Triage by code:
   - **6385 deprecated**: fix in our changes; in a review, flag as a comment (only on lines the PR adds/changes).
   - **6133 unused import React**: repo convention (about 277 files). Ignore pre-existing; drop only in brand-new files.
   - Pre-existing deprecations elsewhere in the repo: out of scope, mention only.
4. Re-run prettier --check, eslint, `tsc --noEmit`, and the touched jest folder after fixing.

## Script
```js
const ts = require('typescript');
const path = require('path');
const root = process.cwd();
const cfgPath = ts.findConfigFile(root, ts.sys.fileExists, 'tsconfig.json');
const cfg = ts.getParsedCommandLineOfConfigFile(cfgPath, {}, {...ts.sys, onUnRecoverableConfigFileDiagnostic: d => { throw new Error(ts.flattenDiagnosticMessageText(d.messageText, '\n')); }});
const files = process.argv.slice(2).map(f => path.resolve(root, f));
const svc = ts.createLanguageService({
  getScriptFileNames: () => cfg.fileNames,
  getScriptVersion: () => '1',
  getScriptSnapshot: f => ts.sys.fileExists(f) ? ts.ScriptSnapshot.fromString(ts.sys.readFile(f)) : undefined,
  getCurrentDirectory: () => root,
  getCompilationSettings: () => cfg.options,
  getDefaultLibFileName: o => ts.getDefaultLibFilePath(o),
  fileExists: ts.sys.fileExists, readFile: ts.sys.readFile, readDirectory: ts.sys.readDirectory,
  directoryExists: ts.sys.directoryExists, getDirectories: ts.sys.getDirectories,
}, ts.createDocumentRegistry());
let total = 0;
for (const f of files) {
  const sf = svc.getProgram().getSourceFile(f);
  const diags = [...svc.getSuggestionDiagnostics(f), ...svc.getSemanticDiagnostics(f), ...svc.getSyntacticDiagnostics(f)];
  for (const d of diags) {
    const {line, character} = sf.getLineAndCharacterOfPosition(d.start);
    console.log(`${path.relative(root, f)}:${line+1}:${character+1} [${d.code}] ${ts.flattenDiagnosticMessageText(d.messageText, ' ')} :: ${sf.text.substr(d.start, d.length).slice(0, 50)}`);
    total++;
  }
}
console.log('total: ' + total);
```

## Known fixes
- MUI v7 TextField: `InputProps` -> `slotProps={{input: {...}}}`, `inputProps` -> `slotProps={{htmlInput: {...}}}`, `InputLabelProps` -> `slotProps.inputLabel`. Precedent: `slotProps={{htmlInput: {readOnly: true}}}` in companyDriverInfo.tsx. Cold run ~4s.
