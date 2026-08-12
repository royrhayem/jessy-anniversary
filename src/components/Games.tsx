"use client";

import { useEffect, useRef, useState } from "react";
import { CONFIG, type GameKind } from "@/content";
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
}

export default function Game({
  kind,
  ...props
}: GameProps & { kind: GameKind }) {
  switch (kind) {
    case "bubbles": return <Bubbles {...props} />;
    case "teamcode": return <TeamCode {...props} />;
    case "scratch": return <Scratch {...props} />;
    case "raise": return <Raise {...props} />;
    case "final": return <Final {...props} />;
  }
}

const panel =
  "rounded-md border border-dbg-line bg-dbg-bg p-4 flex flex-col items-center gap-4";

/* -------------------------------------------------------------------------
 *  BUG-5006 — Bubbles. Pop eight to spell a word.
 * ---------------------------------------------------------------------- */
const WORD = "HANDMADE";

function Bubbles({ solved, onSolve }: GameProps) {
  const [popped, setPopped] = useState<number[]>([]);
  useEffect(() => {
    if (popped.length === WORD.length && !solved) onSolve();
  }, [popped, solved, onSolve]);

  const done = solved || popped.length === WORD.length;

  return (
    <div className={panel}>
      <p className="text-xs text-dbg-muted font-mono">soap.cleanup()</p>

      <div className="grid grid-cols-4 gap-2.5 w-full">
        {WORD.split("").map((ch, i) => {
          const isPopped = done || popped.includes(i);
          return (
            <button
              key={i}
              aria-label={isPopped ? ch : `Bubble ${i + 1}`}
              onClick={() => {
                if (isPopped) return;
                setPopped((p) => [...p, i]);
                haptic(14);
              }}
              className={`aspect-square rounded-full grid place-items-center font-mono text-lg transition-all min-h-12 ${
                isPopped
                  ? "bg-transparent text-dbg-green scale-100"
                  : "bg-linear-to-br from-white/25 to-white/5 border border-white/25 active:scale-90"
              }`}
            >
              {isPopped ? ch : ""}
            </button>
          );
        })}
      </div>

      {done && (
        <p className="text-dbg-green text-sm font-mono">Cleaned up. Literally.</p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  BUG-6120 — The room. She has to turn around and ask her team.
 *  This is the only moment that makes the audience participants.
 * ---------------------------------------------------------------------- */
function TeamCode({ solved, onSolve }: GameProps) {
  const [entered, setEntered] = useState<string[]>([]);
  const target = CONFIG.teamCode;

  useEffect(() => {
    if (entered.length === target.length && !solved) {
      haptic([20, 40, 20, 40, 60]);
      onSolve();
    }
  }, [entered, target.length, solved, onSolve]);

  // Nobody waits forever with a room watching.
  useEffect(() => {
    if (solved) return;
    const t = setTimeout(() => setEntered([...target]), 30_000);
    return () => clearTimeout(t);
  }, [solved, target]);

  const filled = solved ? [...target] : entered;

  return (
    <div className={panel}>
      <p className="text-xs text-dbg-amber font-mono text-center leading-relaxed">
        Team membership unverified.
        <br />
        Ask them. All four.
      </p>

      <div className="flex gap-2.5" role="group" aria-label="Team verification code">
        {target.map((_, i) => (
          <div
            key={i}
            className={`w-14 h-16 rounded border-2 grid place-items-center font-mono text-2xl ${
              filled[i]
                ? "border-dbg-green text-dbg-green"
                : "border-dbg-line text-dbg-muted"
            }`}
          >
            {filled[i] ?? "·"}
          </div>
        ))}
      </div>

      {!solved && (
        <div className="grid grid-cols-5 gap-1.5 w-full">
          {"0123456789".split("").map((d) => (
            <button
              key={d}
              onClick={() => {
                setEntered((e) =>
                  e.length >= target.length ? e : [...e, d],
                );
                haptic(8);
              }}
              className="border border-dbg-line rounded py-3 min-h-12 font-mono active:border-dbg-green"
            >
              {d}
            </button>
          ))}
        </div>
      )}

      {!solved && entered.length > 0 && (
        <button
          onClick={() => setEntered([])}
          className="text-[11px] text-dbg-muted font-mono min-h-11"
        >
          clear
        </button>
      )}

      {solved && (
        <p className="text-dbg-green text-sm font-mono text-center">
          They were always going to say yes.
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  BUG-8001 — Scratch to reveal the kids' drawing.
 * ---------------------------------------------------------------------- */
function Scratch({ solved, onSolve }: GameProps) {
  const [cells, setCells] = useState<number[]>([]);
  const TOTAL = 24;

  useEffect(() => {
    if (cells.length >= TOTAL * 0.6 && !solved) onSolve();
  }, [cells, solved, onSolve]);

  const done = solved || cells.length >= TOTAL * 0.6;

  return (
    <div className={panel}>
      <p className="text-xs text-dbg-muted font-mono">
        {done ? "asset approved" : "scratch to reveal"}
      </p>

      <div className="relative w-full aspect-4/3 rounded overflow-hidden">
        <Placeholder
          src="/photos/kids-party.jpg"
          label="Kids celebrating with balloons"
          className="absolute inset-0 w-full h-full"
        />
        {!done && (
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <button
                key={i}
                aria-label="Scratch"
                onPointerEnter={() => {
                  if (!cells.includes(i)) {
                    setCells((c) => [...c, i]);
                    haptic(4);
                  }
                }}
                onPointerDown={() => {
                  setCells((c) => (c.includes(i) ? c : [...c, i]));
                  haptic(4);
                }}
                className={`bg-dbg-line transition-opacity duration-200 ${
                  cells.includes(i) ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {done && (
        <p className="text-dbg-green text-sm font-mono">
          Approved without review. Ship it.
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  BUG-9002 — The raise. Dodges three times, then 403s. The callback to the
 *  team's own running joke. Biggest laugh of Act II.
 * ---------------------------------------------------------------------- */
function Raise({ solved, onSolve }: GameProps) {
  const [dodges, setDodges] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [denied, setDenied] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  function dodge() {
    haptic(6);
    setDodges((d) => d + 1);
    setPos({
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 80,
    });
  }

  function submit() {
    setSubmitting(true);
    haptic(15);
    setTimeout(() => {
      setSubmitting(false);
      setDenied(true);
      haptic([50, 80, 50]);
      setTimeout(() => onSolve(), 1600);
    }, 2200);
  }

  if (solved || denied) {
    return (
      <div className={panel}>
        <p className="text-5xl">🔒</p>
        <p className="font-mono text-dbg-red text-lg">403 FORBIDDEN</p>
        <p className="text-[11px] text-dbg-muted font-mono text-center leading-relaxed">
          Request forwarded to a department
          <br />
          that does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className={`${panel} min-h-56 justify-center`} ref={box}>
      <p className="text-xs text-dbg-muted font-mono text-center">
        {submitting ? "Submitting to payroll…" : "salary.increase()"}
      </p>

      {submitting ? (
        <div className="h-10 w-10 rounded-full border-4 border-dbg-line border-t-dbg-green animate-spin" />
      ) : (
        <button
          onPointerEnter={() => dodges < 3 && dodge()}
          onClick={() => (dodges < 3 ? dodge() : submit())}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
          className="border-2 border-dbg-green text-dbg-green font-mono px-6 py-3.5 min-h-12 rounded transition-transform duration-200 active:bg-dbg-green/10"
        >
          APPROVE RAISE
        </button>
      )}
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
