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
 *  ACT I — the rage meter gag
 * ------------------------------------------------------------------------- */

export const RAGE_STAGES = [
  { value: "0%", note: null, fill: 6, label: "Simmering" },
  { value: "27%", note: "getting warmer", fill: 27, label: "Heating up" },
  { value: "58%", note: "raised voices detected", fill: 58, label: "Boiling over" },
  { value: "91%", note: "ABOUT TO SNAP", fill: 91, label: "Redlining" },
  { value: "JESSY 3AM TENHAR", note: "OVERFLOW", fill: 100, label: "OVERFLOWED" },
] as const;

/* ---------------------------------------------------------------------------
 *  ACT II — the bug board
 * ------------------------------------------------------------------------- */

export type TicketId = "BUG-1042" | "BUG-3011" | "BUG-6001" | "BUG-4141" | "BUG-0001";

export type GameKind = "sleep" | "tabouleh" | "blackscreen" | "favorite" | "million";

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
    id: "BUG-6001",
    title: "Black screen l mawtttttttt",
    severity: "CRITICAL",
    game: "blackscreen",
    resolution: "WONTFIX",
    stampInGame: true,
  },
  {
    id: "BUG-4141",
    title: "FAVORITE COWORKER NOT FOUND",
    severity: "CRITICAL",
    game: "favorite",
    resolution: "WONTFIX",
    stampInGame: true,
  },
  {
    id: "BUG-0001",
    title: "retirement.exe: INSUFFICIENT FUNDS",
    severity: "CRITICAL",
    game: "million",
    resolution: "WONTFIX",
    stampInGame: true,
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

/**
 * BUG-6001 — a real support ticket, worked by two people who love her and
 * are both terrible at their jobs. The screen was auto-locking at 1 minute
 * the whole time; neither of them ever checks Settings first.
 */
export const BLACKSCREEN = {
  start: "OPEN TICKET",
  field: {
    text: "Field issue reported: A user's screen keeps going black after a while",
    ms: 2600,
  },
  kevin: {
    name: "KEVIN BRADLEY",
    role: "Tier 1 Support",
    text:
      "\"Tried to disconnect and reconnect the smart reader, but the issue " +
      "is still happening.\"",
    ms: 3200,
  },
  escalate: { text: "Escalating to SEAN O TAWIL…", ms: 1400 },
  sean: {
    name: "SEAN O TAWIL",
    role: "Tier 2 Support",
    text: "\"How does mobile hospital even work ?\"",
    ms: 3000,
  },
  crashed: "Jessy crashed",
} as const;

/**
 * BUG-4141 — pick a favorite coworker. Everyone dodges the tap except one —
 * the one answer she'd never actually give out loud.
 */
export const FAVORITE = {
  /** Order shown on screen. The last name is the only one that holds still. */
  coworkers: ["Roy", "Nathalie", "Hadil", "Raja", "Priyal"],
  correct: "Priyal",
  verdict: {
    arabic: "سكين الغدر 🔪",
    latin: "Kenna 3erfin bethebiya aktar menaaa",
  },
} as const;

/**
 * BUG-0001 — the finale. She chases the retirement fantasy, gets shut down
 * twice, gets told the dream is far away, and then gets the truth.
 */
export const MILLION = {
  button: "WIN MILLION DOLLAR",
  maxTries: 3,
  /** Shown as a native alert on the first tries — a system, not the team, saying no. */
  tryAgain: "MABIIII DOLLAR, TRY AGAIN",
  ragebait: { text: "Sorry helm l dalell wel princess treatment b3idddd", ms: 2600 },
  verdict: "Nehna aslan menhebiik KTSIRRR KTSIRRRR w mamnou3 tfele :)",
} as const;

/**
 * The scratch transition — between the bug board closing and the tribute
 * opening. She reads the line, then scratches to find out who "them" is:
 * a photo of her two kids, mid-celebration.
 */
export const REVEAL = {
  message:
    "Zedneha ktirrr w ma badna nmout, fa hala2 ha ntare l ajwe2 bi aktar " +
    "chakhsen bethebiyonn bi hayetik",
  messageMs: 3800,
  photo: "/photos/kids-party.jpg",
  photoLabel: "The two people she loves most",
  prompt: "scratch to reveal",
  revealedNote: "Approved without review. Ship it.",
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
  { label: "hours of sleep", value: 0 },
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
      "JESSSSSSSSYYYYYYYY Thank you ktsirrrr for everything you have done." +
      " 10 years of non stop work and catchinggggg bugsssss, Mobile hospital ken bado hospital law ma menikkkk.\n" +
      "NSHALLA ysir ma3ikkkk masareeee enough ma t3oudeee techteghleee bi hayetikkkk (PRINCESS TREATMENT).",
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

export interface TimelinePoint {
  title: string;
}

/**
 * A top-level beat: a single milestone, or a "section" that groups several
 * sub-points under one heading (e.g. an era with a few defining moments).
 */
export type TimelineEntry =
  | { kind: "event"; title: string }
  | { kind: "section"; title: string; points: TimelinePoint[] };

/**
 * The timeline no longer stamps a year on every entry — only the start and
 * end years (CONFIG.startYear / CONFIG.currentYear) bookend it.
 */
export const TIMELINE: TimelineEntry[] = [
  { kind: "event", title: "Jessy joined WaveMark" },
  {
    kind: "section",
    title: "The Dark Ages",
    points: [
      { title: "Surviving Taline" },
      { title: "Surviving Ahmad Jichi" },
    ],
  },
  {
    kind: "section",
    title: "Mobile Hospital Testing transition",
    points: [
      { title: "0 EPR" },
      { title: "Carrying iOS and Android Mobile Hospital alone" },
      { title: "Catalon automation" },
    ],
  },
  { kind: "event", title: "And the list goes on and onnnnnnnnn" },
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
