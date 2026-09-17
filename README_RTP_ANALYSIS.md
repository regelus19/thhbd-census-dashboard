# RTP → Bed Assignment Analysis

Standalone interactive HTML branch for the THHBD descriptive RTP-to-bed-assignment analysis.

## Branch
`rtp-bed-assignment-html`

## Contents
- `index.html` — executive narrative and interactive visual layout
- `styles.css` — responsive styles
- `app.js` — Chart.js charts and interactive controls

## Run locally
Open `index.html` directly, or serve the branch with any static web server.

## GitHub Pages note
This branch is intentionally separate from `main`. GitHub Pages can publish from only the configured Pages source for a repository, so publishing this branch as the live Pages site would require changing the repository's Pages source. If the existing dashboard must remain live, a separate repository is cleaner for an independent public URL.

## Data / privacy
Only aggregate, de-identified findings are embedded. Do **not** add patient names, MRNs, encounter-specific dates, or other PHI to a public repository.

## Current aggregate values
- Cohort: 104 cases
- Overall median RTP → assignment: 57 min
- ≤60 min: 53 cases (51.0%), cohort median ≈19 min
- 61–120 min: 22 cases (21.2%)
- >120 min: 29 cases (27.9%), cohort median ≈267 min
- Mean 1 East census at RTP: 15.25 (≤60 min) vs 16.96 (>120 min), p=0.019
- 13 of 29 prolonged cases (44.8%) occurred at census ≤16

The summarized source retained only a qualitative day/night comparison, so the site deliberately does not invent numeric shift values.
