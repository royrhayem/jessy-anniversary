# Event Runbook

Everything you need to run this on the day.

---

## 1. What to edit

**`src/content.ts` is the only file you need to touch.** Every string, name,
quote, photo path, stat, gift clue, hiding place and voucher copy lives there.
Search for `TODO`.

| What | Where |
|---|---|
| Teammate names | `TICKETS[].reporter`, `TRIBUTES[].name`, `CONFIG.digitHolders` |
| Teammate messages | `TRIBUTES[].message` |
| Photos | `TRIBUTES[].photo` → e.g. `/photos/team/rita.jpg` |
| Timeline entries | `TIMELINE` |
| Stats | `STATS` |
| **The final line** | `THE_LINE` ← the one that matters most |
| **Surprise trail copy + location** | `REDEMPTION_GIFTS` |
| **Spa voucher copy** | `SPA_VOUCHER` |
| **Spa QR destination** | `CONFIG.spaVoucherUrl` — currently `/spa-voucher.pdf` |

---

## 2. Codes

| Code | Value | Where it's used |
|---|---|---|
| **Card code** | `2016` | Printed on the back of the fake gift card |
| **Team code** | `2 0 1 6` | `BUG-6120` — one digit per teammate |

The team code is deliberately the same year she typed at the start. When the
fourth digit lands and she recognises it, that's a second laugh.

**Print four cards, one digit each**, and hand them to the four teammates before
she scans. Tell them: *don't volunteer it — wait until she asks.*

Change either code in `CONFIG` (`cardCode`, `teamCode`).

---

## 3. Photos

Drop files into `public/photos/` and reference them from `content.ts`.
Missing images render as labelled placeholder boxes — nothing breaks.

The tribute portraits get an automatic warm duotone (`.portrait` in
`globals.css`) so photos shot in a dim bar, a bright street and a white office
all resolve to the same palette. **To turn the duotone off**, delete the
`filter:` line from `.portrait`.

If you want true cut-outs for the four hero portraits: on an iPhone, long-press
the person in Photos → Copy → save as PNG. Ten seconds each, and it beats every
automated tool on hair.

---

## 4. Deploy

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # verify before shipping
```

Deploy to Vercel: import the repo, no configuration needed. Fully static.

**Use a boring domain.** `rewards-portal.vercel.app`, not `jessy-anniversary`.
She will see the URL in her camera's QR preview before she taps it — her name in
the URL destroys Act I before it starts.

`noindex` / `nofollow` is already set in `next.config.ts` and the page metadata.

---

## 5. Presenter controls

Open **`/presenter` on your own phone** before the event. It gives you:

- jump to any screen
- reset her progress
- close four tickets instantly (if you need to skip to the ending)
- a cheat sheet of both codes, who holds which digit, and the gift location

Not linked from anywhere in the experience.

---

## 6. Timing

| Act | Screen | Duration |
|---|---|---|
| I | Landing (incl. 3.5s fake spinner) | ~40s |
| I | Code entry | ~30s |
| I | Rage meter gag | ~60s |
| II | Crash / role flip | ~35s |
| II | Four tickets + final reveal | ~2 min |
| III | Tribute scroll | ~90s |
| III | Gift reveal | ~30s |

**≈ 8–9 minutes.** Every screen is skippable.

---

## 7. Failure-proofing

The design rule is: **she must never be stuck in front of an audience.**

- Every ticket shows a hint after **20s** and resolves itself after **45s**,
  silently. She'll never know the site stepped in.
- The team code auto-fills after **30s** with *"They were always going to say
  yes."*
- Two wrong card codes and the form fills itself in with `// fine, I'll do it`.
- Progress is saved to `localStorage` — a phone call or a dropped tab resumes
  exactly where she was.
- No interaction can be answered wrong. There is no failure state anywhere.

---

## 8. Day-of checklist

- [ ] All `TODO`s in `content.ts` replaced
- [ ] Both physical gifts hidden together in the real location from `REDEMPTION_GIFTS`
- [ ] `SPA_VOUCHER` copy and `CONFIG.spaVoucherUrl` checked
- [ ] Redeployed and verified after the final content change
- [ ] Ran the whole flow on **her phone model**, on **office wifi**
- [ ] Four digit cards printed and handed out; holders briefed
- [ ] Gift physically hidden and confirmed present
- [ ] `/presenter` open on your phone
- [ ] Backup phone with the flow pre-loaded, charged, in your pocket
- [ ] One person assigned to film **her face**, not the screen
- [ ] The other four teammates have OK'd their photos being on the site
