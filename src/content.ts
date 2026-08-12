/**
 * ============================================================================
 *  EVERYTHING YOU NEED TO EDIT IS IN THIS FILE.
 * ============================================================================
 *  No components need to change to swap names, quotes, photos, gift clues,
 *  hiding places, voucher copy, or the team code. Anything marked TODO is a
 *  placeholder.
 * ============================================================================
 */

export type GiftKind = "digital" | "physical";

export interface RedemptionGift {
  key: "spa" | "physical";
  kind: GiftKind;
  label: string;
  title: string;
  teaser: string;
  clue: string;
  location?: string;
}

export const CONFIG = {
  /** Printed on the back of the fake gift card. The year she started. */
  cardCode: "2016",

  /** The year she started / the year the site counts from. */
  startYear: 2016,
  currentYear: 2026,

  /** Her name, as the site addresses her. */
  name: "JESSY",

  /**
   * BUG-6120 — the four digits, one per teammate.
   * Deliberately "2016" again: she already typed it on the gift card screen.
   * Set to 3 or 2 digits if fewer teammates can be in the room.
   */
  teamCode: ["2", "0", "1", "6"],

  /**
   * Which teammate holds which digit. Shown to nobody — this is for YOUR
   * printout. See docs/RUNBOOK.md.
   */
  digitHolders: ["Hadil", "Nathalie", "Raja", "Roy"],

  /** Auto-help timings. She must never be stuck in front of an audience. */
  hintAfterMs: 20_000,
  autoSolveAfterMs: 45_000,

  /** The supplied PDF is served locally so the QR works without a third party. */
  spaVoucherUrl: "/spa-voucher.pdf" as string | null,
} as const;

/** Copy and hiding place for the two-step ending. Update these on the day. */
export const REDEMPTION_GIFTS = [
  {
    key: "spa",
    kind: "digital",
    label: "A LITTLE SOMETHING",
    title: "A small surprise is ready.",
    teaser: "It has made its way through the system and passed absolutely no compliance review.",
    clue: "Open what is waiting, then make a little time for yourself.",
  },
  {
    key: "physical",
    kind: "physical",
    label: "MORE TO UNCOVER",
    title: "The trail continues.",
    teaser: "This part leads away from the screen. Follow the clue and see where it takes you.",
    clue: "Where it all started.",
    location: "Jessy's old office, the old devices QA room.",
  },
] as const satisfies readonly RedemptionGift[];

/** Details shown on the built-in voucher preview route. */
export const SPA_VOUCHER = {
  spaName: "SKIN AVENUE",
  service: "$75 of your choice",
  recipient: "Jessy Dahdouh",
  issuedBy: "From Mobile Team",
  validUntil: "5 November 2026",
  contact: "81 50 60 77 | @skinavenueLB",
  finePrint: "The original voucher PDF is the official version. No bugs during treatment.",
} as const;

/* ---------------------------------------------------------------------------
 *  ACT I — the escalating balance gag
 * ------------------------------------------------------------------------- */

export const BALANCES = [
  { value: "$0.00", note: null },
  { value: "3.00 EGP", note: "Recalculating…" },
  { value: "1 × bar of soap", note: "handmade, artisanal" },
  { value: "4 hours of sleep", note: "EXPIRED" },
  { value: "NaN", note: "FATAL" },
] as const;

/* ---------------------------------------------------------------------------
 *  ACT II — the bug board
 * ------------------------------------------------------------------------- */

export type TicketId = "BUG-1042" | "BUG-3011" | "BUG-0001";

export type GameKind = "sleep" | "tabouleh" | "final";

/** The finale. Stays locked until every other ticket on the board is closed. */
export const FINAL_TICKET_ID = "BUG-0001" satisfies TicketId;

export interface Ticket {
  id: TicketId;
  title: string;
  /** Omit to hide the "reported by" line entirely. */
  reporter?: string;
  severity: string;
  /** Omit to drop the "steps to reproduce" block entirely. */
  steps?: string[];
  game: GameKind;
  resolution: string;
  /** Shown after the interaction completes. The punchline. Optional. */
  closingNote?: string;
  /**
   * The game stamps the resolution itself and stays on screen once closed —
   * no separate closing panel. For tickets whose punchline IS the last frame
   * of the interaction.
   */
  stampInGame?: boolean;
}

/** Two playable tickets, followed by the locked appreciation reveal. */
export const TICKETS: Ticket[] = [
  {
    id: "BUG-1042",
    title: "Jessy ma betnem",
    severity: "CRITICAL",
    game: "sleep",
    resolution: "WONTFIX",
    stampInGame: true,
  },
  {
    id: "BUG-3011",
    title: "TABBOULEHHH NOT FOUND",
    severity: "CRITICAL",
    game: "tabouleh",
    resolution: "WONTFIX",
    stampInGame: true,
  },
  {
    id: "BUG-0001",
    title: "User does not know how much this team appreciates her",
    reporter: "Everyone",
    severity: "BLOCKER",
    steps: [
      "Observe her for ten years",
      "Attempt to say it out loud",
      "Fail every time",
    ],
    game: "final",
    resolution: "CANNOT REPRODUCE",
    closingNote: "Because it was never a bug.",
  },
];

