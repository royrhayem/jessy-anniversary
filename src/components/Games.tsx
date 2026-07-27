"use client";

import { useEffect, useRef, useState } from "react";
import { CONFIG, type GameKind } from "@/content";
import { haptic } from "@/lib/progress";
import Placeholder from "./Placeholder";

/**
 * Ten micro-interactions. Rules for every one of them:
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
    case "sleep": return <Sleep {...props} />;
    case "furniture": return <Furniture {...props} />;
    case "tabouleh": return <Tabouleh {...props} />;
    case "sharm": return <Sharm {...props} />;
    case "bubbles": return <Bubbles {...props} />;
    case "teamcode": return <TeamCode {...props} />;
    case "plating": return <Plating {...props} />;
    case "scratch": return <Scratch {...props} />;
    case "raise": return <Raise {...props} />;
    case "final": return <Final {...props} />;
  }
}

const panel =
  "rounded-md border border-dbg-line bg-dbg-bg p-4 flex flex-col items-center gap-4";

/* -------------------------------------------------------------------------
 *  BUG-1042 — Sleep. Unwinnable by design; that IS the joke.
 * ---------------------------------------------------------------------- */
function Sleep({ solved, onSolve }: GameProps) {
  const [fill, setFill] = useState(0);
  const [taps, setTaps] = useState(0);
  const [thief, setThief] = useState<string | null>(null);

  // Whatever she builds up, the kids take back.
  useEffect(() => {
    if (solved) return;
    const id = setInterval(() => setFill((f) => Math.max(0, f - 4)), 120);
    return () => clearInterval(id);
  }, [solved]);

  useEffect(() => {
    if (fill < 70 || solved) return;
    setThief(Math.random() > 0.5 ? "👶" : "🧒");
    setFill(0);
    haptic([30, 50, 30]);
    const t = setTimeout(() => setThief(null), 900);
    return () => clearTimeout(t);
  }, [fill, solved]);

  // After enough attempts the site concedes on her behalf.
  useEffect(() => {
    if (taps >= 12 && !solved) onSolve();
  }, [taps, solved, onSolve]);

  return (
    <div className={panel}>
      <p className="text-xs text-dbg-muted font-mono">sleep.restore()</p>

      <div className="relative w-full h-8 bg-dbg-line rounded-full overflow-hidden">
        <div
          className="h-full bg-dbg-purple transition-[width] duration-100"
          style={{ width: `${solved ? 0 : fill}%` }}
        />
        {thief && (
          <span className="absolute inset-0 grid place-items-center text-xl animate-bounce">
            {thief}
          </span>
        )}
      </div>

      {solved ? (
        <p className="text-dbg-amber text-sm text-center font-mono">
          Sleep cannot be restored.
        </p>
      ) : (
        <button
          onClick={() => {
            setFill((f) => Math.min(100, f + 14));
            setTaps((t) => t + 1);
            haptic(8);
          }}
          className="w-full border-2 border-dbg-purple text-dbg-purple font-mono py-3.5 min-h-12 active:bg-dbg-purple/10"
        >
          RESTORE SLEEP
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  BUG-2087 — Furniture. Tap three parts to assemble.
 * ---------------------------------------------------------------------- */
function Furniture({ solved, onSolve }: GameProps) {
  const [placed, setPlaced] = useState<number[]>([]);
  const parts = ["Tabletop", "Leg A", "Leg B"];

  useEffect(() => {
    if (placed.length === parts.length && !solved) onSolve();
  }, [placed, solved, onSolve, parts.length]);

  const done = solved || placed.length === parts.length;

  return (
    <div className={panel}>
      <p className="text-xs text-dbg-muted font-mono">assemble()</p>

      <div className="relative h-28 w-full grid place-items-center">
        {done ? (
          <span className="text-5xl">🪵</span>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span
              className={`text-3xl transition-opacity ${placed.includes(0) ? "opacity-100" : "opacity-20"}`}
            >
              ▬▬▬
            </span>
            <span className="flex gap-8 text-2xl">
              <i className={placed.includes(1) ? "opacity-100" : "opacity-20"}>▮</i>
              <i className={placed.includes(2) ? "opacity-100" : "opacity-20"}>▮</i>
            </span>
          </div>
        )}
      </div>

      {done ? (
        <p className="text-dbg-green text-sm font-mono">Structurally sound.</p>
      ) : (
        <div className="grid grid-cols-3 gap-2 w-full">
          {parts.map((p, i) => (
            <button
              key={p}
              disabled={placed.includes(i)}
              onClick={() => {
                setPlaced((s) => [...s, i]);
                haptic(12);
              }}
              className="border border-dbg-line rounded py-3 min-h-12 text-[11px] font-mono disabled:opacity-30 active:border-dbg-green"
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  BUG-3011 — Tabouleh. Tap the parsley five times.
 * ---------------------------------------------------------------------- */
function Tabouleh({ solved, onSolve }: GameProps) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= 5 && !solved) onSolve();
  }, [n, solved, onSolve]);

  const done = solved || n >= 5;

  return (
    <div className={panel}>
      <p className="text-xs text-dbg-muted font-mono">
        parsley: {done ? "MAX_INT" : n}/5
      </p>

      <div className="h-28 w-full grid place-items-center text-5xl">
        {done ? "🥗" : "🥣"}
      </div>

      {done ? (
        <p className="text-dbg-green text-sm font-mono">Overflow. As expected.</p>
      ) : (
        <button
          onClick={() => {
            setN((v) => v + 1);
            haptic(10);
          }}
          className="w-full border-2 border-dbg-green text-dbg-green font-mono py-3.5 min-h-12 active:bg-dbg-green/10"
        >
          🌿 ADD PARSLEY
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  BUG-4500 — Sharm. Swipe through the loop; the counter never resets.
 * ---------------------------------------------------------------------- */
function Sharm({ solved, onSolve }: GameProps) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= 4 && !solved) onSolve();
  }, [i, solved, onSolve]);

  const done = solved || i >= 4;

  return (
    <div className={panel}>
      <p className="text-xs text-dbg-muted font-mono">
        deploy #{done ? "∞" : i + 1} → sharm-el-sheikh
      </p>

      <Placeholder
        src="/sharm-sunset.jpg"
        label="Red Sea at golden hour — see SPEC §18 #9"
        className="w-full h-32 rounded"
      />

      {done ? (
        <p className="text-dbg-green text-sm font-mono text-center">
          Loop is intentional.
        </p>
      ) : (
        <button
          onClick={() => {
            setI((v) => v + 1);
            haptic(10);
          }}
          className="w-full border-2 border-dbg-green text-dbg-green font-mono py-3.5 min-h-12 active:bg-dbg-green/10"
        >
          GOTO 1 →
        </button>
      )}
    </div>
  );
}

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
 *  BUG-7033 — Plating. Scores 10/10 regardless. Obviously.
 * ---------------------------------------------------------------------- */
function Plating({ solved, onSolve }: GameProps) {
  const [on, setOn] = useState<number[]>([]);
  const items = ["🍋", "🌿", "🫒"];

  useEffect(() => {
    if (on.length === items.length && !solved) onSolve();
  }, [on, solved, onSolve, items.length]);

  const done = solved || on.length === items.length;

  return (
    <div className={panel}>
      <p className="text-xs text-dbg-muted font-mono">render(quality: .excessive)</p>

      <div className="relative h-28 w-28 rounded-full border-2 border-dbg-line grid place-items-center">
        <span className="text-3xl">🍽️</span>
        <span className="absolute inset-0 grid place-items-center text-2xl">
          {(done ? items : on.map((i) => items[i])).join(" ")}
        </span>
      </div>

      {done ? (
        <p className="text-dbg-green text-sm font-mono">
          10/10 — it was always going to be 10/10.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-2 w-full">
          {items.map((it, i) => (
            <button
              key={it}
              disabled={on.includes(i)}
              onClick={() => {
                setOn((s) => [...s, i]);
                haptic(12);
              }}
              className="border border-dbg-line rounded py-3 min-h-12 text-xl disabled:opacity-30 active:border-dbg-green"
            >
              {it}
            </button>
          ))}
        </div>
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
          src="/kids-drawing.png"
          label="Child's crayon drawing — see SPEC §18 #13"
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
