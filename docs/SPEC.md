# Jessy — 10 Year Anniversary Experience
## Product Specification v1.0 (DRAFT — pending approval)

---

## 0. Discovery Inputs

### The Recipient
**Jessy** — 10 years as an **iOS QA Engineer**. Early 30s. Mother of two.

| Trait | Source | Creative value |
|---|---|---|
| iOS QA, 10 years | Core | She finds the bug nobody else sees. This is the whole concept. |
| Maker: soap, furniture (coffee tables, backdrops), kids' art projects | Colleague 2 | She *builds* things. Emotional core. |
| Plates food beautifully — food as art | Colleague 2 | Craft extends to everything |
| Family-first, celebrates every occasion | Colleague 2 | Tribute tone |
| Beach person, floats in the water | Colleague 2 | Visual palette + payoff imagery |
| Sharm el-Sheikh on repeat | Colleague 1 | Specific, personal, recognizable |
| Tabouleh | Colleague 1 | Comedy beat |
| Shisha | Colleague 1 | Comedy beat |
| Barely sleeps | Core | Comedy beat with heart |
| "She needs money to stop working" | Colleague 1 | **Justifies the fake gift card joke** |

### Deliberately excluded
**Recent weight loss.** Recommended out of scope. Body commentary in front of an
audience is the single highest-risk beat available to us and has no upside the
other material doesn't already provide. Overridable by the organizer.

### Event Logistics (confirmed)
- **Scan context:** at the office, **team watching**
- **Duration:** 5–10 minutes total
- **Gift location:** hidden in the office, or virtual — *to be decided late*
- **Group:** one office now, outing later
- **Device:** her own phone, mobile-first (assumed iPhone)
- **Start year:** **2016** ✅ confirmed → card code `2016`, timeline 2016–2026
- **Team size:** **5 total** ✅ confirmed → Jessy + **4 teammates**

### Team Culture (observed from team photos)
Read off the reference photos, these are usable content hooks:

| Observation | Where it shows up |
|---|---|
| **This team eats together — constantly.** Steak & fries lunches, shared mezze, dessert courses. Multiple restaurants, multiple seasons. | The tribute timeline; a "meals shared" stat; `BUG-7033` (food plating) |
| **A giant hamster plush** appears in an office photo, held like a team member | **Easter egg** — see §20.3. Recurring mascot / loading spinner / hidden tap target |
| **Hybrid team** — one member joins from a laptop on a video call in an office shot | The tribute wall must work for a remote face; `BUG-6120` supports a remote digit-holder |
| **Selfie culture** — nearly every photo is an arm's-length group selfie | The `/keepsake` page should be framed as *the next selfie in the series* |
| **Small, tight, informal** — 5 people, no hierarchy visible, lots of physical closeness | Tone stays warm and peer-to-peer, never corporate-formal |
| **Gift-giving is already a ritual** — a wrapped present sits on the table in one photo | The fake gift card will read as normal to her. **The prank will land.** |

**Jessy** is identified as the teammate with the round dark-framed glasses.
*Organizer to confirm before any photo is placed in a named slot.*

---

## 1. Product Vision

> A fake gift card that insults her, a website that breaks in her hands, and ten
> years of being the person who fixes things — turned into the joke, the game,
> and the tribute, in under ten minutes.

The experience must do four things, in this order:

1. **Land the prank.** The gift card must fail convincingly and comically.
2. **Flip the role.** She stops being a recipient and becomes the QA engineer she
   is. The site *needs her*.
3. **Let the room in.** The team is watching. They must be able to laugh, shout,
   and be *named on screen*.
4. **End sincere.** The last 90 seconds drop the bit entirely and tell her the
   truth.

**Design principle above all others: she must never be stuck.** She is standing in
front of colleagues. Every interaction self-resolves. There is no failure state
anywhere in this product.

---

## 2. The Core Concept

### `RewardHub™ — Employee Recognition Portal`

The QR code leads to the most soul-crushing corporate rewards portal imaginable.
Gray gradients. Arial. A stock photo of diverse people high-fiving. It
congratulates her on "10 Years of Service" in the voice of an HR automation
system.

She enters the code printed on the card. Her balance loads.

**It is $0.00.**

The portal tries to recover. It offers **3 EGP**. Then **one (1) bar of soap**.
Then it throws an unhandled exception and crashes into a stack trace.

And then the crash log addresses her by name.

> `No QA engineer available to triage this issue.`
> `...`
> `Correction: one is currently holding this phone.`

The site hands her a **bug tracker with four open tickets** — the strongest
moments from the decade — each one filed by a real teammate, each one a joke
about her. Closing them restores
the portal. The final ticket cannot be closed by any button. Closing it reveals
the real gift.

### Why this concept
- The fake gift card is no longer just a delivery mechanism — it is **the setup to
  the joke**, and it pays off the team's own running gag ("she needs money to stop
  working").
- The puzzle is **about her craft**. A tribute that makes a QA engineer debug
  something is a tribute in the shape of the person.
- The bug tracker is a **container for team voices** — every teammate quote you
  collect becomes a ticket. The more people contribute, the richer it gets, with
  zero redesign.
- It ends with a bug that **cannot be reproduced**, because the thing being
  reported is that she doesn't know how much she's appreciated.

---

## 3. User Journey

