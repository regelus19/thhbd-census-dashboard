# THHBD Hospital Operations Hub

Prototype operational coordination layer for The Heart Hospital Baylor Denton.

## MVP scope

The current build focuses on two working views:

- **War Room** — capacity, demand, routing, action loop, and room status
- **1E Unit** — room-level state plus nursing workload / receiving capacity

Other tabs are intentionally placeholders for later phases.

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Core concept

The prototype intentionally distinguishes:

**Physical bed ≠ staffed bed ≠ actionable bed**

An empty room is not automatically considered assignable. Protected emergency capacity, nursing workload, procedural commitments, bed state, and other constraints can make a physical bed operationally unavailable.

## Data / privacy

This repository contains synthetic demonstration data only. Do not add PHI to the public repository.

## Current limitations

- No Epic, Teams, SharePoint, Power Automate, or Power BI integration yet
- Local state / mock data only
- Import screen is a prototype; file parsing and validation are not yet connected
- Capacity rules are intentionally simple and will be refined against operational data

See `ARCHITECTURE.md` and `PHASE2_INTEGRATION.md` for the intended evolution.
