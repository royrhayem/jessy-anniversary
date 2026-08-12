"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CONFIG, REVEAL } from "@/content";
import { haptic } from "@/lib/progress";
import Placeholder from "@/components/Placeholder";

/**
 * The hinge between Act II and Act III. She just closed the board; this is
 * the site's one honest line, then a photo of her two kids underneath a
 * scratch-off layer. Reused mechanics from the retired BUG-8001 ticket.
 */
type Phase = "message" | "scratch";

const TOTAL_CELLS = 24;
const REVEAL_THRESHOLD = 0.6;

export default function Reveal() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("message");
  const [cells, setCells] = useState<number[]>([]);
  const [continueReady, setContinueReady] = useState(false);

  const scratchedEnough = cells.length >= TOTAL_CELLS * REVEAL_THRESHOLD;

  // Same failsafe as every game on the board: nobody watches her get stuck.
  useEffect(() => {
    if (phase !== "scratch" || scratchedEnough) return;
    const t = setTimeout(
      () => setCells(Array.from({ length: TOTAL_CELLS }, (_, i) => i)),
      CONFIG.autoSolveAfterMs,
    );
    return () => clearTimeout(t);
  }, [phase, scratchedEnough]);

  useEffect(() => {
    if (!scratchedEnough) return;
    haptic([30, 50, 30, 50, 70]);
    const t = setTimeout(() => setContinueReady(true), 900);
    return () => clearTimeout(t);
  }, [scratchedEnough]);

  if (phase === "message") {
    return (
      <main className="dbg min-h-dvh flex flex-col items-center justify-center px-6 py-8 gap-10">
        <div className="max-w-sm text-center animate-[fadeUp_.4s_ease-out]">
          <p className="text-dbg-amber font-mono font-bold text-lg leading-relaxed">
            {REVEAL.message}
          </p>
        </div>

        <button
          onClick={() => {
            haptic(25);
            setPhase("scratch");
          }}
          className="w-full max-w-sm border-2 border-dbg-green text-dbg-green font-mono font-bold py-4 min-h-12 rounded animate-pulse active:bg-dbg-green/10"
        >
          [ CONTINUE ]
        </button>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: none; }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="dbg min-h-dvh flex flex-col items-center justify-center px-4 py-8 gap-6">
      <p className="text-xs text-dbg-muted font-mono">
        {scratchedEnough ? "asset approved" : REVEAL.prompt}
      </p>

      <div className="relative w-full max-w-sm aspect-4/3 rounded overflow-hidden border border-dbg-line">
        <Placeholder
          src={REVEAL.photo}
          label={REVEAL.photoLabel}
          className="absolute inset-0 w-full h-full"
        />
        {!scratchedEnough && (
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
            {Array.from({ length: TOTAL_CELLS }).map((_, i) => (
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

      {scratchedEnough && (
        <p className="text-dbg-green text-sm font-mono text-center animate-[fadeUp_.3s_ease-out]">
          {REVEAL.revealedNote}
        </p>
      )}

      <button
        onClick={() => {
          haptic(25);
          router.replace("/tribute");
        }}
        className={`w-full max-w-sm border-2 border-dbg-green text-dbg-green font-mono font-bold py-4 min-h-12 rounded transition-opacity duration-700 active:bg-dbg-green/10 ${
          continueReady ? "opacity-100 animate-pulse" : "opacity-0 pointer-events-none"
        }`}
      >
        [ CONTINUE ]
      </button>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </main>
  );
}