| # | Beat | Time | Emotion | Audience role |
|---|---|---|---|---|
| 1 | Handed a fake gift card, scans QR | 0:00 | Polite confusion | Watching, in on it |
| 2 | Corporate portal loads, congratulates her | 0:20 | "Oh no. Really?" | Snickering |
| 3 | Enters code from card | 0:40 | Compliance | Leaning in |
| 4 | **Balance: $0.00** → 3 EGP → 1 bar of soap | 1:00 | Betrayal / laughter | **Big laugh** |
| 5 | Portal crashes. Stack trace. | 1:30 | Delight — she knows this screen | Confusion → intrigue |
| 6 | Site recognizes her as QA. Role flip. | 1:50 | Recognition, ego-stroke | "Ohhhh" |
| 7 | **4 open tickets appear** | 2:10 | Amusement | Everyone reads along |
| 8 | Closes the four mini-interactions | 2:30–4:30 | Play | **Shouting answers** |
| 9 | One ticket requires the room (team code) | 3:30 | Collective | **Active participation** |
| 10 | All tickets closed but one: `BUG-0001` | 4:30 | Shift in tone | Quiet |
| 11 | `BUG-0001: CANNOT REPRODUCE` → tribute wall | 5:00 | **Emotional** | Silence, phones up |
| 12 | Portal "repairs" itself into something handmade | 6:00 | Warmth | Applause |
| 13 | Real gift location revealed. Bubbles. | 6:30 | Joy | Cheering |
| 14 | Shareable card / keepsake page | 7:00 | Keepsake | Photos |

**Total: ~7 minutes**, with every step skippable, targeting the 5–10 min window.

---

## 4. Storyline (Three Acts)

### Act I — The Insult (0:00–1:30)
`RewardHub™` is a machine that does not know her. It calls her "VALUED
ASSOCIATE." It thanks her for "10 YEARS OF SERVICE" in a system font. It offers
her nothing, in increasingly specific and personal ways — and the specificity is
the first clue that this isn't really a corporate site at all.

**Escalating balance gag:**
```
Balance: $0.00
Recalculating...           Balance: 3.00 EGP
Recalculating...           Balance: 1 × bar of soap (handmade, artisanal)
Recalculating...           Balance: 4 hours of sleep  [EXPIRED]
Recalculating...           Balance: NaN
FATAL
```

### Act II — The Bug (1:30–6:30)
The crash reveals a second layer beneath the corporate skin: a dark, technical,
honest interface. It knows exactly who she is. It has been waiting for her.

It presents `JESSY-10Y`, a bug board with four tickets — the strongest jokes
from the decade, filed as defects. Every ticket is a love letter disguised as a
complaint.

She triages them. The room reads them out loud.

### Act III — The Truth (6:30–9:00)
Four tickets close. `BUG-0001` will not. She marks it `CANNOT REPRODUCE` —
the QA verdict for a problem that isn't real — and the interface finally drops
the act. The cold portal dissolves into something warm, textured, and handmade:
paper, sea, soap. The team's real words. Ten years, and then the gift.

---

## 5. Sitemap

```
/                     Landing — RewardHub™ portal (fake corporate)
  /redeem             Code entry (code printed on physical card)
  /balance            Escalating balance failure → crash
  /crash              Stack trace + role flip (auto-advances)
/board                Bug board — 4 playable tickets + final reveal, progress persisted
  /ticket/[id]        Individual ticket + micro-interaction
     BUG-5006         Soap / bubble pop
     BUG-6120         Team code  ← requires the room
     BUG-8001         Kids' art project
     BUG-9002         "Needs money to stop working" → WONTFIX
     BUG-0001         ← cannot be closed
/tribute              The wall — team messages, photos, 10-year timeline
/gift                 Surprise trail — reveal something, then follow the clue
/spa-voucher.pdf      Supplied Skin Avenue voucher opened by the first QR
/voucher/spa          Styled fallback voucher preview
/keepsake             Shareable card, "Certificate of 10 Years of Finding What
                      Everyone Else Missed"
/_presenter           Hidden: skip-to-any-step control for the organizer
```

**Progression:** sequential through Acts I and III; the four playable tickets are
closable in any order (parallel) so the room can pick favorites and the pace
stays in her control. `BUG-0001` unlocks only when the other four are closed.

---

## 6. Screen-by-Screen Wireframes

### 6.1 `/` — RewardHub™ Landing
```
┌─────────────────────────────┐
│ ▓▓ RewardHub™               │  Gray gradient bar, Arial Bold
│    Employee Recognition     │  Tagline in italic gray
├─────────────────────────────┤
│                             │
│   [ stock photo: 4 people   │  Deliberately generic corporate
│     high-fiving in a        │  stock imagery
│     glass conference room ] │
│                             │
│   CONGRATULATIONS           │  Centered, all caps, letter-spaced
│   VALUED ASSOCIATE          │  ← never her name
│                             │
│   On 10 Years of Service    │
│                             │
│   ┌───────────────────────┐ │
│   │  REDEEM YOUR REWARD → │ │  Corporate blue #0057B8, sharp corners
│   └───────────────────────┘ │
│                             │
│   Terms apply. Reward has   │  6px gray legal text
│   no cash value.            │  ← foreshadowing
└─────────────────────────────┘
```
*Detail: a cookie banner she must dismiss. Two clicks. Maximum authenticity.*

