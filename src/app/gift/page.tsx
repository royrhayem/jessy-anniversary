"use client";

import { useState } from "react";
import Link from "next/link";
import { CONFIG } from "@/content";
import { haptic } from "@/lib/progress";
import BubbleBurst from "@/components/Bubbles";

export default function Gift() {
  const [revealed, setRevealed] = useState(false);
  const { gift, giftMode } = CONFIG;

  return (
    <main className="hand paper min-h-dvh flex flex-col relative">
      {revealed && <BubbleBurst />}

      <div className="relative z-2 flex-1 flex flex-col items-center justify-center px-7 text-center gap-7">
        <div>
          <p className="font-mono text-xs text-sea">BUG-0001</p>
          <p className="font-mono text-[11px] text-olive mt-1">RESOLUTION:</p>
        </div>

        <span className="stamp text-terracotta text-base">CANNOT REPRODUCE</span>

        <p className="font-serif text-2xl text-deep leading-snug">
          Because it was never a bug.
        </p>

        <div className="h-px w-20 bg-terracotta/40" />

        {!revealed ? (
          <>
            <p className="text-sm text-ink/70 max-w-[17rem] leading-relaxed">
              Your actual gift — the one that isn&apos;t a gift card — is waiting.
            </p>
            <button
              onClick={() => {
                setRevealed(true);
                haptic([30, 60, 30, 60, 120]);
              }}
              className="w-full max-w-xs bg-deep text-sand font-serif text-lg py-4 min-h-12 rounded-full active:opacity-90"
            >
              TAP TO REVEAL
            </button>
          </>
        ) : (
          <div className="space-y-5 animate-[rise_.7s_ease-out]">
            <p className="font-serif text-xl text-sea italic">
              &ldquo;{gift.riddle}&rdquo;
            </p>

            {giftMode === "physical" ? (
              <p className="font-serif text-2xl text-deep leading-snug">
                {gift.location}
              </p>
            ) : gift.virtualLink ? (
              <a
                href={gift.virtualLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-terracotta text-sand font-serif text-lg px-8 py-4 min-h-12 rounded-full"
              >
                {gift.virtualLabel}
              </a>
            ) : (
              <p className="font-mono text-xs text-terracotta">
                {/* organiser has not set the gift yet */}
                TODO: set CONFIG.gift in src/content.ts
              </p>
            )}
          </div>
        )}
      </div>

      <div className="relative z-2 px-6 pb-10">
        {revealed && (
          <Link
            href="/keepsake"
            className="block w-full text-center border-2 border-deep text-deep font-serif py-3.5 min-h-12 rounded-full"
          >
            Keep this →
          </Link>
        )}
      </div>

      <style>{`
        @keyframes rise {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </main>
  );
}
