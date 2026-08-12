"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CONFIG, STATS, THE_LINE, TIMELINE, TRIBUTES } from "@/content";
import Placeholder from "@/components/Placeholder";

/** The B→C transition: a water ripple wipe, tied to the beach. */
function Ripple({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1400);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed inset-0 z-50 bg-dbg-bg grid place-items-center pointer-events-none">
      <div className="rounded-full bg-sand animate-[ripple_1.4s_ease-out_forwards]" />
      <style>{`
        @keyframes ripple {
          from { width: 0; height: 0; opacity: 1; }
          to   { width: 300vmax; height: 300vmax; opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[ripple_1\\.4s_ease-out_forwards\\] {
            width: 300vmax; height: 300vmax;
          }
        }
      `}</style>
    </div>
  );
}

function Counter({ value, label }: { value: number; label: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1200);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3)))); // ease-out cubic
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-serif text-4xl text-deep tabular-nums">
        {n.toLocaleString()}
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-olive">
        {label}
      </p>
    </div>
  );
}

export default function Tribute() {
  const [wiping, setWiping] = useState(true);

  return (
    <>
      {wiping && <Ripple onDone={() => setWiping(false)} />}

      <main className="hand paper min-h-dvh relative">
        <div className="relative z-2 px-6 py-16 max-w-lg mx-auto space-y-24">
          {/* --- 1. Ten years, in numbers --- */}
          <section className="text-center space-y-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-terracotta">
              {CONFIG.startYear} — {CONFIG.currentYear}
            </p>
            <h1 className="font-serif text-4xl leading-tight text-deep">
              Ten years,
              <br />
              in numbers
            </h1>
            <div className="grid grid-cols-2 gap-8 pt-4">
              {STATS.map((s) => (
                <Counter key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </section>

          {/* --- 2. The timeline --- */}
          <section className="space-y-8">
            <h2 className="font-serif text-2xl text-deep text-center">
              The long version
            </h2>
            <div className="space-y-7">
              <p className="font-mono text-xs text-sea pl-5">{CONFIG.startYear}</p>
              <ol className="space-y-7 border-l-2 border-terracotta/30 pl-5">
                {TIMELINE.map((t) => (
                  <li key={t.title} className="relative">
                    <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-terracotta" />
                    <p className="font-serif text-lg text-deep">{t.title}</p>
                    {t.kind === "section" && (
                      <ol className="mt-3 space-y-3 border-l border-sea/30 pl-4">
                        {t.points.map((p) => (
                          <li key={p.title} className="relative">
                            <span className="absolute -left-[18px] top-1.5 h-1.5 w-1.5 rounded-full bg-sea" />
                            <p className="font-serif text-base text-deep">{p.title}</p>
                          </li>
                        ))}
                      </ol>
                    )}
                  </li>
                ))}
              </ol>
              <p className="font-mono text-xs text-sea pl-5">{CONFIG.currentYear}</p>
            </div>
          </section>

          {/* --- 3. The wall --- */}
          <section className="space-y-8">
            <h2 className="font-serif text-2xl text-deep text-center">
              From your team
            </h2>
            <div className="space-y-7">
              {TRIBUTES.map((t, i) => (
                <figure
                  key={t.name}
                  className={`bg-white/55 p-4 shadow-sm ${
                    t.remote
                      ? "rounded-lg border-2 border-sea/40"
                      : "rounded-sm"
                  }`}
                  style={{ transform: t.remote ? undefined : `rotate(${i % 2 ? 1 : -1}deg)` }}
                >
                  {t.remote && (
                    <p className="text-[10px] font-mono text-sea mb-2 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-sea animate-pulse" />
                      joining from elsewhere, as always
                    </p>
                  )}
                  <div className="flex items-center gap-3">
                    <Placeholder
                      src={t.photo}
                      label={`${t.name} — photo`}
                      className="portrait team-portrait w-14 shrink-0"
                    />
                    <figcaption>
                      <p className="font-serif text-lg text-deep leading-none">
                        {t.name}
                      </p>
                      <p className="text-[11px] text-olive mt-1">{t.role}</p>
                    </figcaption>
                  </div>
                  <blockquote className="mt-3 text-sm leading-relaxed text-ink/80">
                    {t.message}
                  </blockquote>
                </figure>
              ))}
            </div>
          </section>
        </div>

        {/* --- 4. The line. One screen, one sentence, no ornament. --- */}
        <section className="relative z-2 min-h-dvh grid place-items-center px-8">
          <p className="font-serif text-2xl leading-relaxed text-deep text-center max-w-sm">
            {THE_LINE}
          </p>
        </section>

        <div className="relative z-2 px-6 pb-16 max-w-lg mx-auto">
          <Link
            href="/gift"
            className="block w-full text-center bg-deep text-sand font-serif text-lg py-4 min-h-12 rounded-full active:opacity-90"
          >
            One more thing →
          </Link>
        </div>
      </main>
    </>
  );
}
