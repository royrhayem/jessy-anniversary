"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CONFIG } from "@/content";
import { haptic } from "@/lib/progress";

export default function Redeem() {
  const router = useRouter();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [attempts, setAttempts] = useState(0);
  const [validating, setValidating] = useState(false);
  const [hint, setHint] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const code = digits.join("");

  useEffect(() => {
    if (code.length < 4) return;
    setValidating(true);
    const t = setTimeout(() => {
      if (code === CONFIG.cardCode) {
        haptic(20);
        router.push("/balance");
      } else {
        setValidating(false);
        setAttempts((a) => a + 1);
        setDigits(["", "", "", ""]);
        refs.current[0]?.focus();
        haptic([40, 60, 40]);
      }
    }, 1800); // fake validation delay — corporate systems are slow
    return () => clearTimeout(t);
  }, [code, router]);

  // She is standing in front of her whole team. After two misses the form
  // gives up and does it for her rather than let her fumble on stage.
  useEffect(() => {
    if (attempts < 2) return;
    setHint(true);
    const t = setTimeout(() => setDigits(CONFIG.cardCode.split("")), 1400);
    return () => clearTimeout(t);
  }, [attempts]);

  function setDigit(i: number, v: string) {
    const clean = v.replace(/\D/g, "").slice(-1);
    setDigits((d) => {
      const next = [...d];
      next[i] = clean;
      return next;
    });
    if (clean) refs.current[i + 1]?.focus();
  }

  return (
    <main className="corp min-h-dvh flex flex-col">
      <header className="bg-linear-to-b from-[#5a6570] to-[#3f4750] px-4 py-3">
        <h1 className="text-white font-bold text-lg tracking-tight">RewardHub™</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-sm max-w-[16rem] leading-relaxed">
          Enter the 4-digit code found on the back of your card:
        </p>

        <div className="mt-7 flex gap-2.5" role="group" aria-label="Card code">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !d) refs.current[i - 1]?.focus();
              }}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              aria-label={`Digit ${i + 1}`}
              disabled={validating}
              className="w-14 h-16 text-center text-2xl font-bold bg-white border-2 border-corp-border focus:border-corp-blue outline-none disabled:opacity-60"
            />
          ))}
        </div>

        <div className="mt-6 h-6" aria-live="polite">
          {validating && <p className="text-xs text-corp-muted">Validating…</p>}
          {attempts > 0 && !validating && !hint && (
            <p className="text-xs text-[#c0392b]">
              Code not recognised. Please try again.
            </p>
          )}
          {hint && (
            <p className="text-xs text-corp-muted font-mono">
              {/* the mask slips for the first time */}
              // fine, I&apos;ll do it
            </p>
          )}
        </div>
      </div>

      <div className="px-6 pb-10 text-center">
        <details className="text-xs text-corp-muted">
          <summary className="cursor-pointer min-h-11 flex items-center justify-center">
            ⓘ Having trouble?
          </summary>
          <p className="mt-2 leading-relaxed">
            Have you tried turning it off and on again?
          </p>
        </details>
      </div>
    </main>
  );
}