/**
 * BUG-1042 — what happens once she has run out of snoozes. The site offers to
 * help, asks ChatGPT, thinks about it, and comes back with the verdict.
 * Each step's `ms` is how long it stays on screen before the next one.
 */
export const SLEEP_ASSIST = {
  offer: { text: "khalina nse3dik", ms: 1600 },
  /** She reads the question, then sends it herself — no timer on this step. */
  ask: {
    image: "/chatgpt-sleep.png",
    imageLabel: "Screenshot: asking ChatGPT how Jessy can sleep 8 hours",
    button: "SEND ↑",
  },
  thinking: { label: "analyzing sleep patterns…", ms: 2600 },
  /** The last frame. The ticket is stamped here and stays put. */
  verdict: { text: "KIZBIII KBIRIIIII MA FIKEEEE TNEME 8 se3et bi 3 se3et" },
} as const;

/**
 * BUG-3011 — she asks for tabbouleh, the kitchen starts, and then remembers
 * the one time the parsley stayed in her teeth all afternoon.
 */
export const TABBOULEH = {
  start: "PREPARE TABBOULEH",
  /** Three sprigs stuck in her teeth. She picks them out one by one. */
  pick: {
    count: 3,
    label: "parsley stuck",
    hint: "chile l ba2dounes men snenik 🌿",
  },
  verdict: {
    text: "Ma fina na3mol l tabbouleh, l ba2dounes l 3el2anin ma bi addoo :((",
    aside: "(sorry ma elnelik 3anon)",
  },
} as const;

/* ---------------------------------------------------------------------------
 *  ACT III — the tribute
 * ------------------------------------------------------------------------- */

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export const STATS: Stat[] = [
  { label: "days", value: 3650 },
  { label: "bugs nobody else found", value: 4382 }, // TODO: a real-ish number
  { label: "hours of sleep", value: 0 },
  { label: "bars of soap", value: 214 }, // TODO
  { label: "lunches with this team", value: 900 }, // TODO
];

export interface Tribute {
  name: string;
  role: string;
  photo: string | null;
  message: string;
  /** Renders as a video-call window instead of a polaroid. */
  remote?: boolean;
}

export const TRIBUTES: Tribute[] = [
  {
    name: "Hadil",
    role: "Developer", // works from Cyprus
    photo: "/photos/team/hadil.jpg",
    message:
      "Miss Pixel " +
      "Happy anniversary, Jessy!",
    remote: true,
  },
  {
    name: "Nathalie",
    role: "Developer", // the youngest of the team
    photo: "/photos/team/nathalie.jpg",
    message:
      "For taking care of Mobile Hospital as one of your own, " +
      "thank you for everything you do. Happy anniversary!",
  },
  {
    name: "Raja",
    role: "Developer", // second-youngest
    photo: "/photos/team/raja.jpg",
    message:
      "Kebous bugs " +
      "Happy anniversary!",
  },
  {
    name: "Roy",
    role: "Developer",
    photo: "/photos/team/roy.jpg",
    message:
      "For multiple year, you haven’t allowed even 1 bugs to slip past 1 fingers " +
      "of yours, not even 1 pixels, 1 unnecessary S’s, 1 expired items, or 1 recalled products. " +
      "Every single 1 becomes a bug. Happy anniversary to the QA queen who never lets 1 details escapes!",
  },
];

export interface TimelineEntry {
  year: number;
  title: string;
  body: string;
  photo?: string | null;
}

export const TIMELINE: TimelineEntry[] = [
  { year: 2016, title: "Day one", body: "TODO: what do you remember about her first week?" },
  { year: 2018, title: "TODO", body: "TODO: a moment, a release, a disaster she caught." },
  { year: 2020, title: "TODO", body: "TODO." },
  { year: 2022, title: "TODO", body: "TODO." },
  { year: 2024, title: "TODO", body: "TODO." },
  { year: 2026, title: "Ten years", body: "TODO: and here we are." },
];

/** One screen. One sentence. No ornament. Make this one count. */
export const THE_LINE =
  "For ten years, you found the things nobody else would have found — " +
  "at work, at home, with no sleep at all. Thank you.";

export const KEEPSAKE = {
  title: "Certificate of Ten Years",
  subtitle: "for finding what everyone else missed",
  awardedTo: "Jessy",
  signoff: "— your team", // TODO
};
