"use client";

import Link from "next/link";
import { CONFIG, REDEMPTION_GIFTS, TICKETS, type RedemptionGift } from "@/content";
import { useProgress } from "@/lib/progress";

/**
 * Organiser-only. Open this on YOUR phone before the event.
 * Not linked from anywhere in the experience.
 */
const STEPS = [
  ["/", "Act I — corporate landing"],
  ["/redeem", "Act I — code entry"],
  ["/ragemeter", "Act I — rage meter gag"],
  ["/crash", "Act II — the crash / role flip"],
  ["/board", "Act II — bug board"],
  ["/reveal", "Act II→III — scratch transition"],
  ["/tribute", "Act III — tribute wall"],
  ["/gift", "Act III — gift reveal"],
  ["/voucher/spa", "Act III — spa voucher"],
  ["/keepsake", "Act III — certificate"],
] as const;

export default function Presenter() {
  const { closed, reset, close, ready } = useProgress();

  if (!ready) return <main className="dbg min-h-dvh" />;

  return (
    <main className="dbg min-h-dvh px-4 py-6 space-y-7">
      <header>
        <h1 className="font-mono text-dbg-amber">PRESENTER CONTROLS</h1>
        <p className="text-[11px] text-dbg-muted mt-1">
          Not for Jessy&apos;s phone.
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="text-[11px] font-mono text-dbg-muted uppercase tracking-wider">
          Jump to
        </h2>
        {STEPS.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className="block rounded border border-dbg-line bg-dbg-panel px-3.5 py-3 min-h-12 text-sm active:border-dbg-green"
          >
            <span className="font-mono text-dbg-purple text-xs">{href}</span>
            <span className="block text-dbg-muted text-[11px] mt-0.5">{label}</span>
          </Link>
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="text-[11px] font-mono text-dbg-muted uppercase tracking-wider">
          Progress · {closed.length}/{TICKETS.length} closed
        </h2>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="flex-1 rounded border border-dbg-red text-dbg-red font-mono py-3 min-h-12 text-xs"
          >
            RESET ALL
          </button>
          <button
            onClick={() =>
              TICKETS.filter((t) => t.id !== "BUG-0001").forEach((t) => close(t.id))
            }
            className="flex-1 rounded border border-dbg-amber text-dbg-amber font-mono py-3 min-h-12 text-xs"
          >
            CLOSE 4
          </button>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("jessy10.gift-delivery.v1");
            window.location.reload();
          }}
          className="w-full rounded border border-dbg-purple text-dbg-purple font-mono py-3 min-h-12 text-xs"
        >
          RESET GIFT DELIVERY
        </button>
      </section>

      <section className="space-y-2 text-[11px] font-mono text-dbg-muted">
        <h2 className="uppercase tracking-wider">Cheat sheet</h2>
        <p>
          Card code: <span className="text-dbg-green">{CONFIG.cardCode}</span>
        </p>
        <p>
          Team code:{" "}
          <span className="text-dbg-green">{CONFIG.teamCode.join(" ")}</span>
        </p>
        <ul className="pl-4 list-disc space-y-0.5">
          {CONFIG.teamCode.map((d, i) => (
            <li key={i}>
              <span className="text-dbg-green">{d}</span> —{" "}
              {CONFIG.digitHolders[i] ?? "TODO"}
            </li>
          ))}
        </ul>
        <p className="pt-2">Gift delivery:</p>
        <ul className="space-y-1.5">
          {REDEMPTION_GIFTS.map((gift: RedemptionGift, i) => (
            <li key={gift.key}>
              <span className="text-dbg-purple">0{i + 1}</span>{" "}
              <span className="text-dbg-green">{gift.kind}</span> — {gift.title}
              {gift.location && (
                <span className="block pl-6 text-dbg-muted">↳ {gift.location}</span>
              )}
            </li>
          ))}
        </ul>
        <p>
          Spa QR: <span className="text-dbg-green">{CONFIG.spaVoucherUrl ?? "built-in /voucher/spa"}</span>
        </p>
      </section>
    </main>
  );
}