### 6.2 `/redeem` — Code Entry
```
┌─────────────────────────────┐
│ ▓▓ RewardHub™               │
├─────────────────────────────┤
│  Enter the code found on    │
│  the back of your card:     │
│                             │
│   ┌────┐┌────┐┌────┐┌────┐  │  4 large boxes, auto-advance,
│   │    ││    ││    ││    │  │  numeric keypad on mobile
│   └────┘└────┘└────┘└────┘  │
│                             │
│   Validating...             │  Fake 2s delay with spinner
│                             │
│   ⓘ Having trouble?         │  Tapping = "Have you tried
│                             │     turning it off and on again?"
└─────────────────────────────┘
```
**Code:** `2016` (the year she started) — printed on the fake card. If she gets it
wrong twice, the field auto-fills itself with a comment: `// fine, I'll do it`.

### 6.3 `/balance` — The Escalating Failure
```
┌─────────────────────────────┐
│  YOUR REWARD BALANCE        │
│                             │
│      ┌───────────────┐      │
│      │   $  0 . 00   │      │  Huge odometer digits,
│      └───────────────┘      │  rolling-counter animation
│                             │
│   Recalculating ▓▓▓░░░░░    │  Progress bar, each pass reveals
│                             │  a new absurd balance
│   ⚠ Balance may not reflect │
│     actual appreciation.    │
└─────────────────────────────┘
```
Each recalculation replaces the value. The final pass produces `NaN`, the screen
desaturates, the layout **collapses** — elements physically fall out of the
layout (CSS transform, gravity) — and it cuts to black.

### 6.4 `/crash` — The Role Flip
```
┌─────────────────────────────┐
│ ● ● ●   crash_report.log    │  Dark, monospace, Xcode-flavored
│                             │
│ Fatal Exception:            │  Typewriter reveal, ~30ms/char
│   NSInvalidRewardException  │
│                             │
│ Reason: reward value        │
│   cannot represent the      │
│   subject.                  │
│                             │
│ Thread 0 crashed:           │
│ 0  RewardHub  0x00 gift()   │
│ 1  RewardHub  0x01 value()  │
│ 2  HR         0x02 ...      │
│                             │
│ > No QA engineer available  │
│   to triage this issue.     │
│                             │
│ > ...                       │  ← 1.5s pause. Let it breathe.
│                             │
│ > Correction: one is        │
│   currently holding this    │
│   phone.                    │
│                             │
│ > JESSY.                    │  ← first time she's named
│ > 10 years. 3,650 days.     │
│ > Countless bugs nobody     │
│   else would have found.    │
│                             │
│ > We need you one more time.│
│                             │
│   [ OPEN BUG BOARD ]        │  Green terminal button, pulsing
└─────────────────────────────┘
```
**This is the single most important screen in the product.** Everything before it
is a prank; everything after it is a tribute. The pause before "Correction:" is
the hinge — do not rush it.

### 6.5 `/board` — The Bug Board
```
┌─────────────────────────────┐
│  JESSY-10Y          9 OPEN  │  Sticky header, progress ring
│  ▓▓▓░░░░░░░  3/10 resolved  │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ BUG-1042      🔴 OPEN   │ │  Card, tappable, swipe-friendly
│ │ Sleep module returns    │ │
│ │ null since 2019         │ │
│ │ 👤 reported by [NAME]   │ │  ← teammate avatar + name
│ │ Severity: CRITICAL      │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ BUG-2087      ✅ CLOSED │ │  Closed cards: dimmed, green
│ │ User builds furniture   │ │  stamp rotated -8°
│ │ instead of resting      │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ BUG-0001      🔒 LOCKED │ │  Locked until all others closed
│ │ ████████████████████    │ │  Text redacted/blurred
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### 6.6 `/ticket/[id]` — Ticket Detail
```
┌─────────────────────────────┐
│ ← BUG-5006                  │
│                             │
│ Title: Excess soap detected │
│ Reported by: [NAME] 👤      │
│ Priority: P0                │
│ Steps to reproduce:         │
│  1. Give Jessy a free       │
│     weekend                 │
│  2. Observe                 │
│  3. House now smells like   │
│     lavender                │
│                             │
│ ┌─────────────────────────┐ │
│ │                         │ │
│ │   [ MINI-INTERACTION ]  │ │  ← the playable area
│ │                         │ │
│ └─────────────────────────┘ │
│                             │
│  [ Need a hint? ] ← appears │  after 20s, always
│                             │
│ RESOLUTION: ____________    │  Fills in on completion
└─────────────────────────────┘
```

### 6.7 `/tribute` — The Wall
Full-bleed vertical scroll, warm palette, paper texture. Sections:
1. **Ten years, in numbers** — animated counters (days, releases, bugs, sleepless
   nights, bars of soap). Numbers land with weight.
2. **The timeline** — 2016 → 2026, a horizontal scroll of moments, photos, jokes.
3. **The wall** — teammate cards. Photo, name, handwritten-style message. Stagger
   in as she scrolls. *This is where every quote you collect lives.*
4. **The line** — one full screen, one sentence, no ornament.

### 6.8 `/gift` — The Surprise Trail
```
┌─────────────────────────────┐
│                             │
│   FINAL CHECKPOINT          │
│   A LITTLE SOMETHING        │  Surprise trail
│   MORE TO UNCOVER           │
│                             │
│   A little something.       │
│   And there's more to       │
│   uncover.                  │
│                             │
│   A mildly unnecessary      │
│   quest.                    │
│                             │
│   [ OPEN THE MYSTERY ]      │  First reveal: local QR → voucher
│                             │
│   [ CONTINUE THE TRAIL ]    │  Later reveal: clue → real-world location
│                             │
│   ○ ○  ○   ○ ○  ○  ○ ○      │  Soap bubbles on every reveal
└─────────────────────────────┘
```
The first step renders a scannable QR that opens the supplied `/spa-voucher.pdf`
by default (or `CONFIG.spaVoucherUrl` if a different voucher URL is needed).
The later reveal opens a clue, then a real-world location. Progress persists
locally so a dropped tab does not reset the trail.

---

## 7. Visual Design Direction

The site **transforms three times**, and the transformation *is* the story.

### Layer A — "Corporate" (Acts I)
Deliberately, lovingly bad.
- **Type:** Arial / Helvetica. System defaults. No craft.
- **Color:** `#F2F3F5` gray, `#0057B8` corporate blue, `#D8DCE1` borders
- **Shapes:** sharp corners, 1px borders, drop shadows from 2009
- **Imagery:** the most generic stock photography available
- **Motion:** none, except a spinner that spins too long

