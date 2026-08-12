"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CONFIG, FINAL_TICKET_ID, TICKETS, type TicketId } from "@/content";
import { useProgress, haptic } from "@/lib/progress";
import Game from "@/components/Games";

export default function TicketPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { isClosed, close, allButFinalClosed, ready } = useProgress();

  const ticket = TICKETS.find((t) => t.id === (id as TicketId));

  const [solved, setSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const alreadyClosed = ticket ? isClosed(ticket.id) : false;

  // She is on stage. Help arrives on its own, and then the answer does.
  // She will never know the site stepped in; the room will never watch
  // her struggle.
  useEffect(() => {
    if (!ticket || solved || alreadyClosed) return;
    const hint = setTimeout(() => setShowHint(true), CONFIG.hintAfterMs);
    const auto = setTimeout(() => setSolved(true), CONFIG.autoSolveAfterMs);
    return () => {
      clearTimeout(hint);
      clearTimeout(auto);
    };
  }, [ticket, solved, alreadyClosed]);

  useEffect(() => {
    if (!ticket || !solved) return;
    close(ticket.id);
    haptic([25, 50, 25]);
  }, [solved, ticket, close]);

  if (!ready) return <main className="dbg min-h-dvh" />;

  if (!ticket) {
    return (
      <main className="dbg min-h-dvh grid place-items-center p-6">
        <div className="text-center">
          <p className="font-mono text-dbg-red">404 — no such ticket</p>
          <Link href="/board" className="mt-4 inline-block text-dbg-green font-mono text-sm">
            ← back to board
          </Link>
        </div>
      </main>
    );
  }

  const isFinal = ticket.id === FINAL_TICKET_ID;
  const done = solved || alreadyClosed;

  // BUG-0001 hands off to the tribute rather than back to the board.
  const nextHref = isFinal ? "/tribute" : "/board";

  return (
    <main className="dbg min-h-dvh flex flex-col pb-8">
      <header className="sticky top-0 z-10 bg-dbg-bg/95 backdrop-blur border-b border-dbg-line px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.push("/board")}
          aria-label="Back to board"
          className="text-dbg-muted min-h-11 px-1"
        >
          ←
        </button>
        <span className="font-mono text-sm text-dbg-purple">{ticket.id}</span>
      </header>

      <div className="px-4 py-5 flex-1 flex flex-col gap-5">
        <div>
          <h1 className="text-lg leading-snug">{ticket.title}</h1>
          <p className="mt-2 text-[11px] font-mono text-dbg-muted">
            {ticket.reporter && `reported by ${ticket.reporter} · `}
            priority {ticket.severity}
          </p>
        </div>

        {ticket.steps && ticket.steps.length > 0 && (
          <div>
            <p className="text-[11px] font-mono text-dbg-muted mb-1.5">
              Steps to reproduce:
            </p>
            <ol className="text-sm space-y-1 list-decimal list-inside text-dbg-text/90">
              {ticket.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Games that stamp themselves stay put — their last frame is the
            punchline, and replacing it with a panel would step on it. */}
        {(!done || ticket.stampInGame) && (
          <Game
            kind={ticket.game}
            solved={done}
            resolution={ticket.resolution}
            onSolve={() => setSolved(true)}
          />
        )}

        {done && !ticket.stampInGame && (
          <div className="rounded-md border border-dbg-green/40 bg-dbg-green/5 p-5 flex flex-col items-center gap-4">
            <span className="stamp text-dbg-green text-sm">{ticket.resolution}</span>
            {ticket.closingNote && (
              <p className="text-sm text-center leading-relaxed text-dbg-text/90">
                {ticket.closingNote}
              </p>
            )}
          </div>
        )}

        {/* The hint only ever adds help. It never expires anything. */}
        {!done && showHint && (
          <button
            onClick={() => setSolved(true)}
            className="text-[11px] font-mono text-dbg-amber min-h-11"
          >
            Need a hint? · tap to resolve
          </button>
        )}
      </div>

      <div className="px-4">
        {done && (
          <Link
            href={nextHref}
            className="block w-full text-center border-2 border-dbg-green text-dbg-green font-mono font-bold py-4 min-h-12 rounded active:bg-dbg-green/10"
          >
            {isFinal
              ? "[ CONTINUE ]"
              : allButFinalClosed
                ? "[ BUG-0001 UNLOCKED ]"
                : "[ BACK TO BOARD ]"}
          </Link>
        )}
      </div>
    </main>
  );
}
