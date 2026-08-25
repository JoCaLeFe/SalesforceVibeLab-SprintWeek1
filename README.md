# SF Vibe Lab UADY — Week 1: Professional Readiness Sprint

**Author:** José Carlos Leo Fernández · Team 5
**Course:** SF Vibe Lab UADY (Aug–Nov 2026)

## What this is

This repository contains my Week 1 deliverables for the Professional Readiness Sprint: a Salesforce DX project connected to my own org (used to query `Account` records and deploy an **Account Explorer** Lightning Web Component), and a local **React** app that browses Account data from a provided JSON file.

## Repository structure

```
SalesforceVibeLab-SprintWeek1/
│
├── SalesforceAccountExplorer/        # Salesforce DX project
│   ├── config/
│   ├── force-app/main/default/       # Apex controller + Account Explorer LWC
│   ├── manifest/
│   ├── .forceignore
│   └── sfdx-project.json
│
├── ReactAccountExplorer/             # Local React app (Vite)
│   ├── src/                          # Components + Account_Sample_Data.json
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── Screenshots/                      # Evidence
│   ├── 01-connected-org-query-deploy.png
│   ├── 02-lwc-account-explorer.png
│   └── 03-react-app.png
│
├── AI_WORK_LOG.md
└── README.md
```

## Screenshots (evidence)

| Evidence | Screenshot |
|---|---|
| Connected org · Account query · successful deployment | [`01-connected-org-query-deploy.png`](Screenshots/01-connected-org-query-deploy.png) |
| Account Explorer LWC on a Lightning page | [`02-lwc-account-explorer.png`](Screenshots/02-lwc-account-explorer.png) |
| React Account Explorer running locally | [`03-react-app.png`](Screenshots/03-react-app.png) |

## How to install and run the Salesforce project

Prerequisites: Node 22, Salesforce CLI (`sf`), VS Code + Salesforce Extension Pack.

```bash
cd SalesforceAccountExplorer
# Authenticate the CLI to your org (opens a browser):
sf org login web --alias playground
# Confirm the connection:
sf org list
# Query Account records:
sf data query --query "SELECT Id, Name, Industry, Phone FROM Account" --target-org playground
# Deploy the Account Explorer LWC:
sf project deploy start --target-org playground
```

## How to install and run the React application

Prerequisites: Node 22, npm.

```bash
cd ReactAccountExplorer
npm install
npm run dev      # serves at http://localhost:5173
```

The app reads `Account_Sample_Data.json` (the provided sample data) — it has **no live Salesforce connection**. Features: search by name, click a column header to sort, and an empty state when no account matches.

## What I built

- A connected Salesforce DX project that queries real `Account` records.
- An **Account Explorer LWC** deployed to a Lightning page, showing Name / Industry / Phone with search/sort.
- A **React Account Explorer** reproducing the same browsing idea from provided JSON.

## How I built it

Most of the difficulty this week was environment setup rather than application logic. The
Salesforce CLI required Node 22 while my machine was on Node 20, and resolving that
surfaced a second, less obvious problem: a `prefix` setting in `~/.npmrc` conflicting with
nvm. Org authentication also failed through the VS Code extension before succeeding
directly from the CLI. Both are documented below and in the AI work log.

Building the same Account Explorer twice made the transferable part obvious. The
data-fetching layer differs completely, but the component structure, state handling, and
search/sort logic are nearly identical between LWC and React.

Next time I would set up the environment end to end and verify every tool before starting
any application code, rather than discovering version constraints while already building.

### Why two apps, and why the React app has no live Salesforce connection

The same "Account Explorer" is built twice on purpose, to contrast two worlds:

- The **LWC** lives *inside* the Salesforce platform. It talks directly to an Apex
  controller (`AccountController`) that runs SOQL against the org, and it is deployed
  to a Lightning page. Platform-native UI can query the org directly because it runs
  behind Salesforce's own security.
- The **React app** lives *outside* the platform, on my own stack, and reads a static
  `Account_Sample_Data.json`. It deliberately has **no live Salesforce connection**.

The React app skips a live connection for good reasons: putting org credentials in
browser JavaScript is a security anti-pattern (anyone can read them in DevTools); a
static JSON keeps the app reproducible so it runs anywhere without my credentials; and
the JSON acts as a data contract/mock — exactly how a real front end is developed before
a backend is wired in. In production, a React app reaches Salesforce **through a backend**
(OAuth 2.0 + REST/SOQL), never directly from the browser. The constant across both apps
is the data shape (`Name`, `Industry`, `Phone`); only the presentation layer changes.

## Blockers encountered

See `AI_WORK_LOG.md` for the AI-assisted troubleshooting. Key technical blockers this week:

1. Salesforce CLI required Node ≥ 22 but the machine had Node 20; an `~/.npmrc` `prefix` also conflicted with nvm.
2. `sf org login web` failed from the VS Code extension (bad `--instance-url`); succeeded via the CLI directly.
