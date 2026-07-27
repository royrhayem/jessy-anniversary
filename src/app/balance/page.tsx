"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BALANCES } from "@/content";
import { haptic } from "@/lib/progress";

export default function Balance() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [collapsing, setCollapsing] = useState(false);

  useEffect(() => {
    if (step >= BALANCES.length - 1) return;
    const t = setTimeout(() => {
      setStep((s) => s + 1);
      haptic(8);
    }, step === 0 ? 2600 : 1900); // let $0.00 sit long enough to land
    return () => clearTimeout(t);
  }, [step]);

  // Final balance is NaN. The layout literally falls apart.
  useEffect(() => {
    if (step < BALANCES.length - 1) return;
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

  const current = BALANCES[step];
  const isFatal = step === BALANCES.length - 1;

  return (
    <main
      className={`corp min-h-dvh flex flex-col overflow-hidden ${
        collapsing ? "glitching" : ""
      }`}
      style={collapsing ? { filter: "grayscale(1)" } : undefined}
    >
      <header
        className={`bg-linear-to-b from-[#5a6570] to-[#3f4750] px-4 py-3 ${
          collapsing ? "falling" : ""
        }`}
      >
        <h1 className="text-white font-bold text-lg tracking-tight">RewardHub™</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p
          className={`text-xs tracking-[0.2em] text-corp-muted ${
            collapsing ? "falling" : ""
          }`}
          style={collapsing ? { animationDelay: "80ms" } : undefined}
        >
          YOUR REWARD BALANCE
        </p>

        <div
          className={`mt-5 bg-white border-2 border-corp-border px-6 py-7 min-w-[16rem] corp-shadow ${
            collapsing ? "falling" : ""
          }`}
          style={collapsing ? { animationDelay: "160ms" } : undefined}
        >
          <p
            aria-live="polite"
            className={`font-mono font-bold tabular-nums leading-none ${
              isFatal ? "text-4xl text-[#c0392b]" : "text-4xl"
            }`}
          >
            {current.value}
          </p>
          {current.note && (
            <p className="mt-3 text-[11px] tracking-wider text-corp-muted">
              {current.note}
            </p>
          )}
        </div>

        {!isFatal && (
          <div className="mt-8 w-56">
            <p className="text-[11px] text-corp-muted mb-2">Recalculating…</p>
            <div className="h-2 bg-corp-border overflow-hidden">
              {/* jumps backwards on each pass — it is not going well */}
              <div
                key={step}
                className="h-full bg-corp-blue transition-[width] duration-[1600ms] ease-out"
                style={{ width: `${[30, 62, 41, 88, 100][step]}%` }}
              />
            </div>
          </div>
        )}

        <p
          className={`mt-8 text-[10px] text-corp-muted max-w-[15rem] leading-relaxed ${
            collapsing ? "falling" : ""
          }`}
          style={collapsing ? { animationDelay: "240ms" } : undefined}
        >
          ⚠ Balance may not reflect actual appreciation.
        </p>
      </div>
    </main>
  );
}
