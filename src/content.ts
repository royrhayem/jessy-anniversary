/**
 * ============================================================================
 *  EVERYTHING YOU NEED TO EDIT IS IN THIS FILE.
 * ============================================================================
 *  No components need to change to swap names, quotes, photos, the gift
 *  location, or the team code. Anything marked TODO is a placeholder.
 * ============================================================================
 */

export type GiftMode = "physical" | "virtual";

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
  digitHolders: ["Teammate 1", "Teammate 2", "Teammate 3", "Teammate 4"], // TODO: names

  /** Auto-help timings. She must never be stuck in front of an audience. */
  hintAfterMs: 20_000,
  autoSolveAfterMs: 45_000,

  /** Set on the morning of the event. */
  giftMode: "physical" as GiftMode,

  gift: {
    /** Shown first, as a riddle. Keep it short enough to read aloud. */
    riddle: "Where the things you make begin.",
    /** The literal answer. Swap this the morning of. */
    location: "The kitchen — top shelf, behind the mugs.", // TODO
    /** Only used when giftMode === "virtual". */
    virtualLink: null as string | null,
    virtualLabel: "Open your gift",
  },
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
  | "BUG-1042" | "BUG-2087" | "BUG-3011" | "BUG-4500" | "BUG-5006"
  | "BUG-6120" | "BUG-7033" | "BUG-8001" | "BUG-9002" | "BUG-0001";

export type GameKind =
  | "sleep" | "furniture" | "tabouleh" | "sharm" | "bubbles"
  | "teamcode" | "plating" | "scratch" | "raise" | "final";

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

export const TICKETS: Ticket[] = [
  {
    id: "BUG-1042",
    title: "Sleep module returns null since 2019",
    reporter: "Teammate 1", // TODO: real name
    severity: "CRITICAL",
    steps: [
      "Have two children",
      "Attempt to sleep",
      "Observe: null",
    ],
    game: "sleep",
    resolution: "WONTFIX",
    closingNote:
      "Reproduced consistently for six years. Cannot be fixed at this time. " +
      "Closing as WONTFIX with enormous respect.",
  },
  {
    id: "BUG-2087",
    title: "User builds furniture instead of resting",
    reporter: "Teammate 2", // TODO
    severity: "P2",
    steps: [
      "Give Jessy a free weekend",
      "Return on Monday",
      "There is now a coffee table",
    ],
    game: "furniture",
    resolution: "FIXED",
    closingNote:
      "Table assembled. Structurally sound. Better than anything we could buy.",
  },
  {
    id: "BUG-3011",
    title: "Tabouleh craving exceeds max integer",
    reporter: "Teammate 1", // TODO
    severity: "P1",
    steps: [
      "Mention lunch",
      "Wait approximately 0.3 seconds",
      "Integer overflow",
    ],
    game: "tabouleh",
    resolution: "BY DESIGN",
    closingNote: "Working as intended. Do not patch.",
  },
  {
    id: "BUG-4500",
    title: "Sharm el-Sheikh deploys in an infinite loop",
    reporter: "Teammate 1", // TODO
    severity: "P3",
    steps: [
      "Book one holiday",
      "Enjoy it",
      "GOTO 1",
    ],
    game: "sharm",
    resolution: "NOT A BUG",
    closingNote: "Loop is intentional. Recommend increasing iteration count.",
  },
  {
    id: "BUG-5006",
    title: "Excess soap detected in production",
    reporter: "Teammate 3", // TODO
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
    id: "BUG-7033",
    title: "Food renders at unnecessarily high fidelity",
    reporter: "Teammate 2", // TODO
    severity: "P4",
    steps: [
      "Ask Jessy to bring something to the office",
      "Receive a plated composition",
      "Feel bad about your own lunch",
    ],
    game: "plating",
    resolution: "WORKS AS INTENDED",
    closingNote: "10/10. It was always going to be 10/10.",
  },
  {
    id: "BUG-8001",
    title: "Unauthorized art project detected in kids' room",
    reporter: "Teammate 4", // TODO
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
    reporter: "Teammate 1", // TODO
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
    name: "Teammate 1", // TODO
    role: "TODO: role",
    photo: null, // e.g. "/photos/team/one.jpg"
    message:
      "TODO: their message. Keep it to two or three sentences — short ones " +
      "land harder on a phone screen.",
  },
  {
    name: "Teammate 2",
    role: "TODO: role",
    photo: null,
    message: "TODO: their message.",
  },
  {
    name: "Teammate 3",
    role: "TODO: role",
    photo: null,
    message: "TODO: their message.",
  },
  {
    name: "Teammate 4",
    role: "TODO: role",
    photo: null,
    message: "TODO: their message.",
    remote: true,
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
  "For ten years you found the things nobody else would have found — " +
  "at work, and at home, on no sleep at all. Thank you.";

export const KEEPSAKE = {
  title: "Certificate of Ten Years",
  subtitle: "of finding what everyone else missed",
  awardedTo: "Jessy",
  signoff: "— your team", // TODO
};
