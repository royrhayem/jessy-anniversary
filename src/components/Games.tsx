"use client";

import { useEffect, useState } from "react";
import { BLACKSCREEN, SLEEP_ASSIST, TABBOULEH, type GameKind } from "@/content";
import { haptic } from "@/lib/progress";
import Placeholder from "./Placeholder";

/**
 * Four micro-interactions are used by the board. Rules for every one of them:
 *   - one thumb, portrait, under 60 seconds
 *   - no text input, no failure state, nothing can be answered "wrong"
 *   - `solved` is forced true by the parent on auto-solve, so every game must
 *     render its finished state from that prop alone
 */
export interface GameProps {
  solved: boolean;
  onSolve: () => void;
  /** The ticket's resolution, for games that stamp it themselves. */
  resolution?: string;
}

export default function Game({
  kind,
  ...props
}: GameProps & { kind: GameKind }) {
  switch (kind) {
    case "sleep": return <Sleep {...props} />;
    case "tabouleh": return <Tabouleh {...props} />;
    case "blackscreen": return <BlackScreen {...props} />;
    case "final": return <Final {...props} />;
  }
}

const panel =
  "rounded-md border border-dbg-line bg-dbg-bg p-4 flex flex-col items-center gap-4";

/* -------------------------------------------------------------------------
 *  BUG-1042 — Sleep. Snooze all you like; the night never gets quieter.
 *  Unwinnable by design; that IS the joke.
 * ---------------------------------------------------------------------- */
const KHOCH = "khochpochpoch";
const SNOOZES_TO_GIVE_UP = 7;
const FIRST_ALARM_MIN = 3 * 60 + 7; // 03:07 — nobody chose this hour

