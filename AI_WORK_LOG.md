# AI Work Log

> Required by the brief (2 pts). Short by design — no full transcripts.
> Review each entry and edit into your own words before submitting.

## Tool used

**Claude Code** (Anthropic) — used as a pair-programming assistant throughout the sprint.

**Scope of AI use (honest disclosure):** Claude Code generated most of the code —
the Apex controller, the `accountExplorer` LWC, and the React app — and explained the
Salesforce-specific concepts, which were new to me. I directed the design and decisions
(which org to use, repo structure, the UI), ran every CLI command and deployment against
my own org myself, verified each result, and reviewed the code so I can explain how it
works.

## Entry 1 — Environment + org connection

**One important prompt I wrote:**
> "Help me install this — verify my machine is ready for Salesforce dev (sf CLI, Node 22, npm) and connect VS Code to my org."

**A problem it produced / failed to solve:**
The Salesforce CLI requires Node ≥ 22, but my machine defaulted to Node v20. An `~/.npmrc` `prefix=~/.npm-global` setting also conflicted with nvm, so global installs went to the wrong place. Separately, `sf org login web` failed when launched from the VS Code extension (it passed a bad `--instance-url`).

**How I verified / corrected it:**
- Switched the nvm default to Node v22 and removed the `prefix` line from `~/.npmrc`, then reinstalled `@salesforce/cli`. Verified with `sf --version` → `@salesforce/cli/2.148.3 ... node-v22`.
- Ran `sf org login web --alias playground` directly from the CLI instead of the extension; verified with `sf org list` (org showed as **Connected**) and by running a real query: `sf data query --query "SELECT Id, Name, Industry FROM Account"` returned live Account records.

## Entry 2 — Account Explorer LWC + Apex

**One important prompt I wrote:**
> "Build an Account Explorer LWC that queries Account (Name, Industry, Phone) with search
> and sorting, and deploy it to my org."

**A problem it produced / failed to solve:**
The component did not appear in the Lightning App Builder at first, and I accidentally
dropped it onto the page twice. The build itself also assumes the org has Account data
with the right fields.

**How I verified / corrected it:**
- The component only shows up in the App Builder once `isExposed` is `true` and the right
  `targets` are set in `accountExplorer.js-meta.xml` — confirmed once that was in place.
- Removed the duplicate component from the Lightning page.
- Deployed with `sf project deploy start` (**Status: Succeeded**), confirmed the Apex class
  (`Active`) and the LWC bundle exist via Tooling API queries, and saw the component render
  live with my org's real Account records on the Lightning page.

## Entry 3 — React Account Explorer

**One important prompt I wrote:**
> "Build a Vite React app that reads the provided Account JSON with the same search/sort
> behaviour, then give it a professional look with a discreet light/dark toggle."

**A problem it produced / failed to solve:**
`npm install` reported dev-dependency vulnerabilities (nothing blocking). The theme toggle
also needed to override the system preference, not just follow it.

**How I verified / corrected it:**
- Ran `npm run build` (compiled clean, 34 modules) and `npm run dev`; opened
  `localhost:5173` and confirmed the table, search (typing "cenote" narrowed it to one row),
  column sorting, the empty state, and the light/dark toggle all work.
- The toggle overrides the system theme via a `data-theme` attribute on the root plus
  `localStorage`, so a manual choice sticks across reloads.
