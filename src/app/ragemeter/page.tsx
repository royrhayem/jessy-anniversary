"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RAGE_STAGES } from "@/content";
import { haptic } from "@/lib/progress";

/** Escalating per-stage look. Index matches RAGE_STAGES. */
const STAGE_COLOR = ["#c99a3e", "#d9772c", "#d35400", "#c0392b", "#8e1b1b"];
const GLOW_COLOR = [
  null,
  null,
  "rgba(211, 84, 0, 0.45)",
  "rgba(192, 57, 43, 0.55)",
  "rgba(142, 27, 27, 0.7)",
];
const SHAKE_PX = [0, 1, 2, 4, 6];
const HAZARD = [false, false, false, true, true];
const OVERLAY_OPACITY = [0, 0.04, 0.1, 0.2, 0.32];
/** Vibration strength on arrival at a given stage. */
const HAPTIC_ON_ARRIVE = [8, 16, 26, 40, 60];
const READOUT_SIZE = ["text-4xl", "text-4xl", "text-4xl", "text-5xl", "text-xl"];

export default function RageMeter() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [collapsing, setCollapsing] = useState(false);

  useEffect(() => {
    if (step >= RAGE_STAGES.length - 1) return;
    const next = step + 1;
    const t = setTimeout(() => {
      setStep(next);
      haptic(HAPTIC_ON_ARRIVE[next]);
    }, step === 0 ? 2600 : 1900); // let 0% sit long enough to land
    return () => clearTimeout(t);
  }, [step]);

  // Final reading is "JESSY 3AM TENHAR". The layout literally falls apart.
  useEffect(() => {
    if (step < RAGE_STAGES.length - 1) return;
    const a = setTimeout(() => {
      setCollapsing(true);
      haptic([60, 40, 120]);
    }, 1500);
    const b = setTimeout(() => router.push("/crash"), 2900);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [step, router]);

  const current = RAGE_STAGES[step];
  const isFatal = step === RAGE_STAGES.length - 1;
  const stageColor = STAGE_COLOR[step];
  const shaking = !collapsing && SHAKE_PX[step] > 0;
  const glowing = !collapsing && GLOW_COLOR[step];

  return (
    <main
      className={`corp relative min-h-dvh flex flex-col overflow-hidden ${
        collapsing ? "glitching" : ""
      }`}
      style={collapsing ? { filter: "grayscale(1)" } : undefined}
    >
      {/* Ambient heat — reddens the whole screen as rage climbs. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 transition-opacity duration-700"
        style={{
          opacity: collapsing ? 0 : OVERLAY_OPACITY[step],
          background:
            "radial-gradient(circle at 50% 40%, rgba(192,57,43,0.9), transparent 65%)",
        }}
      />

      <header
        className={`bg-linear-to-b from-[#5a6570] to-[#3f4750] px-4 py-3 ${
          collapsing ? "falling" : ""
        }`}
      >
        <h1 className="text-white font-bold text-lg tracking-tight">RewardHub™</h1>
      </header>

      <div className="relative flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p
          className={`text-xs tracking-[0.2em] font-bold transition-colors duration-700 ${
            collapsing ? "falling" : ""
          }`}
          style={{
            color: step >= 2 ? stageColor : "var(--color-corp-muted)",
            ...(collapsing ? { animationDelay: "80ms" } : {}),
          }}
        >
          RAGE METER
        </p>

        <div
          className={`mt-5 bg-white border-2 px-6 py-7 min-w-[16rem] ${
            shaking ? "rage-shake" : ""
          } ${glowing ? "rage-glow" : "corp-shadow"} ${collapsing ? "falling" : ""}`}
          style={{
            borderColor: stageColor,
            ["--shake-amt" as string]: `${SHAKE_PX[step]}px`,
            ["--rage-glow-color" as string]: GLOW_COLOR[step] ?? undefined,
            ...(collapsing ? { animationDelay: "160ms" } : {}),
          }}
        >
          <p
            aria-live="polite"
            className={`font-mono font-bold tabular-nums leading-none transition-colors duration-500 ${READOUT_SIZE[step]}`}
            style={{ color: step >= 1 ? stageColor : undefined }}
          >
            {current.value}
          </p>
          {current.note && (
            <p
              className="mt-3 text-[11px] font-bold tracking-wider uppercase"
              style={{ color: stageColor }}
            >
              {current.note}
            </p>
          )}
        </div>

        <div className="relative mt-8 w-56">
          <p
            className="text-[11px] font-bold mb-2 transition-colors duration-500"
            style={{ color: stageColor }}
          >
            {current.label}
          </p>
          <div
            className="h-2.5 bg-corp-border overflow-hidden border border-black/10"
            style={isFatal ? { boxShadow: `0 0 10px 2px ${GLOW_COLOR[4]}` } : undefined}
          >
            <div
              key={step}
              className={`h-full transition-[width] duration-[1600ms] ease-out ${
                HAZARD[step] ? "rage-hazard" : ""
              }`}
              style={{
                width: `${current.fill}%`,
                backgroundColor: HAZARD[step] ? undefined : stageColor,
                ["--rage-hazard-a" as string]: stageColor,
              }}
            />
          </div>
        </div>

        <p
          className={`mt-8 text-[10px] text-corp-muted max-w-[15rem] leading-relaxed ${
            collapsing ? "falling" : ""
          }`}
          style={collapsing ? { animationDelay: "240ms" } : undefined}
        >
          ⚠ Rage levels may not reflect actual appreciation.
        </p>
      </div>
    </main>
  );
}