/** The word, falling down the side of the screen. Faster every snooze. */
function KhochStream({ taps }: { taps: number }) {
  // 14 lines, printed twice, scrolled by exactly half its height → seamless.
  const lines = Array.from({ length: 14 }, (_, i) => i);
  const speed = Math.max(1.2, 5 - taps * 0.5);

  return (
    <div
      aria-hidden
      // `h-full` here would resolve to 0 against the auto-height row and clip
      // the whole stream — `self-stretch` is what gives it the row's height.
      className="relative w-40 shrink-0 self-stretch overflow-hidden border-l border-dbg-line"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 pl-2"
        style={{ animation: `khoch ${speed}s linear infinite` }}
      >
        {[...lines, ...lines].map((_, i) => (
          <p
            key={i}
            className="font-mono text-xs leading-6 text-dbg-purple/80 whitespace-nowrap"
          >
            {KHOCH}
          </p>
        ))}
      </div>

      <style>{`
        @keyframes khoch {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}

function clock(minutes: number) {
  const m = minutes % (24 * 60);
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/** Out of snoozes → the site offers help, asks ChatGPT, then delivers it. */
type Phase = "snoozing" | "offer" | "ask" | "thinking" | "verdict";
const PHASES: Phase[] = ["snoozing", "offer", "ask", "thinking", "verdict"];

function Sleep({ solved, onSolve, resolution }: GameProps) {
  const [taps, setTaps] = useState(0);
  const [phase, setPhase] = useState<Phase>("snoozing");

  const out = taps >= SNOOZES_TO_GIVE_UP;

  useEffect(() => {
    if (out && phase === "snoozing") setPhase("offer");
  }, [out, phase]);

  // "ask" waits for her to hit send; "verdict" is terminal — it stamps and
  // stays. The other two move on their own.
  useEffect(() => {
    if (phase !== "offer" && phase !== "thinking") return;
    const ms =
      phase === "offer" ? SLEEP_ASSIST.offer.ms : SLEEP_ASSIST.thinking.ms;

    const t = setTimeout(
      () => setPhase(PHASES[PHASES.indexOf(phase) + 1]),
      ms,
    );
    return () => clearTimeout(t);
  }, [phase]);

  // Closed the moment the verdict lands, so she can move to the next bug.
  useEffect(() => {
    if (phase !== "verdict" || solved) return;
    haptic([40, 60, 40]);
    onSolve();
  }, [phase, solved, onSolve]);

  const now = FIRST_ALARM_MIN + taps * 5;

  // Auto-solve can force `solved` at any point — land on the punchline.
  if (solved || phase === "verdict") {
    return (
      <div className="rounded-md border border-dbg-line bg-dbg-bg p-4">
        <div className="flex items-stretch gap-3 min-h-44">
          <div className="flex-1 flex flex-col items-center justify-center gap-5 animate-[fadeUp_.3s_ease-out]">
            <p className="text-dbg-amber font-mono font-bold text-lg leading-tight text-center">
              {SLEEP_ASSIST.verdict.text}
            </p>
            {resolution && (
              <span className="stamp text-dbg-green text-sm">{resolution}</span>
            )}
          </div>
          <KhochStream taps={taps} />
        </div>
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: none; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-dbg-line bg-dbg-bg p-4">
      <p className="text-xs text-dbg-muted font-mono mb-3">
        sleep.snooze() · {taps}×
      </p>

      {/* The stream steps aside here — this beat is just the screenshot. */}
      {phase === "ask" || phase === "thinking" ? (
        <div className="animate-[fadeUp_.3s_ease-out]">
          <Placeholder
            src={SLEEP_ASSIST.ask.image}
            label={SLEEP_ASSIST.ask.imageLabel}
            fit="contain"
            className="w-3/5 mx-auto min-h-20 rounded border border-dbg-line bg-black"
          />

          <div className="h-16 grid place-items-center">
            {phase === "ask" ? (
              <button
                onClick={() => {
                  setPhase("thinking");
                  haptic(12);
                }}
                className="border-2 border-dbg-green text-dbg-green font-mono text-sm px-8 py-3 min-h-12 rounded active:bg-dbg-green/10"
              >
                {SLEEP_ASSIST.ask.button}
              </button>
            ) : (
              <div className="flex items-center gap-2.5 animate-[fadeUp_.3s_ease-out]">
                <span className="h-4 w-4 rounded-full border-2 border-dbg-line border-t-dbg-green animate-spin" />
                <span className="text-[11px] font-mono text-dbg-muted">
                  {SLEEP_ASSIST.thinking.label}
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
      <div className="flex items-stretch gap-3 min-h-44">
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          {phase === "snoozing" && (
            <>
              <div className="text-center">
                <span className="text-3xl inline-block animate-[ring_.7s_ease-in-out_infinite]">
                  ⏰
                </span>
                <p className="font-mono text-3xl tracking-widest mt-1">
                  {clock(now)}
                </p>
              </div>

              <button
                onClick={() => {
                  setTaps((t) => t + 1);
                  haptic([10, 40, 10]);
                }}
                className="w-full border-2 border-dbg-purple text-dbg-purple font-mono text-sm py-3.5 min-h-12 active:bg-dbg-purple/10"
              >
                SNOOZE +5 min
              </button>
            </>
          )}

          {phase === "offer" && (
            <p className="text-dbg-green font-mono text-lg text-center animate-[fadeUp_.3s_ease-out]">
              {SLEEP_ASSIST.offer.text}
            </p>
          )}
        </div>

        <KhochStream taps={taps} />
      </div>
      )}

      <style>{`
        @keyframes ring {
          0%, 100% { transform: rotate(0deg); }
          25%      { transform: rotate(-14deg); }
          75%      { transform: rotate(14deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  BUG-3011 — Tabbouleh. The kitchen tries, then remembers the teeth.
 * ---------------------------------------------------------------------- */
/**
 * Teeth are w-7 (28px) with a gap-1 (4px) between them, inside px-2 (8px) of
 * gum. So gap n sits at 8 + 32n + 30 from the mouth's left edge — the sprigs
 * are placed in px against that grid rather than as a percentage of the panel,
 * which is far wider than the teeth and drifts them off.
 */
const TOOTH = 28;
const TOOTH_GAP = 4;
const GUM_PAD = 8;
const sprigX = (gap: number) => GUM_PAD + (TOOTH + TOOTH_GAP) * gap + TOOTH + TOOTH_GAP / 2;

/** Wedged in the 1st, 3rd and 5th gap, each at its own angle. */
const SPRIGS = [
  { gap: 0, tilt: -18 },
  { gap: 2, tilt: 6 },
  { gap: 4, tilt: 22 },
];

function Tabouleh({ solved, onSolve, resolution }: GameProps) {
  const [phase, setPhase] = useState<"idle" | "pick" | "verdict">("idle");
  const [picked, setPicked] = useState<number[]>([]);

  // Let the last sprig finish popping before the excuse lands.
  useEffect(() => {
    if (phase !== "pick" || picked.length < TABBOULEH.pick.count) return;
    const t = setTimeout(() => setPhase("verdict"), 700);
    return () => clearTimeout(t);
  }, [phase, picked]);

  useEffect(() => {
    if (phase !== "verdict" || solved) return;
    haptic([40, 60, 40]);
    onSolve();
  }, [phase, solved, onSolve]);

  if (solved || phase === "verdict") {
    return (
      <div className={`${panel} min-h-52 justify-center`}>
        <span className="text-4xl">🥗</span>
        <p className="text-dbg-amber font-mono text-base leading-relaxed text-center animate-[fadeUp_.3s_ease-out]">
          {TABBOULEH.verdict.text}
        </p>
        <p className="text-[11px] text-dbg-muted font-mono text-center">
          {TABBOULEH.verdict.aside}
        </p>
        {resolution && (
          <span className="stamp text-dbg-green text-sm mt-1">{resolution}</span>
        )}
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: none; }
          }
        `}</style>
      </div>
    );
  }

  if (phase === "idle") {
    return (
      <div className={`${panel} min-h-52 justify-center`}>
        <span className="text-5xl">🥣</span>
        <button
          onClick={() => {
            setPhase("pick");
            haptic(12);
          }}
          className="w-full border-2 border-dbg-green text-dbg-green font-mono text-sm py-3.5 min-h-12 active:bg-dbg-green/10"
        >
          🌿 {TABBOULEH.start}
        </button>
      </div>
    );
  }

  const left = TABBOULEH.pick.count - picked.length;

  return (
    <div className={`${panel} min-h-52 justify-center`}>
      <p className="text-xs text-dbg-muted font-mono">
        {TABBOULEH.pick.label}: {left}
      </p>

      {/* A smile with three sprigs still in it. Tap each one to pull it out. */}
      <div className="flex justify-center w-full select-none">
        <div className="relative inline-block rounded-lg bg-[#8d3b45] px-2 pt-2.5 pb-3">
          <div className="flex gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="h-9 w-7 rounded-t-sm rounded-b-md bg-[#f6f2e7]"
              />
            ))}
          </div>

          {SPRIGS.map((s, i) => {
            const gone = picked.includes(i);
            return (
              <button
                key={i}
                aria-label={gone ? "Picked" : `Pick out parsley ${i + 1}`}
                disabled={gone}
                onClick={() => {
                  setPicked((p) => (p.includes(i) ? p : [...p, i]));
                  haptic([12, 30]);
                }}
                style={{ left: sprigX(s.gap), rotate: `${s.tilt}deg` }}
                className={`absolute top-0 w-11 h-11 grid place-items-center text-xl transition-all duration-500 -translate-x-1/2 ${
                  gone
                    ? "opacity-0 scale-50 -translate-y-16 pointer-events-none"
                    : "opacity-100 active:scale-90"
                }`}
              >
                <span className="animate-[bob_1.4s_ease-in-out_infinite] drop-shadow-[0_1px_2px_rgba(0,0,0,.5)]">
                  🌿
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Only until she gets the idea — after the first one it's just nagging. */}
      <p className="text-[11px] text-dbg-amber font-mono text-center h-4 animate-pulse">
        {picked.length === 0 ? TABBOULEH.pick.hint : ""}
      </p>

      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  BUG-6001 — Black screen. A real ticket, handed to the wrong two people.
 *  Pure scripted playback — she just watches it fall apart.
 * ---------------------------------------------------------------------- */
type BSPhase = "idle" | "field" | "kevin" | "escalate" | "sean" | "crashed";
const BS_PHASES: BSPhase[] = ["idle", "field", "kevin", "escalate", "sean", "crashed"];
const BS_MS: Record<Exclude<BSPhase, "idle" | "crashed">, number> = {
  field: BLACKSCREEN.field.ms,
  kevin: BLACKSCREEN.kevin.ms,
  escalate: BLACKSCREEN.escalate.ms,
  sean: BLACKSCREEN.sean.ms,
};

function BlackScreen({ solved, onSolve, resolution }: GameProps) {
  const [phase, setPhase] = useState<BSPhase>("idle");

  // Every beat but the first and last advances on its own.
  useEffect(() => {
    if (phase === "idle" || phase === "crashed") return;
    const t = setTimeout(
      () => setPhase(BS_PHASES[BS_PHASES.indexOf(phase) + 1]),
      BS_MS[phase],
    );
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "crashed" || solved) return;
    haptic([50, 40, 50, 40, 90]);
    onSolve();
  }, [phase, solved, onSolve]);

  if (solved || phase === "crashed") {
    return (
      <div className={`${panel} min-h-52 justify-center`}>
        <span className="text-4xl">💥</span>
        <p className="text-dbg-red font-mono font-bold text-xl text-center animate-[fadeUp_.3s_ease-out]">
          {BLACKSCREEN.crashed}
        </p>
        {resolution && (
          <span className="stamp text-dbg-green text-sm mt-1">{resolution}</span>
        )}
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: none; }
          }
        `}</style>
      </div>
    );
  }

  if (phase === "idle") {
    return (
      <div className={`${panel} min-h-52 justify-center`}>
        <span className="text-5xl">🎫</span>
        <button
          onClick={() => {
            setPhase("field");
            haptic(12);
          }}
          className="w-full border-2 border-dbg-green text-dbg-green font-mono text-sm py-3.5 min-h-12 active:bg-dbg-green/10"
        >
          {BLACKSCREEN.start}
        </button>
      </div>
    );
  }

  const agent = phase === "kevin" ? BLACKSCREEN.kevin : phase === "sean" ? BLACKSCREEN.sean : null;

  return (
    <div className={`${panel} min-h-52 justify-center`}>
      {phase === "field" && (
        <p className="text-dbg-amber font-mono text-sm text-center leading-relaxed animate-[fadeUp_.3s_ease-out]">
          {BLACKSCREEN.field.text}
        </p>
      )}

      {phase === "escalate" && (
        <p className="text-dbg-muted font-mono text-xs text-center animate-pulse">
          {BLACKSCREEN.escalate.text}
        </p>
      )}

      {agent && (
        <div className="w-full flex flex-col items-center gap-2 animate-[fadeUp_.3s_ease-out]">
          <p className="font-mono text-xs text-dbg-purple">
            {agent.name} · {agent.role}
          </p>
          <p className="text-sm text-center leading-relaxed text-dbg-text/90">
            {agent.text}
          </p>
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  BUG-0001 — No button works. Only one resolution is selectable.
 * ---------------------------------------------------------------------- */
const RESOLUTIONS = ["FIXED", "WONTFIX", "DUPLICATE", "CANNOT REPRODUCE"];

function Final({ solved, onSolve }: GameProps) {
  const [nudged, setNudged] = useState<string | null>(null);

  return (
    <div className={panel}>
      <p className="text-xs text-dbg-muted font-mono">select a resolution</p>

      <div className="grid grid-cols-1 gap-2 w-full">
        {RESOLUTIONS.map((r) => {
          const real = r === "CANNOT REPRODUCE";
          return (
            <button
              key={r}
              onClick={() => {
                if (real) {
                  haptic([30, 60, 30]);
                  onSolve();
                } else {
                  setNudged(r);
                  haptic(20);
                }
              }}
              className={`rounded border-2 py-3.5 min-h-12 font-mono text-sm transition-all ${
                real
                  ? "border-dbg-green text-dbg-green"
                  : "border-dbg-line text-dbg-muted"
              } ${nudged === r ? "animate-[shake_.3s]" : ""}`}
            >
              {r}
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-dbg-muted font-mono h-4" aria-live="polite">
        {nudged && "That one isn't true."}
      </p>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
