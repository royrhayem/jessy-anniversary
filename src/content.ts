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
  key: "spa" | "physical-one" | "physical-two";
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

/** Copy and hiding places for the three-part ending. Update these on the day. */
export const REDEMPTION_GIFTS = [
  {
    key: "spa",
    kind: "digital",
    label: "REVEAL / 01",
    title: "Step one: open the mystery file",
    teaser: "The first delivery is ready. Small, suspiciously deserved, and definitely not cash.",
    clue: "Scan the evidence. Then book an afternoon where nobody can find you.",
  },
  {
    key: "physical-one",
    kind: "physical",
    label: "PHYSICAL / 02",
    title: "The one that refused to be an app",
    teaser: "A real object, hidden in the real world. Extremely inconvenient.",
    clue: "Where the things you make begin.",
    location: "The kitchen — top shelf, behind the mugs.",
  },
  {
    key: "physical-two",
    kind: "physical",
    label: "PHYSICAL / 03",
    title: "The final boss of appreciation",
    teaser: "One last side quest. Please leave the screen to collect it.",
    clue: "Where abandoned cables, big ideas, and suspiciously nice things gather.",
    location: "TODO: set the hiding place for physical gift #2.",
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

export type TicketId =
  | "BUG-5006" | "BUG-6120" | "BUG-8001" | "BUG-9002" | "BUG-0001";

export type GameKind =
  | "bubbles" | "teamcode" | "scratch" | "raise" | "final";

export interface Ticket {
  id: TicketId;
  title: string;
  reporter: string;
  severity: string;
  steps: string[];
  game: GameKind;
  resolution: string;
  /** Shown after the interaction completes. The punchline. */
  closingNote: string;
}

/** Four playable tickets, followed by the locked appreciation reveal. */
export const TICKETS: Ticket[] = [
  {
    id: "BUG-5006",
    title: "Excess soap detected in production",
    reporter: "Raja",
    severity: "P2",
    steps: [
      "Leave Jessy alone with oils and lye",
      "Observe",
      "The entire office now smells like lavender",
    ],
    game: "bubbles",
    resolution: "FIXED",
    closingNote: "Cleaned up. Literally.",
  },
  {
    id: "BUG-6120",
    title: "Cannot verify user belongs to a real team",
    reporter: "RewardHub™ Security",
    severity: "BLOCKER",
    steps: [
      "Query team membership",
      "Receive: unverified",
      "Escalate to human beings",
    ],
    game: "teamcode",
    resolution: "VERIFIED",
    closingNote: "Team confirmed. All four of them. Loudly.",
  },
  {
    id: "BUG-8001",
    title: "Unauthorized art project detected in kids' room",
    reporter: "Roy",
    severity: "P0",
    steps: [
      "Have an idea at 11pm",
      "Do not sleep (see BUG-1042)",
      "By morning it exists",
    ],
    game: "scratch",
    resolution: "APPROVED",
    closingNote: "Approved without review. Ship it.",
  },
  {
    id: "BUG-9002",
    title: "User requires funds in order to terminate employment",
    reporter: "Hadil",
    severity: "CRITICAL",
    steps: [
      "Request raise",
      "Request raise again",
      "Consider the beach",
    ],
    game: "raise",
    resolution: "WONTFIX",
    closingNote:
      "Request received. Request understood. Request forwarded to a department " +
      "that does not exist. Closing as WONTFIX. We are so sorry.",
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
