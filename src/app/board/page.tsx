"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { TICKETS } from "@/content";
import { useProgress } from "@/lib/progress";

export default function Board() {
  const router = useRouter();
  const { isClosed, allButFinalClosed, ready, closed } = useProgress();

  // Nine down, one to go — the board's job is finished.
  useEffect(() => {
    if (isClosed("BUG-0001")) router.replace("/tribute");
  }, [closed, isClosed, router]);

  if (!ready) return <main className="dbg min-h-dvh" />;

  const resolvedCount = TICKETS.filter((t) => isClosed(t.id)).length;
  const pct = Math.round((resolvedCount / TICKETS.length) * 100);

  return (
    <main className="dbg min-h-dvh pb-10">
      <header className="sticky top-0 z-10 bg-dbg-bg/95 backdrop-blur border-b border-dbg-line px-4 py-3">
        <div className="flex items-baseline justify-between">
          <h1 className="font-mono font-bold tracking-wide">JESSY-10Y</h1>
          <span className="text-xs text-dbg-muted font-mono">
            {TICKETS.length - resolvedCount} OPEN
          </span>
        </div>
        <div className="mt-2 h-1.5 bg-dbg-line rounded-full overflow-hidden">
          <div
            className="h-full bg-dbg-green transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-dbg-muted font-mono">
          {resolvedCount}/{TICKETS.length} resolved
        </p>
      </header>

      <ul className="px-4 py-4 space-y-3">
        {TICKETS.map((t, i) => {
          const done = isClosed(t.id);
          const isFinal = t.id === "BUG-0001";
          const locked = isFinal && !allButFinalClosed;

          return (
            <li
              key={t.id}
              style={{ animationDelay: `${i * 55}ms` }}
              className="animate-[fadeUp_.45s_ease-out_backwards]"
            >
              <Link
                href={locked ? "#" : `/ticket/${t.id}`}
                aria-disabled={locked}
                onClick={(e) => locked && e.preventDefault()}
                className={`block rounded-md border p-3.5 transition-colors ${
                  done
                    ? "border-dbg-green/30 bg-dbg-green/5 opacity-70"
                    : locked
                      ? "border-dbg-line bg-dbg-panel opacity-50 cursor-not-allowed"
                      : "border-dbg-line bg-dbg-panel active:border-dbg-purple"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-dbg-purple">{t.id}</span>
                  <span className="font-mono text-[10px] tracking-wider">
                    {done ? (
                      <span className="text-dbg-green">✅ CLOSED</span>
                    ) : locked ? (
                      <span className="text-dbg-muted">🔒 LOCKED</span>
                    ) : (
                      <span className="text-dbg-red">🔴 OPEN</span>
                    )}
                  </span>
                </div>

                <p
                  className={`mt-1.5 text-sm leading-snug ${
                    locked ? "blur-[5px] select-none" : ""
                  }`}
                >
                  {locked ? "████████ ███ ███ ████ ████ ██████████" : t.title}
                </p>

                {!locked && (
                  <p className="mt-2 text-[11px] text-dbg-muted font-mono">
                    reported by {t.reporter} · {t.severity}
                  </p>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {allButFinalClosed && !isClosed("BUG-0001") && (
        <p className="px-6 text-center text-[11px] text-dbg-amber font-mono animate-pulse">
          BUG-0001 unlocked.
        </p>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </main>
  );
}
