# AI Work Log

> Required by the brief (2 pts). Short by design — no full transcripts.
> Review each entry and edit into your own words before submitting.

## Tool used

**Claude Code** (Anthropic) — used as a pair-programming assistant in the terminal to set up the environment, connect the org, and run SOQL queries.

## Entry 1 — Environment + org connection

**One important prompt I wrote:**
> "Help me install this — verify my machine is ready for Salesforce dev (sf CLI, Node 22, npm) and connect VS Code to my org."

**A problem it produced / failed to solve:**
The Salesforce CLI requires Node ≥ 22, but my machine defaulted to Node v20. An `~/.npmrc` `prefix=~/.npm-global` setting also conflicted with nvm, so global installs went to the wrong place. Separately, `sf org login web` failed when launched from the VS Code extension (it passed a bad `--instance-url`).

**How I verified / corrected it:**
- Switched the nvm default to Node v22 and removed the `prefix` line from `~/.npmrc`, then reinstalled `@salesforce/cli`. Verified with `sf --version` → `@salesforce/cli/2.148.3 ... node-v22`.
- Ran `sf org login web --alias playground` directly from the CLI instead of the extension; verified with `sf org list` (org showed as **Connected**) and by running a real query: `sf data query --query "SELECT Id, Name, Industry FROM Account"` returned live Account records.

<!-- Add Entry 2 for the LWC and Entry 3 for the React app as you build them. -->
