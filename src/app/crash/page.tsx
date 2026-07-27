"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CONFIG } from "@/content";
import { haptic } from "@/lib/progress";

/**
 * The single most important screen in the product. Everything before it is a
 * prank; everything after it is a tribute. The pause before "Correction:" is
 * the hinge — it is deliberately long. Do not shorten it.
 */
type Line = { text: string; cls?: string; pauseAfter?: number };

const LINES: Line[] = [
  { text: "Fatal Exception: NSInvalidRewardException", cls: "text-dbg-red" },
  { text: "" },
  { text: "Reason: reward value cannot represent", cls: "text-dbg-muted" },
  { text: "        the subject.", cls: "text-dbg-muted", pauseAfter: 600 },
  { text: "" },
  { text: "Thread 0 crashed:", cls: "text-dbg-muted" },
  { text: "0   RewardHub    0x0000 gift()", cls: "text-dbg-muted" },
  { text: "1   RewardHub    0x0001 value()", cls: "text-dbg-muted" },
  { text: "2   HR           0x0002 recognise()", cls: "text-dbg-muted" },
  { text: "3   ???          0x0003 ——————", cls: "text-dbg-muted", pauseAfter: 700 },
  { text: "" },
  {
    text: "> No QA engineer available to triage",
    cls: "text-dbg-amber",
  },
  { text: "  this issue.", cls: "text-dbg-amber", pauseAfter: 1500 },
  { text: "" },
  { text: "> …", cls: "text-dbg-muted", pauseAfter: 1600 }, // ← the hinge
  { text: "" },
  {
    text: "> Correction: one is currently holding",
    cls: "text-dbg-green",
  },
  { text: "  this phone.", cls: "text-dbg-green", pauseAfter: 1200 },
  { text: "" },
  { text: `> ${CONFIG.name}.`, cls: "text-dbg-purple text-lg font-bold", pauseAfter: 900 },
  { text: "> 10 years. 3,650 days.", cls: "text-dbg-text" },
  { text: "> Countless bugs nobody else would", cls: "text-dbg-text" },
  { text: "  have found.", cls: "text-dbg-text", pauseAfter: 1000 },
  { text: "" },
  { text: "> We need you one more time.", cls: "text-dbg-green font-bold" },
];

const CHAR_MS = 22;

export default function Crash() {
  const router = useRouter();
  const [shown, setShown] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) {
      setShown(LINES.map((l) => l.text));
      setDone(true);
      return;
    }
    if (lineIdx >= LINES.length) {
      setDone(true);
      return;
    }
    const line = LINES[lineIdx];

    if (charIdx > line.text.length) {
      const t = setTimeout(() => {
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }, line.pauseAfter ?? 90);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setShown((s) => {
        const next = [...s];
        next[lineIdx] = line.text.slice(0, charIdx);
        return next;
      });
      setCharIdx((c) => c + 1);
      if (charIdx % 6 === 0 && line.text) haptic(3);
    }, line.text ? CHAR_MS : 40);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx, reduced]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [shown]);

  return (
    <main className="dbg scanlines min-h-dvh flex flex-col">
      <header className="flex items-center gap-2 px-4 py-3 border-b border-dbg-line shrink-0">
        <span className="flex gap-1.5">
          <i className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <i className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <i className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="text-xs text-dbg-muted ml-1">crash_report.log</span>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-5 text-[13px] leading-relaxed"
        aria-live="polite"
        aria-atomic="false"
      >
        {shown.map((text, i) => (
          <p key={i} className={`${LINES[i]?.cls ?? ""} whitespace-pre-wrap min-h-[1.2em]`}>
            {text}
            {i === lineIdx && !done && <span className="cursor" />}
          </p>
        ))}
      </div>

      <div className="p-4 pb-8 shrink-0">
        <button
          onClick={() => {
            haptic(25);
            router.push("/board");
          }}
          className={`w-full border-2 border-dbg-green text-dbg-green font-mono font-bold py-4 min-h-12 transition-opacity duration-700 active:bg-dbg-green/10 ${
            done ? "opacity-100 animate-pulse" : "opacity-0 pointer-events-none"
          }`}
        >
          [ OPEN BUG BOARD ]
        </button>

        {/* Never trap her in a beat. */}
        <button
          onClick={() => router.push("/board")}
          className={`w-full mt-2 text-[11px] text-dbg-muted min-h-11 ${
            done ? "hidden" : ""
          }`}
        >
          skip →
        </button>
      </div>
    </main>
  );
}