### Layer B — "Debug" (Act II)
Honest, technical, and — to her — *comfortable*. This is her habitat.
- **Type:** SF Mono / JetBrains Mono
- **Color:** `#0B0E14` background, `#7EE787` green, `#FF7B72` red, `#D2A8FF`
  purple, `#F0F6FC` text — Xcode dark, familiar to any iOS engineer
- **Shapes:** 6px radius cards, hairline borders, terminal blocks
- **Motion:** typewriter, cursor blink, scanline, subtle CRT

### Layer C — "Handmade" (Act III)
Everything the corporate layer wasn't. This is *her*.
- **Type:** a warm serif for display (Fraunces / Playfair), a clean sans for body,
  a handwritten face for teammate messages
- **Color — "Sharm at 6pm":**
  | Token | Hex | Use |
  |---|---|---|
  | `sand` | `#F5E9D7` | background |
  | `sea` | `#2E8B8B` | primary |
  | `deep` | `#1B5E63` | text on light |
  | `terracotta` | `#C96A4B` | accent, warmth |
  | `olive` | `#7C8B5B` | secondary accent |
  | `ink` | `#2A2118` | body text |
- **Texture:** paper grain overlay, soft soap-bar silhouettes, rounded organic
  shapes, torn-paper section dividers
- **Imagery:** polaroid-framed photos, slight rotation, tape corners

**The transition between layers is the money shot.** B→C should feel like the
interface *softening* — colors bleeding warm, sharp corners rounding, mono type
cross-fading to serif.

---

## 8. Animation Ideas

| Moment | Animation | Notes |
|---|---|---|
| Portal load | Over-long spinner (3.5s) | Sells the corporate incompetence |
| Balance reveal | Odometer digit roll | Land on `0.00` with a thunk |
| Recalculation | Progress bar that jumps backwards | Comedy |
| Crash | RGB channel split + horizontal glitch slices, 400ms | Sharp, then black |
| Layout collapse | Elements fall out of the layout with gravity | Physical, memorable |
| Stack trace | Typewriter, 30ms/char, cursor blink | Pace it — don't rush the pause |
| Her name | Letters resolve from scrambled characters | 800ms |
| Board entry | Ticket cards stagger in, 60ms apart, from below | |
| Ticket close | Green `CLOSED` stamp slams in, rotated −8°, 3px overshoot | Haptic on iOS |
| Progress ring | Draws forward on each close | |
| BUG-0001 unlock | Redaction bars dissolve, lock rotates open | |
| B→C transition | Full-screen water ripple wipe from tap point | Ties to the beach |
| Tribute counters | Count up with ease-out, 1.2s | Numbers should feel earned |
| Teammate cards | Fade + rise on scroll, staggered | |
| The final line | Fade in over 2s, nothing else on screen | Restraint |
| Gift reveal | **Soap bubbles**, not confetti — rise, wobble, pop | Her craft, not a template |
| Throughout | Haptics on every meaningful action (iOS) | Cheap, huge payoff |

**Reduced motion:** every one of these has a static or cross-fade fallback,
honoring `prefers-reduced-motion`. The story never depends on motion.

---

## 9. Interaction Design

### Rules
1. **One thumb, portrait, always.** She's holding a phone in front of people.
2. **No text input after the code.** Typing on stage is stressful and slow.
   Everything else is tap, drag, or shake.
3. **No failure states.** Nothing can be answered wrong. Interactions complete or
   self-complete.
4. **Auto-hint at 20s, auto-solve at 45s.** Silently. She'll never know the site
   helped her, and the room never watches her struggle.
5. **Every tap gives feedback** — haptic, sound (if enabled), or motion. Never a
   dead tap.
6. **Progress persists** in `localStorage`. If Safari drops the tab or a call
   comes in, she resumes exactly where she was. *Critical: this will happen.*
7. **Back is always safe.** No destructive navigation.
8. **Sound is opt-in.** One tap-to-enable at the start; iOS blocks autoplay
   anyway. Experience is 100% complete silent.

