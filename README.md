# SF Vibe Lab UADY — Week 1: Professional Readiness Sprint

**Author:** José Carlos Leo Fernández · Team 5
**Course:** SF Vibe Lab UADY (Aug–Nov 2026)

> ⚠️ Draft — some sections are marked _(your words)_ for you to personalise before submitting. Graders read this to understand what you built and how.

## What this is

<!-- (your words) One short paragraph: what this repository contains. -->
This repository contains my Week 1 deliverables for the Professional Readiness Sprint: a Salesforce DX project connected to my own org (used to query `Account` records and deploy an **Account Explorer** Lightning Web Component), and a local **React** app that browses Account data from a provided JSON file.

## Repository structure

| Folder | What it is |
|---|---|
| `Sprint/` | Salesforce DX project (Account query + Account Explorer LWC) |
| `react-account-explorer/` | Local React app (reads `Account_Sample_Data.json`, no live Salesforce connection) |

## How to install and run the Salesforce project

Prerequisites: Node 22, Salesforce CLI (`sf`), VS Code + Salesforce Extension Pack.

```bash
cd Sprint
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

<!-- Completed in Step 3 -->
```bash
cd react-account-explorer
npm install
npm run dev
```
_(Pending — will be filled in when the React app is built.)_

## What I built

<!-- (your words) The features you implemented, described by you. -->
- A connected Salesforce DX project that queries real `Account` records.
- An **Account Explorer LWC** deployed to a Lightning page, showing Name / Industry / Phone with search/sort.
- A **React Account Explorer** reproducing the same browsing idea from provided JSON.

## How I built it

<!-- (your words) Your approach, what was difficult, what you'd do differently. -->
_To complete: describe your approach, the hardest part (e.g. Node version / org auth), and what you'd change next time._

## Blockers encountered

See `AI_WORK_LOG.md` for the AI-assisted troubleshooting. Key technical blockers this week:
1. Salesforce CLI required Node ≥ 22 but the machine had Node 20; an `~/.npmrc` `prefix` also conflicted with nvm.
2. `sf org login web` failed from the VS Code extension (bad `--instance-url`); succeeded via the CLI directly.
