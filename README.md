# jessy-anniversary

A temporary interactive experience for a colleague's 10-year work anniversary.

A QR code on a fake gift card opens `RewardHub™`, a soul-crushing corporate
rewards portal that fails to give her any money, crashes into a stack trace,
and then asks the iOS QA engineer holding the phone to debug her way to the
real gift.

## Quick start

```bash
npm install
npm run dev     # http://localhost:3000
```

## Docs

- **[`docs/RUNBOOK.md`](docs/RUNBOOK.md)** — what to edit, codes, deploy, day-of checklist
- **[`docs/SPEC.md`](docs/SPEC.md)** — full product specification

## Editing

Everything editable lives in **[`src/content.ts`](src/content.ts)**. Search for
`TODO`. No component needs to change to swap names, quotes, photos, the team
code, or the gift location.

## Routes

| Route | Act | |
|---|---|---|
| `/` | I | Corporate landing |
| `/redeem` | I | Card code entry |
| `/balance` | I | The escalating balance gag |
| `/crash` | II | The crash and the role flip |
| `/board` | II | Bug board — 4 playable tickets + final reveal |
| `/ticket/[id]` | II | Ticket + mini-interaction |
| `/tribute` | III | Stats, timeline, team messages |
| `/gift` | III | The reveal |
| `/keepsake` | III | Certificate |
| `/presenter` | — | Organiser controls (not linked) |