### The organizer's controls (`/_presenter`)
A hidden route for you, on your own phone:
- Jump to any step (if the room's energy shifts, skip ahead)
- Reset her progress
- Toggle the ending mode (`physical` / `virtual`) — *decide this the morning of*
- Preview every screen

---

## 10. Game Mechanics

### The four playable tickets and final reveal

| ID | Title | Interaction | Resolution |
|---|---|---|---|
| `BUG-5006` | Excess soap detected in production | **Pop the bubbles** — 8 bubbles, each pops to reveal a letter spelling a word | `FIXED` |
| `BUG-6120` | Cannot verify user's team | **The room** — a 4-digit code the team shouts (see below) | `VERIFIED` |
| `BUG-8001` | Unauthorized art project detected in kids' room | **Scratch to reveal** a child's crayon drawing | `APPROVED` |
| `BUG-9002` | User requires funds to terminate employment | **Tap "Approve Raise"** — button dodges her finger 3×, then submits, then returns `403 Forbidden` | `WONTFIX` 😈 |
| `BUG-0001` | *[redacted until all others close]* | **No button works.** Only one resolution is selectable. | `CANNOT REPRODUCE` |

**`BUG-9002` is the callback** to the team's own joke and should get the biggest
laugh of Act II. Place it second-to-last.

### The room mechanic — `BUG-6120`
The site says it cannot verify she's on a real team and demands a **4-digit
verification code**. It does not tell her the code.

Each of four teammates holds one printed digit (on the back of their badge, a
sticky note, a card). She has to turn around and ask her team. The screen shows
four empty boxes that fill as they call out numbers.

**With a team of 5, this is now exact:** Jessy + 4 teammates = **4 digits, one per
teammate.** Nobody is a spectator. Every single person in the room has a job, and
the code cannot be completed without all four of them. This is the strongest
possible version of this mechanic and it fell out of the team size for free.

Suggested code: **`2016`** — the year she started, which she has *already typed
once* on the gift card screen. When the fourth digit lands and she recognizes it,
that's a second, quieter laugh on top of the first.

**Remote teammate:** if the video-call member can't be there in person, their
digit is delivered by them on screen — the site shows a "waiting for remote
verification…" state for that one slot, which makes their inclusion the point
rather than an apology.

**Why this earns its place:** it's the only moment that physically turns her
toward the room, it costs nothing, and it takes 45 seconds. It converts
spectators into participants exactly once — more than that and it drags.

**Fallback:** after 30s, the code auto-fills with a message —
`Verified. They were always going to say yes.`

### Difficulty
**Deliberately easy.** This is not an escape room. Nothing here should make her
think hard — the pleasure is in *recognition*, not challenge. Every interaction
is a 5-second toy that exists to deliver a punchline about her life. Anything
harder risks stalling an audience-watched moment.

---

## 11. Clue Progression

```
PHYSICAL CARD  ──▶  code 2016  ──▶  /redeem unlocked
                                          │
                                          ▼
                                    Acts I → crash (linear, unskippable)
                                          │
                                          ▼
                                    BUG BOARD (4 tickets, PARALLEL)
                                    ├── 3 solo micro-interactions
                                    └── BUG-6120 requires 4 teammates ◀── PHYSICAL
                                          │
                                    all 4 closed
                                          ▼
                                    BUG-0001 unlocks (LINEAR)
                                          ▼
                                    /tribute (linear scroll)
                                          ▼
                                    /gift  ──▶  location string
                                          │
                        ┌─────────────────┴─────────────────┐
                        ▼                                   ▼
                  MODE: physical                      MODE: virtual
                  riddle + office location            link / code / voucher
                  "Where things get made"             revealed on screen
                  → the kitchen / her desk drawer
```

**Hybrid recommendation:** even in `virtual` mode, hide *something* physical — a
bar of soap, a card, a small object — so there's a moment where she walks
somewhere and finds a thing. A screen alone can't end a ten-minute story.

**Mixed mode (recommended):** the site reveals a location; at that location she
finds what was waiting *and* a second QR that opens `/keepsake` — the certificate
she can keep. That's the strongest ending and costs one extra printout.

---

## 12. Technical Architecture

```
┌───────────────────────────────────────────────────┐
│  Vercel Edge (static + ISR)                       │
│  ┌─────────────────────────────────────────────┐  │
│  │  Next.js 15 App Router — fully static       │  │
│  │  ┌───────────┐  ┌───────────┐  ┌─────────┐  │  │
│  │  │  Act I    │  │  Act II   │  │ Act III │  │  │
│  │  │  routes   │  │  board    │  │ tribute │  │  │
│  │  └───────────┘  └───────────┘  └─────────┘  │  │
│  │         │             │             │       │  │
│  │  ┌──────┴─────────────┴─────────────┴────┐  │  │
│  │  │  content.ts  ← ALL copy, quotes,      │  │  │
│  │  │  teammate names, photos, gift config  │  │  │
│  │  └───────────────────────────────────────┘  │  │
│  │  ┌───────────────────────────────────────┐  │  │
│  │  │  ProgressProvider (localStorage)      │  │  │
│  │  └───────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────┘
        │
        └── No backend. No database. No auth. No analytics.
```

### Key decisions
- **No backend.** Nothing to fail on the day. Every state lives in the client.
- **Single content file.** `src/content.ts` holds every string, teammate quote,
  photo path, and the gift config. You can edit the entire experience — including
  the final location — without touching a component. Non-engineers on your team
  can contribute quotes directly.
- **All assets local and preloaded.** No external CDN, no Google Fonts at runtime
  (self-host), no third-party requests. Office wifi will be bad. Plan for it.
- **Aggressive preloading** — every image for the whole journey loads during the
  3.5s fake spinner on the landing page. By the time she taps "Redeem," the entire
  experience is in memory.
- **`noindex`, `nofollow`, `X-Robots-Tag`** — this must not be discoverable.
- **Total budget: < 1.5 MB** including images. Target < 2s to interactive on 4G.

### Content model
```ts
// src/content.ts
export const CONFIG = {
  code: "2016",
  spaVoucherUrl: "/spa-voucher.pdf",
  teamCode: ["7","2","0","3"],
};

export const REDEMPTION_GIFTS = [
  { kind: "digital", title: "The reward that requires no walking" },
  { kind: "physical", title: "The one that refused to be an app" },
  { kind: "physical", title: "The final boss of appreciation" },
];

export const TICKETS: Ticket[] = [ /* 4 playable + final reveal */ ];
export const TRIBUTES: Tribute[] = [
  { name: "", role: "", photo: "/team/x.jpg", message: "" },
];
export const STATS = [
  { label: "days", value: 3650 },
  { label: "bugs found", value: 4382 },   // ← get a real-ish number if you can
  { label: "hours of sleep", value: 0 },
  { label: "bars of soap", value: 214 },
];
```

---

## 13. Suggested Technology Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | Vercel-native, zero-config deploy, static export |
| Language | **TypeScript** | Content model safety across the ticket set |
| Styling | **Tailwind CSS v4** | Three distinct design layers via CSS custom properties |
| Animation | **Motion (Framer Motion)** | Layout animations, stagger, `useReducedMotion` built in |
| Bubbles/particles | **Custom canvas** (~60 lines) | A physics lib is 40 KB for eight bubbles |
| Gestures | **@use-gesture/react** | Reserved for future drag interactions |
| Fonts | Self-hosted **Fraunces**, **JetBrains Mono**, **Caveat** | No runtime third-party fetch |
| State | React Context + `localStorage` | No Redux/Zustand needed for this |
| Haptics | `navigator.vibrate` + iOS fallback | Free delight |
| Hosting | **Vercel** | As planned |
| Analytics | **None** | Nothing to leak, nothing to slow it down |

**Deliberately not used:** any CMS, any database, any auth, any state library, any
UI component library. The whole thing should be ~15 components and one content
file.

---

## 14. Deployment Plan

| When | Action |
|---|---|
| **T-7 days** | Repo scaffolded, deployed to Vercel preview. URL locked. |
| **T-7 days** | **Fake gift card sent to print** — needs the final URL + QR + code `2016`. This is the long-lead item; everything else can change after. |
| **T-5 days** | Teammate quotes collected → `content.ts`. Photos in. |
| **T-3 days** | AI images generated and placed. Full run-through on a real iPhone. |
| **T-2 days** | **Test on Jessy's actual phone model**, on office wifi, at the actual spot she'll stand. Battery, brightness, notifications. |
| **T-1 day** | Freeze. Print the 4 team-code digits. Hide the gifts. Brief the 4 digit-holders. |
| **T-1 day** | Set the physical hiding place + spa voucher copy in `content.ts`, redeploy, verify. |
| **Day of** | Organizer opens `/_presenter` on their own phone as a safety net. |
| **Day of** | **Backup:** the whole flow works on a second phone, pre-loaded, in your pocket. |
| **T+1 day** | Optionally swap `/` to redirect straight to `/keepsake` so she can re-share it. |
| **T+30 days** | Take it down, or leave it — it costs nothing. |

**Domain:** a short, boring, non-suspicious URL. Something like
`rewards-portal.vercel.app` sells the prank far better than `jessy-anniversary`.
**Do not put her name in the URL** — she'll see it in the QR preview and the whole
Act I collapses.

---

## 15. Future Enhancements

- **The outing tie-in** — since there's an outing later, a second QR at the
  restaurant opens Act IV: photos from the office reveal, added live.
- **Live tribute wall** — a form teammates fill in *during* the event, appearing
  on her screen in real time. Needs a backend; only worth it for a bigger team.
- **Her kids** — a voice note or a drawing from them inside `BUG-8001`. If you can
  get one, this becomes the most memorable thing in the entire experience.
  Strongly recommended, and the highest emotional return of anything on this list.
- **Personalized certificate PDF** — generated on `/keepsake`, downloadable.
- **The soap tie-in** — an actual bar of her own soap as the physical object at
  the end, re-wrapped with a custom label reading `BUILD 10.0 — STABLE`.
- **Multiple endings** — a "she found it fast" vs "the room helped" variant. Low
  value here; skip unless the timeline grows.

---

## 16. Risks & Edge Cases

| Risk | Severity | Mitigation |
|---|---|---|
| **She gets stuck with everyone watching** | 🔴 Critical | Auto-hint 20s, auto-solve 45s, presenter override. No failure states anywhere. |
| **Office wifi dies mid-flow** | 🔴 Critical | Fully static, everything preloaded on screen 1, service worker caches the whole app. Works offline after landing. |
| **She sees the URL in the QR preview and guesses** | 🔴 Critical | Neutral corporate domain, no name in the URL. |
| **Her phone is on low battery / low power mode** | 🟠 High | Low Power Mode throttles animations — all motion has static fallbacks. Have a charged backup phone. |
| **Someone scans the card early and spoils it** | 🟠 High | Card stays sealed until the moment; `noindex`; the site is boring until code `2016` is entered. |
| **iOS Safari blocks audio** | 🟠 High | Sound is opt-in and purely decorative. Silent experience is complete. |
| **A call/notification kills the tab** | 🟠 High | `localStorage` progress — she resumes exactly where she left off. |
| **The room can't see her screen** | 🟠 High | Consider AirPlay/screen-mirroring to a TV if the room has one — it turns 12 spectators into 12 participants. **Design all type large enough to read from 2 metres.** |
| **She's emotional and wants to stop** | 🟡 Medium | Every screen has an unobtrusive forward path. Never trap her in a beat. |
| **Gift location changes last minute** | 🟡 Medium | One config value, one redeploy, 40 seconds. |
| **Teammate quotes arrive late** | 🟡 Medium | `content.ts` accepts them until the morning of. Tickets render fine with fewer names. |
| **Fewer than 4 teammates present** | 🟡 Medium | `teamCode` length is configurable — 3 digits, or 2. |
| **The prank reads as mean** | 🟠 High | Act I is short (90s) and the flip is unambiguous. **The insult must be from a machine, never from the team.** RewardHub™ is the villain; the team are the ones who show up in Act II to fix it. This framing is non-negotiable. |
| **Screen-recording for posterity fails** | 🟡 Medium | Assign one person to film *her face*, not the screen. The screen is on the website; her face isn't. |
| **Reduced-motion / accessibility** | 🟡 Medium | See §17. |

---

## 17. Accessibility

- `prefers-reduced-motion` honored on **every** animation — including the crash
  glitch, which becomes a cross-fade.
- **No interaction requires sound.** No interaction requires color perception
  alone. No interaction requires fine motor precision.
- **No time limits.** The 20s/45s helpers only *add* help; they never expire
  anything.
- **Contrast:** Layer C hits WCAG AA (4.5:1) on all body text. Layer B is
  intentionally high-contrast. Layer A is corporate-ugly but still AA.
- **Tap targets:** 48×48pt minimum, everywhere.
- **Dynamic Type:** all sizing in `rem`; respects her iOS text-size setting.
- **Screen reader:** semantic landmarks, live regions for the terminal typewriter,
  `alt` text on every image. The stack trace is `aria-live="polite"`, not a
  character-by-character announcement.
- **One-handed reach:** all primary actions in the bottom 40% of the viewport.

---

## 18. AI Image Generation Prompts

Generate these and drop them in `/public`. Each is written to be pasted directly
into an image model.

### Act I — Corporate (deliberately generic)
1. **`/corporate-hero.jpeg`** — *"Stock photograph, four diverse business
   colleagues in business-casual clothing high-fiving in a bright glass-walled
   conference room, over-lit, slightly cheesy corporate stock photo aesthetic,
   shallow depth of field, generic office plant in background, 2015 stock
   photography style, 16:9"*
2. **`/corporate-badge.png`** — *"Flat vector corporate award badge, blue and
   silver, laurel wreath, ribbon, text area blank, generic HR recognition award,
   clip-art style, white background"*

### Act II — Ticket illustrations (Xcode-dark, minimal)
3. **`/ticket-soap.png`** — *"Minimal line illustration of a rounded handmade soap
   bar with dried lavender embedded, thin lavender strokes on near-black, floating
   bubbles around it, technical schematic aesthetic, square"*
4. **`/ticket-raise.png`** — *"Minimal line illustration of a bank vault door
   sealed shut with a small '403' plate on it, thin red strokes on near-black,
   technical schematic style, square"*

### Act III — Handmade / warm
5. **`/tribute-bg.jpg`** — *"Soft handmade paper texture, warm sand cream color
   #F5E9D7, subtle deckled fibers, gentle natural side lighting, extremely
   minimal, seamless, high resolution"*
6. **`/floating.jpg`** — *"Overhead view of clear turquoise sea water surface with
    gentle ripples and sunlight caustics, no people, serene, warm tones, abstract,
    square"*
7. **`/soap-flatlay.jpg`** — *"Flat lay of five handmade artisanal soap bars in
    muted terracotta, olive, and cream tones, arranged on warm linen, dried
    lavender sprigs, natural window light, soft shadows, artisan craft photography,
    square"*
8. **`/kids-drawing.png`** — *"Child's crayon drawing on slightly crumpled paper,
    a family of four holding hands under a big yellow sun, wobbly joyful lines,
    scanned texture, authentic 5-year-old's artwork"*

### Keepsake
9. **`/certificate-bg.png`** — *"Elegant certificate border, thin double-line
    frame with subtle botanical corner flourishes, warm terracotta and sea-teal
    ink on cream paper texture, letterpress feel, portrait orientation"*

**Placeholders:** every image slot renders a labeled gray box until the real file
lands, so development is never blocked on assets.

---

## 19. Open Questions

**Resolved**
1. ~~Her start year~~ → **2016** ✅ (card code + timeline anchor)
2. ~~Team size~~ → **5 total, 4 teammates** ✅ (exact fit for `BUG-6120`)
3. ~~Real photos~~ → **5 team photos supplied** ✅ (see §20 for the pipeline)

**Blocking (needed before build starts)**
1. **Photo files committed to the repo** — see §20.1. The images exist but are not
   yet on disk; nothing can be processed until they are.
2. **Confirm which person is Jessy** in each photo before any named slot is filled.
   Getting this wrong in a tribute is unrecoverable.
3. **Teammate names** for the four ticket-reporter bylines and tribute cards.

**Important (needed before content freeze)**
4. **Language** — English only, or should some copy be in Arabic? Given tabouleh,
   shisha, and Sharm, a few Arabic lines in the tribute could land hard. Worth
   considering. Right-to-left support is a real cost, so if it's just a phrase or
   two, we'd inline them rather than build a full bilingual site.
5. **What is the actual gift?** Changes the tone of the final reveal.
6. **Does she know something is happening**, or is this a total ambush?
7. **Company branding** — must this carry the company's logo/colors, or are we
   free? (Free is better — RewardHub™ is funnier as an obviously fake third party.
   Using the real company's branding to insult her is a legal-adjacent bad idea.)
8. **Her manager / anyone senior participating?** A one-line message from
   leadership in the tribute adds weight, if the culture supports it.

**Nice to have**
9. Any **real numbers** — bugs filed, releases shipped, tickets closed? Real
   numbers in the stats section are dramatically more powerful than invented ones.
10. Any **inside jokes** I haven't captured — a phrase she always says, a recurring
    complaint, a thing that's become team legend?
11. Can we get **anything from her kids** — a drawing, a voice note, a photo? See
    §15; this is the highest-value optional addition in the whole spec.
12. **Is there a TV/screen in the room** to mirror her phone to?

---

## 20. Photo Assets & Background Treatment

### 20.1 Getting the photos into the build
The five reference photos were shared in conversation, **not committed to the
repo**, so no tooling can touch them yet. To unblock:

```
public/
  photos/
    raw/            ← drop the 5 originals here, any filename
    team/           ← generated: 4 square teammate portraits
    jessy/          ← generated: 2–3 portraits of Jessy
    timeline/       ← generated: wide crops for the tribute scroll
```

Commit the originals to `public/photos/raw/` and the pipeline below can run.

### 20.2 The background problem — recommended solution

The five photos were taken in four different places under four different lights:
a dim brick bar, a bright street-side window, a white office, a warm-toned
restaurant. Dropped onto the tribute wall as-is they will look like a folder of
snapshots, not a designed page.

**Three options, in order of what I'd actually do:**

**① CSS treatment — recommended. No background removal at all.**
Circular crop + a warm duotone + a soft ring. Every photo is forced into the same
two-tone palette (`sand` → `deep`), so the bar, the office, and the street all
resolve to the same warm wash. Backgrounds stop being backgrounds and become
texture.

```css
.portrait {
  aspect-ratio: 1; border-radius: 50%; object-fit: cover;
  filter: grayscale(1) contrast(1.08) brightness(1.02);
  /* duotone via a blend layer in --sand / --deep */
  box-shadow: 0 0 0 3px var(--sand), 0 0 0 5px var(--terracotta);
}
```
- **Cost:** zero. No external tools, no re-export, no per-photo labor.
- **Quality:** high — this is how editorial team pages actually solve this.
- **Bonus:** it *reinforces* the Layer C handmade palette instead of fighting it.
- **Reversible:** one CSS variable flips the whole treatment.

**② Local background removal (`rembg`), if you want true cut-outs.**
Once the files are committed I can write `scripts/cutout.py` using `rembg` +
`Pillow` to produce transparent PNGs, then composite each subject onto the `sand`
paper texture. This gives clean cut-out portraits floating on the tribute wall.
- **Cost:** a model download (~180 MB) through the proxy; may or may not be
  permitted by the network policy — I'd have to try it.
- **Risk:** hair edges on the curly-haired teammates will need manual cleanup.
  Auto-matting is unreliable exactly where these photos are hardest.

**③ Do it outside and hand me PNGs.** Apple Photos' "lift subject from
background" (long-press the person → Copy) takes ~10 seconds per photo on an
iPhone and beats every automated tool on hair. Drop the results in
`public/photos/team/` as transparent PNGs and the site consumes them directly.

**My recommendation: ① for v1, ③ if you want to upgrade the four hero portraits.**
Option ① makes the whole gallery coherent immediately; ③ is a targeted upgrade for
the four faces that matter most. ② is the one I'd skip — most effort, least
predictable result.

> **Note on AI background replacement:** I don't have an image generation or
> editing tool available in this session, and neither would any subagent — they
> inherit the same toolset. Real edits to these photos have to happen either
> through a local script (②) or on your side (③).

### 20.3 Easter eggs sourced from the photos

- **The hamster.** The plush from the office photo becomes the site's loading
  spinner during the fake 3.5s corporate wait — a tiny hamster, spinning. It also
  hides somewhere on the tribute wall as a tappable secret that plays a single
  squeak. Nobody will expect the team mascot to show up inside a gift card portal.
- **The wrapped gift on the table.** Reuse that exact photo on `/gift` as the
  "before" state of the reveal.
- **The video-call laptop.** On the tribute wall, the remote teammate's card is
  framed as a video-call window rather than a polaroid. Their difference becomes
  a design detail instead of an omission.
- **The dessert plate.** `BUG-7033` ("food renders at unnecessarily high
  fidelity") uses a real photo from one of these dinners, not an AI render.

### 20.4 Privacy
These are photographs of real colleagues going onto a public URL. Mitigations:
`noindex` / `nofollow` / `X-Robots-Tag` (already specified in §12), a non-guessable
URL, and the site taken down after the event. **Ask the other four before their
faces ship** — it takes one message and avoids the one complaint this project
could plausibly generate.

---

*Status: awaiting approval. No implementation has begun.*
