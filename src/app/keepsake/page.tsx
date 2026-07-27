"use client";

import { CONFIG, KEEPSAKE, STATS } from "@/content";
import Placeholder from "@/components/Placeholder";

export default function Keepsake() {
  return (
    <main className="hand paper min-h-dvh grid place-items-center px-5 py-10">
      <div className="relative z-2 w-full max-w-sm border-2 border-deep/30 rounded-sm p-7 bg-white/45 text-center space-y-5">
        <div className="border border-terracotta/40 rounded-sm p-6 space-y-5">
          <p className="text-[10px] uppercase tracking-[0.3em] text-terracotta">
            {CONFIG.startYear} — {CONFIG.currentYear}
          </p>

          <h1 className="font-serif text-2xl text-deep leading-tight">
            {KEEPSAKE.title}
          </h1>
          <p className="font-serif italic text-sm text-olive -mt-3">
            {KEEPSAKE.subtitle}
          </p>

          <div className="h-px w-16 bg-terracotta/40 mx-auto" />

          <p className="text-[11px] uppercase tracking-[0.2em] text-olive">
            awarded to
          </p>
          <p className="font-serif text-3xl text-deep">{KEEPSAKE.awardedTo}</p>

          <Placeholder
            src="/photos/jessy/hero.jpg"
            label="Jessy — photo (public/photos/jessy/hero.jpg)"
            className="portrait w-24 mx-auto"
          />

          <dl className="grid grid-cols-2 gap-3 pt-2">
            {STATS.slice(0, 4).map((s) => (
              <div key={s.label}>
                <dt className="font-serif text-lg text-sea tabular-nums">
                  {s.value.toLocaleString()}
                </dt>
                <dd className="text-[9px] uppercase tracking-[0.14em] text-olive">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>

          <p className="font-serif italic text-sm text-ink/70 pt-2">
            {KEEPSAKE.signoff}
          </p>
        </div>

        <p className="text-[10px] text-olive/70">
          Screenshot this. It&apos;s the only gift card you&apos;ll ever want to keep.
        </p>
      </div>
    </main>
  );
}
