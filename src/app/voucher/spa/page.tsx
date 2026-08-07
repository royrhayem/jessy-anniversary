import Link from "next/link";
import { CONFIG, SPA_VOUCHER } from "@/content";

export default function SpaVoucher() {
  return (
    <main className="hand paper min-h-dvh grid place-items-center px-5 py-10">
      <article className="relative z-2 w-full max-w-md rounded-[1.8rem] border-2 border-terracotta/35 bg-white/65 p-5 shadow-[0_18px_42px_rgba(27,94,99,0.13)] sm:p-7">
        <div className="rounded-[1.3rem] border border-deep/20 bg-sand/70 p-6 text-center sm:p-8">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-olive">
            <span>RewardHub™</span>
            <span>SPA-001</span>
          </div>

          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.28em] text-terracotta">
            voucher unlocked
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-none text-deep sm:text-5xl">
            {SPA_VOUCHER.spaName}
          </h1>
          <p className="mt-4 font-serif text-xl italic text-sea">{SPA_VOUCHER.service}</p>

          <div className="mx-auto my-7 h-px w-20 bg-terracotta/40" />

          <p className="text-[10px] uppercase tracking-[0.2em] text-olive">presented to</p>
          <p className="mt-1 font-serif text-3xl text-deep">{SPA_VOUCHER.recipient}</p>
          <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-ink/70">
            {SPA_VOUCHER.issuedBy}
          </p>

          <div className="mt-7 rounded-xl border border-sea/25 bg-white/60 p-4 text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-sea">redemption note</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">
              Show this screen to the organiser or add the spa&apos;s booking details
              to the voucher copy before the event.
            </p>
          </div>

          <p className="mt-6 font-mono text-[10px] leading-relaxed text-olive">
            {SPA_VOUCHER.finePrint}
          </p>
          <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-terracotta">
            {CONFIG.startYear} — {CONFIG.currentYear} / no bugs during treatment
          </p>
        </div>

        <Link
          href="/gift"
          className="mt-5 block text-center text-sm text-sea underline decoration-sea/40 underline-offset-4"
        >
          Back to the gift operation →
        </Link>
      </article>
    </main>
  );
}
