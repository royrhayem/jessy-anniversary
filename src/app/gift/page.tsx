"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CONFIG, REDEMPTION_GIFTS, type RedemptionGift } from "@/content";
import { haptic } from "@/lib/progress";
import BubbleBurst from "@/components/Bubbles";
import QRCode from "@/components/QRCode";

const STORAGE_KEY = "jessy10.gift-delivery.v1";

type SavedState = {
  activeStep: number;
  completed: number[];
};

export default function Gift() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [locationShown, setLocationShown] = useState(false);
  const [ready, setReady] = useState(false);
  const [origin, setOrigin] = useState("");
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SavedState;
        const safeCompleted = Array.isArray(parsed.completed)
          ? parsed.completed.filter((i) => i >= 0 && i < REDEMPTION_GIFTS.length)
          : [];
        const safeStep =
          typeof parsed.activeStep === "number"
            ? Math.min(Math.max(parsed.activeStep, 0), REDEMPTION_GIFTS.length - 1)
            : 0;
        setCompleted(safeCompleted);
        setActiveStep(safeStep);
        setRevealed(safeCompleted.includes(safeStep));
        setLocationShown(safeCompleted.includes(safeStep));
      }
    } catch {
      /* private mode or a stale value — start the ending fresh */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ activeStep, completed }));
    } catch {
      /* The reveal still works if storage is unavailable. */
    }
  }, [activeStep, completed, ready]);

  const gift = REDEMPTION_GIFTS[activeStep];
  const isDigital = gift.kind === "digital";
  const allDone = completed.length === REDEMPTION_GIFTS.length;
  const voucherUrl = useMemo(() => {
    if (CONFIG.spaVoucherUrl) return CONFIG.spaVoucherUrl;
    return origin ? `${origin}/voucher/spa` : "";
  }, [origin]);

  function openStep(index: number) {
    if (index > activeStep && !completed.includes(index)) return;
    setActiveStep(index);
    setRevealed(completed.includes(index));
    setLocationShown(completed.includes(index));
    haptic(10);
  }

  function revealGift() {
    setRevealed(true);
    haptic([18, 35, 18]);
  }

  function revealLocation() {
    setLocationShown(true);
    haptic([22, 42, 22]);
  }

  function completeGift() {
    const nextCompleted = completed.includes(activeStep)
      ? completed
      : [...completed, activeStep].sort((a, b) => a - b);
    setCompleted(nextCompleted);
    setBurst(true);
    haptic([30, 60, 30, 60, 120]);
    window.setTimeout(() => setBurst(false), 2200);

    if (activeStep < REDEMPTION_GIFTS.length - 1) {
      const next = activeStep + 1;
      setActiveStep(next);
      setRevealed(false);
      setLocationShown(false);
    }
  }

  return (
    <main className="hand paper min-h-dvh relative overflow-hidden">
      {burst && <BubbleBurst count={34} />}

      <div className="relative z-2 mx-auto max-w-xl px-5 py-8 pb-12">
        <header className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <span className="stamp text-terracotta text-[10px]">REWARD RECOVERY</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-olive">
              {completed.length}/3 recovered
            </span>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-sea">
              BUG-0001 / FINAL DELIVERY
            </p>
            <h1 className="font-serif text-[2.35rem] leading-[0.98] text-deep sm:text-5xl">
              Three gifts.
              <br />
              <em>One slightly unnecessary quest.</em>
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-ink/70">
              The portal still cannot express your value as money, so it has
              converted the appreciation into a small delivery operation.
            </p>
          </div>
        </header>

        <nav className="mt-8 grid grid-cols-3 gap-2" aria-label="Gift delivery steps">
          {REDEMPTION_GIFTS.map((item, index) => {
            const done = completed.includes(index);
            const unlocked = index <= activeStep || done;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => openStep(index)}
                disabled={!unlocked}
                className={`min-h-16 rounded-xl border px-2.5 py-2 text-left transition-all ${
                  index === activeStep
                    ? "border-terracotta bg-white/75 shadow-sm"
                    : done
                      ? "border-sea/40 bg-sea/10"
                      : "border-deep/15 bg-white/25 opacity-55"
                } ${unlocked ? "active:scale-[0.98]" : "cursor-not-allowed"}`}
                aria-current={index === activeStep ? "step" : undefined}
              >
                <span className="flex items-center justify-between gap-1 font-mono text-[10px] text-sea">
                  <span>0{index + 1}</span>
                  <span aria-hidden>{done ? "✓" : unlocked ? "•" : "·"}</span>
                </span>
                <span className="mt-1 block text-[11px] leading-tight text-deep">
                  {item.kind === "digital" ? "reveal step 1" : `hidden gift ${index}`}
                </span>
              </button>
            );
          })}
        </nav>

        {!allDone ? (
          <section className="mt-6 overflow-hidden rounded-[1.6rem] border border-deep/15 bg-white/55 shadow-[0_18px_40px_rgba(27,94,99,0.1)]">
            <div className="border-b border-deep/10 px-5 py-5 sm:px-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-terracotta">
                    {gift.label}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl leading-tight text-deep sm:text-3xl">
                    {gift.title}
                  </h2>
                </div>
                <span className="text-3xl" aria-hidden>
                  {isDigital ? "✦" : activeStep === 1 ? "🧭" : "📦"}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{gift.teaser}</p>
            </div>

            <div className="px-5 py-6 sm:px-7">
              {!revealed ? (
                <div className="space-y-5 text-center">
                  <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-terracotta/35 bg-sand text-4xl shadow-inner">
                    {isDigital ? "✦" : "?"}
                  </div>
                  <div className="space-y-2">
                    <p className="font-serif text-xl text-deep">
                      {isDigital ? "The evidence is ready." : "A clue is waiting."}
                    </p>
                    <p className="mx-auto max-w-xs text-sm leading-relaxed text-ink/65">
                      {isDigital
                        ? "It is small, mysterious, and has passed absolutely no compliance review."
                        : "We have hidden one actual object and are calling this a logistics department."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={revealGift}
                    className="w-full rounded-full bg-deep px-6 py-4 font-serif text-lg text-sand transition-transform active:scale-[0.98]"
                  >
                    {isDigital ? "Open the evidence locker" : "Reveal the clue"} →
                  </button>
                </div>
              ) : isDigital ? (
                <DigitalGift voucherUrl={voucherUrl} />
              ) : (
                <PhysicalGift
                  gift={gift}
                  locationShown={locationShown}
                  onRevealLocation={revealLocation}
                />
              )}
            </div>

            {revealed && (!isDigital ? locationShown : true) && (
              <div className="border-t border-deep/10 bg-sand/60 px-5 py-5 sm:px-7">
                <div className="flex flex-col items-center gap-4 text-center">
                  <span className="stamp text-sea text-[11px]">
                    {completed.includes(activeStep) ? "RECOVERED" : "READY TO CLAIM"}
                  </span>
                  <p className="max-w-sm text-sm leading-relaxed text-ink/70">
                    {isDigital
                      ? "Scan it, save it, and schedule the most professional disappearing act of your career."
                      : "Go get it. The site will remain here, bravely holding the fort."}
                  </p>
                  <button
                    type="button"
                    onClick={completeGift}
                    className="w-full rounded-full border-2 border-deep px-6 py-3.5 font-serif text-lg text-deep transition-transform active:scale-[0.98]"
                  >
                    {activeStep === REDEMPTION_GIFTS.length - 1
                      ? "Mark the final boss defeated"
                      : completed.includes(activeStep)
                        ? "Open the next gift"
                        : isDigital
                          ? "I have the voucher →"
                          : "I found it →"}
                  </button>
                </div>
              </div>
            )}
          </section>
        ) : (
          <Completion />
        )}

        <footer className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-olive">
            delivery status: unexpectedly successful
          </p>
          <Link href="/keepsake" className="text-sm text-sea underline decoration-sea/40 underline-offset-4">
            Keep the certificate for later →
          </Link>
        </footer>
      </div>

      <style>{`
        @keyframes giftRise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </main>
  );
}

function DigitalGift({ voucherUrl }: { voucherUrl: string }) {
  return (
    <div className="grid gap-6 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-center">
      <div className="space-y-3 text-center sm:text-left">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-terracotta">
          scan to unlock: spa mode
        </p>
        <h3 className="font-serif text-2xl leading-tight text-deep">
          You have been cleared for one guilt-free reset.
        </h3>
        <p className="text-sm leading-relaxed text-ink/70">
          Ask a teammate&apos;s phone to scan this screen. Yes, the voucher has a
          two-device dependency. It was tested in production.
        </p>
        {voucherUrl ? (
          <a
            href={voucherUrl}
            target={CONFIG.spaVoucherUrl ? "_blank" : undefined}
            rel={CONFIG.spaVoucherUrl ? "noreferrer" : undefined}
            className="inline-block text-sm text-sea underline decoration-sea/40 underline-offset-4"
          >
            Open the voucher on this phone ↗
          </a>
        ) : (
          <p className="font-mono text-[10px] text-terracotta">Preparing the local voucher…</p>
        )}
      </div>

      <div className="mx-auto w-full max-w-[15rem] animate-[giftRise_.7s_ease-out]">
        {voucherUrl ? <QRCode value={voucherUrl} /> : <div className="aspect-square rounded-xl bg-white/70" />}
        <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.15em] text-olive">
          scan / save / disappear
        </p>
      </div>
    </div>
  );
}

function PhysicalGift({
  gift,
  locationShown,
  onRevealLocation,
}: {
  gift: RedemptionGift;
  locationShown: boolean;
  onRevealLocation: () => void;
}) {
  return (
    <div className="space-y-5 animate-[giftRise_.7s_ease-out]">
      <div className="rounded-2xl border border-terracotta/25 bg-sand/75 p-5 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-terracotta">the clue</p>
        <p className="mt-3 font-serif text-2xl leading-snug text-deep">&ldquo;{gift.clue}&rdquo;</p>
      </div>

      {!locationShown ? (
        <button
          type="button"
          onClick={onRevealLocation}
          className="w-full rounded-full bg-terracotta px-6 py-4 font-serif text-lg text-sand transition-transform active:scale-[0.98]"
        >
          Unseal the hiding place →
        </button>
      ) : (
        <div className="rounded-2xl border-2 border-sea/35 bg-sea/10 p-5 text-center animate-[giftRise_.5s_ease-out]">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sea">location unsealed</p>
          <p className="mt-3 font-serif text-2xl leading-snug text-deep">{gift.location}</p>
          {gift.location?.includes("TODO") && (
            <p className="mt-3 font-mono text-[10px] leading-relaxed text-terracotta">
              Organizer note: update this hiding place in src/content.ts before the event.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function Completion() {
  return (
    <section className="mt-6 overflow-hidden rounded-[1.6rem] border border-sea/30 bg-sea/10 p-6 text-center shadow-[0_18px_40px_rgba(27,94,99,0.1)] sm:p-8">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-sea/40 bg-sand text-4xl">
        🫧
      </div>
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-sea">
        all gifts recovered
      </p>
      <h2 className="mt-2 font-serif text-3xl leading-tight text-deep">
        Case closed. Appreciation delivered.
      </h2>
      <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink/70">
        One digital reset, two physical side quests, and absolutely no monetary
        value whatsoever. A perfect RewardHub™ outcome.
      </p>
      <Link
        href="/keepsake"
        className="mt-6 inline-block rounded-full bg-deep px-7 py-4 font-serif text-lg text-sand"
      >
        Save the certificate →
      </Link>
    </section>
  );
}
